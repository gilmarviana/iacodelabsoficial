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
  ChevronRight
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
      title: "E-commerce Moderno",
      category: "Desenvolvimento Web",
      description: "Plataforma completa de vendas online com IA integrada",
      image: "/api/placeholder/400/250",
      results: ["300% aumento nas vendas", "50% redução no abandono", "24/7 disponibilidade"]
    },
    {
      title: "Aplicativo Analytics",
      category: "Mobile + IA",
      description: "App de análise de dados em tempo real com machine learning",
      image: "/api/placeholder/400/250", 
      results: ["90% precisão em previsões", "Interface intuitiva", "Relatórios automáticos"]
    },
    {
      title: "Sistema de Gestão",
      category: "Sistema Personalizado",
      description: "ERP completo para gestão empresarial integrada",
      image: "/api/placeholder/400/250",
      results: ["60% economia de tempo", "Processos otimizados", "ROI em 6 meses"]
    }
  ];

  // Estatísticas da empresa
  const stats = [
    { number: "50+", label: "Projetos Entregues" },
    { number: "100%", label: "Taxa de Sucesso" },
    { number: "5+", label: "Anos de Experiência" },
    { number: "24/7", label: "Suporte Técnico" }
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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {successCases.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Globe className="w-16 h-16 mx-auto mb-2 opacity-80" />
                        <div className="text-sm opacity-80">Project Preview</div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mb-3">
                        {project.category}
                      </span>
                      
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>

                      <div className="space-y-2">
                        {project.results.map((result, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ABOUT SECTION */}
          <section id="about" className="py-20 px-6 bg-background">
            <div className="container mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    <span className="text-foreground">Quem Somos a</span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      IA Code Labs
                    </span>
                  </h2>
                  
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    Somos uma equipe de especialistas apaixonados por tecnologia e inovação. 
                    Combinamos expertise técnica com visão estratégica para criar soluções 
                    que realmente transformam negócios.
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center p-4 bg-card rounded-lg border border-border/50"
                      >
                        <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  <Button 
                    size="lg"
                    onClick={() => setIsSchedulingModalOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Conhecer Nossa Equipe
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
                    <div className="grid grid-cols-2 gap-6 text-white">
                      <div className="text-center">
                        <Users className="w-12 h-12 mx-auto mb-2 opacity-80" />
                        <div className="text-2xl font-bold">10+</div>
                        <div className="text-sm opacity-80">Especialistas</div>
                      </div>
                      <div className="text-center">
                        <Award className="w-12 h-12 mx-auto mb-2 opacity-80" />
                        <div className="text-2xl font-bold">95%</div>
                        <div className="text-sm opacity-80">Satisfação</div>
                      </div>
                      <div className="text-center">
                        <Target className="w-12 h-12 mx-auto mb-2 opacity-80" />
                        <div className="text-2xl font-bold">100%</div>
                        <div className="text-sm opacity-80">Entregas</div>
                      </div>
                      <div className="text-center">
                        <Clock className="w-12 h-12 mx-auto mb-2 opacity-80" />
                        <div className="text-2xl font-bold">24h</div>
                        <div className="text-sm opacity-80">Suporte</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
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
          <section id="contact" className="py-20 px-6 bg-gradient-to-br from-blue-950/20 via-background to-purple-950/20">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-foreground">Vamos Criar Algo</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Incrível Juntos
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Pronto para transformar sua ideia em realidade? 
                  Entre em contato conosco e vamos discutir como podemos 
                  impulsionar seu negócio com tecnologia de ponta.
                </p>
              </motion.div>

              <div className="max-w-2xl mx-auto">
                <motion.form 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onSubmit={handleSubmit} 
                  className="bg-card/90 backdrop-blur-sm p-8 rounded-2xl border border-border/50 space-y-6 shadow-xl"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 font-medium text-foreground">Nome</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                        placeholder="Seu nome" 
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium text-foreground">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                        placeholder="seu@email.com" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-medium text-foreground">Mensagem</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      rows={5} 
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                      placeholder="Conte-nos sobre seu projeto..."
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6"
                  >
                    Enviar Mensagem
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </motion.form>
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
