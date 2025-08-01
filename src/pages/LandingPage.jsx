
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
                            <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card rounded-lg overflow-hidden border">
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
                        <h2 className="text-4xl font-bold mb-4" style={titleStyle}>{section.title}</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={subtitleStyle}>{section.subtitle}</p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => {
                            const Icon = serviceIcons[service.icon] || Wrench;
                            return (
                                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card p-6 rounded-lg border text-center">
                                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-4"><Icon className="w-8 h-8" /></div>
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

  return (
    <>
      <Helmet>
        <title>{`${config.logoUrl || 'IA Code Labs'} - Desenvolvimento de Software e Aplicações`}</title>
        <meta name="description" content={config.heroSubtitle || ''} />
      </Helmet>
      
      <SchedulingModal isOpen={isSchedulingModalOpen} onClose={() => setIsSchedulingModalOpen(false)} />

      <div className="bg-background text-foreground transition-colors duration-300">
        <header className="fixed top-0 w-full bg-transparent text-white z-50 transition-all duration-300" id="main-header">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold">
                {config.logoUrl?.startsWith('http') ? <img src={config.logoUrl} alt="Logo" className="h-8" /> : config.logoUrl}
              </motion.div>

              <div className="hidden md:flex items-center space-x-6">
                {sections.filter(s => s.isVisible).map(s => <a key={s.id} href={`#${s.id}`} className="hover:text-primary transition-colors">{s.name}</a>)}
                <Button onClick={() => navigate('/login')} variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">Login</Button>
                <ThemeToggle />
              </div>

              <div className="md:hidden flex items-center gap-2">
                <ThemeToggle />
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
            
            {isMenuOpen && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden mt-4 bg-card/90 rounded-lg p-4">
                <div className="flex flex-col space-y-4 items-center text-card-foreground">
                  {sections.filter(s => s.isVisible).map(s => <a key={s.id} href={`#${s.id}`} onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors w-full text-center py-2">{s.name}</a>)}
                  <Button onClick={() => {navigate('/login'); setIsMenuOpen(false);}} className="w-full">Login</Button>
                </div>
              </motion.div>
            )}
          </nav>
        </header>

        <main>
            {sections.filter(s => s.isVisible).map(section => (
                <React.Fragment key={section.id}>
                    {renderSection(section)}
                </React.Fragment>
            ))}
        </main>

        <footer className="py-12 px-6 border-t bg-secondary">
          <div className="container mx-auto text-center text-muted-foreground">
            <p>{config.footerText || '© 2025 IA Code Labs. Todos os direitos reservados.'}</p>
          </div>
        </footer>

        <ChatWidget />
      </div>
    </>
  );
};

export default LandingPage;
