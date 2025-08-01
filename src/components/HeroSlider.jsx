
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChevronRight, Calendar } from 'lucide-react';

const HeroSlider = ({ landingPageConfig, onScheduleClick }) => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const savedSlides = localStorage.getItem('slides');
    if (savedSlides) {
      setSlides(JSON.parse(savedSlides));
    } else {
      const defaultSlides = [
        {
          id: 1,
          image: 'Futuristic digital solutions and abstract code background',
          title: 'Transformamos Ideias em Soluções Digitais',
          description: 'Especialistas em desenvolvimento web, mobile e sistemas personalizados.',
        },
        {
          id: 2,
          image: 'Team of developers collaborating on a project in a modern office',
          title: 'Sua Visão, Nossa Expertise Técnica',
          description: 'Criamos produtos digitais robustos e escaláveis para o seu negócio.',
        },
        {
          id: 3,
          image: 'Stunning user interface design on multiple devices',
          title: 'Design Inovador, Experiência Superior',
          description: 'Focados na usabilidade e em interfaces que encantam os usuários.',
        },
      ];
      setSlides(defaultSlides);
    }
  }, []);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const config = landingPageConfig || {};

  return (
    <Carousel
      className="w-full relative"
      opts={{ loop: true }}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={slide.id}>
            <div className="relative h-[calc(100vh-80px)] min-h-[600px] w-full pt-16">
              <div className="absolute inset-0 bg-black/60 z-10"></div>
              {slide.image && slide.image.startsWith('data:image') ? (
                <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <img-replace
                  alt={slide.imagePrompt || slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center text-center text-white">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                    {index === 0 && config.heroTitle ? config.heroTitle : slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto drop-shadow-md">
                    {index === 0 && config.heroSubtitle ? config.heroSubtitle : slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" onClick={onScheduleClick}>
                      <Calendar className="mr-2 h-5 w-5" /> {config.heroButton1Text || 'Agendar uma Chamada'}
                    </Button>
                    <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" onClick={() => handleScrollTo('projects')}>
                      {config.heroButton2Text || 'Ver Projetos'} <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden md:block">
        <CarouselPrevious className="left-10 text-white border-white hover:bg-white/20" />
        <CarouselNext className="right-10 text-white border-white hover:bg-white/20" />
      </div>
    </Carousel>
  );
};

export default HeroSlider;
