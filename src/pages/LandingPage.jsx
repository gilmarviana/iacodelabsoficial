import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Brain,
  Smartphone, 
  Globe, 
  Database, 
  Star, 
  Send, 
  Menu, 
  X,
  BarChart3,
  Shield,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  Play,
  Award,
  Target,
  Clock,
  TrendingUp,
  MessageSquare,
  ChevronRight,
  Code,
  Rocket,
  Trophy,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ChatWidget from '@/components/ChatWidget';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import SchedulingModal from '@/components/SchedulingModal';
import FooterSection from '@/pages/FooterSection';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { toast } = useToast();
  const navigate = useNavigate();

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

  // Dados dos serviços
  const services = [
    {
      icon: Brain,
      title: "Desenvolvimento Web",
      description: "Criamos sites modernos e responsivos utilizando as mais recentes tecnologias do mercado."
    },
    {
      icon: Smartphone,
      title: "Aplicações Mobile",
      description: "Desenvolvemos aplicativos nativos e híbridos para Android e iOS com alta performance."
    },
    {
      icon: Database,
      title: "Inteligência Artificial",
      description: "Implementamos soluções de IA personalizadas para automatizar e otimizar processos."
    },
    {
      icon: BarChart3,
      title: "Análise de Dados",
      description: "Transformamos dados em insights valiosos para decisões estratégicas do seu negócio."
    },
    {
      icon: Shield,
      title: "Segurança Digital",
      description: "Protegemos seus sistemas com as melhores práticas de segurança cibernética."
    },
    {
      icon: Zap,
      title: "Automação de Processos",
      description: "Automatizamos tarefas repetitivas para aumentar eficiência e reduzir custos."
    }
  ];

  // Processo de trabalho
  const workProcess = [
    {
      number: "01",
      title: "Análise",
      description: "Entendemos suas necessidades e objetivos"
    },
    {
      number: "02", 
      title: "Planejamento",
      description: "Criamos estratégia personalizada para seu projeto"
    },
    {
      number: "03",
      title: "Desenvolvimento",
      description: "Executamos com excelência técnica e agilidade"
    },
    {
      number: "04",
      title: "Entrega",
      description: "Implementamos e oferecemos suporte contínuo"
    }
  ];

  // Casos de sucesso
  const successCases = [
    {
      title: "E-commerce Moderno 1",
      category: "E-commerce",
      badge: "Destaque",
      description: "Plataforma de e-commerce responsiva com sistema de pagamentos integrado, dashboard administrativo e gestão completa de produtos e pedidos.",
      image: "/api/placeholder/400/250",
      features: [
        "Carrinho de compras",
        "Sistema de pagamentos", 
        "Dashboard admin",
        "+2 funcionalidades"
      ],
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      additionalTech: "+2",
      result: "💡 Aumento de 150% nas vendas online",
      buttonText: "Ver Detalhes"
    },
    {
      title: "Dashboard Analytics",
      category: "Dashboard", 
      badge: "Destaque",
      description: "Dashboard empresarial com visualizações de dados em tempo real, relatórios customizáveis e integração com múltiplas fontes de dados.",
      image: "/api/placeholder/400/250",
      features: [
        "Visualizações interativas",
        "Relatórios PDF",
        "Filtros avançados", 
        "+2 funcionalidades"
      ],
      technologies: ["React", "D3.js", "Node.js", "MongoDB"],
      additionalTech: "+1",
      result: "💡 Redução de 40% no tempo de análise",
      buttonText: "Ver Detalhes"
    },
    {
      title: "API de Microserviços",
      category: "API",
      badge: "Destaque", 
      description: "Arquitetura de microserviços escalável para e-commerce com autenticação, processamento de pagamentos e gestão de inventário.",
      image: "/api/placeholder/400/250",
      features: [
        "Microserviços",
        "Auto-scaling",
        "Monitoring",
        "+2 funcionalidades"
      ],
      technologies: ["Node.js", "Docker", "Kubernetes", "PostgreSQL"],
      additionalTech: "+2",
      result: "💡 Suporte a 10k+ requisições/seg",
      buttonText: "Ver Detalhes"
    }
  ];

  // Estatísticas da empresa
  const stats = [
    { 
      number: "50+", 
      label: "Projetos Entregues",
      icon: Trophy,
      color: "text-blue-500"
    },
    { 
      number: "100%", 
      label: "Cliente Satisfeito",
      icon: Users,
      color: "text-blue-500"
    },
    { 
      number: "5+", 
      label: "Anos de Experiência",
      icon: Target,
      color: "text-blue-500"
    },
    { 
      number: "24/7", 
      label: "Suporte Dedicado",
      icon: Shield,
      color: "text-blue-500"
    }
  ];

  // Depoimentos
  const testimonials = [
    {
      name: "Carlos Silva",
      company: "Tech Solutions CEO",
      text: "A IA Code Labs transformou completamente nossa operação. O sistema desenvolvido superou todas as expectativas.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Maria Santos",
      company: "StartupXYZ Founder",
      text: "Profissionais excepcionais! Entregaram nosso app mobile no prazo com qualidade impecável.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    }
  ];

  return (
    <>
      <Helmet>
        <title>IA Code Labs - Inteligência Artificial Para o Seu Negócio</title>
        <meta name="description" content="Transformamos ideias em soluções digitais inovadoras com Inteligência Artificial, desenvolvimento web e mobile." />
      </Helmet>
      
      <SchedulingModal isOpen={isSchedulingModalOpen} onClose={() => setIsSchedulingModalOpen(false)} />

      <div className="bg-background text-foreground min-h-screen">
        {/* HEADER */}
        <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="text-2xl font-bold flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  IA Code Labs
                </span>
              </motion.div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#home" className="hover:text-blue-600 transition-colors">Início</a>
                <a href="#services" className="hover:text-blue-600 transition-colors">Serviços</a>
                <a href="#process" className="hover:text-blue-600 transition-colors">Processo</a>
                <a href="#cases" className="hover:text-blue-600 transition-colors">Casos</a>
                <a href="#about" className="hover:text-blue-600 transition-colors">Sobre</a>
                <a href="#contact" className="hover:text-blue-600 transition-colors">Contato</a>
              </div>

              {/* Action Buttons */}
              <div className="hidden md:flex items-center gap-4">
                <Button 
                  onClick={() => navigate('/login')} 
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => setIsSchedulingModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Agendar Consulta
                </Button>
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="md:hidden mt-4 bg-card rounded-lg p-4 shadow-lg border border-border"
              >
                <div className="flex flex-col space-y-4">
                  <a href="#home" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors">Início</a>
                  <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors">Serviços</a>
                  <a href="#process" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors">Processo</a>
                  <a href="#cases" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors">Casos</a>
                  <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors">Sobre</a>
                  <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors">Contato</a>
                  <Button onClick={() => navigate('/login')} variant="outline" className="w-full">Login</Button>
                  <Button onClick={() => setIsSchedulingModalOpen(true)} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                    Agendar Consulta
                  </Button>
                </div>
              </motion.div>
            )}
          </nav>
        </header>

        <main className="pt-20">
          {/* HERO SECTION */}
          <section id="home" className="relative py-20 px-6 bg-gradient-to-br from-blue-50 via-background to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                      Inteligência Artificial
                    </span>
                    <br />
                    <span className="text-foreground">Para o Seu Negócio</span>
                  </h1>
                  
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    Transformamos ideias em soluções digitais inovadoras. 
                    Especializados em desenvolvimento web, mobile e sistemas 
                    inteligentes com IA para impulsionar seu negócio.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <Button 
                      size="lg" 
                      onClick={() => setIsSchedulingModalOpen(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6"
                    >
                      Começar Projeto
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline"
                      onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-lg px-8 py-6 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      <Play className="mr-2 w-5 h-5" />
                      Ver Projetos
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="text-center"
                      >
                        <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Image/Visual */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
                    {/* Placeholder for hero image/graphic */}
                    <div className="aspect-square bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center text-white">
                        <Brain className="w-24 h-24 mx-auto mb-4 opacity-80" />
                        <div className="text-lg font-semibold opacity-90">IA Powered Solutions</div>
                      </div>
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-bounce delay-500"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* SERVICES SECTION */}
          <section id="services" className="py-20 px-6 bg-secondary/30">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Soluções Tecnológicas
                  </span>
                  <br />
                  <span className="text-foreground">Completas</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Oferecemos um portfólio completo de serviços para transformar 
                  seu negócio com as mais avançadas tecnologias do mercado.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group bg-card rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mt-6 h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-500 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* PROCESS SECTION */}
          <section id="process" className="py-20 px-6 bg-background">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-foreground">Nosso Processo de</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Trabalho
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Seguimos uma metodologia comprovada para entregar resultados excepcionais 
                  e garantir o sucesso do seu projeto.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {workProcess.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative text-center group"
                  >
                    {/* Connection line */}
                    {index < workProcess.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 opacity-30"></div>
                    )}
                    
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        {step.number}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                        {step.title}
                      </h3>
                      
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SUCCESS CASES SECTION */}
          <section id="cases" className="py-20 px-6 bg-secondary/30">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-foreground">Casos de Sucesso</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Comprovados
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Conheça alguns dos projetos que desenvolvemos e os resultados 
                  extraordinários que alcançamos para nossos clientes.
                </p>
              </motion.div>

              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800 rounded-lg px-4 py-2 text-gray-800 dark:text-white border border-gray-200 dark:border-slate-700 shadow-lg">
                  <span className="text-gray-600 dark:text-slate-400">Filtrar por tecnologia:</span>
                  <select className="bg-transparent border-none text-gray-800 dark:text-white focus:outline-none">
                    <option>Todas as tecnologias</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {successCases.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative"
                  >
                    {/* Image Section */}
                    <div className="aspect-video bg-slate-700 relative overflow-hidden">
                      {/* Category and Badge Tags */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-3 py-1 text-xs bg-blue-600 text-white rounded-full font-medium">
                          🛒 {project.category}
                        </span>
                        <span className="px-3 py-1 text-xs bg-yellow-500 text-black rounded-full font-medium">
                          ⭐ {project.badge}
                        </span>
                      </div>
                      
                      {/* Project Preview Image/Placeholder */}
                      <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-slate-400">
                        {project.category === "E-commerce" && (
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                              <Globe className="w-8 h-8" />
                            </div>
                            <div className="text-sm">E-commerce Preview</div>
                          </div>
                        )}
                        {project.category === "Dashboard" && (
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                              <BarChart3 className="w-8 h-8" />
                            </div>
                            <div className="text-sm">Dashboard Preview</div>
                          </div>
                        )}
                        {project.category === "API" && (
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                              <Database className="w-8 h-8" />
                            </div>
                            <div className="text-sm">API Preview</div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                        {project.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-2 mb-4">
                        {project.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded border border-slate-600"
                          >
                            {tech}
                          </span>
                        ))}
                        <span className="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded border border-slate-600">
                          {project.additionalTech}
                        </span>
                      </div>

                      {/* Result */}
                      <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-3 mb-4">
                        <p className="text-green-400 text-sm font-medium">{project.result}</p>
                      </div>

                      {/* Button */}
                      <button className="w-full bg-gray-600 hover:bg-gray-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group">
                        <span>{project.buttonText}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ABOUT SECTION */}
          <section id="about" className="py-20 px-6 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-white">
            <div className="container mx-auto">
              {/* Header com Link "Sobre Nós" */}
              <div className="text-center mb-4">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block"
                >
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-medium px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    Sobre Nós
                  </span>
                </motion.div>
              </div>

              {/* Título Principal */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800 dark:text-white">Quem Somos a </span>
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    IA Code Labs
                  </span>
                </h2>
                
                <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed max-w-4xl mx-auto">
                  Somos uma empresa especializada em desenvolvimento de software e 
                  inteligência artificial, comprometida em transformar ideias em soluções 
                  tecnológicas inovadoras que impulsionam o crescimento dos nossos clientes.
                </p>
              </motion.div>

              {/* Estatísticas */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-6 bg-white/70 dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800/80 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-600 dark:text-slate-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Seções de Informações */}
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Coluna Esquerda */}
                <div className="space-y-8">
                  {/* Nossa Missão */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Nossa Missão</h3>
                    <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                      Capacitar empresas através da tecnologia, desenvolvendo soluções de 
                      software personalizadas e implementando inteligência artificial para otimizar 
                      processos, aumentar a eficiência e gerar valor real para nossos clientes.
                    </p>
                  </motion.div>

                  {/* Nossa Visão */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Nossa Visão</h3>
                    <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                      Ser reconhecida como a principal referência em desenvolvimento de 
                      software e IA, criando um futuro onde a tecnologia inteligente seja acessível 
                      e transformadora para empresas de todos os portes.
                    </p>
                  </motion.div>

                  {/* Tecnologias */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-2"
                  >
                    {["React/Next.js", "Python/Django", "Node.js", "Machine Learning", "Cloud AWS/Azure", "DevOps"].map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-blue-500/20 text-blue-600 dark:text-blue-300 rounded-lg text-sm border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Coluna Direita */}
                <div className="grid grid-cols-1 gap-6">
                  {/* Excelência Técnica */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/70 dark:bg-slate-800/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700/50 shadow-lg"
                  >
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                      <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Excelência Técnica</h4>
                    <p className="text-gray-600 dark:text-slate-300 text-sm">
                      Utilizamos as melhores práticas e tecnologias mais modernas para 
                      garantir qualidade excepcional em cada projeto.
                    </p>
                  </motion.div>

                  {/* Inovação Constante */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/70 dark:bg-slate-800/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700/50 shadow-lg"
                  >
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                      <Rocket className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Inovação Constante</h4>
                    <p className="text-gray-600 dark:text-slate-300 text-sm">
                      Mantemos-nos sempre na vanguarda tecnológica, 
                      explorando novas possibilidades em IA e desenvolvimento.
                    </p>
                  </motion.div>

                  {/* Agilidade na Entrega */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/70 dark:bg-slate-800/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700/50 shadow-lg"
                  >
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Agilidade na Entrega</h4>
                    <p className="text-gray-600 dark:text-slate-300 text-sm">
                      Metodologias ágeis garantem entregas rápidas sem 
                      comprometer a qualidade e a satisfação do cliente.
                    </p>
                  </motion.div>

                  {/* Parceria Verdadeira */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/70 dark:bg-slate-800/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700/50 shadow-lg"
                  >
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Parceria Verdadeira</h4>
                    <p className="text-gray-600 dark:text-slate-300 text-sm">
                      Trabalhamos como uma extensão da sua equipe, entendendo 
                      profundamente suas necessidades e objetivos.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS SECTION */}
          <section className="py-20 px-6 bg-secondary/30">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-foreground">O que Nossos</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Clientes Dizem
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  A satisfação dos nossos clientes é nossa maior conquista. 
                  Veja o que eles têm a dizer sobre nosso trabalho.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-xl p-8 shadow-lg border border-border/50 relative"
                  >
                    <div className="absolute -top-4 -left-4 text-6xl text-blue-500/20 font-serif">"</div>
                    
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground mb-6 italic text-lg leading-relaxed">
                      {testimonial.text}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact" className="py-20 px-6 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-white">
            <div className="container mx-auto">
              {/* Header com Link "Contato" */}
              <div className="text-center mb-4">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block"
                >
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-medium px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    Contato
                  </span>
                </motion.div>
              </div>

              {/* Título Principal */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800 dark:text-white">Vamos Criar Algo </span>
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Incrível Juntos
                  </span>
                </h2>
                
                <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">
                  Pronto para transformar sua ideia em realidade? Entre em contato conosco e 
                  vamos discutir como podemos ajudar seu negócio a crescer com tecnologia.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Coluna Esquerda - Informações de Contato */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Entre em Contato</h3>
                    <p className="text-gray-600 dark:text-slate-300 mb-8">
                      Estamos aqui para ajudar! Seja qual for o seu projeto ou dúvida, 
                      nossa equipe está pronta para oferecer a melhor solução.
                    </p>
                  </div>

                  {/* Informações de Contato */}
                  <div className="space-y-6">
                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 p-4 bg-white/70 dark:bg-slate-800/50 rounded-lg border border-gray-200 dark:border-slate-700/50 shadow-lg"
                    >
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Email</h4>
                        <p className="text-blue-600 dark:text-blue-400">contato@iacodelabs.com</p>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Resposta em até 24h</p>
                      </div>
                    </motion.div>

                    {/* Telefone */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center gap-4 p-4 bg-white/70 dark:bg-slate-800/50 rounded-lg border border-gray-200 dark:border-slate-700/50 shadow-lg"
                    >
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Telefone</h4>
                        <p className="text-green-600 dark:text-green-400">+55 (11) 99999-9999</p>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Seg a Sex, 9h às 18h</p>
                      </div>
                    </motion.div>

                    {/* Localização */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-4 p-4 bg-white/70 dark:bg-slate-800/50 rounded-lg border border-gray-200 dark:border-slate-700/50 shadow-lg"
                    >
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Localização</h4>
                        <p className="text-purple-600 dark:text-purple-400">São Paulo, Brasil</p>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Atendimento remoto</p>
                      </div>
                    </motion.div>

                    {/* Horário */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-4 p-4 bg-white/70 dark:bg-slate-800/50 rounded-lg border border-gray-200 dark:border-slate-700/50 shadow-lg"
                    >
                      <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Horário</h4>
                        <p className="text-orange-600 dark:text-orange-400">24/7 Suporte</p>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Para clientes ativos</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Por que Escolher a IA Code Labs */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-8"
                  >
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Por que Escolher a IA Code Labs?</h4>
                    <div className="space-y-3">
                      {[
                        "Equipe especializada e experiente",
                        "Tecnologias de ponta",
                        "Suporte contínuo",
                        "Metodologia ágil",
                        "Resultados comprovados"
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <span className="text-gray-600 dark:text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Coluna Direita - Formulário */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Envie sua Mensagem</h3>
                    <p className="text-gray-600 dark:text-slate-300 mb-6">
                      Preencha o formulário abaixo e entraremos em contato em até 24 horas.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Nome Completo */}
                      <div>
                        <label className="block text-gray-800 dark:text-white font-medium mb-2">
                          Nome Completo <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Seu nome completo"
                          className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-gray-800 dark:text-white font-medium mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="seu@email.com"
                          className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Telefone */}
                      <div>
                        <label className="block text-gray-800 dark:text-white font-medium mb-2">Telefone</label>
                        <input
                          type="tel"
                          placeholder="(11) 99999-9999"
                          className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>

                      {/* Empresa */}
                      <div>
                        <label className="block text-gray-800 dark:text-white font-medium mb-2">Empresa</label>
                        <input
                          type="text"
                          placeholder="Nome da empresa"
                          className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Serviço de Interesse */}
                    <div>
                      <label className="block text-gray-800 dark:text-white font-medium mb-2">Serviço de Interesse</label>
                      <select className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                        <option value="">Selecione um serviço</option>
                        <option value="desenvolvimento-web">Desenvolvimento Web</option>
                        <option value="aplicativo-mobile">Aplicativo Mobile</option>
                        <option value="inteligencia-artificial">Inteligência Artificial</option>
                        <option value="analise-dados">Análise de Dados</option>
                        <option value="consultoria">Consultoria Técnica</option>
                        <option value="outros">Outros</option>
                      </select>
                    </div>

                    {/* Mensagem */}
                    <div>
                      <label className="block text-gray-800 dark:text-white font-medium mb-2">
                        Mensagem <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="Conte-nos sobre seu projeto, necessidades e objetivos..."
                        className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        required
                      ></textarea>
                    </div>

                    {/* Botão de Envio */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl"
                    >
                      <span>Enviar Mensagem</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <FooterSection />
        <ChatWidget />
      </div>
    </>
  );
};

export default LandingPage;
