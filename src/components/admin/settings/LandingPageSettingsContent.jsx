
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GripVertical, Plus, Trash2, Edit, Eye, EyeOff, Save, Code, Star, Phone, Wrench, Globe, Smartphone, Database, Text, Image as ImageIcon, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SectionEditor from './SectionEditor';
import ColorPicker from '@/components/ColorPicker';

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


const defaultFooterConfig = {
  logoUrl: '',
  logoText: 'Devop',
  logoHeight: 40,
  logoWidth: 40,
  tagline: 'Innovate, Build, Scale – Your Vision, Our Code',
  buttonText: 'Contact Us',
  buttonColor: '#00bcd4',
  columns: [
    { 
      title: 'Home', 
      links: [
        { label: 'Homepage', url: '#' },
        { label: 'About Us', url: '#' },
        { label: 'Service', url: '#' },
        { label: 'Blog', url: '#' },
        { label: 'Contact Us', url: '#' }
      ] 
    },
    { 
      title: 'About Us', 
      links: [
        { label: 'Homepage', url: '#' },
        { label: 'About Us', url: '#' },
        { label: 'Service', url: '#' },
        { label: 'Blog', url: '#' },
        { label: 'Contact Us', url: '#' }
      ] 
    },
    { 
      title: 'Service', 
      links: [
        { label: 'Homepage', url: '#' },
        { label: 'About Us', url: '#' },
        { label: 'Service', url: '#' },
        { label: 'Blog', url: '#' },
        { label: 'Contact Us', url: '#' }
      ] 
    }
  ],
  bgColor: '#1a1a1a',
  textColor: '#ffffff',
  policyLinks: [
    { label: 'Privacy Policy', url: '#' },
    { label: 'Terms of Service', url: '#' }
  ],
  socialLinks: [
    { icon: 'fab fa-whatsapp', url: '#' },
    { icon: 'fab fa-instagram', url: '#' },
    { icon: 'fab fa-linkedin', url: '#' },
    { icon: 'fab fa-twitter', url: '#' }
  ],
  copyrightText: 'Copyright © 2025 Devop - App Development Software House Agency Elementor Template Kit',
  copyrightBgColor: '#111',
  copyrightTextColor: '#fff',
};

const LandingPageSettingsContent = () => {
  const [footerConfig, setFooterConfig] = useState(() => {
    const saved = localStorage.getItem('landingPageFooterConfig');
    return saved ? JSON.parse(saved) : defaultFooterConfig;
  });
  const handleFooterConfigChange = (field, value) => {
    setFooterConfig(prev => {
      const updated = { ...prev, [field]: value };
      localStorage.setItem('landingPageFooterConfig', JSON.stringify(updated));
      return updated;
    });
  };
  const handleFooterLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleFooterConfigChange('logoUrl', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFooterColumnChange = (colIdx, field, value) => {
    setFooterConfig(prev => {
      const columns = prev.columns.map((col, idx) => idx === colIdx ? { ...col, [field]: value } : col);
      const updated = { ...prev, columns };
      localStorage.setItem('landingPageFooterConfig', JSON.stringify(updated));
      return updated;
    });
  };
  const handleFooterLinkChange = (colIdx, linkIdx, field, value) => {
    setFooterConfig(prev => {
      const columns = prev.columns.map((col, idx) => {
        if (idx !== colIdx) return col;
        const links = col.links.map((l, lidx) => lidx === linkIdx ? { ...l, [field]: value } : l);
        return { ...col, links };
      });
      const updated = { ...prev, columns };
      localStorage.setItem('landingPageFooterConfig', JSON.stringify(updated));
      return updated;
    });
  };
  const handleFooterPolicyLinkChange = (idx, field, value) => {
    setFooterConfig(prev => {
      const policyLinks = prev.policyLinks.map((l, i) => i === idx ? { ...l, [field]: value } : l);
      const updated = { ...prev, policyLinks };
      localStorage.setItem('landingPageFooterConfig', JSON.stringify(updated));
      return updated;
    });
  };
  const handleFooterSocialLinkChange = (idx, field, value) => {
    setFooterConfig(prev => {
      const socialLinks = prev.socialLinks ? prev.socialLinks.map((l, i) => i === idx ? { ...l, [field]: value } : l) : [];
      const updated = { ...prev, socialLinks };
      localStorage.setItem('landingPageFooterConfig', JSON.stringify(updated));
      return updated;
    });
  };
  
  const handleAddFooterLink = (colIdx) => {
    setFooterConfig(prev => {
      const columns = prev.columns.map((col, idx) => {
        if (idx === colIdx) {
          return { ...col, links: [...col.links, { label: 'Novo Link', url: '' }] };
        }
        return col;
      });
      const updated = { ...prev, columns };
      localStorage.setItem('landingPageFooterConfig', JSON.stringify(updated));
      return updated;
    });
  };
  
  const handleRemoveFooterLink = (colIdx, linkIdx) => {
    setFooterConfig(prev => {
      const columns = prev.columns.map((col, idx) => {
        if (idx === colIdx) {
          return { ...col, links: col.links.filter((_, lidx) => lidx !== linkIdx) };
        }
        return col;
      });
      const updated = { ...prev, columns };
      localStorage.setItem('landingPageFooterConfig', JSON.stringify(updated));
      return updated;
    });
  };
  
  const handleRemoveFooterColumn = (colIdx) => {
    setFooterConfig(prev => {
      const columns = prev.columns.filter((_, idx) => idx !== colIdx);
      const updated = { ...prev, columns };
      localStorage.setItem('landingPageFooterConfig', JSON.stringify(updated));
      return updated;
    });
  };
  
  const handleAddPolicyLink = () => {
    setFooterConfig(prev => {
      const policyLinks = [...(prev.policyLinks || []), { label: 'Nova Política', url: '' }];
      const updated = { ...prev, policyLinks };
      localStorage.setItem('landingPageFooterConfig', JSON.stringify(updated));
      return updated;
    });
  };
  
  const handleRemovePolicyLink = (idx) => {
    setFooterConfig(prev => {
      const policyLinks = (prev.policyLinks || []).filter((_, i) => i !== idx);
      const updated = { ...prev, policyLinks };
      localStorage.setItem('landingPageFooterConfig', JSON.stringify(updated));
      return updated;
    });
  };
  
  const handleAddSocialLink = () => {
    setFooterConfig(prev => {
      const socialLinks = [...(prev.socialLinks || []), { icon: 'fab fa-link', url: '' }];
      const updated = { ...prev, socialLinks };
      localStorage.setItem('landingPageFooterConfig', JSON.stringify(updated));
      return updated;
    });
  };
  
  const handleRemoveSocialLink = (idx) => {
    setFooterConfig(prev => {
      const socialLinks = (prev.socialLinks || []).filter((_, i) => i !== idx);
      const updated = { ...prev, socialLinks };
      localStorage.setItem('landingPageFooterConfig', JSON.stringify(updated));
      return updated;
    });
  };
  const [sections, setSections] = useState([]);
  const [isSectionEditorOpen, setIsSectionEditorOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [newSectionType, setNewSectionType] = useState('text');
  const [headerConfig, setHeaderConfig] = useState({
    isVisible: true,
    menu: [
      { label: 'Início', href: '#', isVisible: true, children: [] },
      { label: 'Projetos', href: '#projects', isVisible: true, children: [] },
      { label: 'Serviços', href: '#services', isVisible: true, children: [] },
      { label: 'Contato', href: '#contact', isVisible: true, children: [] },
    ],
    menuPosition: 'center',
    menuBgColor: 'rgba(255,255,255,0)',
    menuTextColor: '#222222',
    menuHoverColor: '#3b82f6',
    menuPadding: 'px-4 py-2',
    menuRadius: 'rounded-lg',
    bgColor: '#ffffff',
    logoUrl: '',
    logoText: 'IA Code Labs',
    loginButtonText: 'Login',
  });
  const [headerCollapsed, setHeaderCollapsed] = useState(true);
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [servicesCollapsed, setServicesCollapsed] = useState(true);
  const [miscItems, setMiscItems] = useState([]);
  const [editingMisc, setEditingMisc] = useState(null);
  const [isMiscModalOpen, setIsMiscModalOpen] = useState(false);
  const [miscCollapsed, setMiscCollapsed] = useState(true);
  const [servicesTitle, setServicesTitle] = useState('Serviços');
  const [miscTitle, setMiscTitle] = useState('Diversos');

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

  const serviceIcons = { Globe, Smartphone, Database, Code, Wrench, Star, Phone, Text, ImageIcon };

  useEffect(() => {
    // Só inicializa do localStorage se sections estiver vazio
    setSections(prevSections => {
      if (prevSections.length > 0) {
        // Atualiza apenas os campos do misc, sem alterar a ordem
        return prevSections.map(s =>
          s.id === 'misc'
            ? { ...s, isRemovable: false, name: localStorage.getItem('landingPageMiscTitle') || miscTitle, title: localStorage.getItem('landingPageMiscDesc') || '' }
            : s
        );
      } else {
        const savedSections = JSON.parse(localStorage.getItem('landingPageSections') || 'null');
        const miscTitleStorage = localStorage.getItem('landingPageMiscTitle') || miscTitle;
        const miscDescStorage = localStorage.getItem('landingPageMiscDesc') || '';
        if (savedSections) {
          const updatedSections = savedSections.map(s =>
            s.id === 'misc'
              ? { ...s, isRemovable: false, name: miscTitleStorage, title: miscDescStorage }
              : s
          );
          if (!updatedSections.some(s => s.id === 'misc')) {
            updatedSections.push({ id: 'misc', name: miscTitleStorage, type: 'misc', isVisible: true, isRemovable: false, title: miscDescStorage });
          }
          return updatedSections;
        } else {
          return [
            { id: 'hero', name: 'Herói', type: 'hero', isVisible: true, isRemovable: false, title: 'Transformamos Ideias em Soluções Digitais', subtitle: 'Especialistas em desenvolvimento web, mobile e sistemas personalizados.' },
            { id: 'projects', name: 'Projetos', type: 'projects', isVisible: true, isRemovable: false, title: 'Nossos Projetos', subtitle: 'Conheça alguns dos projetos que desenvolvemos.' },
            { id: 'services', name: 'Serviços', type: 'services', isVisible: true, isRemovable: false, title: 'Nossos Serviços', subtitle: 'Soluções completas para suas necessidades digitais.' },
            { id: 'testimonials', name: 'Depoimentos', type: 'testimonials', isVisible: true, isRemovable: false, title: 'O que nossos clientes dizem', subtitle: '' },
            { id: 'contact', name: 'Contato', type: 'contact', isVisible: true, isRemovable: false, title: 'Entre em Contato', subtitle: 'Pronto para transformar sua ideia em realidade? Vamos conversar!' },
            { id: 'misc', name: miscTitleStorage, type: 'misc', isVisible: true, isRemovable: false, title: miscDescStorage },
          ];
        }
      }
    });
  }, [miscTitle]);

  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem('landingPageConfig') || 'null');
    if (savedConfig) setHeaderConfig({
      isVisible: savedConfig.isVisible ?? true,
      menu: savedConfig.menu || headerConfig.menu,
      menuPosition: savedConfig.menuPosition || 'center',
      menuBgColor: savedConfig.menuBgColor || 'rgba(255,255,255,0)',
      menuTextColor: savedConfig.menuTextColor || '#222222',
      menuHoverColor: savedConfig.menuHoverColor || '#3b82f6',
      menuPadding: savedConfig.menuPadding || 'px-4 py-2',
      menuRadius: savedConfig.menuRadius || 'rounded-lg',
      bgColor: savedConfig.bgColor || '#ffffff',
      logoUrl: savedConfig.logoUrl || '',
      logoText: savedConfig.logoText || 'IA Code Labs',
      loginButtonText: savedConfig.loginButtonText || 'Login',
    });
  }, []);

  useEffect(() => {
    setHeaderConfig(prev => ({
      ...prev,
      menu: prev.menu.map(item => ({ ...item, isVisible: item.isVisible !== false }))
    }));
  }, []);

  useEffect(() => {
    const savedServices = JSON.parse(localStorage.getItem('landingPageServices') || '[]');
    if (savedServices.length > 0) {
      setServices(savedServices);
    } else {
      setServices([
        { id: 1, icon: 'Globe', title: 'Desenvolvimento Web', description: 'Sites responsivos e aplicações web modernas.' },
        { id: 2, icon: 'Smartphone', title: 'Apps Mobile', description: 'Aplicativos nativos e híbridos para iOS e Android.' },
        { id: 3, icon: 'Database', title: 'Sistemas Personalizados', description: 'Soluções sob medida para otimizar seu negócio.' },
        { id: 4, icon: 'Code', title: 'Consultoria Tech', description: 'Orientação técnica e estratégica para seus projetos.' }
      ]);
    }
  }, []);

  useEffect(() => {
    const savedMisc = JSON.parse(localStorage.getItem('landingPageMisc') || '[]');
    setMiscItems(savedMisc);
  }, []);

  useEffect(() => {
    const savedServicesTitle = localStorage.getItem('landingPageServicesTitle');
    if (savedServicesTitle) setServicesTitle(savedServicesTitle);
    const savedMiscTitle = localStorage.getItem('landingPageMiscTitle');
    if (savedMiscTitle) setMiscTitle(savedMiscTitle);
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
    setSections(prev => prev.map(s => {
      if (s.id === updatedSection.id) {
        if (s.id === 'misc') {
          if (updatedSection.name && updatedSection.name !== miscTitle) {
            setMiscTitle(updatedSection.name);
            localStorage.setItem('landingPageMiscTitle', updatedSection.name);
          }
          if (updatedSection.title) {
            localStorage.setItem('landingPageMiscDesc', updatedSection.title);
          }
        }
        return updatedSection;
      }
      return s;
    }));
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

  const handleHeaderConfigChange = (field, value) => {
    setHeaderConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleMenuChange = (index, field, value) => {
    setHeaderConfig(prev => {
      const menu = [...prev.menu];
      menu[index][field] = value;
      return { ...prev, menu };
    });
  };

  const handleAddMenuItem = () => {
    setHeaderConfig(prev => ({ ...prev, menu: [...prev.menu, { label: '', href: '', isVisible: true, children: [] }] }));
  };

  const handleRemoveMenuItem = (index) => {
    setHeaderConfig(prev => {
      const menu = prev.menu.filter((_, i) => i !== index);
      return { ...prev, menu };
    });
  };

  const handleToggleMenuItemVisibility = (index) => {
    setHeaderConfig(prev => {
      const menu = [...prev.menu];
      menu[index].isVisible = !menu[index].isVisible;
      return { ...prev, menu };
    });
  };

  const handleMenuPositionChange = (value) => {
    setHeaderConfig(prev => ({ ...prev, menuPosition: value }));
  };
  const handleAddSubMenuItem = (parentIdx) => {
    setHeaderConfig(prev => {
      const menu = [...prev.menu];
      menu[parentIdx].children = menu[parentIdx].children || [];
      menu[parentIdx].children.push({ label: '', href: '', isVisible: true });
      return { ...prev, menu };
    });
  };
  const handleSubMenuChange = (parentIdx, childIdx, field, value) => {
    setHeaderConfig(prev => {
      const menu = [...prev.menu];
      menu[parentIdx].children[childIdx][field] = value;
      return { ...prev, menu };
    });
  };
  const handleRemoveSubMenuItem = (parentIdx, childIdx) => {
    setHeaderConfig(prev => {
      const menu = [...prev.menu];
      menu[parentIdx].children.splice(childIdx, 1);
      return { ...prev, menu };
    });
  };
  const handleToggleSubMenuItemVisibility = (parentIdx, childIdx) => {
    setHeaderConfig(prev => {
      const menu = [...prev.menu];
      menu[parentIdx].children[childIdx].isVisible = !menu[parentIdx].children[childIdx].isVisible;
      return { ...prev, menu };
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderConfig(prev => ({ ...prev, logoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = () => {
    // Sempre salva a ordem atual do state sections
    localStorage.setItem('landingPageSections', JSON.stringify(sections));
    localStorage.setItem('landingPageConfig', JSON.stringify(headerConfig));
    toast({ title: 'Sucesso!', description: 'Configurações da Landing Page salvas.' });
    window.dispatchEvent(new Event('storage'));
  };

  const handleMenuBgColorChange = (color) => setHeaderConfig(prev => ({ ...prev, menuBgColor: color }));
  const handleMenuTextColorChange = (color) => setHeaderConfig(prev => ({ ...prev, menuTextColor: color }));
  const handleMenuHoverColorChange = (color) => setHeaderConfig(prev => ({ ...prev, menuHoverColor: color }));
  const handleMenuPaddingChange = (e) => setHeaderConfig(prev => ({ ...prev, menuPadding: e.target.value }));
  const handleMenuRadiusChange = (e) => setHeaderConfig(prev => ({ ...prev, menuRadius: e.target.value }));

  const saveServicesToStorage = (updated) => {
    setServices(updated);
    localStorage.setItem('landingPageServices', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddService = () => {
    setEditingService({ id: Date.now(), icon: 'Globe', title: '', description: '' });
    setIsServiceModalOpen(true);
  };
  const handleEditService = (service) => {
    setEditingService(service);
    setIsServiceModalOpen(true);
  };
  const handleDeleteService = (id) => {
    const updated = services.filter(s => s.id !== id);
    saveServicesToStorage(updated);
  };
  const handleSaveService = (service) => {
    let updated;
    if (services.some(s => s.id === service.id)) {
      updated = services.map(s => s.id === service.id ? service : s);
    } else {
      updated = [...services, service];
    }
    saveServicesToStorage(updated);
    setIsServiceModalOpen(false);
  };
  const moveService = (dragIndex, hoverIndex) => {
    const updated = [...services];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, removed);
    saveServicesToStorage(updated);
  };

  const saveMiscToStorage = (updated) => {
    setMiscItems(updated);
    localStorage.setItem('landingPageMisc', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };
  const handleAddMisc = () => {
    setEditingMisc({ id: Date.now(), icon: 'Star', title: '', description: '' });
    setIsMiscModalOpen(true);
  };
  const handleEditMisc = (item) => {
    setEditingMisc(item);
    setIsMiscModalOpen(true);
  };
  const handleDeleteMisc = (id) => {
    const updated = miscItems.filter(s => s.id !== id);
    saveMiscToStorage(updated);
  };
  const handleSaveMisc = (item) => {
    let updated;
    if (miscItems.some(s => s.id === item.id)) {
      updated = miscItems.map(s => s.id === item.id ? item : s);
    } else {
      updated = [...miscItems, item];
    }
    saveMiscToStorage(updated);
    setIsMiscModalOpen(false);
  };
  const moveMisc = (dragIndex, hoverIndex) => {
    const updated = [...miscItems];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, removed);
    saveMiscToStorage(updated);
  };

  const saveServicesTitle = (title) => {
    setServicesTitle(title);
    localStorage.setItem('landingPageServicesTitle', title);
    window.dispatchEvent(new Event('storage'));
  };
  const saveMiscTitle = (title) => {
    setMiscTitle(title);
    localStorage.setItem('landingPageMiscTitle', title);
    window.dispatchEvent(new Event('storage'));
  };

  // Lista de ícones Font Awesome gratuitos para seleção visual
  const faFreeIcons = [
    { class: 'fa-solid fa-house', label: 'Casa' },
    { class: 'fa-solid fa-star', label: 'Estrela' },
    { class: 'fa-solid fa-user', label: 'Usuário' },
    { class: 'fa-solid fa-gear', label: 'Engrenagem' },
    { class: 'fa-solid fa-phone', label: 'Telefone' },
    { class: 'fa-solid fa-envelope', label: 'Envelope' },
    { class: 'fa-solid fa-code', label: 'Código' },
    { class: 'fa-solid fa-globe', label: 'Globo' },
    { class: 'fa-solid fa-database', label: 'Banco de Dados' },
    { class: 'fa-solid fa-mobile', label: 'Celular' },
    { class: 'fa-regular fa-star', label: 'Estrela (Regular)' },
    { class: 'fa-regular fa-user', label: 'Usuário (Regular)' },
    { class: 'fa-brands fa-github', label: 'GitHub' },
    { class: 'fa-brands fa-linkedin', label: 'LinkedIn' },
    { class: 'fa-brands fa-facebook', label: 'Facebook' },
    { class: 'fa-brands fa-instagram', label: 'Instagram' },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-8">
        {/* FOOTER EDITOR (layout compacto como na imagem) */}
        <div className="bg-card p-6 rounded-xl border space-y-4">
          <h3 className="text-xl font-semibold mb-4">Rodapé da Landing Page</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Bloco: Logo do rodapé */}
            <div className="space-y-3 bg-muted/40 border rounded-lg p-4">
              <Label className="font-semibold">Logo do Rodapé (imagem)</Label>
              {footerConfig.logoUrl && <img src={footerConfig.logoUrl} alt="Logo" className="h-16 mb-2" style={{ maxWidth: 120 }} />}
              <input type="file" accept="image/*" onChange={handleFooterLogoUpload} className="text-sm" />
              <Label className="mt-3">Texto da Logo</Label>
              <input type="text" className="input input-bordered w-full text-sm" value={footerConfig.logoText} onChange={e => handleFooterConfigChange('logoText', e.target.value)} />
              <Label className="mt-3">Altura da Logo (px)</Label>
              <input type="number" className="input input-bordered w-full text-sm" value={footerConfig.logoHeight} onChange={e => handleFooterConfigChange('logoHeight', Number(e.target.value))} />
              <Label className="mt-3">Largura da Logo (px)</Label>
              <input type="number" className="input input-bordered w-full text-sm" value={footerConfig.logoWidth} onChange={e => handleFooterConfigChange('logoWidth', Number(e.target.value))} />
            </div>
            
            {/* Bloco: Colunas do rodapé */}
            <div className="space-y-3 bg-muted/40 border rounded-lg p-4">
              <Label className="font-semibold">Colunas do Rodapé</Label>
              {footerConfig.columns.map((col, cidx) => (
                <div key={cidx} className="mb-3 border border-muted rounded-lg p-3 bg-background/50">
                  <div className="flex gap-1 mb-2">
                    <input type="text" className="input input-bordered flex-1 font-bold text-sm" value={col.title} onChange={e => handleFooterColumnChange(cidx, 'title', e.target.value)} placeholder="Título da Coluna" />
                    <Button size="sm" variant="destructive" onClick={() => handleRemoveFooterColumn(cidx)} title="Remover Coluna">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  {col.links.map((link, lidx) => (
                    <div key={lidx} className="flex gap-1 mb-1">
                      <input type="text" className="input input-bordered flex-1 text-xs" value={link.label} onChange={e => handleFooterLinkChange(cidx, lidx, 'label', e.target.value)} placeholder="Texto" />
                      <input type="text" className="input input-bordered flex-1 text-xs" value={link.url} onChange={e => handleFooterLinkChange(cidx, lidx, 'url', e.target.value)} placeholder="URL" />
                      <Button size="sm" variant="ghost" onClick={() => handleRemoveFooterLink(cidx, lidx)} title="Remover Link">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" className="w-full mt-2" onClick={() => handleAddFooterLink(cidx)}>
                    <Plus className="w-3 h-3 mr-1" /> Adicionar Link
                  </Button>
                </div>
              ))}
              <Button size="sm" variant="outline" className="w-full" onClick={() => {
                setFooterConfig(prev => {
                  const columns = [
                    ...prev.columns,
                    { title: `Nova Coluna ${prev.columns.length + 1}`, links: [{ label: 'Novo Link', url: '' }] }
                  ];
                  const updated = { ...prev, columns };
                  localStorage.setItem('landingPageFooterConfig', JSON.stringify(updated));
                  return updated;
                });
              }}>
                <Plus className="w-4 h-4 mr-1" /> Nova Coluna
              </Button>
            </div>
            
            {/* Bloco: Cores e Links de Política */}
            <div className="space-y-3 bg-muted/40 border rounded-lg p-4">
              <Label className="font-semibold">Cor de Fundo do Rodapé</Label>
              <ColorPicker value={footerConfig.bgColor} onChange={color => handleFooterConfigChange('bgColor', color)} />
              <Label className="mt-3">Cor do Texto do Rodapé</Label>
              <ColorPicker value={footerConfig.textColor} onChange={color => handleFooterConfigChange('textColor', color)} />
              <Label className="mt-3">Links de Política</Label>
              {footerConfig.policyLinks && footerConfig.policyLinks.map((link, idx) => (
                <div key={idx} className="flex gap-1 mb-1">
                  <input type="text" className="input input-bordered flex-1 text-xs" value={link.label} onChange={e => handleFooterPolicyLinkChange(idx, 'label', e.target.value)} placeholder="Texto" />
                  <input type="text" className="input input-bordered flex-1 text-xs" value={link.url} onChange={e => handleFooterPolicyLinkChange(idx, 'url', e.target.value)} placeholder="URL" />
                  <Button size="sm" variant="ghost" onClick={() => handleRemovePolicyLink(idx)} title="Remover Link de Política">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <Button size="sm" variant="outline" className="w-full" onClick={handleAddPolicyLink}>
                <Plus className="w-3 h-3 mr-1" /> Adicionar Link de Política
              </Button>
            </div>
            
            {/* Bloco: Copyright */}
            <div className="space-y-3 bg-muted/40 border rounded-lg p-4">
              <Label className="font-semibold">Texto do Copyright</Label>
              <textarea className="input input-bordered w-full text-sm h-20 resize-none" value={footerConfig.copyrightText} onChange={e => handleFooterConfigChange('copyrightText', e.target.value)} />
              <Label className="mt-3">Cor de Fundo do Copyright</Label>
              <ColorPicker value={footerConfig.copyrightBgColor} onChange={color => handleFooterConfigChange('copyrightBgColor', color)} />
              <Label className="mt-3">Cor do Texto do Copyright</Label>
              <ColorPicker value={footerConfig.copyrightTextColor} onChange={color => handleFooterConfigChange('copyrightTextColor', color)} />
            </div>
          </div>
          
          {/* Linha adicional para novos campos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-4 border-t border-muted">
            {/* Bloco: Tagline e Botão */}
            <div className="space-y-3 bg-muted/40 border rounded-lg p-4">
              <Label className="font-semibold">Tagline/Slogan</Label>
              <textarea className="input input-bordered w-full text-sm h-16 resize-none" value={footerConfig.tagline || ''} onChange={e => handleFooterConfigChange('tagline', e.target.value)} placeholder="Innovate, Build, Scale – Your Vision, Our Code" />
              <Label className="mt-3">Texto do Botão</Label>
              <input type="text" className="input input-bordered w-full text-sm" value={footerConfig.buttonText || ''} onChange={e => handleFooterConfigChange('buttonText', e.target.value)} placeholder="Contact Us" />
              <Label className="mt-3">Cor do Botão</Label>
              <ColorPicker value={footerConfig.buttonColor || '#00bcd4'} onChange={color => handleFooterConfigChange('buttonColor', color)} />
            </div>
            
            {/* Bloco: Redes Sociais */}
            <div className="space-y-3 bg-muted/40 border rounded-lg p-4">
              <Label className="font-semibold">Redes Sociais</Label>
              {footerConfig.socialLinks && footerConfig.socialLinks.map((social, idx) => (
                <div key={idx} className="flex flex-col gap-1 mb-2 p-2 border rounded bg-background/50">
                  <div className="flex gap-1 items-center">
                    <input type="text" className="input input-bordered flex-1 text-xs" value={social.icon || ''} onChange={e => handleFooterSocialLinkChange(idx, 'icon', e.target.value)} placeholder="fab fa-facebook" />
                    <input type="text" className="input input-bordered flex-1 text-xs" value={social.url || ''} onChange={e => handleFooterSocialLinkChange(idx, 'url', e.target.value)} placeholder="URL" />
                    <Button size="sm" variant="ghost" onClick={() => handleRemoveSocialLink(idx)} title="Remover Rede Social">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex gap-2 items-center mt-1">
                    <span className="text-xs text-muted-foreground">ou imagem personalizada:</span>
                    <input type="file" accept="image/*,.svg" className="text-xs" onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => handleFooterSocialLinkChange(idx, 'customIcon', reader.result);
                        reader.readAsDataURL(file);
                      }
                    }} />
                    {social.customIcon && (
                      <>
                        <img src={social.customIcon} alt="Custom Icon" className="w-8 h-8 inline-block border rounded ml-2" />
                        <Button size="icon" variant="ghost" type="button" onClick={() => handleFooterSocialLinkChange(idx, 'customIcon', undefined)}><X className="w-3 h-3" /></Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
              <Button size="sm" variant="outline" className="w-full" onClick={handleAddSocialLink}>
                <Plus className="w-4 h-4 mr-1" /> Nova Rede Social
              </Button>
            </div>
          </div>
        </div>
        {/* HEADER EDITOR */}
        <div className="bg-card p-6 rounded-xl border space-y-4">
          <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => setHeaderCollapsed(v => !v)}>
            <h3 className="text-xl font-semibold mb-2">Header da Landing Page</h3>
            <Button variant="ghost" size="icon">{headerCollapsed ? '+' : '-'}</Button>
          </div>
          {!headerCollapsed && (
            <>
              <div className="flex items-center gap-4 mb-2">
                <Switch checked={headerConfig.isVisible} onCheckedChange={v => handleHeaderConfigChange('isVisible', v)} />
                <span>{headerConfig.isVisible ? 'Header visível' : 'Header oculto'}</span>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Bloco: Cor de fundo do header */}
                <div className="flex-1 space-y-3 bg-muted/40 border rounded-lg p-4">
                  <Label>Cor de Fundo do Header</Label>
                  <ColorPicker value={headerConfig.bgColor} onChange={color => handleHeaderConfigChange('bgColor', color)} />
                </div>
                {/* Bloco: Logo */}
                <div className="flex-1 space-y-3 bg-muted/40 border rounded-lg p-4">
                  <Label>Logo (imagem)</Label>
                  {headerConfig.logoUrl && <img src={headerConfig.logoUrl} alt="Logo" className="h-12 mb-2" />}
                  <input type="file" accept="image/*" onChange={handleLogoUpload} />
                  <Label className="mt-4">Texto da Logo</Label>
                  <input type="text" className="input input-bordered w-full" value={headerConfig.logoText} onChange={e => handleHeaderConfigChange('logoText', e.target.value)} />
                  <Label className="mt-4">Texto do Botão Login</Label>
                  <input type="text" className="input input-bordered w-full" value={headerConfig.loginButtonText} onChange={e => handleHeaderConfigChange('loginButtonText', e.target.value)} />
                </div>
                {/* Bloco: Menu */}
                <div className="flex-1 space-y-3 bg-muted/40 border rounded-lg p-4">
                  <Label>Menu</Label>
                  <div className="mt-2" />
                  <Label>Posição do Menu</Label>
                  <Select value={headerConfig.menuPosition} onValueChange={handleMenuPositionChange}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Esquerda</SelectItem>
                      <SelectItem value="center">Centralizado</SelectItem>
                      <SelectItem value="right">Direita</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="mt-4" />
                  <Label>Cor de Fundo do Menu</Label>
                  <ColorPicker value={headerConfig.menuBgColor} onChange={handleMenuBgColorChange} />
                  <div className="mt-4" />
                  <Label>Cor do Texto do Menu</Label>
                  <ColorPicker value={headerConfig.menuTextColor} onChange={handleMenuTextColorChange} />
                  <div className="mt-4" />
                  <Label>Padding do Menu</Label>
                  <input type="text" className="input input-bordered w-full" value={headerConfig.menuPadding} onChange={handleMenuPaddingChange} placeholder="px-4 py-2" />
                  <div className="mt-4" />
                  <Label>Cor do Hover do Menu</Label>
                  <ColorPicker value={headerConfig.menuHoverColor} onChange={handleMenuHoverColorChange} />
                  <div className="mt-4" />
                  <Label>Radius do Menu (px)</Label>
                  <input type="text" className="input input-bordered w-full" value={headerConfig.menuRadius} onChange={handleMenuRadiusChange} placeholder="8px" />
                  {headerConfig.menu.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1 mb-2">
                      <div className="flex gap-2 items-center">
                        <input type="text" className="input input-bordered" placeholder="Texto" value={item.label} onChange={e => handleMenuChange(idx, 'label', e.target.value)} />
                        <input type="text" className="input input-bordered" placeholder="Link" value={item.href} onChange={e => handleMenuChange(idx, 'href', e.target.value)} />
                        <Button size="icon" variant="ghost" onClick={() => handleToggleMenuItemVisibility(idx)}>
                          {item.isVisible !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleRemoveMenuItem(idx)} disabled={headerConfig.menu.length <= 1}><Trash2 className="w-4 h-4" /></Button>
                        <Button size="icon" variant="outline" onClick={() => handleAddSubMenuItem(idx)} title="Adicionar Submenu">+</Button>
                      </div>
                      {item.children && item.children.length > 0 && (
                        <div className="ml-8 flex flex-col gap-1">
                          {item.children.map((child, cidx) => (
                            <div key={cidx} className="flex gap-2 items-center">
                              <input type="text" className="input input-bordered" placeholder="Submenu texto" value={child.label} onChange={e => handleSubMenuChange(idx, cidx, 'label', e.target.value)} />
                              <input type="text" className="input input-bordered" placeholder="Submenu link" value={child.href} onChange={e => handleSubMenuChange(idx, cidx, 'href', e.target.value)} />
                              <Button size="icon" variant="ghost" onClick={() => handleToggleSubMenuItemVisibility(idx, cidx)}>
                                {child.isVisible !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                              </Button>
                              <Button size="icon" variant="ghost" onClick={() => handleRemoveSubMenuItem(idx, cidx)}><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <Button size="sm" variant="outline" onClick={handleAddMenuItem}><Plus className="w-4 h-4 mr-1" /> Adicionar Item</Button>
                </div>
              </div>
            </>
          )}
        </div>
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
        
        {/* SEÇÕES ATUAIS */}
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
                    // ...existing code...
                </AnimatePresence>
            </div>
        </div>

        {/* PAINEL DE SERVIÇOS */}
        <div className="bg-card p-6 rounded-xl border space-y-4">
          <div className="flex items-center justify-between mb-2 cursor-pointer select-none" onClick={() => setServicesCollapsed(v => !v)}>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold">Serviços</h3>
              <input type="text" className="input input-bordered w-full max-w-xs" value={servicesTitle} onChange={e => saveServicesTitle(e.target.value)} placeholder="Título da Seção" />
            </div>
            <Button onClick={handleAddService} variant="outline"><Plus className="w-4 h-4 mr-1" />Adicionar Serviço</Button>
          </div>
          {!servicesCollapsed && (
            <>
              <div className="space-y-2">
                {services.map((service, idx) => (
                  <div key={service.id} className="flex items-center gap-2 bg-muted/40 border rounded-lg p-3">
                    <span className="cursor-move"><GripVertical className="w-4 h-4 text-muted-foreground" /></span>
                    <span className="w-8 h-8 flex items-center justify-center bg-muted rounded">
                      {service.customIcon
                        ? <img src={service.customIcon} alt="Custom Icon" className="w-6 h-6 object-contain" />
                        : service.fontAwesomeIcon
                          ? <i className={`w-6 h-6 text-xl ${service.fontAwesomeIcon}`} style={{ display: 'inline-block' }}></i>
                          : React.createElement(serviceIcons[service.icon] || Globe, { className: 'w-6 h-6' })}
                    </span>
                    <div className="flex-1">
                      <div className="font-bold">{service.title}</div>
                      <div className="text-xs text-muted-foreground">{service.description}</div>
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => handleEditService(service)}><Edit className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDeleteService(service.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>
              {/* Modal de edição de serviço */}
              <Dialog open={isServiceModalOpen} onOpenChange={setIsServiceModalOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingService && editingService.id ? 'Editar Serviço' : 'Novo Serviço'}</DialogTitle>
                  </DialogHeader>
                  {editingService && (
                    <form onSubmit={e => { e.preventDefault(); handleSaveService(editingService); }} className="space-y-4">
                      <div>
                        <Label>Ícone</Label>
                        <div className="flex items-center gap-2">
                          <Select value={editingService.icon} onValueChange={icon => setEditingService(prev => ({ ...prev, icon, customIcon: undefined }))}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Globe">Globe</SelectItem>
                              <SelectItem value="Smartphone">Smartphone</SelectItem>
                              <SelectItem value="Database">Database</SelectItem>
                              <SelectItem value="Code">Code</SelectItem>
                              <SelectItem value="Wrench">Wrench</SelectItem>
                              <SelectItem value="Star">Star</SelectItem>
                              <SelectItem value="Phone">Phone</SelectItem>
                              <SelectItem value="Text">Text</SelectItem>
                              <SelectItem value="ImageIcon">ImageIcon</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-xs text-muted-foreground">ou</span>
                          <input type="file" accept="image/*,.svg" style={{ maxWidth: 120 }} onChange={e => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => setEditingService(prev => ({ ...prev, customIcon: reader.result }));
                              reader.readAsDataURL(file);
                            }
                          }} />
                          {editingService.customIcon && (
                            <>
                              <img src={editingService.customIcon} alt="Custom Icon" className="w-8 h-8 inline-block border rounded ml-2" />
                              <Button size="icon" variant="ghost" type="button" onClick={() => setEditingService(prev => ({ ...prev, customIcon: undefined }))}><Trash2 className="w-4 h-4" /></Button>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label>Título</Label>
                        <input type="text" className="input input-bordered w-full" value={editingService.title} onChange={e => setEditingService(prev => ({ ...prev, title: e.target.value }))} />
                      </div>
                      <div>
                        <Label>Descrição</Label>
                        <textarea className="input input-bordered w-full" value={editingService.description} onChange={e => setEditingService(prev => ({ ...prev, description: e.target.value }))} />
                      </div>
                      <div>
                        <Label>Ícone do Font Awesome (opcional)</Label>
                        <input type="text" className="input input-bordered w-full" value={editingService.fontAwesomeIcon || ''} onChange={e => setEditingService(prev => ({ ...prev, fontAwesomeIcon: e.target.value }))} placeholder="fa-solid fa-star" />
                        <span className="text-xs text-muted-foreground">Exemplo: fa-solid fa-star</span>
                        {/* Aviso para Pro */}
                        {editingService.fontAwesomeIcon && /(fa-light|fa-thin|fa-duotone|fa-sharp)/.test(editingService.fontAwesomeIcon) && (
                          <div className="text-xs text-red-500 mt-1">Este ícone requer Font Awesome Pro. Só funcionará se o Font Awesome Pro estiver carregado no projeto.</div>
                        )}
                        {/* Grade visual de ícones */}
                        <div className="grid grid-cols-8 gap-2 mt-2">
                          {faFreeIcons.map(icon => (
                            <button
                              key={icon.class}
                              type="button"
                              className={`flex flex-col items-center justify-center p-1 border rounded hover:bg-primary/10 ${editingService.fontAwesomeIcon === icon.class ? 'border-primary' : 'border-muted'}`}
                              onClick={() => setEditingService(prev => ({ ...prev, fontAwesomeIcon: icon.class }))}
                              title={icon.label}
                            >
                              <i className={`${icon.class} text-xl`} style={{ display: 'inline-block' }}></i>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label>Pré-visualização</Label>
                        <div className="flex items-center gap-4 bg-muted/40 border rounded-lg p-4 mt-2">
                          <span className="w-12 h-12 flex items-center justify-center bg-muted rounded-full text-2xl">
                            {editingService.customIcon
                              ? <img src={editingService.customIcon} alt="Custom Icon" className="w-8 h-8 object-contain" />
                              : editingService.fontAwesomeIcon
                                ? <i className={`w-8 h-8 text-2xl ${editingService.fontAwesomeIcon}`} style={{ display: 'inline-block' }}></i>
                                : React.createElement(serviceIcons[editingService.icon] || Globe, { className: 'w-8 h-8' })}
                          </span>
                          <div>
                            <div className="font-bold text-lg">{editingService.title || 'Título do Serviço'}</div>
                            <div className="text-sm text-muted-foreground">{editingService.description || 'Descrição do serviço...'}</div>
                            {editingService.fontAwesomeIcon && (
                              <div className="text-xs text-muted-foreground mt-1">Se o ícone não aparecer, verifique se o Font Awesome está carregado no projeto.</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setIsServiceModalOpen(false)}>Cancelar</Button>
                        <Button type="submit">Salvar</Button>
                      </DialogFooter>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>

        {/* PAINEL DE DIVERSOS */}
        <div className="bg-card p-6 rounded-xl border space-y-4">
          <div className="flex items-center justify-between mb-2 cursor-pointer select-none" onClick={() => setMiscCollapsed(v => !v)}>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold">Diversos</h3>
              <input type="text" className="input input-bordered w-full max-w-xs" value={miscTitle} onChange={e => saveMiscTitle(e.target.value)} placeholder="Título da Seção" />
            </div>
            <Button onClick={handleAddMisc} variant="outline"><Plus className="w-4 h-4 mr-1" />Adicionar Item</Button>
          </div>
          {!miscCollapsed && (
            <>
              <div className="space-y-2">
                {miscItems.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-2 bg-muted/40 border rounded-lg p-3">
                    <span className="cursor-move"><GripVertical className="w-4 h-4 text-muted-foreground" /></span>
                    <span className="w-8 h-8 flex items-center justify-center bg-muted rounded">
                      {item.customIcon
                        ? <img src={item.customIcon} alt="Custom Icon" className="w-6 h-6 object-contain" />
                        : item.fontAwesomeIcon
                          ? <i className={`w-6 h-6 text-xl ${item.fontAwesomeIcon}`} style={{ display: 'inline-block' }}></i>
                          : React.createElement(serviceIcons[item.icon] || Star, { className: 'w-6 h-6' })}
                    </span>
                    <div className="flex-1">
                      <div className="font-bold">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => handleEditMisc(item)}><Edit className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDeleteMisc(item.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>
              {/* Modal de edição de Diversos */}
              <Dialog open={isMiscModalOpen} onOpenChange={setIsMiscModalOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingMisc && editingMisc.id ? 'Editar Item' : 'Novo Item'}</DialogTitle>
                  </DialogHeader>
                  {editingMisc && (
                    <form onSubmit={e => { e.preventDefault(); handleSaveMisc(editingMisc); }} className="space-y-4">
                      <div>
                        <Label>Ícone</Label>
                        <div className="flex items-center gap-2">
                          <Select value={editingMisc.icon} onValueChange={icon => setEditingMisc(prev => ({ ...prev, icon, customIcon: undefined }))}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Globe">Globe</SelectItem>
                              <SelectItem value="Smartphone">Smartphone</SelectItem>
                              <SelectItem value="Database">Database</SelectItem>
                              <SelectItem value="Code">Code</SelectItem>
                              <SelectItem value="Wrench">Wrench</SelectItem>
                              <SelectItem value="Star">Star</SelectItem>
                              <SelectItem value="Phone">Phone</SelectItem>
                              <SelectItem value="Text">Text</SelectItem>
                              <SelectItem value="ImageIcon">ImageIcon</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-xs text-muted-foreground">ou</span>
                          <input type="file" accept="image/*,.svg" style={{ maxWidth: 120 }} onChange={e => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => setEditingMisc(prev => ({ ...prev, customIcon: reader.result }));
                              reader.readAsDataURL(file);
                            }
                          }} />
                          {editingMisc.customIcon && (
                            <>
                              <img src={editingMisc.customIcon} alt="Custom Icon" className="w-8 h-8 inline-block border rounded ml-2" />
                              <Button size="icon" variant="ghost" type="button" onClick={() => setEditingMisc(prev => ({ ...prev, customIcon: undefined }))}><Trash2 className="w-4 h-4" /></Button>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label>Ícone do Font Awesome (opcional)</Label>
                        <input type="text" className="input input-bordered w-full" value={editingMisc.fontAwesomeIcon || ''} onChange={e => setEditingMisc(prev => ({ ...prev, fontAwesomeIcon: e.target.value }))} placeholder="fa-solid fa-star" />
                        <span className="text-xs text-muted-foreground">Exemplo: fa-solid fa-star</span>
                        {editingMisc.fontAwesomeIcon && /(fa-light|fa-thin|fa-duotone|fa-sharp)/.test(editingMisc.fontAwesomeIcon) && (
                          <div className="text-xs text-red-500 mt-1">Este ícone requer Font Awesome Pro. Só funcionará se o Font Awesome Pro estiver carregado no projeto.</div>
                        )}
                        <div className="grid grid-cols-8 gap-2 mt-2">
                          {faFreeIcons.map(icon => (
                            <button
                              key={icon.class}
                              type="button"
                              className={`flex flex-col items-center justify-center p-1 border rounded hover:bg-primary/10 ${editingMisc.fontAwesomeIcon === icon.class ? 'border-primary' : 'border-muted'}`}
                              onClick={() => setEditingMisc(prev => ({ ...prev, fontAwesomeIcon: icon.class }))}
                              title={icon.label}
                            >
                              <i className={`${icon.class} text-xl`} style={{ display: 'inline-block' }}></i>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label>Título</Label>
                        <input type="text" className="input input-bordered w-full" value={editingMisc.title} onChange={e => setEditingMisc(prev => ({ ...prev, title: e.target.value }))} />
                      </div>
                      <div>
                        <Label>Descrição</Label>
                        <textarea className="input input-bordered w-full" value={editingMisc.description} onChange={e => setEditingMisc(prev => ({ ...prev, description: e.target.value }))} />
                      </div>
                      <div>
                        <Label>Pré-visualização</Label>
                        <div className="flex items-center gap-4 bg-muted/40 border rounded-lg p-4 mt-2">
                          <span className="w-12 h-12 flex items-center justify-center bg-muted rounded-full text-2xl">
                            {editingMisc.customIcon
                              ? <img src={editingMisc.customIcon} alt="Custom Icon" className="w-8 h-8 object-contain" />
                              : editingMisc.fontAwesomeIcon
                                ? <i className={`w-8 h-8 text-2xl ${editingMisc.fontAwesomeIcon}`} style={{ display: 'inline-block' }}></i>
                                : React.createElement(serviceIcons[editingMisc.icon] || Star, { className: 'w-8 h-8' })}
                          </span>
                          <div>
                            <div className="font-bold text-lg">{editingMisc.title || 'Título do Item'}</div>
                            <div className="text-sm text-muted-foreground">{editingMisc.description || 'Descrição do item...'}</div>
                            {editingMisc.fontAwesomeIcon && (
                              <div className="text-xs text-muted-foreground mt-1">Se o ícone não aparecer, verifique se o Font Awesome está carregado no projeto.</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setIsMiscModalOpen(false)}>Cancelar</Button>
                        <Button type="submit">Salvar</Button>
                      </DialogFooter>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </>
          )}
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
