// Hook para carregar dados do Editor de Site
import { useState, useEffect } from 'react';

export const useSiteEditorData = () => {
  const [siteData, setSiteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSiteData = () => {
      try {
        const savedData = localStorage.getItem('siteEditorData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setSiteData(parsedData.siteData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do site:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSiteData();

    // Escutar mudanças no localStorage (quando dados são salvos no editor)
    const handleStorageChange = (e) => {
      if (e.key === 'siteEditorData') {
        loadSiteData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Escutar eventos customizados para atualizações na mesma aba
    const handleCustomUpdate = () => {
      loadSiteData();
    };
    
    window.addEventListener('siteDataUpdated', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('siteDataUpdated', handleCustomUpdate);
    };
  }, []);

  return { siteData, isLoading };
};

// Função utilitária para disparar evento de atualização
export const triggerSiteDataUpdate = () => {
  window.dispatchEvent(new CustomEvent('siteDataUpdated'));
};
