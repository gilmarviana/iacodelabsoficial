import React, { useMemo } from 'react';
import { ClipboardList, CheckCircle, ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardTaskCards = ({ tasks }) => {
  // tasks: objeto { coluna: [tarefas] }
  const allTasks = useMemo(() => Object.values(tasks || {}).flat(), [tasks]);
  const total = allTasks.length;
  const concluidas = allTasks.filter(t => {
    // Considera concluída se estiver na coluna 'review' ou status 'Concluído'
    return t.status === 'Concluído' || t.status === 'Finalizado' || t.status === 'Revisão' || t.status === 'review' || t.status === 'concluida';
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
      {cards.map((card, idx) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-card rounded-2xl p-6 border group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${card.bgColor}`}>
            <card.icon className={`w-6 h-6 ${card.color}`} />
          </div>
          <p className="text-3xl font-bold">{card.value}</p>
          <p className="text-muted-foreground text-sm">{card.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardTaskCards;
