return (
    <section id="inicio" className="relative h-screen overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br"
        style={{
          backgroundImage: `linear-gradient(135deg, ${heroConfig.backgroundGradient.from} 0%, ${heroConfig.backgroundGradient.via} 50%, ${heroConfig.backgroundGradient.to} 100%)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>
              
              <motion.p 
                className="text-lg text-gray-300 mb-8 max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {heroSlides[currentSlide].description}
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button 
                  size="lg" 
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                  style={{
                    backgroundColor: heroConfig.primaryButton.color,
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = heroConfig.primaryButton.hoverColor}
                  onMouseLeave={(e) => e.target.style.backgroundColor = heroConfig.primaryButton.color}
                  onClick={onScheduleClick}
                >
                  {heroConfig.primaryButton.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300"
                  style={{
                    borderColor: heroConfig.secondaryButton.color,
                    color: heroConfig.secondaryButton.color,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = heroConfig.secondaryButton.color;
                    e.target.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = heroConfig.secondaryButton.color;
                  }}
                  onClick={onPortfolioClick}
                >
                  {heroConfig.secondaryButton.text}
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>