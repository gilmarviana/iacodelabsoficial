const ProjectsSection = () => {
  const { getSectionConfig } = useLandingPageConfig();
  const projectsConfig = getSectionConfig('projects').config;

  // Determinar quais projetos mostrar
  const displayedProjects = projectsConfig.showAll 
    ? projectsData 
    : projectsData.slice(0, projectsConfig.maxItems);

  return (
    <section 
      id="projetos" 
      className="py-20"
      style={{
        backgroundColor: projectsConfig.backgroundColor,
        color: projectsConfig.textColor
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-base font-semibold tracking-wide uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {projectsConfig.subtitle}
          </motion.h2>
          <motion.h3 
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {projectsConfig.title}
          </motion.h3>
        </div>