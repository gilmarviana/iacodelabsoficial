import React, { useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { ClipboardList, CheckCircle, ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';
import useKanban from '@/hooks/useKanban';

const DashboardTaskCards = ({ tasks = {}, clients = [], projects = [] }) => {
  // Pega as colunas do Kanban para saber quais têm status 'Concluído'
  const { columns } = useKanban();
  // Filtros de período, cliente e projeto
  const [period, setPeriod] = useState({ from: '', to: '' });
  const [client, setClient] = useState('all');
  const [project, setProject] = useState('all');
  const [uniqueTypes, setUniqueTypes] = useState([]);

  // Filtra tarefas por período, cliente e projeto
  const filteredTasks = useMemo(() => {
    let all = Object.values(tasks || {}).flat();
    if (period.from) {
      all = all.filter(t => t.createdAt && t.createdAt >= period.from);
    }
    if (period.to) {
      all = all.filter(t => t.createdAt && t.createdAt <= period.to + 'T23:59:59');
    }
    if (client !== 'all') {
      all = all.filter(t => t.projectClient === client || t.client === client || t.project === client);
    }
    if (project !== 'all') {
      all = all.filter(t => t.project === project);
    }
    return all;
  }, [tasks, period, client, project]);

  const total = filteredTasks.length;
  // Descobre os IDs das colunas cujo status é 'Concluído'
  const concluidoColumnIds = columns.filter(col => col.status === 'Concluído').map(col => col.id);
  // Conta tarefas que estão nessas colunas
  const concluidas = Object.entries(tasks)
    .filter(([colId]) => concluidoColumnIds.includes(colId))
    .flatMap(([, tasksArr]) => tasksArr)
    .filter(t => {
      // Aplica os mesmos filtros de período, cliente e projeto
      if (period.from && (!t.createdAt || t.createdAt < period.from)) return false;
      if (period.to && (!t.createdAt || t.createdAt > period.to + 'T23:59:59')) return false;
      if (client !== 'all' && !(t.projectClient === client || t.client === client || t.project === client)) return false;
      if (project !== 'all' && t.project !== project) return false;
      return true;
    }).length;

  const cards = [
    {
      label: 'Tarefas',
      value: total,
      icon: ListChecks,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Tarefas Concluídas',
      value: concluidas,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Tarefas Pendentes',
      value: total - concluidas,
      icon: ClipboardList,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
  ];

  // Todos os cards sempre visíveis
  const filteredCards = cards;

  return (
    <>
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div>
          <label className="block text-xs font-semibold mb-1">Cliente</label>
          <select value={client} onChange={e => setClient(e.target.value)} className="border rounded px-2 py-1 text-sm">
            <option value="all">Todos</option>
            {clients.map(c => (
              <option key={c.id || c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Projeto</label>
          <select value={project} onChange={e => setProject(e.target.value)} className="border rounded px-2 py-1 text-sm">
            <option value="all">Todos</option>
            {projects.map(p => (
              <option key={p.id || p.title} value={p.title}>{p.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">De</label>
          <input type="date" value={period.from} onChange={e => setPeriod(p => ({ ...p, from: e.target.value }))} className="border rounded px-2 py-1 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Até</label>
          <input type="date" value={period.to} onChange={e => setPeriod(p => ({ ...p, to: e.target.value }))} className="border rounded px-2 py-1 text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {filteredCards.map((card, idx) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card rounded-2xl p-6 border group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative"
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${card.bgColor}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <p className="text-3xl font-bold">{card.value}</p>
            <p className="text-muted-foreground text-sm">{card.label}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default DashboardTaskCards;
