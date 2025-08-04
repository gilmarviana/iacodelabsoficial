
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Globe, 
  Database, 
  Star, 
  Send, 
  Menu, 
  X,
  Wrench,
  Phone,
  Text,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ChatWidget from '@/components/ChatWidget';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import HeroSlider from '@/components/HeroSlider';
import SchedulingModal from '@/components/SchedulingModal';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [projects, setProjects] = useState([]);
  const [config, setConfig] = useState({});
  const [sections, setSections] = useState([]);
  const [services, setServices] = useState([]);
  const [miscItems, setMiscItems] = useState([]);
  const [servicesTitle, setServicesTitle] = useState('Serviços');
  const [miscTitle, setMiscTitle] = useState('Diversos');
  const { toast } = useToast();
  const navigate = useNavigate();

  const serviceIcons = { Wrench, Code, Star, Phone, Globe, Smartphone, Database, Text, ImageIcon };

  const getDefaultSections = () => [
    { id: 'hero', name: 'Revolution Slide', type: 'hero', isVisible: true, isRemovable: false, title: 'Transformamos Ideias em Soluções Digitais', subtitle: 'Especialistas em desenvolvimento web, mobile e sistemas personalizados.' },
    { id: 'projects', name: 'Projetos', type: 'projects', isVisible: true, isRemovable: false, title: 'Nossos Projetos', subtitle: 'Conheça alguns dos projetos que desenvolvemos.' },
    { id: 'services', name: 'Serviços', type: 'services', isVisible: true, isRemovable: false, title: 'Nossos Serviços', subtitle: 'Soluções completas para suas necessidades digitais.' },
    { id: 'misc', name: 'Diversos', type: 'misc', isVisible: true, isRemovable: false, title: 'Diversos', subtitle: 'Outros serviços e recursos oferecidos.' },
    { id: 'testimonials', name: 'Depoimentos', type: 'testimonials', isVisible: true, isRemovable: false, title: 'O que nossos clientes dizem', subtitle: '' },
    { id: 'contact', name: 'Contato', type: 'contact', isVisible: true, isRemovable: false, title: 'Entre em Contato', subtitle: 'Pronto para transformar sua ideia em realidade? Vamos conversar!' },
  ];

  const loadConfigAndData = useCallback(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(savedProjects.filter(p => p.isVisibleOnSite !== false));

    const savedConfig = JSON.parse(localStorage.getItem('landingPageConfig') || '{}');
    setConfig(savedConfig);
    
    const savedSections = JSON.parse(localStorage.getItem('landingPageSections'));
    if (savedSections && savedSections.length > 0) {
      setSections(savedSections);
    } else {
      setSections(getDefaultSections());
    }

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
    loadConfigAndData();
    window.addEventListener('storage', loadConfigAndData);
    return () => {
      window.removeEventListener('storage', loadConfigAndData);
    };
  }, [loadConfigAndData]);

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

  const testimonials = [
    { name: 'Maria Silva', company: 'Tech Solutions', text: 'Excelente trabalho! O projeto foi entregue no prazo e superou nossas expectativas.', rating: 5 },
    { name: 'João Santos', company: 'StartupXYZ', text: 'Profissionais muito competentes. Recomendo para qualquer projeto de desenvolvimento.', rating: 5 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Erro", description: "Por favor, preencha todos os campos.", variant: "destructive" });
      return;
    }

    const savedConversations = JSON.parse(localStorage.getItem('chatConversations') || '[]');
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages') || '{}');
    
    const newId = Date.now();
    const newConversation = {
        id: newId,
        name: `${formData.name} (Formulário)`,
        lastMessage: formData.message,
        unread: 1,
        type: 'form'
    };
    savedConversations.push(newConversation);

    const newMessageForAdmin = {
        from: 'visitor',
        text: `Nome: ${formData.name}\nEmail: ${formData.email}\nMensagem: ${formData.message}`,
    };
    savedMessages[newId] = [newMessageForAdmin];

    localStorage.setItem('chatConversations', JSON.stringify(savedConversations));
    localStorage.setItem('chatMessages', JSON.stringify(savedMessages));

    toast({ title: "Mensagem enviada!", description: "Entraremos em contato em breve." });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderSection = (section) => {
    const sectionStyle = {
      backgroundColor: section.bgImage ? 'transparent' : section.bgColor,
      backgroundImage: section.bgImage ? `url(${section.bgImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: section.textColor,
    };
    
    const titleStyle = { color: section.titleColor };
    const subtitleStyle = { color: section.subtitleColor };

    switch (section.type) {
        case 'misc': return (
            <section id={section.id} className="py-20 px-6 bg-background" style={sectionStyle}>
                <div className="container mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4" style={titleStyle}>{miscTitle}</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={subtitleStyle}>{section.subtitle}</p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {miscItems.map((item, index) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}
                              className="bg-card p-6 rounded-lg border text-center transition-transform duration-200 cursor-pointer"
                            >
                                <div className="w-16 h-16 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                                    {item.customIcon
                                        ? <img src={item.customIcon} alt="Custom Icon" className="w-10 h-10 object-contain" />
                                        : item.fontAwesomeIcon
                                            ? <i className={`w-10 h-10 text-3xl ${item.fontAwesomeIcon}`} style={{ display: 'inline-block' }}></i>
                                            : React.createElement(serviceIcons[item.icon] || Star, { className: 'w-10 h-10' })}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-muted-foreground">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
        case 'hero': return (
            <section id={section.id} className="bg-background">
                <HeroSlider landingPageConfig={config} onScheduleClick={() => setIsSchedulingModalOpen(true)} />
            </section>
        );
        case 'projects': return (
            <section id={section.id} className="py-20 px-6 bg-secondary" style={sectionStyle}>
                <div className="container mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4" style={titleStyle}>{section.title}</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={subtitleStyle}>{section.subtitle}</p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                              key={project.id}
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)' }}
                              className="bg-card rounded-lg overflow-hidden border transition-transform duration-200 cursor-pointer"
                            >
                                <div className="aspect-video bg-muted flex items-center justify-center">
                                    <img-replace alt={project.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6">
                                    <span className="text-sm text-primary font-semibold">{project.category}</span>
                                    <h3 className="text-xl font-bold mt-2 mb-3">{project.title}</h3>
                                    <p className="text-muted-foreground">{project.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
        case 'services': return (
            <section id={section.id} className="py-20 px-6 bg-background" style={sectionStyle}>
                <div className="container mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4" style={titleStyle}>{servicesTitle}</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={subtitleStyle}>{section.subtitle}</p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => {
                            const Icon = serviceIcons[service.icon] || Wrench;
                            return (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: index * 0.1 }}
                                  whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}
                                  className="bg-card p-6 rounded-lg border text-center transition-transform duration-200 cursor-pointer"
                                >
                                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                                        {service.customIcon
                                            ? <img src={service.customIcon} alt="Custom Icon" className="w-8 h-8 object-contain" />
                                            : service.fontAwesomeIcon
                                                ? <i className={`w-8 h-8 text-2xl ${service.fontAwesomeIcon}`} style={{ display: 'inline-block' }}></i>
                                                : <Icon className="w-8 h-8" />}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                    <p className="text-muted-foreground">{service.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
        case 'testimonials': return (
            <section id={section.id} className="py-20 px-6 bg-secondary" style={sectionStyle}>
                <div className="container mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4" style={titleStyle}>{section.title}</h2>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card p-6 rounded-lg border">
                                <div className="flex mb-4">{[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />))}</div>
                                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                                <div>
                                    <div className="font-bold">{testimonial.name}</div>
                                    <div className="text-sm text-primary">{testimonial.company}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
        case 'contact': return (
            <section id={section.id} className="py-20 px-6 bg-background" style={sectionStyle}>
                <div className="container mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4" style={titleStyle}>{section.title}</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={subtitleStyle}>{section.subtitle}</p>
                    </motion.div>
                    <div className="max-w-2xl mx-auto">
                        <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} className="bg-card p-8 rounded-lg border space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-2 font-medium">Nome</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Seu nome" />
                                </div>
                                <div>
                                    <label className="block mb-2 font-medium">Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="seu@email.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Mensagem</label>
                                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5} className="w-full px-4 py-2 bg-background border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Conte-nos sobre seu projeto..."></textarea>
                            </div>
                            <Button type="submit" size="lg" className="w-full">Enviar Mensagem <Send className="ml-2 w-5 h-5" /></Button>
                        </motion.form>
                    </div>
                </div>
            </section>
        );
        case 'custom_text':
        case 'custom_image':
             return (
                 <section id={section.id} className="py-20 px-6 relative" style={sectionStyle}>
                    {section.bgImage && <div className="absolute inset-0 bg-black/50 z-0"></div>}
                     <div className="container mx-auto relative z-10">
                         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                             <h2 className="text-4xl font-bold mb-4" style={titleStyle}>{section.title}</h2>
                             <p className="text-lg opacity-80 max-w-3xl mx-auto" style={subtitleStyle}>{section.subtitle}</p>
                         </motion.div>
                     </div>
                 </section>
             );
        default: return null;
    }
  };

  // Definir alinhamento do menu
  const menuAlignClass = config.menuPosition === 'left' ? 'justify-start' : config.menuPosition === 'right' ? 'justify-end' : 'justify-center';
  const menuBg = config.menuBgColor || 'rgba(255,255,255,0)';
  const menuText = config.menuTextColor || '#222222';
  const menuHover = config.menuHoverColor || '#3b82f6';
  const menuPadding = config.menuPadding || 'px-4 py-2';
  const menuMargin = config.menuMargin || 'mx-2 my-0';
  const menuRadius = config.menuRadius || '8px';

  return (
    <>
      <Helmet>
        <title>{`${config.logoUrl || 'IA Code Labs'} - Desenvolvimento de Software e Aplicações`}</title>
        <meta name="description" content={config.heroSubtitle || ''} />
      </Helmet>
      
      <SchedulingModal isOpen={isSchedulingModalOpen} onClose={() => setIsSchedulingModalOpen(false)} />

      <div className="bg-background text-foreground transition-colors duration-300">
        {/* HEADER customizável */}
        {config.isVisible !== false && (
          <header
            className="fixed top-0 w-full z-50 transition-all duration-300"
            id="main-header"
            style={{ background: config.bgColor || 'rgba(0,0,0,0.7)' }}
          >
          <nav className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between w-full">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold flex items-center gap-2">
                  {config.logoUrl ? (
                    <img src={config.logoUrl} alt="Logo" className="h-8" />
                  ) : (
                    <span>{config.logoText || 'IA Code Labs'}</span>
                  )}
              </motion.div>
                <div className="flex-1 flex">
                  {config.menuPosition === 'center' ? (
                    <div className="w-full flex items-center justify-center">
                      <div className={`hidden md:flex items-center space-x-6 justify-center`} style={{ background: menuBg, color: menuText }}>
                        {/* menu items */}
                        {(config.menu || sections.filter(s => s.isVisible)).filter(item => item.isVisible !== false).map((item, idx) =>
                          item.label && item.href ? (
                            item.children && item.children.length > 0 ? (
                              <div key={idx} className={`relative group ${menuMargin}`}>
                                <a href={item.href} className={`transition-colors cursor-pointer ${menuPadding}`} style={{ color: menuText, borderRadius: menuRadius }}>{item.label}</a>
                                <div className="absolute left-0 top-full mt-2 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50 min-w-[160px]" style={{ background: menuBg }}>
                                  {item.children.filter(child => child.isVisible !== false).map((child, cidx) => (
                                    <a key={cidx} href={child.href} className={`block transition-colors text-sm ${menuPadding}`} style={{ color: menuText, borderRadius: menuRadius }} onMouseOver={e => e.currentTarget.style.background = menuHover} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>{child.label}</a>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <a key={idx} href={item.href} className={`hover:bg-[${menuHover}] transition-colors ${menuPadding}`} style={{ color: menuText, borderRadius: menuRadius }} onMouseOver={e => e.currentTarget.style.background = menuHover} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>{item.label}</a>
                            )
                          ) : (
                            <a key={item.id || idx} href={`#${item.id}`} className={`hover:bg-[${menuHover}] transition-colors ${menuPadding}`} style={{ color: menuText, borderRadius: menuRadius }} onMouseOver={e => e.currentTarget.style.background = menuHover} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>{item.name}</a>
                          )
                        )}
                      </div>
                    </div>
                  ) : config.menuPosition === 'right' ? (
                    <div className="flex flex-1 items-center justify-end">
                      <div className={`hidden md:flex items-center space-x-6`} style={{ background: menuBg, color: menuText }}>
                        {/* menu items */}
                        {(config.menu || sections.filter(s => s.isVisible)).filter(item => item.isVisible !== false).map((item, idx) =>
                          item.label && item.href ? (
                            item.children && item.children.length > 0 ? (
                              <div key={idx} className={`relative group ${menuMargin}`}>
                                <a href={item.href} className={`transition-colors cursor-pointer ${menuPadding}`} style={{ color: menuText, borderRadius: menuRadius }}>{item.label}</a>
                                <div className="absolute left-0 top-full mt-2 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50 min-w-[160px]" style={{ background: menuBg }}>
                                  {item.children.filter(child => child.isVisible !== false).map((child, cidx) => (
                                    <a key={cidx} href={child.href} className={`block transition-colors text-sm ${menuPadding}`} style={{ color: menuText, borderRadius: menuRadius }} onMouseOver={e => e.currentTarget.style.background = menuHover} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>{child.label}</a>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <a key={idx} href={item.href} className={`hover:bg-[${menuHover}] transition-colors ${menuPadding}`} style={{ color: menuText, borderRadius: menuRadius }} onMouseOver={e => e.currentTarget.style.background = menuHover} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>{item.label}</a>
                            )
                          ) : (
                            <a key={item.id || idx} href={`#${item.id}`} className={`hover:bg-[${menuHover}] transition-colors ${menuPadding}`} style={{ color: menuText, borderRadius: menuRadius }} onMouseOver={e => e.currentTarget.style.background = menuHover} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>{item.name}</a>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className={`hidden md:flex items-center space-x-6`} style={{ background: menuBg, color: menuText }}>
                        {/* menu items */}
                        {(config.menu || sections.filter(s => s.isVisible)).filter(item => item.isVisible !== false).map((item, idx) =>
                          item.label && item.href ? (
                            item.children && item.children.length > 0 ? (
                              <div key={idx} className={`relative group ${menuMargin}`}>
                                <a href={item.href} className={`transition-colors cursor-pointer ${menuPadding}`} style={{ color: menuText, borderRadius: menuRadius }}>{item.label}</a>
                                <div className="absolute left-0 top-full mt-2 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50 min-w-[160px]" style={{ background: menuBg }}>
                                  {item.children.filter(child => child.isVisible !== false).map((child, cidx) => (
                                    <a key={cidx} href={child.href} className={`block transition-colors text-sm ${menuPadding}`} style={{ color: menuText, borderRadius: menuRadius }} onMouseOver={e => e.currentTarget.style.background = menuHover} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>{child.label}</a>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <a key={idx} href={item.href} className={`hover:bg-[${menuHover}] transition-colors ${menuPadding}`} style={{ color: menuText, borderRadius: menuRadius }} onMouseOver={e => e.currentTarget.style.background = menuHover} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>{item.label}</a>
                            )
                          ) : (
                            <a key={item.id || idx} href={`#${item.id}`} className={`hover:bg-[${menuHover}] transition-colors ${menuPadding}`} style={{ color: menuText, borderRadius: menuRadius }} onMouseOver={e => e.currentTarget.style.background = menuHover} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>{item.name}</a>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button onClick={() => navigate('/login')} variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                    {config.loginButtonText || 'Login'}
                  </Button>
                <ThemeToggle />
              </div>
              </div>
            {isMenuOpen && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden mt-4 bg-card/90 rounded-lg p-4">
                <div className="flex flex-col space-y-4 items-center text-card-foreground">
                    {(config.menu || sections.filter(s => s.isVisible)).map((item, idx) =>
                      item.label && item.href ? (
                        item.children && item.children.length > 0 ? (
                          <div key={idx} className="relative group">
                            <a href={item.href} className="hover:text-primary transition-colors cursor-pointer" style={{ color: menuText }}>{item.label}</a>
                            <div className="absolute left-0 top-full mt-2 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50 min-w-[160px]" style={{ background: menuBg }}>
                              {item.children.filter(child => child.isVisible !== false).map((child, cidx) => (
                                <a key={cidx} href={child.href} className="block px-4 py-2 hover:bg-primary/10 text-sm" style={{ color: menuText }}>{child.label}</a>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <a key={idx} href={item.href} onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors w-full text-center py-2" style={{ color: menuText }}>{item.label}</a>
                        )
                      ) : (
                        <a key={item.id || idx} href={`#${item.id}`} onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors w-full text-center py-2" style={{ color: menuText }}>{item.name}</a>
                      )
                    )}
                    <Button onClick={() => {navigate('/login'); setIsMenuOpen(false);}} className="w-full" style={{ color: menuText }}>{config.loginButtonText || 'Login'}</Button>
                </div>
              </motion.div>
            )}
          </nav>
        </header>
        )}

        <main>
            {sections.filter(s => s.isVisible).map((section, idx) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 64 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.18 }}
                  transition={{ duration: 0.9, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: '100%' }}
                >
                  {renderSection(section)}
                </motion.div>
            ))}
        </main>



        <footer
          className="py-12 px-6 border-t"
          style={{
            background: config.footerBgColor || '#f9fafb',
            color: config.footerTextColor || '#222222',
          }}
        >
          <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8">
            {/* Logo e frase */}
            <div className="flex-1 flex flex-col items-start mb-8 md:mb-0">
              {config.footerLogoUrl ? (
                <img src={config.footerLogoUrl} alt="Logo" className="h-12 mb-4 max-w-full object-contain" style={{ minWidth: 48 }} />
              ) : (
                <img src={config.logoUrl || '/logo.png'} alt="Logo" className="h-12 mb-4" style={{ minWidth: 48 }} />
              )}
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {(config.footerPhrase || 'Transformamos Ideias em Soluções Digitais.').split(/\n|<br\s*\/?\s*>/gi).map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h2>
              {config.footerButtonText && (
                <a
                  href={config.footerButtonLink || '#contato'}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-black text-white font-medium hover:bg-primary transition-colors mt-2"
                >
                  <span className="inline-block">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  {config.footerButtonText}
                </a>
              )}
            </div>
            {/* Menus */}
            <div className="flex-1 flex flex-col md:flex-row gap-8 justify-center">
              {(config.footerMenus || [
                { title: 'A Empresa', items: [ { label: 'Home', href: '#' }, { label: 'Projetos', href: '#projects' }, { label: 'Serviços', href: '#services' }, { label: 'Contato', href: '#contact' } ] },
                { title: 'Serviços', items: [ { label: '' }, { label: '' }, { label: '' }, { label: '' }, { label: '' } ] },
                { title: 'Dúvidas', items: [ { label: '', href: '#lgpd' }, { label: '', href: '#privacidade' }, { label: '', href: '#cookies' } ] }
              ]).map((menu, idx) => (
                <div key={idx}>
                  <h4 className="font-bold mb-2">{menu.title}</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    {menu.items && menu.items.map((item, iidx) => (
                      <li key={iidx}>
                        {item.href ? (
                          <a href={item.href} className="hover:underline">{item.label}</a>
                        ) : (
                          item.label
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* QR Code e LinkedIn */}
            <div className="flex-1 flex flex-col items-center md:items-end">
              <div className="bg-white rounded-lg border p-4 flex flex-col items-center mb-4">
                {config.footerQrCodeUrl ? (
                  <img src={config.footerQrCodeUrl} alt="QR Code LinkedIn" className="w-24 h-24 mb-2 max-w-full object-contain" />
                ) : (
                  <img src="/qrcode-linkedin.png" alt="QR Code LinkedIn" className="w-24 h-24 mb-2" />
                )}
                <div className="text-center text-muted-foreground text-sm mb-1">
                  {config.footerQrText || 'Siga-nos\nno Linkedin'}
                </div>
                <a
                  href={config.footerLinkedin || 'https://www.linkedin.com/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  Seguir Agora <span aria-hidden>↗</span>
                </a>
              </div>
              <div className="flex gap-4 mt-2">
                {(config.footerSocials || [
                  { icon: 'fa-brands fa-linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/' },
                  { icon: 'fa-brands fa-instagram', label: 'Instagram', url: 'https://www.instagram.com/' },
                  { icon: 'fa-brands fa-facebook', label: 'Facebook', url: 'https://www.facebook.com/' }
                ]).map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <i className={`${social.icon} text-2xl`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-8 border-t pt-6 text-muted-foreground text-sm">
            <div className="flex gap-4 mb-2 md:mb-0">
              {(config.footerSocials || [
                { icon: 'fa-brands fa-linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/' },
                { icon: 'fa-brands fa-instagram', label: 'Instagram', url: 'https://www.instagram.com/' },
                { icon: 'fa-brands fa-facebook', label: 'Facebook', url: 'https://www.facebook.com/' }
              ]).map((social, idx) => (
                <a
                  key={idx}
                  href={social.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
            <p className="mb-2 md:mb-0">{config.footerCopyright || '© 2025 IA Code Labs todos os direitos reservados.'}</p>
            <a href="#top" className="flex items-center gap-2 hover:underline"><i className="fa-solid fa-chevron-up"></i> Voltar para o topo</a>
          </div>
        </footer>

        <ChatWidget />
      </div>
    </>
  );
};

export default LandingPage;
