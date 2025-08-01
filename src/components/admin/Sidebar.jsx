import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, FolderOpen, Users, Settings, LogOut, Menu, X,
  CheckSquare, Phone, MessageSquare, DollarSign, Calendar, ChevronDown, Image as ImageIcon,
  FileImage, Brush, Lock, SlidersHorizontal, Palette, UserCog
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const allMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projetos', icon: FolderOpen },
  { id: 'tasks', label: 'Tarefas', icon: CheckSquare },
  { id: 'collaborators', label: 'Colaboradores', icon: UserCog },
  { id: 'contacts', label: 'Contatos', icon: Phone },
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'financial', label: 'Financeiro', icon: DollarSign },
  { id: 'schedule', label: 'Agenda', icon: Calendar },
  { 
    id: 'settings', 
    label: 'Configurações', 
    icon: Settings,
    submenu: [
      { id: 'settings-slider', label: 'Slider', icon: ImageIcon },
      { id: 'settings-site-projects', label: 'Projetos do Site', icon: FolderOpen },
      { id: 'settings-landing-page', label: 'Landing Page', icon: FileImage },
      { id: 'settings-auth', label: 'Autenticação', icon: Lock },
      { id: 'settings-dashboard', label: 'Dashboard', icon: Brush },
      { id: 'settings-sidebar', label: 'Sidebar', icon: SlidersHorizontal },
      { id: 'settings-colors', label: 'Cores', icon: Palette },
    ]
  }
];

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [menuItems, setMenuItems] = useState(allMenuItems);

  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem('sidebarConfig') || 'null');
    if (savedConfig) {
      const visibleItems = allMenuItems.filter(menuItem => {
        const config = savedConfig.find(c => c.id === menuItem.id);
        return config ? config.isVisible : true;
      });
      setMenuItems(visibleItems);
    }

    if (activeTab.startsWith('settings')) {
      setOpenSubmenu('settings');
    }
  }, [activeTab]);

  const handleMenuClick = (id) => {
    if (id.startsWith('settings')) {
      if (id !== 'settings') {
        setActiveTab(id);
        if (openSubmenu !== 'settings') setOpenSubmenu('settings');
      } else {
        setOpenSubmenu(openSubmenu === 'settings' ? null : 'settings');
      }
    } else {
      setActiveTab(id);
      setOpenSubmenu(null);
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: sidebarOpen ? 256 : 64 }}
      className="bg-card border-r flex flex-col transition-width duration-300"
    >
      <div className="p-4 border-b flex items-center justify-between">
        {sidebarOpen && (
          <span className="text-xl font-bold text-primary">IA Code Labs</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="h-8 w-8"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                activeTab === item.id && !item.submenu
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-accent'
              } ${!sidebarOpen ? 'justify-center' : ''}`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </div>
              {item.submenu && sidebarOpen && (
                <ChevronDown className={`w-4 h-4 transition-transform ${openSubmenu === item.id ? 'rotate-180' : ''}`} />
              )}
            </button>
            {item.submenu && openSubmenu === item.id && sidebarOpen && (
              <div className="pl-6 pt-1 space-y-1">
                {item.submenu.map(subItem => (
                  <button
                    key={subItem.id}
                    onClick={() => handleMenuClick(subItem.id)}
                    className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeTab === subItem.id
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-accent'
                    }`}
                  >
                    {subItem.icon && <subItem.icon className="w-4 h-4" />}
                    <span className={!subItem.icon ? 'pl-5' : ''}>{subItem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-2 border-t">
        <div className="p-2">
          <ThemeToggle />
        </div>
        <div className="p-2">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate text-sm">{user?.name}</p>
                <p className="text-xs text-muted-foreground">Administrador</p>
              </div>
              <Button variant="ghost" size="icon" onClick={logout} className="h-8 w-8 text-red-500 hover:text-red-500 hover:bg-red-500/10">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={logout} className="w-full text-red-500 hover:text-red-500 hover:bg-red-500/10">
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;