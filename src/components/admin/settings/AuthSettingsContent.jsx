
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Lock, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const ComparisonField = ({ label, name, value, originalValue, onChange, ...props }) => (
  <div className="space-y-2">
    <label className="font-medium">{label}</label>
    <Input name={name} value={value} onChange={onChange} {...props} />
    {value !== originalValue && (
      <div className="text-xs p-2 bg-accent rounded-md">
        <p className="text-muted-foreground">Original: <span className="font-mono">{originalValue || 'Vazio'}</span></p>
        <p className="text-primary">Novo: <span className="font-mono">{value}</span></p>
      </div>
    )}
  </div>
);

const AuthSettingsContent = () => {
  const [originalSettings, setOriginalSettings] = useState({});
  const [settings, setSettings] = useState({
    backgroundImageUrl: '',
    title: '',
    subtitle: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('authPageConfig') || '{}');
    const initialSettings = {
      backgroundImageUrl: '',
      title: 'IA Code Labs',
      subtitle: 'Faça login para continuar',
      ...savedSettings
    };
    setSettings(initialSettings);
    setOriginalSettings(initialSettings);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    localStorage.setItem('authPageConfig', JSON.stringify(settings));
    setOriginalSettings(settings);
    toast({
      title: 'Sucesso!',
      description: 'Configurações da página de autenticação salvas.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-1">Autenticação</h2>
          <p className="text-muted-foreground">Personalize a aparência e os textos da sua página de login.</p>
        </div>
        <Button onClick={handleSaveChanges}>
          <Save className="mr-2 h-4 w-4" /> Salvar Alterações
        </Button>
      </div>

      <motion.div 
        className="bg-card rounded-xl p-6 border space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center pb-2 border-b">
          <Lock className="w-5 h-5 mr-3 text-primary" />
          <h3 className="text-lg font-semibold">Página de Login</h3>
        </div>
        
        <ComparisonField 
          label="URL da Imagem de Fundo" 
          name="backgroundImageUrl" 
          value={settings.backgroundImageUrl} 
          originalValue={originalSettings.backgroundImageUrl} 
          onChange={handleInputChange} 
          placeholder="Deixe em branco para usar a cor de fundo padrão" 
        />
        <ComparisonField 
          label="Título" 
          name="title" 
          value={settings.title} 
          originalValue={originalSettings.title} 
          onChange={handleInputChange} 
          placeholder="Ex: Bem-vindo de volta!" 
        />
        <ComparisonField 
          label="Subtítulo" 
          name="subtitle" 
          value={settings.subtitle} 
          originalValue={originalSettings.subtitle} 
          onChange={handleInputChange} 
          placeholder="Ex: Acesse sua conta para continuar." 
        />
      </motion.div>
    </div>
  );
};

export default AuthSettingsContent;
