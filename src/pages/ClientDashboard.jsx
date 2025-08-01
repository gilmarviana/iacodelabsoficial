import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  MessageSquare, 
  User, 
  LogOut, 
  Menu, 
  X,
  ClipboardCheck,
  Calendar,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import TasksContent from '@/components/admin/TasksContent';
import ChatContent from '@/components/admin/ChatContent';
import ClientDashboardContent from '@/components/client/ClientDashboardContent';
import ClientProfileContent from '@/components/client/ClientProfileContent';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SchedulingModal from '@/components/SchedulingModal';
import ProjectDetailModal from '@/components/ProjectDetailModal';

const ClientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('tasks');
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false);
  const [isProjectDetailModalOpen, setIsProjectDetailModalOpen] = useState(false);
  const [clientProject, setClientProject] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'client') {
      navigate('/login');
      return;
    }
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = allProjects.find(p => p.client === user.name);
    setClientProject(project);

  }, [user, navigate]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Quadro de Tarefas', icon: ClipboardCheck },
    { id: 'my-project', label: 'Meu Projeto', icon: Briefcase, action: () => setIsProjectDetailModalOpen(true) },
    { id: 'messages', label: 'Mensagens', icon: MessageSquare },
    { id: 'schedule', label: 'Agenda', icon: Calendar, action: () => setIsSchedulingModalOpen(true) },
    { id: 'profile', label: 'Perfil', icon: User }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <ClientDashboardContent />;
      case 'tasks': return <DndProvider backend={HTML5Backend}><TasksContent /></DndProvider>;
      case 'messages': return <ChatContent />;
      case 'profile': return <ClientProfileContent />;
      default: return <ClientDashboardContent />;
    }
  };

  const handleMenuClick = (item) => {
    if (item.action) {
      item.action();
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard Cliente - IA Code Labs</title>
        <meta name="description" content="Painel do cliente para acompanhar projetos e tarefas." />
      </Helmet>
      <div className="min-h-screen bg-background flex">
        <motion.div
          initial={false}
          animate={{ width: sidebarOpen ? 256 : 64 }}
          className="bg-card border-r flex flex-col transition-width duration-300"
        >
          <div className="p-4 border-b flex items-center justify-between">
            {sidebarOpen && <span className="text-xl font-bold text-primary">IA Code Labs</span>}
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="h-8 w-8">
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
          <nav className="flex-1 p-2 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === item.id ? 'bg-primary/10 text-primary' : 'hover:bg-accent'} ${!sidebarOpen ? 'justify-center' : ''}`}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
          <div className="p-2 border-t">
            <div className="p-2"><ThemeToggle /></div>
            <div className="p-2">
              {sidebarOpen ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">{user?.name?.charAt(0) || 'C'}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-sm">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">Cliente</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={logout} className="h-8 w-8 text-red-500 hover:text-red-500 hover:bg-red-500/10"><LogOut className="w-4 h-4" /></Button>
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={logout} className="w-full text-red-500 hover:text-red-500 hover:bg-red-500/10"><LogOut className="w-4 h-4" /></Button>
              )}
            </div>
          </div>
        </motion.div>
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>

        <SchedulingModal isOpen={isSchedulingModalOpen} onClose={() => setIsSchedulingModalOpen(false)} />
        <ProjectDetailModal isOpen={isProjectDetailModalOpen} onClose={() => setIsProjectDetailModalOpen(false)} project={clientProject} isReadOnly={true} />
      </div>
    </>
  );
};

export default ClientDashboard;