<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesConfig.services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              style={{ backgroundColor: '#ffffff' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="p-6">
                <div 
                  className="flex items-center justify-center h-16 w-16 rounded-full text-2xl mb-4"
                  style={{ backgroundColor: `${service.color}20`, color: service.color }}
                >
                  {service.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button 
                  variant="ghost" 
                  className="font-semibold p-0"
                  style={{ color: service.color }}
                >
                  Saiba mais
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;