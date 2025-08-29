import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection = ({ contactConfig, onScheduleClick }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{contactConfig.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{contactConfig.description}</p>
        </div>
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact information */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Email</h4>
                    <p className="text-lg">{contactConfig.contactInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Telefone</h4>
                    <p className="text-lg">{contactConfig.contactInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Endereço</h4>
                    <p className="text-lg">{contactConfig.contactInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Envie uma Mensagem</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium mb-2">Nome</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg font-medium mb-2">Mensagem</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Sua mensagem"
                  ></textarea>
                </div>
                <Button 
                  type="button" 
                  size="lg" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-lg font-semibold rounded-lg"
                  onClick={onScheduleClick}
                >
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;