
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
import FooterSection from '@/pages/FooterSection';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [projects, setProjects] = useState([]);
  const [config, setConfig] = useState({});
  const [sections, setSections] = useState([]);
  const [services, setServices] = useState([]);
  const [miscItems, setMiscItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [servicesTitle, setServicesTitle] = useState('Serviços');
  const [miscTitle, setMiscTitle] = useState('Diversos');
  const { toast } = useToast();
  const navigate = useNavigate();

  const serviceIcons = { Wrench, Code, Star, Phone, Globe, Smartphone, Database, Text, ImageIcon };

  const getDefaultSections = () => [
    { id: 'hero', name: 'Revolution Slide', type: 'hero', isVisible: true, isRemovable: false, title: 'Transformamos Ideias em Soluções Digitais', subtitle: 'Especialistas em desenvolvimento web, mobile e sistemas personalizados.' },
    { id: 'projects', name: 'Projetos', type: 'projects', isVisible: true, isRemovable: false, title: 'Nossos Projetos', subtitle: 'Conheça alguns dos projetos que desenvolvemos.' },
    { id: 'services', name: 'Serviços', type: 'services', isVisible: true, isRemovable: false, title: 'Nossos Serviços', subtitle: 'Soluções completas para suas necessidades digitais.' },
    { id: 'testimonials', name: 'Depoimentos', type: 'testimonials', isVisible: true, isRemovable: false, title: 'O que nossos clientes dizem', subtitle: '' },
    { id: 'contact', name: 'Contato', type: 'contact', isVisible: true, isRemovable: false, title: 'Entre em Contato', subtitle: 'Pronto para transformar sua ideia em realidade? Vamos conversar!' },
  ];

  const loadConfigAndData = useCallback(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(savedProjects.filter(p => p.isVisibleOnSite !== false));

    const savedConfig = JSON.parse(localStorage.getItem('landingPageConfig') || '{}');
    setConfig(savedConfig);
    
    const savedSections = JSON.parse(localStorage.getItem('landingPageSections'));
    console.log('🔍 Seções carregadas do localStorage:', savedSections);
    if (savedSections && savedSections.length > 0) {
      setSections(savedSections);
      console.log('✅ Seções aplicadas:', savedSections);
    } else {
      const defaultSections = getDefaultSections();
      setSections(defaultSections);
      console.log('📋 Usando seções padrão:', defaultSections);
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
    
    // Também escutar por mudanças customizadas
    const handleCustomStorageChange = () => {
      console.log('🔄 Recarregando dados por evento customizado');
      loadConfigAndData();
    };
    
    window.addEventListener('landingPageUpdate', handleCustomStorageChange);
    
    return () => {
      window.removeEventListener('storage', loadConfigAndData);
      window.removeEventListener('landingPageUpdate', handleCustomStorageChange);
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

  // Carregar depoimentos do localStorage
  useEffect(() => {
    const savedTestimonials = JSON.parse(localStorage.getItem('landingPageTestimonials') || '[]');
    if (savedTestimonials.length > 0) {
      setTestimonials(savedTestimonials);
    } else {
      // Depoimentos padrão
      setTestimonials([
        { id: 1, name: 'Maria Silva', company: 'Tech Solutions', text: 'Excelente trabalho! O projeto foi entregue no prazo e superou nossas expectativas.', rating: 5 },
        { id: 2, name: 'João Santos', company: 'StartupXYZ', text: 'Profissionais muito competentes. Recomendo para qualquer projeto de desenvolvimento.', rating: 5 },
      ]);
    }
  }, []);

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
        case 'hero': return (
            <section id={section.id} className="bg-background">
                <HeroSlider landingPageConfig={config} onScheduleClick={() => setIsSchedulingModalOpen(true)} />
            </section>
        );
        case 'projects': return (
            <section id={section.id} className="py-20 px-6 bg-secondary relative overflow-hidden" style={sectionStyle}>
                {/* Background decorativo */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
                
                <div className="container mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <motion.h2 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            whileInView={{ opacity: 1, scale: 1 }} 
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent" 
                            style={titleStyle}
                        >
                            {section.title}
                        </motion.h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={subtitleStyle}>{section.subtitle}</p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div 
                                key={project.id} 
                                initial={{ opacity: 0, y: 50, scale: 0.9 }} 
                                whileInView={{ opacity: 1, y: 0, scale: 1 }} 
                                viewport={{ once: true }} 
                                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group bg-card/80 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                            >
                                <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all duration-300"></div>
                                    <motion.div 
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full h-full"
                                    >
                                        <img-replace alt={project.title} className="w-full h-full object-cover" />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6 relative">
                                    <div className="absolute -top-3 left-6 right-6 h-6 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="inline-block px-3 py-1 text-xs text-primary font-semibold bg-primary/10 rounded-full border border-primary/20">
                                        {project.category}
                                    </span>
                                    <h3 className="text-xl font-bold mt-3 mb-3 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                                    <div className="mt-4 h-1 w-0 bg-gradient-to-r from-primary to-purple-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
        case 'services': return (
            <section id={section.id} className="py-20 px-6 bg-background relative overflow-hidden" style={sectionStyle}>
                {/* Background decorativo */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5"></div>
                <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl opacity-40 animate-bounce"></div>
                <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl opacity-40 animate-bounce delay-500"></div>
                
                <div className="container mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <motion.h2 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            whileInView={{ opacity: 1, scale: 1 }} 
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent" 
                            style={titleStyle}
                        >
                            {servicesTitle}
                        </motion.h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={subtitleStyle}>{section.subtitle}</p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => {
                            const Icon = serviceIcons[service.icon] || Wrench;
                            return (
                                <motion.div 
                                    key={index} 
                                    initial={{ opacity: 0, y: 50, rotateY: -15 }} 
                                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }} 
                                    viewport={{ once: true }} 
                                    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                                    whileHover={{ 
                                        y: -10, 
                                        scale: 1.05,
                                        rotateY: 5,
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                    }}
                                    className="group bg-card/90 backdrop-blur-sm p-6 rounded-xl border border-border/50 text-center relative overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                                >
                                    {/* Background gradient animado */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    {/* Brilho no hover */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-cyan-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-10 blur transition-opacity duration-500"></div>
                                    
                                    <motion.div 
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-16 h-16 bg-gradient-to-br from-primary/20 to-cyan-500/20 text-primary rounded-xl flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg group-hover:shadow-xl group-hover:shadow-primary/20"
                                    >
                                        {service.customIcon
                                            ? <img src={service.customIcon} alt="Custom Icon" className="w-8 h-8 object-contain filter group-hover:brightness-110" />
                                            : service.fontAwesomeIcon
                                                ? <i className={`w-8 h-8 text-2xl ${service.fontAwesomeIcon} group-hover:text-primary transition-colors duration-300`} style={{ display: 'inline-block' }}></i>
                                                : <Icon className="w-8 h-8 group-hover:text-cyan-500 transition-colors duration-300" />}
                                    </motion.div>
                                    
                                    <h3 className="text-xl font-bold mb-2 relative z-10 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                                    <p className="text-muted-foreground relative z-10 leading-relaxed">{service.description}</p>
                                    
                                    {/* Linha decorativa */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
        case 'testimonials': return (
            <section id={section.id} className="py-20 px-6 bg-secondary relative overflow-hidden" style={sectionStyle}>
                {/* Background decorativo */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5"></div>
                <div className="absolute top-0 right-1/3 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl opacity-30 animate-pulse delay-700"></div>
                
                <div className="container mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <motion.h2 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            whileInView={{ opacity: 1, scale: 1 }} 
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent" 
                            style={titleStyle}
                        >
                            {section.title}
                        </motion.h2>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div 
                                key={index} 
                                initial={{ opacity: 0, scale: 0.8, rotateX: -15 }} 
                                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }} 
                                viewport={{ once: true }} 
                                transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                                whileHover={{ 
                                    y: -8, 
                                    scale: 1.02,
                                    rotateX: 2,
                                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                }}
                                className="group bg-card/90 backdrop-blur-sm p-6 rounded-xl border border-border/50 relative overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500"
                            >
                                {/* Background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                {/* Aspas decorativas */}
                                <div className="absolute -top-2 -left-2 text-6xl text-yellow-500/20 font-serif">"</div>
                                <div className="absolute -bottom-8 -right-2 text-6xl text-orange-500/20 font-serif rotate-180">"</div>
                                
                                <div className="relative z-10">
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ delay: index * 0.2 + 0.3 }}
                                        className="flex mb-4 gap-1"
                                    >
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, rotate: -180 }}
                                                whileInView={{ opacity: 1, rotate: 0 }}
                                                transition={{ delay: i * 0.1 + index * 0.2 + 0.4 }}
                                                whileHover={{ scale: 1.2, rotate: 15 }}
                                            >
                                                <Star className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm" />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                    
                                    <motion.p 
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: index * 0.2 + 0.5 }}
                                        className="text-muted-foreground mb-4 italic leading-relaxed text-lg relative"
                                    >
                                        "{testimonial.text}"
                                    </motion.p>
                                    
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.2 + 0.6 }}
                                        className="border-t pt-4"
                                    >
                                        <div className="font-bold text-lg group-hover:text-primary transition-colors duration-300">{testimonial.name}</div>
                                        <div className="text-sm text-yellow-600 font-medium">{testimonial.company}</div>
                                    </motion.div>
                                </div>
                                
                                {/* Linha decorativa */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
        case 'contact': return (
            <section id={section.id} className="py-20 px-6 bg-background relative overflow-hidden" style={sectionStyle}>
                {/* Background decorativo */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl opacity-40 animate-ping"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-40 animate-ping delay-1000"></div>
                
                <div className="container mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <motion.h2 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            whileInView={{ opacity: 1, scale: 1 }} 
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" 
                            style={titleStyle}
                        >
                            {section.title}
                        </motion.h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={subtitleStyle}>{section.subtitle}</p>
                    </motion.div>
                    <div className="max-w-2xl mx-auto">
                        <motion.form 
                            initial={{ opacity: 0, y: 50, scale: 0.95 }} 
                            whileInView={{ opacity: 1, y: 0, scale: 1 }} 
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 100 }}
                            onSubmit={handleSubmit} 
                            className="group bg-card/90 backdrop-blur-sm p-8 rounded-2xl border border-border/50 space-y-6 shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 relative overflow-hidden"
                        >
                            {/* Background gradient animado */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Brilho sutil */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-10 blur transition-opacity duration-500"></div>
                            
                            <div className="grid md:grid-cols-2 gap-6 relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label className="block mb-2 font-medium text-foreground">Nome</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md backdrop-blur-sm" 
                                        placeholder="Seu nome" 
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label className="block mb-2 font-medium text-foreground">Email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md backdrop-blur-sm" 
                                        placeholder="seu@email.com" 
                                    />
                                </motion.div>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="relative z-10"
                            >
                                <label className="block mb-2 font-medium text-foreground">Mensagem</label>
                                <textarea 
                                    name="message" 
                                    value={formData.message} 
                                    onChange={handleInputChange} 
                                    rows={5} 
                                    className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md backdrop-blur-sm" 
                                    placeholder="Conte-nos sobre seu projeto..."
                                ></textarea>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="relative z-10"
                            >
                                <Button 
                                    type="submit" 
                                    size="lg" 
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                                >
                                    {/* Efeito de brilho no hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    
                                    <motion.span
                                        whileHover={{ x: 5 }}
                                        className="flex items-center justify-center relative z-10"
                                    >
                                        Enviar Mensagem 
                                        <Send className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                    </motion.span>
                                </Button>
                            </motion.div>
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

        <main className="relative">
            {/* Elementos decorativos globais */}
            <div className="fixed top-1/4 left-0 w-2 h-32 bg-gradient-to-b from-primary to-purple-500 opacity-20 rounded-r-full"></div>
            <div className="fixed top-1/2 right-0 w-2 h-32 bg-gradient-to-b from-cyan-500 to-blue-500 opacity-20 rounded-l-full"></div>
            <div className="fixed bottom-1/4 left-0 w-2 h-32 bg-gradient-to-b from-green-500 to-emerald-500 opacity-20 rounded-r-full"></div>
            
            {sections.filter(s => s.isVisible).map((section, idx) => {
                console.log('🎬 Renderizando seção:', section.id, section.name, section);
                return (
                <React.Fragment key={section.id}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        {renderSection(section)}
                    </motion.div>
                    {section.type === 'services' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <section id="misc" className="py-20 px-6 bg-background relative overflow-hidden">
                            {/* Background decorativo */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"></div>
                            <div className="absolute top-0 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                            <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
                            
                            <div className="container mx-auto relative z-10">
                                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                                    <motion.h2 
                                        initial={{ opacity: 0, scale: 0.9 }} 
                                        whileInView={{ opacity: 1, scale: 1 }} 
                                        viewport={{ once: true }}
                                        className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent"
                                    >
                                        {miscTitle}
                                    </motion.h2>
                                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Outros serviços e recursos oferecidos.</p>
                                </motion.div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {miscItems.map((item, index) => (
                                        <motion.div 
                                            key={item.id} 
                                            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
                                            whileInView={{ opacity: 1, y: 0, scale: 1 }} 
                                            viewport={{ once: true }} 
                                            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                                            whileHover={{ 
                                                y: -10, 
                                                scale: 1.05,
                                                rotateZ: 2,
                                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                            }}
                                            className="group bg-card/90 backdrop-blur-sm p-6 rounded-xl border border-border/50 text-center relative overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
                                        >
                                            {/* Background gradient animado */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            
                                            {/* Partículas flutuantes */}
                                            <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500/30 rounded-full animate-ping"></div>
                                            <div className="absolute bottom-4 left-4 w-1 h-1 bg-pink-500/40 rounded-full animate-ping delay-500"></div>
                                            
                                            <motion.div 
                                                whileHover={{ scale: 1.1, rotate: -5 }}
                                                transition={{ duration: 0.3 }}
                                                className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-primary rounded-xl flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/20"
                                            >
                                                {item.customIcon
                                                    ? <img src={item.customIcon} alt="Custom Icon" className="w-10 h-10 object-contain filter group-hover:brightness-110" />
                                                    : item.fontAwesomeIcon
                                                        ? <i className={`w-10 h-10 text-3xl ${item.fontAwesomeIcon} group-hover:text-purple-500 transition-colors duration-300`} style={{ display: 'inline-block' }}></i>
                                                        : React.createElement(serviceIcons[item.icon] || Star, { className: 'w-10 h-10 group-hover:text-pink-500 transition-colors duration-300' })}
                                            </motion.div>
                                            
                                            <h3 className="text-xl font-bold mb-2 relative z-10 group-hover:text-purple-500 transition-colors duration-300">{item.title}</h3>
                                            <p className="text-muted-foreground relative z-10 leading-relaxed">{item.description}</p>
                                            
                                            {/* Linha decorativa */}
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>
                        </motion.div>
                    )}
                </React.Fragment>
            )})}
        </main>

        <FooterSection />

        <ChatWidget />
      </div>
    </>
  );
};

export default LandingPage;
