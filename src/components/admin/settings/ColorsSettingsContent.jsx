import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Palette, Save, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const ColorPicker = ({ label, color, onChange, description }) => (
  <div className="p-4 border rounded-lg bg-background/50">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-border" style={{ backgroundColor: color }} />
        <div>
          <label className="font-semibold">{label}</label>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono text-muted-foreground uppercase">{color}</span>
        <input 
          type="color" 
          value={color} 
          onChange={e => onChange(e.target.value)}
          className="w-8 h-8 p-0 border-none rounded cursor-pointer bg-transparent"
        />
      </div>
    </div>
  </div>
);

const defaultColors = {
  primary: '#75BDEC',
  secondary: '#1E293B',
  accent: '#334155',
  background: '#020817',
  foreground: '#F8FAFC',
  card: '#0F172A',
  border: '#1E293B',
};

const ColorsSettingsContent = () => {
  const [colors, setColors] = useState(defaultColors);
  const { toast } = useToast();

  useEffect(() => {
    const savedColors = JSON.parse(localStorage.getItem('themeColors') || 'null');
    if (savedColors) {
      setColors(savedColors);
    }
  }, []);

  const handleColorChange = (name, value) => {
    setColors(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    localStorage.setItem('themeColors', JSON.stringify(colors));
    toast({
      title: 'Sucesso!',
      description: 'Paleta de cores salva. Atualize a página para aplicar.',
    });
  };

  const handleResetColors = () => {
    setColors(defaultColors);
    localStorage.removeItem('themeColors');
    toast({
      title: 'Cores Restauradas!',
      description: 'A paleta de cores padrão foi restaurada.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-1">Cores do Sistema</h2>
          <p className="text-muted-foreground">Gerencie a paleta de cores global do sistema.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetColors}>
            <RefreshCw className="mr-2 h-4 w-4" /> Restaurar Padrão
          </Button>
          <Button onClick={handleSaveChanges}>
            <Save className="mr-2 h-4 w-4" /> Salvar Paleta
          </Button>
        </div>
      </div>

      <motion.div 
        className="bg-card rounded-xl p-6 border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center pb-4 border-b mb-4">
          <Palette className="w-5 h-5 mr-3 text-primary" />
          <h3 className="text-lg font-semibold">Paleta de Cores</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ColorPicker label="Primária" description="Cor principal para botões e destaques." color={colors.primary} onChange={v => handleColorChange('primary', v)} />
          <ColorPicker label="Secundária" description="Cor para elementos de suporte." color={colors.secondary} onChange={v => handleColorChange('secondary', v)} />
          <ColorPicker label="Destaque (Accent)" description="Usada para hovers e seleções." color={colors.accent} onChange={v => handleColorChange('accent', v)} />
          <ColorPicker label="Fundo" description="Cor de fundo principal da aplicação." color={colors.background} onChange={v => handleColorChange('background', v)} />
          <ColorPicker label="Texto" description="Cor principal para textos." color={colors.foreground} onChange={v => handleColorChange('foreground', v)} />
          <ColorPicker label="Cards" description="Cor de fundo para cards e painéis." color={colors.card} onChange={v => handleColorChange('card', v)} />
          <ColorPicker label="Bordas" description="Cor para bordas e divisores." color={colors.border} onChange={v => handleColorChange('border', v)} />
        </div>
      </motion.div>
    </div>
  );
};

export default ColorsSettingsContent;