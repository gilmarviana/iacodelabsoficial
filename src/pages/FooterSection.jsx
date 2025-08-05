import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const defaultFooterConfig = {
  logoUrl: '',
  logoText: 'Devop',
  logoHeight: 40,
  logoWidth: 40,
  tagline: 'Innovate, Build, Scale – Your Vision, Our Code',
  buttonText: 'Contact Us',
  buttonColor: '#00bcd4',
  columns: [
    { 
      title: 'Home', 
      links: [
        { label: 'Homepage', url: '#' },
        { label: 'About Us', url: '#' },
        { label: 'Service', url: '#' },
        { label: 'Blog', url: '#' },
        { label: 'Contact Us', url: '#' }
      ] 
    },
    { 
      title: 'About Us', 
      links: [
        { label: 'Homepage', url: '#' },
        { label: 'About Us', url: '#' },
        { label: 'Service', url: '#' },
        { label: 'Blog', url: '#' },
        { label: 'Contact Us', url: '#' }
      ] 
    },
    { 
      title: 'Service', 
      links: [
        { label: 'Homepage', url: '#' },
        { label: 'About Us', url: '#' },
        { label: 'Service', url: '#' },
        { label: 'Blog', url: '#' },
        { label: 'Contact Us', url: '#' }
      ] 
    }
  ],
  bgColor: '#1a1a1a',
  textColor: '#ffffff',
  policyLinks: [
    { label: 'Privacy Policy', url: '#' },
    { label: 'Terms of Service', url: '#' }
  ],
  socialLinks: [
    { icon: 'fab fa-whatsapp', url: '#' },
    { icon: 'fab fa-instagram', url: '#' },
    { icon: 'fab fa-linkedin', url: '#' },
    { icon: 'fab fa-twitter', url: '#' }
  ],
  copyrightText: 'Copyright © 2025 Devop - App Development Software House Agency Elementor Template Kit',
  copyrightBgColor: '#111',
  copyrightTextColor: '#fff',
};

const FooterSection = () => {
  const [footerConfig, setFooterConfig] = useState(() => {
    const saved = localStorage.getItem('landingPageFooterConfig');
    return saved ? JSON.parse(saved) : defaultFooterConfig;
  });

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('landingPageFooterConfig');
      setFooterConfig(saved ? JSON.parse(saved) : defaultFooterConfig);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
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
      <footer style={{ background: footerConfig.bgColor, color: footerConfig.textColor, padding: '0', position: 'relative' }}>
        <div className="container mx-auto px-6 py-16">
        {/* Policy Links positioned at top right */}
        <div className="absolute top-6 right-6 flex gap-6">
          {footerConfig.policyLinks && footerConfig.policyLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url || '#'}
              className="text-sm hover:underline"
              style={{ color: footerConfig.textColor }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row justify-between">
          {/* Left section - Logo and tagline */}
          <div className="flex-1 max-w-md mb-8 lg:mb-0">
            <div className="flex items-center gap-3 mb-4">
              {footerConfig.logoUrl && (
                <img
                  src={footerConfig.logoUrl}
                  alt="Logo"
                  style={{ height: footerConfig.logoHeight, width: footerConfig.logoWidth, objectFit: 'contain' }}
                />
              )}
              {footerConfig.logoText && (
                <span className="font-bold text-2xl" style={{ color: footerConfig.textColor }}>{footerConfig.logoText}</span>
              )}
            </div>
            
            {/* Tagline/Description */}
            <h2 className="text-3xl font-light mb-6 leading-tight" style={{ color: footerConfig.textColor }}>
              {footerConfig.tagline || 'Innovate, Build, Scale – Your Vision, Our Code'}
            </h2>

            {/* Contact Button */}
            <button 
              className="px-6 py-3 rounded text-white font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: footerConfig.buttonColor || '#00bcd4' }}
            >
              {footerConfig.buttonText || 'Contact Us'}
            </button>

            {/* Social Icons */}
            <div className="flex gap-3 mt-8">
              {footerConfig.socialLinks && footerConfig.socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url || '#'}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.customIcon
                    ? <img src={social.customIcon} alt="Custom Icon" className="w-6 h-6 object-contain" />
                    : <i className={social.icon || 'fa-brands fa-facebook'} style={{ color: footerConfig.textColor }}></i>
                  }
                </a>
              ))}
            </div>
          </div>

          {/* Right section - Navigation columns */}
          <div className="flex-1 flex justify-end">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              {/* Navigation Columns */}
              {footerConfig.columns && footerConfig.columns.map((col, idx) => (
                <div key={idx} className="flex flex-col">
                  <h3 className="text-xl font-medium mb-4" style={{ color: footerConfig.textColor }}>
                    {col.title}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {col.links && col.links.map((link, lidx) => (
                      <a
                        key={lidx}
                        href={link.url || '#'}
                        className="text-sm hover:underline"
                        style={{ color: footerConfig.textColor, opacity: 0.8 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        </div>
      </footer>
      {/* Copyright below footer */}
      <div style={{ background: footerConfig.copyrightBgColor, color: footerConfig.copyrightTextColor }}>
        <p className="text-sm text-center py-3 m-0">
          {footerConfig.copyrightText}
        </p>
      </div>
    </>
  );
};

export default FooterSection;
