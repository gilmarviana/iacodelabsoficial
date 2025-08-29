<div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutConfig.features.map((feature, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-medium mb-2">{feature.title}</h4>
                <p className="text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;