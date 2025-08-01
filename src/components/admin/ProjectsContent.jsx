import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectDetailModal from '@/components/ProjectDetailModal';

const ProjectsContent = ({ projects, onNewProject, onEditProject, onDeleteProject }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Projetos</h2>
            <p className="text-muted-foreground">Gerencie todos os seus projetos.</p>
          </div>
          <Button onClick={onNewProject}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        <div className="grid gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl p-6 border"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.status === 'Concluído' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Cliente: {project.client}</span>
                    <span>Categoria: {project.category}</span>
                    <span>Início: {project.startDate ? new Date(project.startDate).toLocaleDateString('pt-BR') : 'N/D'}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewProject(project)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditProject(project)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteProject(project.id)}
                    className="text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(project.technologies || []).map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ProjectDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        project={selectedProject}
      />
    </>
  );
};

export default ProjectsContent;