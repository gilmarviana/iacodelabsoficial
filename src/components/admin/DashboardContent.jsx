
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, TrendingUp, Star, Users, ArrowUpRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardTaskCards from './DashboardTaskCards';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';


// Função utilitária para obter o nome do mês em pt-BR
const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function getMonthYear(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  return `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}

const DashboardContent = ({ projects = [], onEditProject, tasks = {}, clients = [] }) => {

  // Filtro de datas
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });

  // Gera dados dinâmicos para o gráfico de atividade dos projetos
  const projectActivityData = React.useMemo(() => {
    // Agrupa tarefas por mês/ano
    const taskList = Object.values(tasks || {}).flat();
    const taskByMonth = {};
    taskList.forEach(t => {
      const key = getMonthYear(t.createdAt);
      if (key) {
        taskByMonth[key] = (taskByMonth[key] || 0) + 1;
      }
    });

    // Agrupa projetos por mês/ano (usando startDate)
    const projectByMonth = {};
    (projects || []).forEach(p => {
      const key = getMonthYear(p.startDate);
      if (key) {
        projectByMonth[key] = (projectByMonth[key] || 0) + 1;
      }
    });

    // Pega todos os meses únicos presentes em tarefas ou projetos
    const allMonths = Array.from(new Set([
      ...Object.keys(taskByMonth),
      ...Object.keys(projectByMonth),
    ])).sort((a, b) => {
      // Ordena por ano e mês
      const [ma, ya] = a.split(' ');
      const [mb, yb] = b.split(' ');
      if (ya !== yb) return Number(ya) - Number(yb);
      return monthNames.indexOf(ma) - monthNames.indexOf(mb);
    });

    // Monta o array final para o gráfico
    return allMonths.map(month => ({
      name: month,
      tasks: taskByMonth[month] || 0,
      projects: projectByMonth[month] || 0,
    }));
  }, [tasks, projects]);

  // Função para filtrar projetos pelo intervalo de datas
  const filterByDate = (project) => {
    if (!dateFilter.from && !dateFilter.to) return true;
    const start = project.startDate ? new Date(project.startDate) : null;
    const end = project.endDate ? new Date(project.endDate) : null;
    const from = dateFilter.from ? new Date(dateFilter.from) : null;
    const to = dateFilter.to ? new Date(dateFilter.to) : null;
    // Se só tem 'from'
    if (from && !to) return start && start >= from;
    // Se só tem 'to'
    if (!from && to) return end && end <= to;
    // Se tem ambos
    if (from && to) {
      // Projeto deve ter alguma interseção com o range
      return (
        (start && start >= from && start <= to) ||
        (end && end >= from && end <= to) ||
        (start && end && start <= from && end >= to)
      );
    }
    return true;
  };

  const filteredProjects = projects.filter(filterByDate);

  const stats = [
    { label: 'Total de Projetos', value: filteredProjects.length, icon: FolderOpen, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { label: 'Projetos Ativos', value: filteredProjects.filter(p => p.status === 'Em Desenvolvimento').length, icon: TrendingUp, color: 'text-green-500', bgColor: 'bg-green-500/10' },
    { label: 'Projetos Concluídos', value: filteredProjects.filter(p => p.status === 'Concluído').length, icon: Star, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
    { label: 'Clientes Ativos', value: new Set(filteredProjects.map(p => p.client)).size, icon: Users, color: 'text-purple-500', bgColor: 'bg-purple-500/10' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Visão geral dos seus projetos e atividades.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-card border rounded-lg px-3 py-2">
            <Calendar className="w-4 h-4 text-muted-foreground mr-2" />
            <input
              type="date"
              value={dateFilter.from}
              onChange={e => setDateFilter(f => ({ ...f, from: e.target.value }))}
              className="bg-transparent outline-none text-sm"
              placeholder="De"
            />
            <span className="mx-1 text-muted-foreground">-</span>
            <input
              type="date"
              value={dateFilter.to}
              onChange={e => setDateFilter(f => ({ ...f, to: e.target.value }))}
              className="bg-transparent outline-none text-sm"
              placeholder="Até"
            />
          </div>
        </div>
      </div>

      {/* Cards de tarefas */}
      <DashboardTaskCards tasks={tasks} clients={clients} projects={projects} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl p-6 border group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-green-500 flex items-center text-sm font-semibold">
                +12% <ArrowUpRight className="w-4 h-4 ml-1" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-card rounded-2xl p-6 border"
        >
          <h3 className="text-xl font-bold mb-4">Atividade dos Projetos</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectActivityData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary-foreground))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--secondary-foreground))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Area type="monotone" dataKey="tasks" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorTasks)" name="Tarefas" />
                <Area type="monotone" dataKey="projects" stroke="hsl(var(--secondary-foreground))" fillOpacity={1} fill="url(#colorProjects)" name="Projetos" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl p-6 border"
        >
          <h3 className="text-xl font-bold mb-4">Projetos Recentes</h3>
          <div className="space-y-4">
            {filteredProjects.slice(0, 4).map((project) => (
              <div key={project.id} className="flex items-center">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{project.title}</h4>
                  <p className="text-muted-foreground text-xs">{project.client}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditProject(project)}
                  className="text-primary"
                >
                  Ver
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardContent;
