
import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Save, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectModal from '@/components/ProjectModal';

const SiteProjectsSettingsContent = () => {
  const [projects, setProjects] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const { toast } = useToast();

  const fetchProjects = () => {
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const projectsWithVisibility = savedProjects.map(p => ({
      ...p,
      isVisibleOnSite: p.isVisibleOnSite !== undefined ? p.isVisibleOnSite : true,
    }));
    setProjects(projectsWithVisibility);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleToggleVisibility = (projectId) => {
    setProjects(prevProjects =>
      prevProjects.map(p =>
        p.id === projectId ? { ...p, isVisibleOnSite: !p.isVisibleOnSite } : p
      )
    );
  };

  const handleSaveChanges = () => {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const updatedAllProjects = allProjects.map(p => {
      const siteProject = projects.find(sp => sp.id === p.id);
      return siteProject ? { ...p, isVisibleOnSite: siteProject.isVisibleOnSite } : p;
    });
    localStorage.setItem('projects', JSON.stringify(updatedAllProjects));
    toast({
      title: 'Sucesso!',
      description: 'Visibilidade dos projetos atualizada.',
    });
  };

  const handleSaveProject = (projectData) => {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    let updatedProjects;
    if (editingProject) {
      updatedProjects = allProjects.map(p => p.id === editingProject.id ? { ...projectData, id: editingProject.id, createdAt: editingProject.createdAt } : p);
      toast({ title: "Projeto atualizado!", description: "As alterações foram salvas." });
    } else {
      const newProject = { ...projectData, id: Date.now(), createdAt: new Date().toISOString() };
      updatedProjects = [...allProjects, newProject];
      toast({ title: "Projeto criado!", description: "Novo projeto adicionado." });
    }
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    fetchProjects();
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleNewProject = () => {
    setEditingProject(null);
    setIsProjectModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-1">Projetos do Site</h2>
            <p className="text-muted-foreground">Gerencie os projetos que são exibidos na sua landing page.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleNewProject}>
              <Plus className="mr-2 h-4 w-4" /> Criar Projeto
            </Button>
            <Button onClick={handleSaveChanges}>
              <Save className="mr-2 h-4 w-4" /> Salvar Alterações
            </Button>
          </div>
        </div>
        
        <motion.div 
          className="bg-card rounded-xl p-6 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <div className="flex items-center pb-2 border-b">
              <FolderOpen className="w-5 h-5 mr-3 text-primary" />
              <h3 className="text-lg font-semibold">Visibilidade dos Projetos</h3>
            </div>
            <AnimatePresence>
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Label htmlFor={`project-toggle-${project.id}`} className="font-medium cursor-pointer">
                      {project.title}
                    </Label>
                    <Switch
                      id={`project-toggle-${project.id}`}
                      checked={project.isVisibleOnSite}
                      onCheckedChange={() => handleToggleVisibility(project.id)}
                    />
                  </motion.div>
                ))
              ) : (
                <p className="text-muted-foreground text-center p-4">Nenhum projeto encontrado. Clique em "Criar Projeto" para adicionar um.</p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        project={editingProject}
      />
    </>
  );
};

export default SiteProjectsSettingsContent;
