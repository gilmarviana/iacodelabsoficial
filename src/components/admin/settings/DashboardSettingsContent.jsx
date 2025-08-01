import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Brush, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const ColorPicker = ({ label, color, onChange }) => (
  <div className="flex items-center justify-between">
    <label className="font-medium">{label}</label>
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{color}</span>
      <input 
        type="color" 
        value={color} 
        onChange={e => onChange(e.target.value)}
        className="w-8 h-8 p-0 border-none rounded cursor-pointer bg-transparent"
        style={{'--color': color, appearance: 'none', MozAppearance: 'none', WebkitAppearance: 'none'}}
      />
    </div>
  </div>
);

const DashboardSettingsContent = () => {
  const [colors, setColors] = useState({
    primary: '#75BDEC',
    background: '#0a0a0a',
    card: '#1a1a1a',
    text: '#fafafa',
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedColors = JSON.parse(localStorage.getItem('dashboardColors') || '{}');
    if (Object.keys(savedColors).length) {
      setColors(savedColors);
    }
  }, []);

  const handleColorChange = (name, value) => {
    setColors(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    localStorage.setItem('dashboardColors', JSON.stringify(colors));
    toast({
      title: 'Sucesso!',
      description: 'Cores do dashboard salvas. Atualize a página para ver as mudanças.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-1">Aparência do Dashboard</h2>
          <p className="text-muted-foreground">Altere as cores do painel administrativo.</p>
        </div>
        <Button onClick={handleSaveChanges}>
          <Save className="mr-2 h-4 w-4" /> Salvar e Aplicar
        </Button>
      </div>

      <motion.div 
        className="bg-card rounded-xl p-6 border space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center pb-2 border-b">
          <Brush className="w-5 h-5 mr-3 text-primary" />
          <h3 className="text-lg font-semibold">Cores Principais</h3>
        </div>
        
        <ColorPicker label="Cor Primária" color={colors.primary} onChange={value => handleColorChange('primary', value)} />
        <ColorPicker label="Cor de Fundo" color={colors.background} onChange={value => handleColorChange('background', value)} />
        <ColorPicker label="Cor dos Cards" color={colors.card} onChange={value => handleColorChange('card', value)} />
        <ColorPicker label="Cor do Texto" color={colors.text} onChange={value => handleColorChange('text', value)} />
      </motion.div>
    </div>
  );
};

export default DashboardSettingsContent;