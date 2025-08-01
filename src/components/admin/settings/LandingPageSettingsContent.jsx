
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GripVertical, Plus, Trash2, Edit, Eye, EyeOff, Save, Code, Star, Phone, Wrench, Globe, Smartphone, Database, Text, Image as ImageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SectionEditor from './SectionEditor';

const ItemTypes = {
  SECTION: 'section',
  SERVICE: 'service',
};

const DraggableItem = ({ id, index, moveItem, children, type }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: type,
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag, preview] = useDrag({
    type,
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  preview(drop(ref));

  return (
    <motion.div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="flex items-center gap-2 bg-card p-3 rounded-lg border" layout>
      <div ref={drag} className="cursor-move p-1">
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-grow">{children}</div>
    </motion.div>
  );
};


const LandingPageSettingsContent = () => {
  const [sections, setSections] = useState([]);
  const [isSectionEditorOpen, setIsSectionEditorOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [newSectionType, setNewSectionType] = useState('text');

  const { toast } = useToast();

  const sectionDetails = {
    hero: { name: 'Herói', icon: Star },
    projects: { name: 'Projetos', icon: Code },
    services: { name: 'Serviços', icon: Wrench },
    testimonials: { name: 'Depoimentos', icon: Star },
    contact: { name: 'Contato', icon: Phone },
    custom_text: { name: 'Texto Customizado', icon: Text },
    custom_image: { name: 'Imagem Customizada', icon: ImageIcon },
  };

  useEffect(() => {
    const savedSections = JSON.parse(localStorage.getItem('landingPageSections') || 'null');
    if (savedSections) {
      setSections(savedSections);
    } else {
      setSections([
        { id: 'hero', name: 'Herói', type: 'hero', isVisible: true, isRemovable: false, title: 'Transformamos Ideias em Soluções Digitais', subtitle: 'Especialistas em desenvolvimento web, mobile e sistemas personalizados.' },
        { id: 'projects', name: 'Projetos', type: 'projects', isVisible: true, isRemovable: false, title: 'Nossos Projetos', subtitle: 'Conheça alguns dos projetos que desenvolvemos.' },
        { id: 'services', name: 'Serviços', type: 'services', isVisible: true, isRemovable: false, title: 'Nossos Serviços', subtitle: 'Soluções completas para suas necessidades digitais.' },
        { id: 'testimonials', name: 'Depoimentos', type: 'testimonials', isVisible: true, isRemovable: false, title: 'O que nossos clientes dizem', subtitle: '' },
        { id: 'contact', name: 'Contato', type: 'contact', isVisible: true, isRemovable: false, title: 'Entre em Contato', subtitle: 'Pronto para transformar sua ideia em realidade? Vamos conversar!' },
      ]);
    }
  }, []);

  const moveSection = (dragIndex, hoverIndex) => {
    setSections(prev => {
      const newSections = [...prev];
      const [reorderedItem] = newSections.splice(dragIndex, 1);
      newSections.splice(hoverIndex, 0, reorderedItem);
      return newSections;
    });
  };

  const toggleSectionVisibility = (id) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, isVisible: !s.isVisible } : s));
  };
  
  const handleEditSection = (section) => {
    setEditingSection(section);
    setIsSectionEditorOpen(true);
  };

  const handleSaveSection = (updatedSection) => {
    setSections(prev => prev.map(s => s.id === updatedSection.id ? updatedSection : s));
    setIsSectionEditorOpen(false);
    toast({ title: 'Seção salva!', description: 'As alterações na seção foram salvas.'});
  };

  const handleAddSection = () => {
      const newSection = {
          id: `custom_${Date.now()}`,
          name: `Nova Seção ${newSectionType === 'text' ? 'de Texto' : 'de Imagem'}`,
          type: `custom_${newSectionType}`,
          isVisible: true,
          isRemovable: true,
          title: 'Título da Nova Seção',
          subtitle: 'Descreva sua nova seção aqui.',
          bgColor: '#ffffff',
          bgImage: null
      };
      setSections(prev => [...prev, newSection]);
      setIsAddSectionModalOpen(false);
  };
  
  const handleRemoveSection = (id) => {
      setSections(prev => prev.filter(s => s.id !== id));
      toast({ title: 'Seção removida.' });
  };

  const handleSaveAll = () => {
    localStorage.setItem('landingPageSections', JSON.stringify(sections));
    toast({ title: 'Sucesso!', description: 'Configurações da Landing Page salvas.' });
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Editor da Landing Page</h2>
                <p className="text-muted-foreground">Arraste para reordenar, ative ou desative seções e gerencie o conteúdo.</p>
            </div>
            <div className="flex gap-2">
                <Dialog open={isAddSectionModalOpen} onOpenChange={setIsAddSectionModalOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline"><Plus className="mr-2 h-4 w-4" /> Adicionar Seção</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Adicionar Nova Seção</DialogTitle>
                            <DialogDescription>Escolha o tipo de seção que deseja adicionar.</DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                            <Label htmlFor="section-type">Tipo de Seção</Label>
                             <Select value={newSectionType} onValueChange={setNewSectionType}>
                                <SelectTrigger id="section-type">
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="text">Seção de Texto</SelectItem>
                                    <SelectItem value="image">Seção com Imagem</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setIsAddSectionModalOpen(false)}>Cancelar</Button>
                            <Button onClick={handleAddSection}>Adicionar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Button onClick={handleSaveAll}><Save className="mr-2 h-4 w-4" /> Salvar Tudo</Button>
            </div>
        </div>
        
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Seções Atuais</h3>
            <div className="space-y-3">
                <AnimatePresence>
                    {sections.map((section, index) => (
                        <DraggableItem key={section.id} id={section.id} index={index} moveItem={moveSection} type={ItemTypes.SECTION}>
                            <div className="flex items-center gap-3">
                                {React.createElement(sectionDetails[section.type]?.icon || Star, { className: "h-5 w-5 text-primary" })}
                                <span className="font-medium">{section.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleEditSection(section)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                {section.isRemovable && (
                                     <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-500" onClick={() => handleRemoveSection(section.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                                <Switch
                                    checked={section.isVisible}
                                    onCheckedChange={() => toggleSectionVisibility(section.id)}
                                    aria-label={`Visibilidade da seção ${sectionDetails[section.id]?.name}`}
                                />
                                {section.isVisible ? <Eye className="h-5 w-5 text-green-500" /> : <EyeOff className="h-5 w-5 text-muted-foreground" />}
                            </div>
                        </DraggableItem>
                    ))}
                </AnimatePresence>
            </div>
        </div>

      </div>
      <SectionEditor 
        isOpen={isSectionEditorOpen} 
        onClose={() => setIsSectionEditorOpen(false)} 
        onSave={handleSaveSection} 
        section={editingSection} 
      />
    </DndProvider>
  );
};

export default LandingPageSettingsContent;
