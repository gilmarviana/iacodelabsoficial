import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Database, Code, CheckCircle, Target } from 'lucide-react';

const ServicesSection = () => {
  const [services, setServices] = useState([]);

  // Services process
  const processSteps = [
    {
      step: "01",
      title: "Análise & Planejamento",
      description: "Compreendemos suas necessidades e objetivos para criar uma estratégia personalizada.",
      icon: Target
    },
    {
      step: "02",
      title: "Design & Prototipagem",
      description: "Criamos protótipos interativos e designs que refletem a identidade da sua marca.",
      icon: Code
    },
    {
      step: "03",
      title: "Desenvolvimento",
      description: "Codificamos com as melhores práticas usando tecnologias modernas e escaláveis.",
      icon: Smartphone
    },
    {
      step: "04",
      title: "Testes & Entrega",
      description: "Realizamos testes rigorosos e garantimos uma entrega perfeita e funcional.",
      icon: CheckCircle
    }
  ];

  useEffect(() => {
    // Load services
    const savedServices = JSON.parse(localStorage.getItem('landingPageServices') || '[]');
    if (savedServices.length > 0) {
      setServices(savedServices);
    } else {
      setServices([
        {
          id: 1,
          icon: Globe,
          title: 'Desenvolvimento Web',
          description: 'Sites responsivos e aplicações web modernas com as melhores tecnologias do mercado.',
          features: ['React/Next.js', 'Design Responsivo', 'SEO Otimizado', 'Performance']
        },
        {
          id: 2,
          icon: Smartphone,
          title: 'Apps Mobile',
          description: 'Aplicativos nativos e híbridos para iOS e Android com experiência excepcional.',
          features: ['React Native', 'UI/UX Premium', 'Push Notifications', 'Analytics']
        },
        {
          id: 3,
          icon: Database,
          title: 'Sistemas Personalizados',
          description: 'Soluções sob medida para automatizar e otimizar os processos do seu negócio.',
          features: ['APIs Robustas', 'Dashboards', 'Integração', 'Escalabilidade']
        },
        {
          id: 4,
          icon: Code,
          title: 'Consultoria Tech',
          description: 'Orientação técnica e estratégica para maximizar o potencial tecnológico da empresa.',
          features: ['Arquitetura', 'Code Review', 'DevOps', 'Mentoria']
        }
      ]);
    }
  }, []);

  return (
    <section id="servicos" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-slate-900/50" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Oferecemos soluções completas em tecnologia, desde o conceito até a implementação final.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div className="relative mb-6 w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                {service.features && (
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-400">
                        <CheckCircle className="h-4 w-4 text-cyan-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Process Steps */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Nosso Processo</h3>
          <p className="text-gray-300">Como transformamos suas ideias em realidade</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="relative mb-6 mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border-2 border-cyan-400/30">
                  <IconComponent className="h-8 w-8 text-cyan-400" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.step}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                <p className="text-gray-300">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full">
                    <div className="w-full h-px bg-gradient-to-r from-cyan-400/50 to-purple-500/50" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;