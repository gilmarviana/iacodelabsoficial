
import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, TrendingUp, Star, Users, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

const projectActivityData = [
  { name: 'Jan', tasks: 30, projects: 5 },
  { name: 'Fev', tasks: 45, projects: 7 },
  { name: 'Mar', tasks: 60, projects: 8 },
  { name: 'Abr', tasks: 50, projects: 10 },
  { name: 'Mai', tasks: 70, projects: 11 },
  { name: 'Jun', tasks: 85, projects: 12 },
];

const DashboardContent = ({ projects, onEditProject }) => {
  const stats = [
    { label: 'Total de Projetos', value: projects.length, icon: FolderOpen, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { label: 'Projetos Ativos', value: projects.filter(p => p.status === 'Em Desenvolvimento').length, icon: TrendingUp, color: 'text-green-500', bgColor: 'bg-green-500/10' },
    { label: 'Projetos Concluídos', value: projects.filter(p => p.status === 'Concluído').length, icon: Star, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
    { label: 'Clientes Ativos', value: new Set(projects.map(p => p.client)).size, icon: Users, color: 'text-purple-500', bgColor: 'bg-purple-500/10' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Visão geral dos seus projetos e atividades.</p>
      </div>

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
            {projects.slice(0, 4).map((project) => (
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
