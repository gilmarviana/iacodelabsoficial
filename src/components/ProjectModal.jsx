import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Tag, Code, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ProjectModal = ({ isOpen, onClose, onSave, project }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client: '',
    category: '',
    status: 'Em Desenvolvimento',
    startDate: '',
    endDate: '',
    technologies: []
  });
  const [newTech, setNewTech] = useState('');
  const { toast } = useToast();

  const categories = ['Website', 'E-commerce', 'Mobile', 'Sistema', 'API', 'Dashboard'];
  const statusOptions = ['Em Desenvolvimento', 'Concluído', 'Pausado', 'Cancelado'];
  const commonTechnologies = ['React', 'Vue.js', 'Node.js', 'Python', 'PHP', 'Firebase', 'AWS', 'Docker'];

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        client: project.client || '',
        category: project.category || '',
        status: project.status || 'Em Desenvolvimento',
        startDate: project.startDate || '',
        endDate: project.endDate || '',
        technologies: project.technologies || []
      });
    } else {
      setFormData({
        title: '', description: '', client: '', category: '', status: 'Em Desenvolvimento',
        startDate: '', endDate: '', technologies: []
      });
    }
  }, [project, isOpen]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTechnology = (tech) => {
    if (tech && !formData.technologies.includes(tech)) {
      setFormData({ ...formData, technologies: [...formData.technologies, tech] });
    }
    setNewTech('');
  };

  const handleRemoveTechnology = (tech) => {
    setFormData({ ...formData, technologies: formData.technologies.filter(t => t !== tech) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.client) {
      toast({ title: "Erro", description: "Por favor, preencha os campos obrigatórios.", variant: "destructive" });
      return;
    }
    onSave(formData);
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{project ? 'Editar Projeto' : 'Novo Projeto'}</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8"><X className="w-5 h-5" /></Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título do Projeto *</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descrição *</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 bg-background border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Cliente *</label>
                  <input type="text" name="client" value={formData.client} onChange={handleInputChange} className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Categoria</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Selecione</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data de Início</label>
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data de Entrega</label>
                  <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tecnologias</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.technologies.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs flex items-center gap-1">
                      {tech}
                      <button type="button" onClick={() => handleRemoveTechnology(tech)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={newTech} onChange={e => setNewTech(e.target.value)} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology(newTech.trim()))} className="flex-1 px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Adicionar tecnologia" />
                  <Button type="button" onClick={() => handleAddTechnology(newTech.trim())}>Adicionar</Button>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                <Button type="submit">{project ? 'Atualizar' : 'Criar'} Projeto</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;