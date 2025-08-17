import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Users, Award } from 'lucide-react';

const AboutSection = () => {
  // Company stats
  const stats = [
    { number: "150+", label: "Projetos Concluídos", icon: CheckCircle },
    { number: "98%", label: "Taxa de Satisfação", icon: Star },
    { number: "50+", label: "Clientes Ativos", icon: Users },
    { number: "5+", label: "Anos de Experiência", icon: Award }
  ];

  return (
    <section id="sobre" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-purple-900/30" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Sobre Nossa Empresa
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Somos uma equipe apaixonada por tecnologia, dedicada a transformar ideias inovadoras 
            em soluções digitais que geram resultados reais para nossos clientes.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-4 mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-cyan-400" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{stat.number}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;