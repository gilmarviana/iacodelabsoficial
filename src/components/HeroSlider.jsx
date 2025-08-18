
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Calendar, Pause, Play } from 'lucide-react';

const HeroSlider = ({ landingPageConfig, onScheduleClick }) => {
  const [siteData, setSiteData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const loadSiteData = () => {
      const savedData = localStorage.getItem('siteData');
      if (savedData) {
        setSiteData(JSON.parse(savedData));
      }
    };

    loadSiteData();

    const handleStorageChange = () => {
      loadSiteData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('siteDataUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('siteDataUpdated', handleStorageChange);
    };
  }, []);

  const slides = siteData?.hero?.slides || [];
  const autoSlide = siteData?.hero?.autoSlide !== false;
  const slideInterval = siteData?.hero?.slideInterval || 5000;

  useEffect(() => {
    if (!autoSlide || !isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, isAutoPlaying, slides.length, slideInterval]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (!slides.length) {
    return (
      <div className="relative h-[calc(100vh-80px)] min-h-[600px] w-full pt-16 bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Carregando...</h1>
          <p className="text-lg md:text-xl opacity-80">Preparando o conteúdo para você</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-80px)] min-h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {(() => {
            const slide = slides[currentSlide];
            if (!slide) return null;

            return (
              <div 
                className="relative w-full h-full pt-16 flex items-center justify-center"
                style={{ backgroundColor: slide.backgroundColor || '#3b82f6' }}
              >
                {/* Background Image */}
                {slide.backgroundImage && (
                  <div className="absolute inset-0">
                    <img 
                      src={slide.backgroundImage} 
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
                  <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                    {/* Text Content */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-white"
                    >
                      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                        {slide.title}
                        {slide.titleHighlight && (
                          <>
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                              {slide.titleHighlight}
                            </span>
                          </>
                        )}
                      </h1>
                      
                      {slide.subtitle && (
                        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
                          {slide.subtitle}
                        </p>
                      )}

                      {/* Features */}
                      {slide.features && slide.features.length > 0 && (
                        <div className="flex flex-wrap gap-4 mb-8">
                          {slide.features.map((feature, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                              className="flex items-center text-sm text-white/90 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
                            >
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                              {feature}
                            </motion.div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        {slide.primaryButton?.text && (
                          <Button 
                            size="lg" 
                            onClick={onScheduleClick}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                          >
                            {slide.primaryButton.text}
                            <ChevronRight className="ml-2 w-5 h-5" />
                          </Button>
                        )}
                        {slide.secondaryButton?.text && (
                          <Button 
                            size="lg" 
                            variant="outline" 
                            className="bg-transparent border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg"
                            onClick={() => handleScrollTo('projects')}
                          >
                            <Play className="mr-2 w-5 h-5" />
                            {slide.secondaryButton.text}
                          </Button>
                        )}
                      </div>

                      {/* Statistics */}
                      {slide.statistics && slide.statistics.length > 0 && (
                        <div className="grid grid-cols-3 gap-8">
                          {slide.statistics.map((stat, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                              className="text-center"
                            >
                              <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">
                                {stat.value}
                              </div>
                              <div className="text-white/70 text-sm">
                                {stat.label}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>

                    {/* Image Content */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="relative"
                    >
                      <div className="relative bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                        {slide.sectionImage ? (
                          <div className="aspect-[4/3] rounded-xl overflow-hidden">
                            <img
                              src={slide.sectionImage}
                              alt={slide.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Se a imagem falhar, mostrar o conteúdo padrão
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center" style={{ display: 'none' }}>
                              {/* Simulação de tela de desenvolvimento/IA como fallback */}
                              <div className="w-full h-full relative bg-gray-900/50 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                                <div className="relative p-6 h-full flex flex-col">
                                  {/* Header simulado */}
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex space-x-2">
                                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                    </div>
                                    <div className="flex space-x-2">
                                      <div className="w-4 h-4 bg-cyan-400/30 rounded"></div>
                                      <div className="w-4 h-4 bg-blue-400/30 rounded"></div>
                                      <div className="w-4 h-4 bg-purple-400/30 rounded"></div>
                                    </div>
                                  </div>
                                  
                                  {/* Conteúdo simulado */}
                                  <div className="flex-1 space-y-3">
                                    <div className="space-y-2">
                                      <div className="h-2 bg-blue-400/30 rounded w-3/4"></div>
                                      <div className="h-2 bg-cyan-400/20 rounded w-1/2"></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <div className="h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded border border-blue-400/20"></div>
                                        <div className="h-2 bg-blue-400/20 rounded w-2/3"></div>
                                      </div>
                                      <div className="space-y-2">
                                        <div className="h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded border border-purple-400/20"></div>
                                        <div className="h-2 bg-purple-400/20 rounded w-3/4"></div>
                                      </div>
                                    </div>
                                    <div className="h-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded border border-cyan-400/20"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-[4/3] bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-xl overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                              {/* Simulação de tela de desenvolvimento/IA */}
                              <div className="w-full h-full relative bg-gray-900/50 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                                <div className="relative p-6 h-full flex flex-col">
                                  {/* Header simulado */}
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex space-x-2">
                                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                    </div>
                                    <div className="flex space-x-2">
                                      <div className="w-4 h-4 bg-cyan-400/30 rounded"></div>
                                      <div className="w-4 h-4 bg-blue-400/30 rounded"></div>
                                      <div className="w-4 h-4 bg-purple-400/30 rounded"></div>
                                    </div>
                                  </div>
                                  
                                  {/* Conteúdo simulado */}
                                  <div className="flex-1 space-y-3">
                                    <div className="space-y-2">
                                      <div className="h-2 bg-blue-400/30 rounded w-3/4"></div>
                                      <div className="h-2 bg-cyan-400/20 rounded w-1/2"></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <div className="h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded border border-blue-400/20"></div>
                                        <div className="h-2 bg-blue-400/20 rounded w-2/3"></div>
                                      </div>
                                      <div className="space-y-2">
                                        <div className="h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded border border-purple-400/20"></div>
                                        <div className="h-2 bg-purple-400/20 rounded w-3/4"></div>
                                      </div>
                                    </div>
                                    <div className="h-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded border border-cyan-400/20"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Floating elements */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full animate-bounce opacity-80"></div>
                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-bounce delay-500 opacity-80"></div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Auto-play Control */}
          {autoSlide && (
            <button
              onClick={toggleAutoPlay}
              className="absolute bottom-8 right-8 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
            >
              {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default HeroSlider;
