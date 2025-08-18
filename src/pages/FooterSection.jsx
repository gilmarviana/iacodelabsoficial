import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Brain } from 'lucide-react';
import { useSiteEditorData } from '@/hooks/useSiteEditorData';

const defaultFooterConfig = {
  logoUrl: '',
  logoText: 'IA Code Labs',
  logoHeight: 40,
  logoWidth: 40,
  tagline: 'Especialistas em desenvolvimento de software e inteligência artificial, criando soluções inovadoras que transformam negócios e impulsionam o futuro digital.',
  buttonText: 'Contact Us',
  buttonColor: '#3b82f6',
  contact: {
    email: 'contato@iacodelabs.com',
    phone: '+55 (11) 99999-9999',
    location: 'São Paulo, Brasil'
  },
  quickLinks: [
    { label: 'Sobre Nós', url: '#about' },
    { label: 'Serviços', url: '#services' },
    { label: 'Projetos', url: '#cases' },
    { label: 'Contato', url: '#contact' }
  ],
  bgColor: '#1e293b',
  textColor: '#94a3b8',
  policyLinks: [],
  socialLinks: [
    { icon: 'fab fa-github', url: '#' },
    { icon: 'fab fa-linkedin', url: '#' },
    { icon: 'fab fa-twitter', url: '#' }
  ],
  copyrightText: '© 2025 IA Code Labs. Todos os direitos reservados.',
  copyrightSubText: 'Desenvolvido com ♥ e Inteligência Artificial',
  copyrightBgColor: '#0f172a',
  copyrightTextColor: '#64748b',
};

const FooterSection = () => {
  // Carregar dados do editor de site
  const { siteData: editorData } = useSiteEditorData();
  
  const [footerConfig, setFooterConfig] = useState(() => {
    const saved = localStorage.getItem('landingPageFooterConfig');
    return saved ? JSON.parse(saved) : defaultFooterConfig;
  });

  // Usar dados do editor se disponíveis, senão usar configuração padrão
  const finalFooterConfig = editorData?.footer ? {
    logoText: editorData.footer.company || footerConfig.logoText,
    tagline: editorData.footer.description || footerConfig.tagline,
    contact: {
      email: editorData.footer.contact?.email || footerConfig?.contact?.email || defaultFooterConfig.contact.email,
      phone: editorData.footer.contact?.phone || footerConfig?.contact?.phone || defaultFooterConfig.contact.phone,
      location: editorData.footer.contact?.address || footerConfig?.contact?.location || defaultFooterConfig.contact.location
    },
    quickLinks: editorData.footer.sections?.length > 0 ? 
      editorData.footer.sections.flatMap(section => section.links || []) : 
      footerConfig?.quickLinks || defaultFooterConfig.quickLinks,
    copyrightText: editorData.footer.copyright || footerConfig?.copyrightText || defaultFooterConfig.copyrightText,
    copyrightSubText: footerConfig?.copyrightSubText || defaultFooterConfig.copyrightSubText,
    ...footerConfig
  } : {
    ...defaultFooterConfig,
    ...footerConfig,
    contact: {
      ...defaultFooterConfig.contact,
      ...footerConfig?.contact
    }
  };

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('landingPageFooterConfig');
      setFooterConfig(saved ? JSON.parse(saved) : defaultFooterConfig);
    };
    window.addEventListener('storage', handleStorage);
    
    // Escutar mudanças no editor de site
    const handleSiteDataUpdate = () => {
      // Este evento é disparado quando dados do site são atualizados
      const saved = localStorage.getItem('landingPageFooterConfig');
      setFooterConfig(saved ? JSON.parse(saved) : defaultFooterConfig);
    };
    window.addEventListener('siteDataUpdated', handleSiteDataUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('siteDataUpdated', handleSiteDataUpdate);
    };
  }, []);

  // Also update on tab where editing happens
  useEffect(() => {
    const interval = setInterval(() => {
      const saved = localStorage.getItem('landingPageFooterConfig');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (JSON.stringify(parsed) !== JSON.stringify(footerConfig)) {
          setFooterConfig(parsed);
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [footerConfig]);

  return (
    <>
      <footer className="bg-slate-800 text-slate-300 relative">
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left section - Logo, description and social */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-2xl text-white">
                  {finalFooterConfig?.logoText || 'IA Code Labs'}
                </span>
              </motion.div>
              
              <p className="text-slate-400 leading-relaxed mb-8 max-w-sm">
                {finalFooterConfig?.tagline || 'Especialistas em desenvolvimento de software e inteligência artificial.'}
              </p>

              {/* Social Icons */}
              <div className="flex gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github" style={{ color: '#fff', fontSize: '18px' }}></i>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin" style={{ color: '#fff', fontSize: '18px' }}></i>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter" style={{ color: '#fff', fontSize: '18px' }}></i>
                </motion.a>
              </div>
            </div>

            {/* Middle section - Contact */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold text-white mb-6">Contato</h3>
              
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <Mail className="w-5 h-5 text-blue-400" />
                  <a 
                    href={`mailto:${finalFooterConfig?.contact?.email || 'contato@iacodelabs.com'}`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {finalFooterConfig?.contact?.email || 'contato@iacodelabs.com'}
                  </a>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <Phone className="w-5 h-5 text-blue-400" />
                  <a 
                    href={`tel:${(finalFooterConfig?.contact?.phone || '+55 (11) 99999-9999').replace(/\D/g, '')}`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {finalFooterConfig?.contact?.phone || '+55 (11) 99999-9999'}
                  </a>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-400">
                    {finalFooterConfig?.contact?.location || 'São Paulo, Brasil'}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Right section - Quick Links */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold text-white mb-6">Links Rápidos</h3>
              
              <div className="space-y-3">
                {(finalFooterConfig?.quickLinks || []).map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={link?.url || link?.href || '#'}
                      className="text-slate-400 hover:text-white transition-colors block"
                    >
                      {link?.label || link?.text || link?.title || 'Link'}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Copyright section */}
      <div className="bg-slate-900 text-slate-500">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left">
              {finalFooterConfig?.copyrightText || '© 2025 IA Code Labs. Todos os direitos reservados.'}
            </p>
            <p className="text-sm text-center md:text-right">
              {finalFooterConfig?.copyrightSubText || 'Desenvolvido com ♥ e Inteligência Artificial'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterSection;
