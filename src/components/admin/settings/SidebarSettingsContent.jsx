import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { SlidersHorizontal, Save, LayoutDashboard, FolderOpen, CheckSquare, Phone, MessageSquare, DollarSign, Calendar, Settings as SettingsIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, isVisible: true },
  { id: 'projects', label: 'Projetos', icon: FolderOpen, isVisible: true },
  { id: 'tasks', label: 'Tarefas', icon: CheckSquare, isVisible: true },
  { id: 'contacts', label: 'Contatos', icon: Phone, isVisible: true },
  { id: 'chat', label: 'Chat', icon: MessageSquare, isVisible: true },
  { id: 'financial', label: 'Financeiro', icon: DollarSign, isVisible: true },
  { id: 'schedule', label: 'Agenda', icon: Calendar, isVisible: true },
  { id: 'settings', label: 'Configurações', icon: SettingsIcon, isVisible: true },
];

const SidebarSettingsContent = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const { toast } = useToast();

  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem('sidebarConfig') || 'null');
    if (savedConfig) {
      const updatedMenuItems = initialMenuItems.map(initialItem => {
        const savedItem = savedConfig.find(saved => saved.id === initialItem.id);
        return savedItem ? { ...initialItem, isVisible: savedItem.isVisible } : initialItem;
      });
      setMenuItems(updatedMenuItems);
    }
  }, []);

  const handleToggleVisibility = (itemId) => {
    setMenuItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, isVisible: !item.isVisible } : item
      )
    );
  };

  const handleSaveChanges = () => {
    localStorage.setItem('sidebarConfig', JSON.stringify(menuItems));
    toast({
      title: 'Sucesso!',
      description: 'Configurações da sidebar salvas. Atualize a página para ver as mudanças.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-1">Sidebar</h2>
          <p className="text-muted-foreground">Personalize os itens do menu lateral.</p>
        </div>
        <Button onClick={handleSaveChanges}>
          <Save className="mr-2 h-4 w-4" /> Salvar Alterações
        </Button>
      </div>

      <motion.div 
        className="bg-card rounded-xl p-6 border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-4">
          <div className="flex items-center pb-2 border-b">
            <SlidersHorizontal className="w-5 h-5 mr-3 text-primary" />
            <h3 className="text-lg font-semibold">Visibilidade dos Menus</h3>
          </div>
          <AnimatePresence>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <Label htmlFor={`menu-toggle-${item.id}`} className="font-medium cursor-pointer">
                    {item.label}
                  </Label>
                </div>
                <Switch
                  id={`menu-toggle-${item.id}`}
                  checked={item.isVisible}
                  onCheckedChange={() => handleToggleVisibility(item.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default SidebarSettingsContent;