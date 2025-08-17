import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Save, Plus, Edit, Trash2 } from 'lucide-react';
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

  const handleSaveProject = async (projectData) => {
    let processedProjectData = { ...projectData };

    // Processar imagem se existir
    if (projectData.image && projectData.image instanceof File) {
      try {
        const base64Image = await convertFileToBase64(projectData.image);
        processedProjectData.image = base64Image;
      } catch (error) {
        console.error('Erro ao processar imagem:', error);
        toast({ title: "Erro", description: "Erro ao processar a imagem.", variant: "destructive" });
        return;
      }
    }

    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    let updatedProjects;
    if (editingProject) {
      updatedProjects = allProjects.map(p => p.id === editingProject.id ? { ...processedProjectData, id: editingProject.id, createdAt: editingProject.createdAt } : p);
      toast({ title: "Projeto atualizado!", description: "As alterações foram salvas." });
    } else {
      const newProject = { ...processedProjectData, id: Date.now(), createdAt: new Date().toISOString() };
      updatedProjects = [...allProjects, newProject];
      toast({ title: "Projeto criado!", description: "Novo projeto adicionado." });
    }
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    fetchProjects();
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  // Função auxiliar para converter File para base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleNewProject = () => {
    setEditingProject(null);
    setIsProjectModalOpen(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.')) {
      const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      const updatedProjects = allProjects.filter(p => p.id !== projectId);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      fetchProjects();
      toast({
        title: 'Projeto excluído!',
        description: 'O projeto foi removido com sucesso.',
      });
    }
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
              <h3 className="text-lg font-semibold">Gerenciar Projetos</h3>
            </div>
            <AnimatePresence>
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Label htmlFor={`project-toggle-${project.id}`} className="font-medium cursor-pointer">
                          {project.title}
                        </Label>
                        {project.category && (
                          <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                            {project.category}
                          </span>
                        )}
                      </div>
                      {project.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {project.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProject(project)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProject(project.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Visível:</span>
                        <Switch
                          id={`project-toggle-${project.id}`}
                          checked={project.isVisibleOnSite}
                          onCheckedChange={() => handleToggleVisibility(project.id)}
                        />
                      </div>
                    </div>
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