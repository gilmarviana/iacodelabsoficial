import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Tag, Code, FileText, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectDetailModal = ({ isOpen, onClose, project, isReadOnly = false }) => {
  if (!project) return null;
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };
  
  const getStatusChip = (status) => {
    switch (status) {
      case 'Concluído':
        return 'bg-green-500/10 text-green-500';
      case 'Pausado':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'Cancelado':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-blue-500/10 text-blue-500';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <p className="text-muted-foreground">{project.category}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 -mt-2 -mr-2"><X className="w-5 h-5" /></Button>
            </div>
            
            <div className="space-y-6">
                <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <User className="w-4 h-4" /> Cliente:
                    </div>
                    <span className="font-semibold">{project.client}</span>
                </div>
              
                <div className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2 text-sm font-medium">
                            <Clock className="w-4 h-4" /> Status:
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusChip(project.status)}`}>
                            {project.status}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <Calendar className="w-4 h-4" /> Data de Início:
                        </div>
                        <span>{formatDate(project.startDate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <CheckCircle className="w-4 h-4" /> Data de Entrega:
                        </div>
                        <span>{formatDate(project.endDate)}</span>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2"><FileText className="w-4 h-4"/> Descrição</h3>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                </div>
                
                <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2"><Code className="w-4 h-4"/> Tecnologias</h3>
                    <div className="flex flex-wrap gap-2">
                        {(project.technologies || []).map(tech => (
                            <span key={tech} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
                {!isReadOnly && (
                    <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                        <Button type="button" variant="ghost" onClick={onClose}>Fechar</Button>
                    </div>
                )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;