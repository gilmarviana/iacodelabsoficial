import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Eye, 
  Edit3,
  Plus,
  Trash2,
  Layout,
  Settings,
  Palette,
  MessageSquare,
  Mail,
  Users,
  Upload,
  Image,
  Award,
  Star,
  Globe,
  Phone
} from 'lucide-react';

const SiteEditorContentFixed = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [siteData, setSiteData] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCase, setActiveCase] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Inicializar dados apenas uma vez
  useEffect(() => {
    const initializeData = () => {
      try {
        const savedData = localStorage.getItem('siteEditorData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setSiteData(parsedData.siteData);
          if (parsedData.lastSaved) {
            setLastSaved(new Date(parsedData.lastSaved));
          }
        } else {
          // Dados padrão
          setSiteData({
            hero: {
              slides: [
                {
                  id: 1,
                  title: 'Transformando Ideias em',
                  titleHighlight: 'Realidade Digital',
                  subtitle: 'Desenvolvemos soluções de software personalizadas com tecnologias de ponta e inteligência artificial para impulsionar seu negócio.',
                  primaryButton: {
                    text: 'Conhecer Soluções',
                    backgroundColor: '#3B82F6'
                  },
                  secondaryButton: {
                    text: 'Ver Demonstração',
                    backgroundColor: 'transparent'
                  },
                  backgroundColor: '#0F172A',
                  backgroundImage: '/api/placeholder/800/600',
                  features: [
                    'Desenvolvimento Personalizado',
                    'IA & Machine Learning',
                    'Automação Inteligente'
                  ],
                  statistics: [
                    { value: '50+', label: 'Projetos' },
                    { value: '5+', label: 'Anos' },
                    { value: '100%', label: 'Sucesso' }
                  ]
                },
                {
                  id: 2,
                  title: 'Inteligência Artificial',
                  titleHighlight: 'Para o Seu Negócio',
                  subtitle: 'Implementamos soluções de IA que automatizam processos, otimizam operações e geram insights valiosos para decisões estratégicas.',
                  primaryButton: {
                    text: 'Explorar IA',
                    backgroundColor: '#3B82F6'
                  },
                  secondaryButton: {
                    text: 'Ver Demonstração',
                    backgroundColor: 'transparent'
                  },
                  backgroundColor: '#0F172A',
                  backgroundImage: '/api/placeholder/800/600',
                  features: [
                    'Análise Preditiva',
                    'Automação de Processos',
                    'Insights Inteligentes'
                  ],
                  statistics: [
                    { value: '50+', label: 'Projetos' },
                    { value: '5+', label: 'Anos' },
                    { value: '100%', label: 'Sucesso' }
                  ]
                },
                {
                  id: 3,
                  title: 'Desenvolvimento Web',
                  titleHighlight: 'Moderno & Responsivo',
                  subtitle: 'Criamos aplicações web e mobile de alta performance, com design moderno e experiência de usuário excepcional.',
                  primaryButton: {
                    text: 'Ver Projetos',
                    backgroundColor: '#3B82F6'
                  },
                  secondaryButton: {
                    text: 'Ver Demonstração',
                    backgroundColor: 'transparent'
                  },
                  backgroundColor: '#0F172A',
                  backgroundImage: '/api/placeholder/800/600',
                  features: [
                    'React & Next.js',
                    'Design Responsivo',
                    'Performance Otimizada'
                  ],
                  statistics: [
                    { value: '50+', label: 'Projetos' },
                    { value: '5+', label: 'Anos' },
                    { value: '100%', label: 'Sucesso' }
                  ]
                }
              ],
              autoSlide: true,
              slideInterval: 5000
            },
            services: {
              title: 'Soluções Tecnológicas Completas',
              subtitle: 'Oferecemos um portfólio completo de serviços para transformar seu negócio com as mais avançadas tecnologias do mercado.',
              items: [
                {
                  id: 1,
                  icon: 'Brain',
                  title: 'Desenvolvimento Web',
                  description: 'Criamos sites modernos e responsivos utilizando as mais recentes tecnologias do mercado.',
                  visible: true
                },
                {
                  id: 2,
                  icon: 'Smartphone', 
                  title: 'Aplicações Mobile',
                  description: 'Desenvolvemos aplicativos nativos e híbridos para Android e iOS com alta performance.',
                  visible: true
                },
                {
                  id: 3,
                  icon: 'Database',
                  title: 'Inteligência Artificial',
                  description: 'Implementamos soluções de IA personalizadas para automatizar e otimizar processos.',
                  visible: true
                }
              ]
            },
            header: {
              logo: 'IA Code Labs',
              navigation: [
                { label: 'Início', link: '#home', active: true },
                { label: 'Sobre', link: '#about', active: true },
                { label: 'Serviços', link: '#services', active: true },
                { label: 'Casos de Sucesso', link: '#cases', active: true },
                { label: 'Depoimentos', link: '#testimonials', active: true },
                { label: 'Contato', link: '#contact', active: true }
              ],
              ctaButton: {
                text: 'Falar Conosco',
                link: '#contact'
              }
            },
            about: {
              title: 'Sobre a IA Code Labs',
              subtitle: 'Transformando ideias em realidade digital',
              description: 'Somos uma empresa especializada em desenvolvimento de soluções tecnológicas inovadoras. Com mais de 5 anos de experiência no mercado, ajudamos empresas a crescer através da tecnologia.',
              mission: 'Capacitar empresas através da tecnologia, desenvolvendo soluções de software personalizadas e implementando inteligência artificial para otimizar processos, aumentar a eficiência e gerar valor real para nossos clientes.',
              vision: 'Ser reconhecida como a principal referência em desenvolvimento de software e IA, criando um futuro onde a tecnologia inteligente seja acessível e transformadora para empresas de todos os portes.',
              image: '',
              stats: [
                { value: '50+', label: 'Projetos Entregues', icon: 'Trophy' },
                { value: '100%', label: 'Clientes Satisfeitos', icon: 'Users' },
                { value: '5+', label: 'Anos de Experiência', icon: 'Clock' },
                { value: '24/7', label: 'Suporte Técnico', icon: 'TrendingUp' }
              ],
              features: [
                'React/Next.js',
                'Python/Django', 
                'Node.js',
                'Machine Learning',
                'Cloud AWS/Azure',
                'DevOps'
              ],
              values: [
                {
                  title: 'Excelência Técnica',
                  description: 'Utilizamos as melhores práticas e tecnologias mais modernas para garantir qualidade excepcional em cada projeto.',
                  icon: 'Code'
                },
                {
                  title: 'Inovação Constante',
                  description: 'Mantemos-nos sempre na vanguarda tecnológica, explorando novas possibilidades em IA e desenvolvimento.',
                  icon: 'Rocket'
                },
                {
                  title: 'Agilidade na Entrega',
                  description: 'Metodologias ágeis garantem entregas rápidas sem comprometer a qualidade e a satisfação do cliente.',
                  icon: 'Zap'
                },
                {
                  title: 'Parceria Verdadeira',
                  description: 'Trabalhamos como uma extensão da sua equipe, entendendo profundamente suas necessidades e objetivos.',
                  icon: 'Users'
                }
              ]
            },
            cases: {
              title: 'Casos de Sucesso Comprovados',
              subtitle: 'Projetos que transformaram negócios e geraram resultados extraordinários',
              items: [
                {
                  id: 1,
                  title: 'E-commerce Inteligente',
                  company: 'TechStore Brasil',
                  description: 'Desenvolvimento de plataforma e-commerce com IA para recomendações personalizadas',
                  image: '',
                  results: [
                    '300% aumento nas vendas',
                    '85% melhoria na experiência do usuário',
                    '50% redução no tempo de compra'
                  ],
                  technologies: ['React', 'Node.js', 'IA', 'MongoDB'],
                  category: 'E-commerce'
                },
                {
                  id: 2,
                  title: 'Sistema de Gestão Empresarial',
                  company: 'Logística Pro',
                  description: 'ERP personalizado com automação de processos e dashboards inteligentes',
                  image: '',
                  results: [
                    '70% redução no tempo de operações',
                    '95% automatização de processos',
                    'R$ 2M economia anual'
                  ],
                  technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
                  category: 'Gestão'
                },
                {
                  id: 3,
                  title: 'App Mobile Inovador',
                  company: 'HealthTech Solutions',
                  description: 'Aplicativo móvel para telemedicina com IA diagnóstica',
                  image: '',
                  results: [
                    '10K+ usuários ativos',
                    '98% precisão diagnóstica',
                    '60% redução no tempo de consulta'
                  ],
                  technologies: ['React Native', 'TensorFlow', 'Firebase'],
                  category: 'Saúde'
                }
              ]
            },
            testimonials: {
              title: 'Depoimentos de Clientes',
              subtitle: 'O que nossos clientes dizem sobre nosso trabalho',
              items: [
                {
                  id: 1,
                  name: 'Carlos Silva',
                  position: 'CEO',
                  company: 'TechStore Brasil',
                  image: '',
                  rating: 5,
                  text: 'A IA Code Labs transformou completamente nosso e-commerce. O sistema de recomendações inteligentes aumentou nossas vendas em 300%. Equipe extremamente profissional!'
                },
                {
                  id: 2,
                  name: 'Maria Santos',
                  position: 'Diretora de TI',
                  company: 'Logística Pro',
                  image: '',
                  rating: 5,
                  text: 'O ERP desenvolvido pela equipe revolucionou nossa gestão. Automatizamos 95% dos processos e economizamos R$ 2 milhões por ano. Recomendo fortemente!'
                },
                {
                  id: 3,
                  name: 'Dr. João Oliveira',
                  position: 'Diretor Médico',
                  company: 'HealthTech Solutions',
                  image: '',
                  rating: 5,
                  text: 'O aplicativo de telemedicina superou todas as expectativas. A IA diagnóstica tem 98% de precisão e nossos pacientes adoram a praticidade.'
                }
              ]
            },
            contact: {
              title: 'Entre em Contato',
              subtitle: 'Vamos conversar sobre seu próximo projeto',
              description: 'Estamos prontos para transformar suas ideias em soluções digitais inovadoras. Entre em contato conosco!',
              info: {
                email: 'contato@iacodelabs.com',
                phone: '+55 (11) 99999-9999',
                address: 'São Paulo, SP - Brasil',
                hours: 'Segunda a Sexta: 9h às 18h'
              },
              social: [
                { platform: 'LinkedIn', url: 'https://linkedin.com/company/iacodelabs', icon: 'linkedin' },
                { platform: 'GitHub', url: 'https://github.com/iacodelabs', icon: 'github' },
                { platform: 'Instagram', url: 'https://instagram.com/iacodelabs', icon: 'instagram' },
                { platform: 'WhatsApp', url: 'https://wa.me/5511999999999', icon: 'whatsapp' }
              ],
              form: {
                enabled: true,
                fields: [
                  { name: 'name', label: 'Nome Completo', type: 'text', required: true },
                  { name: 'email', label: 'E-mail', type: 'email', required: true },
                  { name: 'phone', label: 'Telefone', type: 'tel', required: false },
                  { name: 'company', label: 'Empresa', type: 'text', required: false },
                  { name: 'message', label: 'Mensagem', type: 'textarea', required: true }
                ]
              }
            },
            footer: {
              logo: 'IA Code Labs',
              description: 'Transformando ideias em soluções digitais inovadoras com inteligência artificial e tecnologias de ponta.',
              sections: [
                {
                  title: 'Serviços',
                  links: [
                    { label: 'Desenvolvimento Web', url: '#services' },
                    { label: 'Aplicativos Mobile', url: '#services' },
                    { label: 'Inteligência Artificial', url: '#services' },
                    { label: 'Consultoria Tech', url: '#contact' }
                  ]
                },
                {
                  title: 'Empresa',
                  links: [
                    { label: 'Sobre Nós', url: '#about' },
                    { label: 'Casos de Sucesso', url: '#cases' },
                    { label: 'Depoimentos', url: '#testimonials' },
                    { label: 'Contato', url: '#contact' }
                  ]
                },
                {
                  title: 'Suporte',
                  links: [
                    { label: 'Central de Ajuda', url: '#contact' },
                    { label: 'Documentação', url: '#' },
                    { label: 'Status do Sistema', url: '#' },
                    { label: 'Política de Privacidade', url: '#' }
                  ]
                }
              ],
              social: [
                { platform: 'LinkedIn', url: 'https://linkedin.com/company/iacodelabs', icon: 'linkedin' },
                { platform: 'GitHub', url: 'https://github.com/iacodelabs', icon: 'github' },
                { platform: 'Instagram', url: 'https://instagram.com/iacodelabs', icon: 'instagram' },
                { platform: 'WhatsApp', url: 'https://wa.me/5511999999999', icon: 'whatsapp' }
              ],
              copyright: '© 2025 IA Code Labs. Todos os direitos reservados.',
              bottomLinks: [
                { label: 'Termos de Uso', url: '#' },
                { label: 'Política de Privacidade', url: '#' },
                { label: 'Cookies', url: '#' }
              ]
            }
          });
        }
      } catch (error) {
        console.error('Erro ao inicializar dados:', error);
        // Fallback para dados padrão em caso de erro
        setSiteData({
          hero: {
            slides: [
              {
                id: 1,
                title: 'Inteligência Artificial Para o Seu Negócio',
                subtitle: 'Transformamos ideias em soluções digitais inovadoras.',
                primaryButtonText: 'Começar Projeto',
                secondaryButtonText: 'Ver Projetos',
                backgroundGradient: 'from-blue-50 via-background to-purple-50',
                statistics: []
              }
            ],
            autoSlide: true,
            slideInterval: 5000
          },
          services: {
            title: 'Soluções Tecnológicas Completas',
            subtitle: 'Oferecemos um portfólio completo de serviços.',
            items: []
          }
        });
      }
    };

    initializeData();
  }, []); // Array vazio garante que execute apenas uma vez

  // Função para salvar dados
  const saveAllChanges = () => {
    if (!siteData) return;
    
    try {
      const dataToSave = {
        siteData: siteData,
        lastSaved: new Date().toISOString(),
        version: '1.0'
      };
      
      // Salvar no localStorage do editor
      localStorage.setItem('siteEditorData', JSON.stringify(dataToSave));
      
      // Salvar também no localStorage que o HeroSlider usa
      localStorage.setItem('siteData', JSON.stringify(siteData));
      
      setHasUnsavedChanges(false);
      setLastSaved(new Date());
      
      // Disparar evento customizado para notificar outras partes da aplicação
      window.dispatchEvent(new CustomEvent('siteDataUpdated', { 
        detail: siteData 
      }));
      
      console.log('Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  // Função para atualizar dados do site
  const updateSiteData = (section, data) => {
    const newSiteData = {
      ...siteData,
      [section]: data
    };
    
    setSiteData(newSiteData);
    setHasUnsavedChanges(true);
    
    // Salvar automaticamente no localStorage
    try {
      const dataToSave = {
        siteData: newSiteData,
        lastSaved: new Date().toISOString(),
        version: '1.0'
      };
      
      // Salvar no localStorage do editor
      localStorage.setItem('siteEditorData', JSON.stringify(dataToSave));
      
      // Salvar também no localStorage que o HeroSlider e LandingPage usam
      localStorage.setItem('siteData', JSON.stringify(newSiteData));
      
      // Disparar evento customizado para notificar outras partes da aplicação
      window.dispatchEvent(new CustomEvent('siteDataUpdated', { 
        detail: newSiteData 
      }));
      
      console.log(`Seção ${section} salva automaticamente!`);
    } catch (error) {
      console.error('Erro ao salvar automaticamente:', error);
    }
  };

  // Seções disponíveis
  const sections = [
    { id: 'header', name: 'Header', icon: Layout },
    { id: 'hero', name: 'Hero Section', icon: Star },
    { id: 'about', name: 'Sobre', icon: MessageSquare },
    { id: 'services', name: 'Serviços', icon: Settings },
    { id: 'cases', name: 'Casos de Sucesso', icon: Award },
    { id: 'testimonials', name: 'Depoimentos', icon: Users },
    { id: 'contact', name: 'Contato', icon: Phone },
    { id: 'footer', name: 'Footer', icon: Globe },
    { id: 'style', name: 'Estilo', icon: Palette }
  ];

  const renderPreviewModeButtons = () => (
    <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
      {[
        { mode: 'desktop', icon: Monitor },
        { mode: 'tablet', icon: Tablet },
        { mode: 'mobile', icon: Smartphone }
      ].map(({ mode, icon: Icon }) => (
        <Button
          key={mode}
          variant={previewMode === mode ? "default" : "ghost"}
          size="sm"
          onClick={() => setPreviewMode(mode)}
        >
          <Icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );

  const renderHeroEditor = () => {
    if (!siteData?.hero) return <div>Carregando...</div>;
    
    const slides = siteData.hero.slides || [];
    
    // Função para adicionar novo slide
    const addSlide = () => {
      const newSlide = {
        id: Date.now(),
        title: 'Novo Slide',
        titleHighlight: 'Título Destacado',
        subtitle: 'Descrição do novo slide',
        primaryButton: {
          text: 'Botão Principal',
          backgroundColor: '#3B82F6'
        },
        secondaryButton: {
          text: 'Botão Secundário',
          backgroundColor: 'transparent'
        },
        backgroundColor: '#0F172A',
        backgroundImage: '',
        features: [
          'Feature 1',
          'Feature 2',
          'Feature 3'
        ],
        statistics: [
          { value: '0+', label: 'Estatística 1' },
          { value: '0%', label: 'Estatística 2' },
          { value: '0+', label: 'Estatística 3' }
        ]
      };
      
      const newSlides = [...slides, newSlide];
      updateSiteData('hero', { 
        ...siteData.hero, 
        slides: newSlides 
      });
    };
    
    // Função para remover slide
    const removeSlide = (slideIndex) => {
      if (slides.length <= 1) return; // Manter pelo menos um slide
      
      const newSlides = slides.filter((_, index) => index !== slideIndex);
      updateSiteData('hero', { 
        ...siteData.hero, 
        slides: newSlides 
      });
      
      // Ajustar o slide ativo se necessário
      if (activeSlide >= newSlides.length) {
        setActiveSlide(newSlides.length - 1);
      }
    };
    
    // Função para atualizar slide específico
    const updateSlide = (slideIndex, field, value) => {
      const newSlides = [...slides];
      newSlides[slideIndex] = { ...newSlides[slideIndex], [field]: value };
      updateSiteData('hero', { 
        ...siteData.hero, 
        slides: newSlides 
      });
    };
    
    // Função para atualizar estatística de um slide
    const updateSlideStatistic = (slideIndex, statIndex, field, value) => {
      const newSlides = [...slides];
      const newStats = [...(newSlides[slideIndex].statistics || [])];
      newStats[statIndex] = { ...newStats[statIndex], [field]: value };
      newSlides[slideIndex] = { ...newSlides[slideIndex], statistics: newStats };
      updateSiteData('hero', { 
        ...siteData.hero, 
        slides: newSlides 
      });
    };
    
    const currentSlide = slides[activeSlide] || {};
    
    return (
      <div className="space-y-6">
        {/* Controles gerais do Hero */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4">Configurações Gerais</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={siteData.hero.autoSlide || false}
                  onChange={(e) => updateSiteData('hero', { 
                    ...siteData.hero, 
                    autoSlide: e.target.checked 
                  })}
                  className="rounded"
                />
                <span className="text-sm font-medium">Transição Automática</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Intervalo (ms)</label>
              <Input
                type="number"
                value={siteData.hero.slideInterval || 5000}
                onChange={(e) => updateSiteData('hero', { 
                  ...siteData.hero, 
                  slideInterval: parseInt(e.target.value) || 5000 
                })}
                placeholder="5000"
                min="1000"
                step="1000"
              />
            </div>
          </div>
        </div>

        {/* Navegação de slides */}
        <div className="border-b pb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Slides ({slides.length})</h3>
            <Button onClick={addSlide} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Slide
            </Button>
          </div>
          
          <div className="flex gap-2 mb-4">
            {slides.map((slide, index) => (
              <div key={slide.id || index} className="flex items-center gap-2">
                <Button
                  variant={activeSlide === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveSlide(index)}
                >
                  Slide {index + 1}
                </Button>
                {slides.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeSlide(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Editor do slide atual */}
        {slides.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Editando Slide {activeSlide + 1}</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Título Principal</label>
              <Input
                value={currentSlide.title || ''}
                onChange={(e) => updateSlide(activeSlide, 'title', e.target.value)}
                placeholder="Digite o título principal"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Título Destacado</label>
              <Input
                value={currentSlide.titleHighlight || ''}
                onChange={(e) => updateSlide(activeSlide, 'titleHighlight', e.target.value)}
                placeholder="Digite o título que aparecerá em destaque"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Subtítulo</label>
              <Textarea
                value={currentSlide.subtitle || ''}
                onChange={(e) => updateSlide(activeSlide, 'subtitle', e.target.value)}
                placeholder="Digite o subtítulo"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Botão Principal</label>
                <Input
                  value={currentSlide.primaryButton?.text || ''}
                  onChange={(e) => updateSlide(activeSlide, 'primaryButton', { 
                    ...currentSlide.primaryButton, 
                    text: e.target.value 
                  })}
                  placeholder="Texto do botão principal"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Botão Secundário</label>
                <Input
                  value={currentSlide.secondaryButton?.text || ''}
                  onChange={(e) => updateSlide(activeSlide, 'secondaryButton', { 
                    ...currentSlide.secondaryButton, 
                    text: e.target.value 
                  })}
                  placeholder="Texto do botão secundário"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cor de Fundo</label>
              <Input
                type="color"
                value={currentSlide.backgroundColor || '#0F172A'}
                onChange={(e) => updateSlide(activeSlide, 'backgroundColor', e.target.value)}
                className="w-full h-10"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Image className="h-4 w-4" />
                Imagem de Fundo
              </label>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">URL da Imagem</label>
                  <Input
                    type="url"
                    value={currentSlide.backgroundImage || ''}
                    onChange={(e) => updateSlide(activeSlide, 'backgroundImage', e.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
                
                <div className="text-center text-sm text-muted-foreground">ou</div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Upload className="h-4 w-4" />
                    Upload de Imagem
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        // Verificar tamanho do arquivo (máx 5MB)
                        if (file.size > 5 * 1024 * 1024) {
                          alert('Arquivo muito grande! Máximo 5MB permitido.');
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          updateSlide(activeSlide, 'backgroundImage', event.target.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Formatos suportados: JPG, PNG, GIF, WebP (máx. 5MB)
                  </p>
                </div>

                {currentSlide.backgroundImage && (
                  <div className="mt-3">
                    <label className="block text-sm text-muted-foreground mb-2">Preview</label>
                    <div className="relative w-full h-32 border rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={currentSlide.backgroundImage}
                        alt="Preview da imagem"
                        className="w-full h-full object-cover"
                        onError={() => {
                          // Se a imagem falhar ao carregar, limpar o campo
                          updateSlide(activeSlide, 'backgroundImage', '');
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => updateSlide(activeSlide, 'backgroundImage', '')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Image className="h-4 w-4" />
                Imagem da Seção Direita
              </label>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">URL da Imagem</label>
                  <Input
                    type="url"
                    value={currentSlide.sectionImage || ''}
                    onChange={(e) => updateSlide(activeSlide, 'sectionImage', e.target.value)}
                    placeholder="https://exemplo.com/imagem-secao.jpg"
                  />
                </div>
                
                <div className="text-center text-sm text-muted-foreground">ou</div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Upload className="h-4 w-4" />
                    Upload de Imagem
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        // Verificar tamanho do arquivo (máx 5MB)
                        if (file.size > 5 * 1024 * 1024) {
                          alert('Arquivo muito grande! Máximo 5MB permitido.');
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          updateSlide(activeSlide, 'sectionImage', event.target.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Imagem que aparecerá na seção direita do slide
                  </p>
                </div>

                {currentSlide.sectionImage && (
                  <div className="mt-3">
                    <label className="block text-sm text-muted-foreground mb-2">Preview</label>
                    <div className="relative w-full h-32 border rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={currentSlide.sectionImage}
                        alt="Preview da imagem da seção"
                        className="w-full h-full object-cover"
                        onError={() => {
                          updateSlide(activeSlide, 'sectionImage', '');
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => updateSlide(activeSlide, 'sectionImage', '')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Features</label>
              <div className="space-y-2">
                {(currentSlide.features || []).map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature || ''}
                      onChange={(e) => {
                        const newFeatures = [...(currentSlide.features || [])];
                        newFeatures[index] = e.target.value;
                        updateSlide(activeSlide, 'features', newFeatures);
                      }}
                      placeholder={`Feature ${index + 1}`}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newFeatures = (currentSlide.features || []).filter((_, i) => i !== index);
                        updateSlide(activeSlide, 'features', newFeatures);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newFeatures = [...(currentSlide.features || []), 'Nova Feature'];
                    updateSlide(activeSlide, 'features', newFeatures);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Feature
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Estatísticas</label>
              <div className="space-y-2">
                {(currentSlide.statistics || []).map((stat, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2">
                    <Input
                      value={stat.value || ''}
                      onChange={(e) => updateSlideStatistic(activeSlide, index, 'value', e.target.value)}
                      placeholder="Valor (ex: 50+)"
                    />
                    <Input
                      value={stat.label || ''}
                      onChange={(e) => updateSlideStatistic(activeSlide, index, 'label', e.target.value)}
                      placeholder="Label (ex: Projetos)"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderServicesEditor = () => {
    if (!siteData?.services) return <div>Carregando...</div>;
    
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Título da Seção</label>
          <Input
            value={siteData.services.title || ''}
            onChange={(e) => updateSiteData('services', { 
              ...siteData.services, 
              title: e.target.value 
            })}
            placeholder="Título da seção de serviços"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Subtítulo</label>
          <Textarea
            value={siteData.services.subtitle || ''}
            onChange={(e) => updateSiteData('services', { 
              ...siteData.services, 
              subtitle: e.target.value 
            })}
            placeholder="Subtítulo da seção"
            rows={2}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Serviços</h3>
          <div className="space-y-4">
            {(siteData.services.items || []).map((service, index) => (
              <Card key={service.id || index} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Input
                      value={service.title || ''}
                      onChange={(e) => {
                        const newItems = [...(siteData.services.items || [])];
                        newItems[index] = { ...newItems[index], title: e.target.value };
                        updateSiteData('services', { 
                          ...siteData.services, 
                          items: newItems 
                        });
                      }}
                      placeholder="Título do serviço"
                      className="font-medium"
                    />
                    <Badge variant={service.visible ? "default" : "secondary"}>
                      {service.visible ? "Visível" : "Oculto"}
                    </Badge>
                  </div>
                  
                  <Textarea
                    value={service.description || ''}
                    onChange={(e) => {
                      const newItems = [...(siteData.services.items || [])];
                      newItems[index] = { ...newItems[index], description: e.target.value };
                      updateSiteData('services', { 
                        ...siteData.services, 
                        items: newItems 
                      });
                    }}
                    placeholder="Descrição do serviço"
                    rows={2}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderHeaderEditor = () => {
    if (!siteData?.header) {
      // Inicializar dados do header se não existirem
      const defaultHeaderData = {
        logo: 'IA Code Labs',
        navigation: [
          { label: 'Início', link: '#home', active: true },
          { label: 'Sobre', link: '#about', active: true },
          { label: 'Serviços', link: '#services', active: true },
          { label: 'Casos de Sucesso', link: '#cases', active: true },
          { label: 'Depoimentos', link: '#testimonials', active: true },
          { label: 'Contato', link: '#contact', active: true }
        ],
        ctaButton: {
          text: 'Falar Conosco',
          link: '#contact'
        }
      };
      
      updateSiteData('header', defaultHeaderData);
      return <div>Inicializando dados do header...</div>;
    }
    
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Logo</label>
          <Input
            value={siteData.header.logo || ''}
            onChange={(e) => updateSiteData('header', { 
              ...siteData.header, 
              logo: e.target.value 
            })}
            placeholder="Nome da empresa/logo"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Navegação</label>
          <div className="space-y-2">
            {(siteData.header.navigation || []).map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <Input
                  value={item.label || ''}
                  onChange={(e) => {
                    const newNav = [...siteData.header.navigation];
                    newNav[index] = { ...newNav[index], label: e.target.value };
                    updateSiteData('header', { ...siteData.header, navigation: newNav });
                  }}
                  placeholder="Label"
                />
                <Input
                  value={item.link || ''}
                  onChange={(e) => {
                    const newNav = [...siteData.header.navigation];
                    newNav[index] = { ...newNav[index], link: e.target.value };
                    updateSiteData('header', { ...siteData.header, navigation: newNav });
                  }}
                  placeholder="Link"
                />
                <div className="flex gap-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.active || false}
                      onChange={(e) => {
                        const newNav = [...siteData.header.navigation];
                        newNav[index] = { ...newNav[index], active: e.target.checked };
                        updateSiteData('header', { ...siteData.header, navigation: newNav });
                      }}
                      className="mr-1"
                    />
                    Ativo
                  </label>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      const newNav = siteData.header.navigation.filter((_, i) => i !== index);
                      updateSiteData('header', { ...siteData.header, navigation: newNav });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const newNav = [...(siteData.header.navigation || []), { label: 'Novo Item', link: '#', active: true }];
                updateSiteData('header', { ...siteData.header, navigation: newNav });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Item
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Botão CTA</label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              value={siteData.header.ctaButton?.text || ''}
              onChange={(e) => updateSiteData('header', { 
                ...siteData.header, 
                ctaButton: { ...siteData.header.ctaButton, text: e.target.value }
              })}
              placeholder="Texto do botão"
            />
            <Input
              value={siteData.header.ctaButton?.link || ''}
              onChange={(e) => updateSiteData('header', { 
                ...siteData.header, 
                ctaButton: { ...siteData.header.ctaButton, link: e.target.value }
              })}
              placeholder="Link do botão"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderAboutEditor = () => {
    if (!siteData?.about) {
      // Inicializar dados da seção sobre se não existirem
      const defaultAboutData = {
        title: 'Sobre a IA Code Labs',
        subtitle: 'Transformando ideias em realidade digital',
        description: 'Somos uma empresa especializada em desenvolvimento de soluções tecnológicas inovadoras.',
        mission: 'Capacitar empresas através da tecnologia, desenvolvendo soluções de software personalizadas.',
        vision: 'Ser reconhecida como a principal referência em desenvolvimento de software e IA.',
        image: '',
        stats: [
          { value: '50+', label: 'Projetos Entregues', icon: 'Trophy' },
          { value: '100%', label: 'Clientes Satisfeitos', icon: 'Users' },
          { value: '5+', label: 'Anos de Experiência', icon: 'Clock' },
          { value: '24/7', label: 'Suporte Técnico', icon: 'TrendingUp' }
        ],
        features: ['React/Next.js', 'Python/Django', 'Node.js', 'Machine Learning', 'Cloud AWS/Azure', 'DevOps'],
        values: [
          {
            title: 'Excelência Técnica',
            description: 'Utilizamos as melhores práticas e tecnologias mais modernas.',
            icon: 'Code'
          },
          {
            title: 'Inovação Constante',
            description: 'Mantemos-nos sempre na vanguarda tecnológica.',
            icon: 'Rocket'
          }
        ]
      };
      
      updateSiteData('about', defaultAboutData);
      return <div>Inicializando dados da seção sobre...</div>;
    }
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Título</label>
            <Input
              value={siteData.about.title || ''}
              onChange={(e) => updateSiteData('about', { 
                ...siteData.about, 
                title: e.target.value 
              })}
              placeholder="Título da seção sobre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Subtítulo</label>
            <Input
              value={siteData.about.subtitle || ''}
              onChange={(e) => updateSiteData('about', { 
                ...siteData.about, 
                subtitle: e.target.value 
              })}
              placeholder="Subtítulo da seção sobre"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Descrição</label>
          <Textarea
            value={siteData.about.description || ''}
            onChange={(e) => updateSiteData('about', { 
              ...siteData.about, 
              description: e.target.value 
            })}
            placeholder="Descrição geral da empresa"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Missão</label>
            <Textarea
              value={siteData.about.mission || ''}
              onChange={(e) => updateSiteData('about', { 
                ...siteData.about, 
                mission: e.target.value 
              })}
              placeholder="Missão da empresa"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Visão</label>
            <Textarea
              value={siteData.about.vision || ''}
              onChange={(e) => updateSiteData('about', { 
                ...siteData.about, 
                vision: e.target.value 
              })}
              placeholder="Visão da empresa"
              rows={4}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Estatísticas</label>
          <div className="space-y-2">
            {(siteData.about.stats || []).map((stat, index) => (
              <div key={index} className="grid grid-cols-4 gap-2">
                <Input
                  value={stat.value || ''}
                  onChange={(e) => {
                    const newStats = [...siteData.about.stats];
                    newStats[index] = { ...newStats[index], value: e.target.value };
                    updateSiteData('about', { ...siteData.about, stats: newStats });
                  }}
                  placeholder="Valor"
                />
                <Input
                  value={stat.label || ''}
                  onChange={(e) => {
                    const newStats = [...siteData.about.stats];
                    newStats[index] = { ...newStats[index], label: e.target.value };
                    updateSiteData('about', { ...siteData.about, stats: newStats });
                  }}
                  placeholder="Label"
                />
                <Input
                  value={stat.icon || ''}
                  onChange={(e) => {
                    const newStats = [...siteData.about.stats];
                    newStats[index] = { ...newStats[index], icon: e.target.value };
                    updateSiteData('about', { ...siteData.about, stats: newStats });
                  }}
                  placeholder="Ícone"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    const newStats = siteData.about.stats.filter((_, i) => i !== index);
                    updateSiteData('about', { ...siteData.about, stats: newStats });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const newStats = [...(siteData.about.stats || []), { value: '', label: '', icon: 'Trophy' }];
                updateSiteData('about', { ...siteData.about, stats: newStats });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Estatística
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Valores</label>
          <div className="space-y-4">
            {(siteData.about.values || []).map((value, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Input
                    value={value.title || ''}
                    onChange={(e) => {
                      const newValues = [...siteData.about.values];
                      newValues[index] = { ...newValues[index], title: e.target.value };
                      updateSiteData('about', { ...siteData.about, values: newValues });
                    }}
                    placeholder="Título do valor"
                  />
                  <Input
                    value={value.icon || ''}
                    onChange={(e) => {
                      const newValues = [...siteData.about.values];
                      newValues[index] = { ...newValues[index], icon: e.target.value };
                      updateSiteData('about', { ...siteData.about, values: newValues });
                    }}
                    placeholder="Ícone"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      const newValues = siteData.about.values.filter((_, i) => i !== index);
                      updateSiteData('about', { ...siteData.about, values: newValues });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  value={value.description || ''}
                  onChange={(e) => {
                    const newValues = [...siteData.about.values];
                    newValues[index] = { ...newValues[index], description: e.target.value };
                    updateSiteData('about', { ...siteData.about, values: newValues });
                  }}
                  placeholder="Descrição do valor"
                  rows={2}
                />
              </div>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const newValues = [...(siteData.about.values || []), { title: '', description: '', icon: 'Code' }];
                updateSiteData('about', { ...siteData.about, values: newValues });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Valor
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderCasesEditor = () => {
    if (!siteData?.cases) {
      // Inicializar dados dos casos se não existirem
      const defaultCasesData = {
        title: 'Casos de Sucesso Comprovados',
        subtitle: 'Projetos que transformaram negócios e geraram resultados extraordinários.',
        items: [
          {
            id: 1,
            title: 'E-commerce Inteligente',
            company: 'Fashion Store',
            description: 'Plataforma de e-commerce com recomendações por IA.',
            technologies: ['React', 'Node.js', 'Python', 'TensorFlow'],
            results: ['150% aumento nas vendas', '80% redução no tempo de busca'],
            image: '/api/placeholder/600/400',
            category: 'E-commerce'
          }
        ]
      };
      
      updateSiteData('cases', defaultCasesData);
      return <div>Inicializando dados dos casos de sucesso...</div>;
    }
    
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Título da Seção</label>
          <Input
            value={siteData.cases.title || ''}
            onChange={(e) => updateSiteData('cases', { 
              ...siteData.cases, 
              title: e.target.value 
            })}
            placeholder="Título da seção casos de sucesso"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Subtítulo</label>
          <Textarea
            value={siteData.cases.subtitle || ''}
            onChange={(e) => updateSiteData('cases', { 
              ...siteData.cases, 
              subtitle: e.target.value 
            })}
            placeholder="Subtítulo da seção"
            rows={2}
          />
        </div>

        <div>
          <p className="text-sm text-gray-600">
            Editor de casos em desenvolvimento. Total de casos: {(siteData.cases.items || []).length}
          </p>
        </div>
      </div>
    );
  };

  const renderTestimonialsEditor = () => {
      // Inicializar dados dos casos se não existirem
      const defaultCasesData = {
        title: 'Casos de Sucesso Comprovados',
        subtitle: 'Projetos que transformaram negócios e geraram resultados extraordinários.',
        items: [
          {
            id: 1,
            title: 'E-commerce Inteligente',
            company: 'Fashion Store',
            description: 'Plataforma de e-commerce com recomendações por IA.',
            technologies: ['React', 'Node.js', 'Python', 'TensorFlow'],
            results: ['150% aumento nas vendas', '80% redução no tempo de busca'],
            image: '/api/placeholder/600/400',
            category: 'E-commerce'
          }
        ]
      };
      
      updateSiteData('cases', defaultCasesData);
      return <div>Inicializando dados dos casos de sucesso...</div>;
    }
    
    const cases = siteData.cases.items || [];
    
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Título da Seção</label>
          <Input
            value={siteData.cases.title || ''}
            onChange={(e) => updateSiteData('cases', { 
              ...siteData.cases, 
              title: e.target.value 
            })}
            placeholder="Título da seção casos de sucesso"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Subtítulo</label>
          <Textarea
            value={siteData.cases.subtitle || ''}
            onChange={(e) => updateSiteData('cases', { 
              ...siteData.cases, 
              subtitle: e.target.value 
            })}
            placeholder="Subtítulo da seção"
            rows={2}
          />
        </div>

        {/* Lista de casos */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium">Casos de Sucesso</label>
            <Button
              size="sm"
              onClick={() => {
                const newCase = {
                  id: Date.now(),
                  title: 'Novo Caso',
                  company: 'Nome da Empresa',
                  description: 'Descrição do caso',
                  image: '',
                  results: ['Resultado 1', 'Resultado 2'],
                  technologies: ['Tecnologia 1'],
                  category: 'Categoria'
                };
                const newCases = [...cases, newCase];
                updateSiteData('cases', { ...siteData.cases, items: newCases });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Caso
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {cases.map((caseItem, index) => (
              <Button
                key={caseItem.id}
                variant={activeCase === index ? "default" : "outline"}
                className="p-4 h-auto text-left"
                onClick={() => setActiveCase(index)}
              >
                <div>
                  <div className="font-medium">{caseItem.title}</div>
                  <div className="text-sm opacity-60">{caseItem.company}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Editor do caso atual */}
        {cases.length > 0 && (
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-medium">Editando: {cases[activeCase]?.title}</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título do Projeto</label>
                <Input
                  value={cases[activeCase]?.title || ''}
                  onChange={(e) => {
                    const newCases = [...cases];
                    newCases[activeCase] = { ...newCases[activeCase], title: e.target.value };
                    updateSiteData('cases', { ...siteData.cases, items: newCases });
                  }}
                  placeholder="Nome do projeto"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Empresa</label>
                <Input
                  value={cases[activeCase]?.company || ''}
                  onChange={(e) => {
                    const newCases = [...cases];
                    newCases[activeCase] = { ...newCases[activeCase], company: e.target.value };
                    updateSiteData('cases', { ...siteData.cases, items: newCases });
                  }}
                  placeholder="Nome da empresa"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Descrição</label>
              <Textarea
                value={cases[activeCase]?.description || ''}
                onChange={(e) => {
                  const newCases = [...cases];
                  newCases[activeCase] = { ...newCases[activeCase], description: e.target.value };
                  updateSiteData('cases', { ...siteData.cases, items: newCases });
                }}
                placeholder="Descrição do projeto"
                rows={3}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Image className="h-4 w-4" />
                Imagem do Caso
              </label>
              <div className="space-y-2">
                <Input
                  type="url"
                  value={cases[activeCase]?.image || ''}
                  onChange={(e) => {
                    const newCases = [...cases];
                    newCases[activeCase] = { ...newCases[activeCase], image: e.target.value };
                    updateSiteData('cases', { ...siteData.cases, items: newCases });
                  }}
                  placeholder="URL da imagem"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        alert('Arquivo muito grande! Máximo 5MB permitido.');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const newCases = [...cases];
                        newCases[activeCase] = { ...newCases[activeCase], image: event.target.result };
                        updateSiteData('cases', { ...siteData.cases, items: newCases });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="cursor-pointer"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Categoria</label>
                <Input
                  value={cases[activeCase]?.category || ''}
                  onChange={(e) => {
                    const newCases = [...cases];
                    newCases[activeCase] = { ...newCases[activeCase], category: e.target.value };
                    updateSiteData('cases', { ...siteData.cases, items: newCases });
                  }}
                  placeholder="Categoria do projeto"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Resultados</label>
              <div className="space-y-2">
                {(cases[activeCase]?.results || []).map((result, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={result || ''}
                      onChange={(e) => {
                        const newCases = [...cases];
                        const newResults = [...(newCases[activeCase].results || [])];
                        newResults[index] = e.target.value;
                        newCases[activeCase] = { ...newCases[activeCase], results: newResults };
                        updateSiteData('cases', { ...siteData.cases, items: newCases });
                      }}
                      placeholder={`Resultado ${index + 1}`}
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        const newCases = [...cases];
                        const newResults = newCases[activeCase].results.filter((_, i) => i !== index);
                        newCases[activeCase] = { ...newCases[activeCase], results: newResults };
                        updateSiteData('cases', { ...siteData.cases, items: newCases });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newCases = [...cases];
                    const newResults = [...(newCases[activeCase].results || []), 'Novo Resultado'];
                    newCases[activeCase] = { ...newCases[activeCase], results: newResults };
                    updateSiteData('cases', { ...siteData.cases, items: newCases });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Resultado
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tecnologias</label>
              <div className="space-y-2">
                {(cases[activeCase]?.technologies || []).map((tech, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={tech || ''}
                      onChange={(e) => {
                        const newCases = [...cases];
                        const newTechs = [...(newCases[activeCase].technologies || [])];
                        newTechs[index] = e.target.value;
                        newCases[activeCase] = { ...newCases[activeCase], technologies: newTechs };
                        updateSiteData('cases', { ...siteData.cases, items: newCases });
                      }}
                      placeholder={`Tecnologia ${index + 1}`}
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        const newCases = [...cases];
                        const newTechs = newCases[activeCase].technologies.filter((_, i) => i !== index);
                        newCases[activeCase] = { ...newCases[activeCase], technologies: newTechs };
                        updateSiteData('cases', { ...siteData.cases, items: newCases });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newCases = [...cases];
                    const newTechs = [...(newCases[activeCase].technologies || []), 'Nova Tecnologia'];
                    newCases[activeCase] = { ...newCases[activeCase], technologies: newTechs };
                    updateSiteData('cases', { ...siteData.cases, items: newCases });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Tecnologia
                </Button>
              </div>
            </div>

            <Button
              variant="destructive"
              onClick={() => {
                const newCases = cases.filter((_, i) => i !== activeCase);
                updateSiteData('cases', { ...siteData.cases, items: newCases });
                setActiveCase(Math.max(0, activeCase - 1));
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remover Este Caso
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderTestimonialsEditor = () => {
    if (!siteData?.testimonials) {
      // Inicializar dados dos depoimentos se não existirem
      const defaultTestimonialsData = {
        title: 'O que Nossos Clientes Dizem',
        subtitle: 'A satisfação dos nossos clientes é nossa maior conquista.',
        testimonials: [
          {
            id: 1,
            name: 'Carlos Silva',
            role: 'CEO',
            company: 'TechStart',
            text: 'A IA Code Labs transformou completamente nossa operação.',
            rating: 5,
            image: '/api/placeholder/80/80'
          }
        ]
      };
      
      updateSiteData('testimonials', defaultTestimonialsData);
      return <div>Inicializando dados dos depoimentos...</div>;
    }
    
    const testimonials = siteData.testimonials.items || [];
    
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Título da Seção</label>
          <Input
            value={siteData.testimonials.title || ''}
            onChange={(e) => updateSiteData('testimonials', { 
              ...siteData.testimonials, 
              title: e.target.value 
            })}
            placeholder="Título da seção depoimentos"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Subtítulo</label>
          <Textarea
            value={siteData.testimonials.subtitle || ''}
            onChange={(e) => updateSiteData('testimonials', { 
              ...siteData.testimonials, 
              subtitle: e.target.value 
            })}
            placeholder="Subtítulo da seção"
            rows={2}
          />
        </div>

        {/* Lista de depoimentos */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium">Depoimentos</label>
            <Button
              size="sm"
              onClick={() => {
                const newTestimonial = {
                  id: Date.now(),
                  name: 'Nome do Cliente',
                  position: 'Cargo',
                  company: 'Empresa',
                  image: '',
                  rating: 5,
                  text: 'Depoimento do cliente...'
                };
                const newTestimonials = [...testimonials, newTestimonial];
                updateSiteData('testimonials', { ...siteData.testimonials, items: newTestimonials });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Depoimento
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {testimonials.map((testimonial, index) => (
              <Button
                key={testimonial.id}
                variant={activeTestimonial === index ? "default" : "outline"}
                className="p-4 h-auto text-left"
                onClick={() => setActiveTestimonial(index)}
              >
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm opacity-60">{testimonial.company}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Editor do depoimento atual */}
        {testimonials.length > 0 && (
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-medium">Editando: {testimonials[activeTestimonial]?.name}</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nome</label>
                <Input
                  value={testimonials[activeTestimonial]?.name || ''}
                  onChange={(e) => {
                    const newTestimonials = [...testimonials];
                    newTestimonials[activeTestimonial] = { ...newTestimonials[activeTestimonial], name: e.target.value };
                    updateSiteData('testimonials', { ...siteData.testimonials, items: newTestimonials });
                  }}
                  placeholder="Nome do cliente"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Cargo</label>
                <Input
                  value={testimonials[activeTestimonial]?.position || ''}
                  onChange={(e) => {
                    const newTestimonials = [...testimonials];
                    newTestimonials[activeTestimonial] = { ...newTestimonials[activeTestimonial], position: e.target.value };
                    updateSiteData('testimonials', { ...siteData.testimonials, items: newTestimonials });
                  }}
                  placeholder="Cargo do cliente"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Empresa</label>
              <Input
                value={testimonials[activeTestimonial]?.company || ''}
                onChange={(e) => {
                  const newTestimonials = [...testimonials];
                  newTestimonials[activeTestimonial] = { ...newTestimonials[activeTestimonial], company: e.target.value };
                  updateSiteData('testimonials', { ...siteData.testimonials, items: newTestimonials });
                }}
                placeholder="Nome da empresa"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Depoimento</label>
              <Textarea
                value={testimonials[activeTestimonial]?.text || ''}
                onChange={(e) => {
                  const newTestimonials = [...testimonials];
                  newTestimonials[activeTestimonial] = { ...newTestimonials[activeTestimonial], text: e.target.value };
                  updateSiteData('testimonials', { ...siteData.testimonials, items: newTestimonials });
                }}
                placeholder="Texto do depoimento"
                rows={4}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Image className="h-4 w-4" />
                Foto do Cliente
              </label>
              <div className="space-y-2">
                <Input
                  type="url"
                  value={testimonials[activeTestimonial]?.image || ''}
                  onChange={(e) => {
                    const newTestimonials = [...testimonials];
                    newTestimonials[activeTestimonial] = { ...newTestimonials[activeTestimonial], image: e.target.value };
                    updateSiteData('testimonials', { ...siteData.testimonials, items: newTestimonials });
                  }}
                  placeholder="URL da foto"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        alert('Arquivo muito grande! Máximo 5MB permitido.');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const newTestimonials = [...testimonials];
                        newTestimonials[activeTestimonial] = { ...newTestimonials[activeTestimonial], image: event.target.result };
                        updateSiteData('testimonials', { ...siteData.testimonials, items: newTestimonials });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="cursor-pointer"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Avaliação (estrelas)</label>
              <select
                value={testimonials[activeTestimonial]?.rating || 5}
                onChange={(e) => {
                  const newTestimonials = [...testimonials];
                  newTestimonials[activeTestimonial] = { ...newTestimonials[activeTestimonial], rating: parseInt(e.target.value) };
                  updateSiteData('testimonials', { ...siteData.testimonials, items: newTestimonials });
                }}
                className="w-full p-2 border rounded-md"
              >
                <option value={5}>5 estrelas</option>
                <option value={4}>4 estrelas</option>
                <option value={3}>3 estrelas</option>
                <option value={2}>2 estrelas</option>
                <option value={1}>1 estrela</option>
              </select>
            </div>

            <Button
              variant="destructive"
              onClick={() => {
                const newTestimonials = testimonials.filter((_, i) => i !== activeTestimonial);
                updateSiteData('testimonials', { ...siteData.testimonials, items: newTestimonials });
                setActiveTestimonial(Math.max(0, activeTestimonial - 1));
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remover Este Depoimento
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderContactEditor = () => {
    if (!siteData?.contact) {
      // Inicializar dados de contato se não existirem
      const defaultContactData = {
        title: 'Entre em Contato',
        subtitle: 'Pronto para transformar sua ideia em realidade? Vamos conversar sobre seu projeto.',
        email: 'contato@iacodelabs.com',
        phone: '+55 (11) 99999-9999',
        address: 'São Paulo, SP - Brasil',
        socialMedia: []
      };
      
      updateSiteData('contact', defaultContactData);
      return <div>Inicializando dados de contato...</div>;
    }
    
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Título</label>
          <Input
            value={siteData.contact.title || ''}
            onChange={(e) => updateSiteData('contact', { 
              ...siteData.contact, 
              title: e.target.value 
            })}
            placeholder="Título da seção contato"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Subtítulo</label>
          <Input
            value={siteData.contact.subtitle || ''}
            onChange={(e) => updateSiteData('contact', { 
              ...siteData.contact, 
              subtitle: e.target.value 
            })}
            placeholder="Subtítulo da seção"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Descrição</label>
          <Textarea
            value={siteData.contact.description || ''}
            onChange={(e) => updateSiteData('contact', { 
              ...siteData.contact, 
              description: e.target.value 
            })}
            placeholder="Descrição da seção de contato"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-4">Informações de Contato</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">E-mail</label>
              <Input
                value={siteData.contact.info?.email || ''}
                onChange={(e) => updateSiteData('contact', { 
                  ...siteData.contact, 
                  info: { ...siteData.contact.info, email: e.target.value }
                })}
                placeholder="contato@empresa.com"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Telefone</label>
              <Input
                value={siteData.contact.info?.phone || ''}
                onChange={(e) => updateSiteData('contact', { 
                  ...siteData.contact, 
                  info: { ...siteData.contact.info, phone: e.target.value }
                })}
                placeholder="+55 (11) 99999-9999"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Endereço</label>
              <Input
                value={siteData.contact.info?.address || ''}
                onChange={(e) => updateSiteData('contact', { 
                  ...siteData.contact, 
                  info: { ...siteData.contact.info, address: e.target.value }
                })}
                placeholder="Cidade, Estado - País"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Horário</label>
              <Input
                value={siteData.contact.info?.hours || ''}
                onChange={(e) => updateSiteData('contact', { 
                  ...siteData.contact, 
                  info: { ...siteData.contact.info, hours: e.target.value }
                })}
                placeholder="Segunda a Sexta: 9h às 18h"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Redes Sociais</label>
          <div className="space-y-2">
            {(siteData.contact.social || []).map((social, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <Input
                  value={social.platform || ''}
                  onChange={(e) => {
                    const newSocial = [...siteData.contact.social];
                    newSocial[index] = { ...newSocial[index], platform: e.target.value };
                    updateSiteData('contact', { ...siteData.contact, social: newSocial });
                  }}
                  placeholder="Plataforma"
                />
                <Input
                  value={social.url || ''}
                  onChange={(e) => {
                    const newSocial = [...siteData.contact.social];
                    newSocial[index] = { ...newSocial[index], url: e.target.value };
                    updateSiteData('contact', { ...siteData.contact, social: newSocial });
                  }}
                  placeholder="URL"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    const newSocial = siteData.contact.social.filter((_, i) => i !== index);
                    updateSiteData('contact', { ...siteData.contact, social: newSocial });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const newSocial = [...(siteData.contact.social || []), { platform: 'Nova Rede', url: '', icon: 'link' }];
                updateSiteData('contact', { ...siteData.contact, social: newSocial });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Rede Social
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderFooterEditor = () => {
    if (!siteData?.footer) {
      // Inicializar dados do footer se não existirem
      const defaultFooterData = {
        company: 'IA Code Labs',
        description: 'Especialistas em desenvolvimento de software e inteligência artificial.',
        copyright: '© 2025 IA Code Labs. Todos os direitos reservados.',
        sections: [
          {
            title: 'Links Rápidos',
            links: [
              { text: 'Sobre Nós', href: '#about' },
              { text: 'Serviços', href: '#services' },
              { text: 'Projetos', href: '#cases' },
              { text: 'Contato', href: '#contact' }
            ]
          }
        ],
        contact: {
          email: 'contato@iacodelabs.com',
          phone: '+55 (11) 99999-9999',
          address: 'São Paulo, SP - Brasil'
        }
      };
      
      updateSiteData('footer', defaultFooterData);
      return <div>Inicializando dados do footer...</div>;
    }
    
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Logo</label>
          <Input
            value={siteData.footer.logo || ''}
            onChange={(e) => updateSiteData('footer', { 
              ...siteData.footer, 
              logo: e.target.value 
            })}
            placeholder="Nome da empresa/logo"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Descrição</label>
          <Textarea
            value={siteData.footer.description || ''}
            onChange={(e) => updateSiteData('footer', { 
              ...siteData.footer, 
              description: e.target.value 
            })}
            placeholder="Descrição da empresa no footer"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Seções do Footer</label>
          <div className="space-y-4">
            {(siteData.footer.sections || []).map((section, sectionIndex) => (
              <div key={sectionIndex} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <Input
                    value={section.title || ''}
                    onChange={(e) => {
                      const newSections = [...siteData.footer.sections];
                      newSections[sectionIndex] = { ...newSections[sectionIndex], title: e.target.value };
                      updateSiteData('footer', { ...siteData.footer, sections: newSections });
                    }}
                    placeholder="Título da seção"
                    className="font-medium"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      const newSections = siteData.footer.sections.filter((_, i) => i !== sectionIndex);
                      updateSiteData('footer', { ...siteData.footer, sections: newSections });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {(section.links || []).map((link, linkIndex) => (
                    <div key={linkIndex} className="grid grid-cols-2 gap-2">
                      <Input
                        value={link.label || ''}
                        onChange={(e) => {
                          const newSections = [...siteData.footer.sections];
                          const newLinks = [...newSections[sectionIndex].links];
                          newLinks[linkIndex] = { ...newLinks[linkIndex], label: e.target.value };
                          newSections[sectionIndex] = { ...newSections[sectionIndex], links: newLinks };
                          updateSiteData('footer', { ...siteData.footer, sections: newSections });
                        }}
                        placeholder="Texto do link"
                      />
                      <div className="flex gap-2">
                        <Input
                          value={link.url || ''}
                          onChange={(e) => {
                            const newSections = [...siteData.footer.sections];
                            const newLinks = [...newSections[sectionIndex].links];
                            newLinks[linkIndex] = { ...newLinks[linkIndex], url: e.target.value };
                            newSections[sectionIndex] = { ...newSections[sectionIndex], links: newLinks };
                            updateSiteData('footer', { ...siteData.footer, sections: newSections });
                          }}
                          placeholder="URL"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            const newSections = [...siteData.footer.sections];
                            const newLinks = newSections[sectionIndex].links.filter((_, i) => i !== linkIndex);
                            newSections[sectionIndex] = { ...newSections[sectionIndex], links: newLinks };
                            updateSiteData('footer', { ...siteData.footer, sections: newSections });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const newSections = [...siteData.footer.sections];
                      const newLinks = [...(newSections[sectionIndex].links || []), { label: 'Novo Link', url: '#' }];
                      newSections[sectionIndex] = { ...newSections[sectionIndex], links: newLinks };
                      updateSiteData('footer', { ...siteData.footer, sections: newSections });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Link
                  </Button>
                </div>
              </div>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const newSections = [...(siteData.footer.sections || []), { title: 'Nova Seção', links: [] }];
                updateSiteData('footer', { ...siteData.footer, sections: newSections });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Seção
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Copyright</label>
          <Input
            value={siteData.footer.copyright || ''}
            onChange={(e) => updateSiteData('footer', { 
              ...siteData.footer, 
              copyright: e.target.value 
            })}
            placeholder="© 2025 Empresa. Todos os direitos reservados."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Redes Sociais</label>
          <div className="space-y-2">
            {(siteData.footer.social || []).map((social, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <Input
                  value={social.platform || ''}
                  onChange={(e) => {
                    const newSocial = [...siteData.footer.social];
                    newSocial[index] = { ...newSocial[index], platform: e.target.value };
                    updateSiteData('footer', { ...siteData.footer, social: newSocial });
                  }}
                  placeholder="Plataforma"
                />
                <Input
                  value={social.url || ''}
                  onChange={(e) => {
                    const newSocial = [...siteData.footer.social];
                    newSocial[index] = { ...newSocial[index], url: e.target.value };
                    updateSiteData('footer', { ...siteData.footer, social: newSocial });
                  }}
                  placeholder="URL"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    const newSocial = siteData.footer.social.filter((_, i) => i !== index);
                    updateSiteData('footer', { ...siteData.footer, social: newSocial });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const newSocial = [...(siteData.footer.social || []), { platform: 'Nova Rede', url: '', icon: 'link' }];
                updateSiteData('footer', { ...siteData.footer, social: newSocial });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Rede Social
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderStyleEditor = () => {
    if (!siteData?.style) {
      // Inicializar dados de estilo se não existirem
      const defaultStyleData = {
        theme: 'modern',
        primaryColor: '#3B82F6',
        secondaryColor: '#8B5CF6',
        fontFamily: 'Inter',
        borderRadius: '8px',
        spacing: 'normal'
      };
      
      updateSiteData('style', defaultStyleData);
      return <div>Inicializando configurações de estilo...</div>;
    }
    
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Tema</label>
          <select
            value={siteData.style.theme || 'modern'}
            onChange={(e) => updateSiteData('style', { 
              ...siteData.style, 
              theme: e.target.value 
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="modern">Moderno</option>
            <option value="classic">Clássico</option>
            <option value="minimalist">Minimalista</option>
            <option value="corporate">Corporativo</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Cor Primária</label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={siteData.style.primaryColor || '#3B82F6'}
              onChange={(e) => updateSiteData('style', { 
                ...siteData.style, 
                primaryColor: e.target.value 
              })}
              className="w-12 h-10 border border-gray-300 rounded-md"
            />
            <Input
              value={siteData.style.primaryColor || '#3B82F6'}
              onChange={(e) => updateSiteData('style', { 
                ...siteData.style, 
                primaryColor: e.target.value 
              })}
              placeholder="#3B82F6"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Cor Secundária</label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={siteData.style.secondaryColor || '#8B5CF6'}
              onChange={(e) => updateSiteData('style', { 
                ...siteData.style, 
                secondaryColor: e.target.value 
              })}
              className="w-12 h-10 border border-gray-300 rounded-md"
            />
            <Input
              value={siteData.style.secondaryColor || '#8B5CF6'}
              onChange={(e) => updateSiteData('style', { 
                ...siteData.style, 
                secondaryColor: e.target.value 
              })}
              placeholder="#8B5CF6"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Família de Fonte</label>
          <select
            value={siteData.style.fontFamily || 'Inter'}
            onChange={(e) => updateSiteData('style', { 
              ...siteData.style, 
              fontFamily: e.target.value 
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Poppins">Poppins</option>
            <option value="Lato">Lato</option>
            <option value="Montserrat">Montserrat</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Raio da Borda</label>
          <select
            value={siteData.style.borderRadius || '8px'}
            onChange={(e) => updateSiteData('style', { 
              ...siteData.style, 
              borderRadius: e.target.value 
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="0px">Sem borda (0px)</option>
            <option value="4px">Pequeno (4px)</option>
            <option value="8px">Médio (8px)</option>
            <option value="12px">Grande (12px)</option>
            <option value="16px">Extra Grande (16px)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Espaçamento</label>
          <select
            value={siteData.style.spacing || 'normal'}
            onChange={(e) => updateSiteData('style', { 
              ...siteData.style, 
              spacing: e.target.value 
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="compact">Compacto</option>
            <option value="normal">Normal</option>
            <option value="spacious">Espaçoso</option>
          </select>
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h4 className="font-medium mb-3">Preview das Cores</h4>
          <div className="flex gap-4">
            <div 
              className="w-16 h-16 rounded-md border"
              style={{ backgroundColor: siteData.style.primaryColor || '#3B82F6' }}
              title="Cor Primária"
            ></div>
            <div 
              className="w-16 h-16 rounded-md border"
              style={{ backgroundColor: siteData.style.secondaryColor || '#8B5CF6' }}
              title="Cor Secundária"
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'header':
        return renderHeaderEditor();
      case 'hero':
        return renderHeroEditor();
      case 'about':
        return renderAboutEditor();
      case 'services':
        return renderServicesEditor();
      case 'cases':
        return renderCasesEditor();
      case 'testimonials':
        return renderTestimonialsEditor();
      case 'contact':
        return renderContactEditor();
      case 'footer':
        return renderFooterEditor();
      case 'style':
        return renderStyleEditor();
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Editor para a seção "{activeSection}" em desenvolvimento.</p>
          </div>
        );
    }
  };

  // Loading state
  if (!siteData) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Carregando editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex">
      {/* Sidebar - Seções */}
      <div className="w-64 border-r bg-gray-50 p-4">
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900 mb-4">Seções do Site</h3>
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveSection(section.id)}
              >
                <Icon className="h-4 w-4 mr-2" />
                {section.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Editor Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-4 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Editor de Site</h2>
            <Badge variant={hasUnsavedChanges ? "destructive" : "default"}>
              {hasUnsavedChanges ? "Alterações não salvas" : "Salvo"}
            </Badge>
            {lastSaved && (
              <span className="text-sm text-gray-500">
                Último salvamento: {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {renderPreviewModeButtons()}
            <Button
              onClick={saveAllChanges}
              disabled={!hasUnsavedChanges}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Tudo
            </Button>
          </div>
        </div>

        {/* Conteúdo do Editor */}
        <div className="flex-1 p-6 overflow-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                Editando: {sections.find(s => s.id === activeSection)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderSectionContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SiteEditorContentFixed;
