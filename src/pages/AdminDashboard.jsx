import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProjectModal from '@/components/ProjectModal';
import Sidebar from '@/components/admin/Sidebar';
import DashboardContent from '@/components/admin/DashboardContent';
import ProjectsContent from '@/components/admin/ProjectsContent';
import SliderSettingsContent from '@/components/admin/settings/SliderSettingsContent';
import SiteProjectsSettingsContent from '@/components/admin/settings/SiteProjectsSettingsContent';
import LandingPageSettingsContent from '@/components/admin/settings/LandingPageSettingsContent';
import AuthSettingsContent from '@/components/admin/settings/AuthSettingsContent';
import DashboardSettingsContent from '@/components/admin/settings/DashboardSettingsContent';
import SidebarSettingsContent from '@/components/admin/settings/SidebarSettingsContent';
import ColorsSettingsContent from '@/components/admin/settings/ColorsSettingsContent';
import TasksContent from '@/components/admin/TasksContent';
import ContactsContent from '@/components/admin/ContactsContent';
import ChatContent from '@/components/admin/ChatContent';
import FinancialContent from '@/components/admin/FinancialContent';
import ScheduleContent from '@/components/admin/ScheduleContent';
import CollaboratorsContent from '@/components/admin/CollaboratorsContent';
import PlaceholderContent from '@/components/admin/PlaceholderContent';
import { Settings } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('tasks');
  const [projects, setProjects] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      const demoProjects = [
        { id: 1, title: 'E-commerce Moderno', description: 'Plataforma completa de vendas online.', technologies: ['React', 'Node.js'], category: 'E-commerce', status: 'Concluído', client: 'Tech Solutions', startDate: '2024-01-15', endDate: '2024-03-20', createdAt: new Date().toISOString() },
        { id: 2, title: 'App de Delivery', description: 'Aplicativo mobile para delivery de comida.', technologies: ['React Native', 'Firebase'], category: 'Mobile', status: 'Em Desenvolvimento', client: 'FoodCorp', startDate: '2024-02-01', endDate: '2024-04-30', createdAt: new Date().toISOString() },
        { id: 3, title: 'GDO Fantasy Game', description: 'Plataforma de Fantasy Game para GDO.', technologies: ['React', 'Node.js'], category: 'Games', status: 'Em Desenvolvimento', client: 'Cliente Demo', startDate: '2025-01-01', endDate: '2025-12-31', createdAt: new Date().toISOString() }
      ];
      setProjects(demoProjects);
      localStorage.setItem('projects', JSON.stringify(demoProjects));
    }
  }, [user, navigate]);

  const handleSaveProject = (projectData) => {
    let updatedProjects;
    if (editingProject) {
      updatedProjects = projects.map(p => p.id === editingProject.id ? { ...projectData, id: editingProject.id, createdAt: editingProject.createdAt } : p);
      toast({ title: "Projeto atualizado!", description: "As alterações foram salvas." });
    } else {
      const newProject = { ...projectData, id: Date.now(), createdAt: new Date().toISOString() };
      updatedProjects = [...projects, newProject];
      toast({ title: "Projeto criado!", description: "Novo projeto adicionado." });
    }
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  const handleNewProject = () => {
    setEditingProject(null);
    setIsProjectModalOpen(true);
  };

  const handleDeleteProject = (projectId) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    toast({ title: "Projeto removido", description: "O projeto foi excluído." });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent projects={projects} onEditProject={handleEditProject} />;
      case 'projects':
        return <ProjectsContent projects={projects} onNewProject={handleNewProject} onEditProject={handleEditProject} onDeleteProject={handleDeleteProject} />;
      case 'tasks':
        return <DndProvider backend={HTML5Backend}><TasksContent /></DndProvider>;
      case 'collaborators':
        return <CollaboratorsContent />;
      case 'contacts':
        return <ContactsContent />;
      case 'chat':
        return <ChatContent />;
      case 'financial':
        return <FinancialContent />;
      case 'schedule':
        return <ScheduleContent />;
      case 'settings-slider':
        return <SliderSettingsContent />;
      case 'settings-site-projects':
        return <SiteProjectsSettingsContent />;
      case 'settings-landing-page':
        return <LandingPageSettingsContent />;
      case 'settings-auth':
        return <AuthSettingsContent />;
      case 'settings-dashboard':
        return <DashboardSettingsContent />;
      case 'settings-sidebar':
        return <SidebarSettingsContent />;
      case 'settings-colors':
        return <ColorsSettingsContent />;
      case 'settings':
        return <PlaceholderContent title="Configurações" description="Escolha uma opção no menu para começar." icon={Settings} />;
      default:
        return <DashboardContent projects={projects} onEditProject={handleEditProject} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard Admin - IA Code Labs</title>
        <meta name="description" content="Painel administrativo para gerenciar projetos, clientes e configurações da IA Code Labs." />
      </Helmet>

      <div className="min-h-screen bg-background flex">
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 overflow-auto h-full">
            {renderContent()}
          </div>
        </main>
        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => {
            setIsProjectModalOpen(false);
            setEditingProject(null);
          }}
          onSave={handleSaveProject}
          project={editingProject}
        />
      </div>
    </>
  );
};

export default AdminDashboard;