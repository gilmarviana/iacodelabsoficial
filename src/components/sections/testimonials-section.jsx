import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    // Load testimonials
    const savedTestimonials = JSON.parse(localStorage.getItem('landingPageTestimonials') || '[]');
    if (savedTestimonials.length > 0) {
      setTestimonials(savedTestimonials);
    } else {
      setTestimonials([
        {
          id: 1,
          name: "Carlos Silva",
          company: "TechCorp Solutions",
          role: "CEO",
          content: "A equipe transformou completamente nossa presença digital. O resultado superou todas as expectativas e o ROI foi impressionante.",
          rating: 5,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
        },
        {
          id: 2,
          name: "Maria Santos",
          company: "InnovateLab",
          role: "CTO",
          content: "Profissionais excepcionais! Entregaram um sistema complexo no prazo e com qualidade superior. Recomendo sem hesitação.",
          rating: 5,
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
        },
        {
          id: 3,
          name: "João Oliveira",
          company: "StartupX",
          role: "Founder",
          content: "Do conceito ao lançamento, foram nossos parceiros estratégicos. O app desenvolvido já tem mais de 50mil downloads!",
          rating: 5,
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
        }
      ]);
    }
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [testimonials]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="depoimentos" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-slate-900/50" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            O que Nossos Clientes Dizem
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="relative mb-8 p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10">
              <Quote className="absolute top-4 left-4 h-8 w-8 text-cyan-400/30" />
              <p className="text-xl md:text-2xl text-gray-200 mb-6 italic leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </p>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <img
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].name}
                className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400/30"
              />
              <div className="text-left">
                <h4 className="text-xl font-bold text-white">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-gray-400">
                  {testimonials[currentTestimonial].role} - {testimonials[currentTestimonial].company}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Testimonial indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === index ? 'bg-cyan-400 scale-125' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;