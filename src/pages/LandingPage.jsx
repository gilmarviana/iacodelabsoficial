
import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatWidget from '@/components/ChatWidget';
import SchedulingModal from '@/components/SchedulingModal';
import { useNavigate } from 'react-router-dom';

// Import sections
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  ProjectsSection,
  TestimonialsSection,
  ContactSection
} from '@/components/sections';
import FooterSection from './FooterSection';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = useCallback((sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleScheduleClick = () => {
    setIsSchedulingModalOpen(true);
  };

  const handlePortfolioClick = () => {
    scrollToSection('portfolio');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Helmet>
        <title>Desenvolvimento Web & Mobile - Transformamos Ideias em Realidade</title>
        <meta name="description" content="Especialistas em desenvolvimento web, mobile e sistemas personalizados. Transformamos suas ideias em soluções digitais inovadoras." />
      </Helmet>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            >
              DevStudio
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {['Início', 'Sobre', 'Serviços', 'Portfolio', 'Depoimentos', 'Contato'].map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.toLowerCase().replace('í', 'i'))}
                  className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium"
                >
                  {item}
                </motion.button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                onClick={handleLoginClick}
                variant="outline"
                className="hidden md:flex border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors duration-300"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button
                onClick={handleScheduleClick}
                className="hidden md:flex bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
              >
                Agendar Conversa
              </Button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden mt-4 pb-4 space-y-4"
            >
              {['Início', 'Sobre', 'Serviços', 'Portfolio', 'Depoimentos', 'Contato'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace('í', 'i'))}
                  className="block w-full text-left text-white/80 hover:text-cyan-400 transition-colors duration-300 py-2"
                >
                  {item}
                </button>
              ))}
              <Button
                onClick={handleLoginClick}
                variant="outline"
                className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors duration-300 mb-2"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button
                onClick={handleScheduleClick}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600"
              >
                Agendar Conversa
              </Button>
            </motion.nav>
          )}
        </div>
      </header>

      {/* Sections */}
      <HeroSection 
        onScheduleClick={handleScheduleClick}
        onPortfolioClick={handlePortfolioClick}
      />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />

      {/* Footer */}
      <FooterSection />

      <ChatWidget />

      <SchedulingModal
        isOpen={isSchedulingModalOpen}
        onClose={() => setIsSchedulingModalOpen(false)}
      />
    </div>
  );
};

export default LandingPage;