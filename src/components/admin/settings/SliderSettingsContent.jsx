
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Image as ImageIcon, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useDrag, useDrop } from 'react-dnd';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ColorPicker from '@/components/ColorPicker';

const ItemTypes = {
  ELEMENT: 'element',
};

const DraggableElement = ({ id, left, top, onMove, children }) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ELEMENT,
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id, left, top]);

  drag(ref);

  return (
    <div
      ref={ref}
      style={{ left, top }}
      className={`absolute cursor-move p-2 border border-dashed border-primary/50 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {children}
    </div>
  );
};

const DroppableArea = ({ onDrop, children }) => {
    const [, drop] = useDrop(() => ({
      accept: ItemTypes.ELEMENT,
      drop: (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        onDrop(item.id, left, top);
      },
    }), [onDrop]);
  
    return (
      <div ref={drop} className="relative w-full h-full">
        {children}
      </div>
    );
};

const SlideModal = ({ isOpen, onOpenChange, onSave, slide }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    bgColor: '#3b82f6', // cor padrão
    slideType: 'padrao', // Added slideType
    positions: {
      title: { top: 180, left: 50 },
      description: { top: 240, left: 50 },
      buttons: { top: 320, left: 50 },
    },
  });

  useEffect(() => {
    if (slide) {
      setFormData({
        title: slide.title || '',
        description: slide.description || '',
        image: slide.image || '',
        bgColor: slide.bgColor || '#3b82f6',
        slideType: slide.slideType || 'padrao', // Set slideType from slide data
        positions: slide.positions || {
          title: { top: 180, left: 50 },
          description: { top: 240, left: 50 },
          buttons: { top: 320, left: 50 },
        },
      });
    } else {
      setFormData({ 
        title: '', 
        description: '', 
        image: '',
        bgColor: '#3b82f6',
        slideType: 'padrao', // Default slideType
        positions: {
          title: { top: 180, left: 50 },
          description: { top: 240, left: 50 },
          buttons: { top: 320, left: 50 },
        },
    });
    }
  }, [slide, isOpen]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(file);
    }
  };

  const handleElementMove = (id, left, top) => {
    setFormData(prev => ({
        ...prev,
        positions: {
            ...prev.positions,
            [id]: { left, top },
        }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{slide ? 'Editar Slide' : 'Novo Slide'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="slideType">Tipo de Slide</Label>
              <Select
                value={formData.slideType || 'padrao'}
                onValueChange={value => setFormData({ ...formData, slideType: value })}
              >
                <SelectTrigger id="slideType" name="slideType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="padrao">Padrão</SelectItem>
                  <SelectItem value="imagem-direita">Com Imagem à Direita</SelectItem>
                  <SelectItem value="imagem-esquerda">Com Imagem à Esquerda</SelectItem>
                  <SelectItem value="full-bg">Full Background</SelectItem>
                  <SelectItem value="minimalista">Minimalista</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>
            <div>
              <Label htmlFor="bgColor">Cor de Fundo</Label>
              <div className="flex items-center gap-2 mt-1">
                <ColorPicker value={formData.bgColor} onChange={color => setFormData({ ...formData, bgColor: color })} />
                <span className="text-xs text-muted-foreground">{formData.bgColor}</span>
              </div>
            </div>
            <div>
              <Label htmlFor="image-upload">Imagem</Label>
              <div className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="mb-2 w-full max-w-xs h-32 object-cover rounded-md border" />
                )}
                <div className="space-y-1 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="flex text-sm text-muted-foreground">
                    <label htmlFor="image-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                      <span>Carregar um arquivo</span>
                      <input id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
                    </label>
                    <p className="pl-1">ou arraste e solte</p>
                  </div>
                  <p className="text-xs">PNG, JPG, GIF até 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Label>Pré-visualização (Arraste os elementos)</Label>
            <div className="mt-2 relative w-full h-96 rounded-md overflow-hidden" style={{ background: formData.bgColor }}>
              {(() => {
                const type = formData.slideType || 'padrao';
                if (type === 'imagem-direita') {
                  return (
                    <div className="flex h-full">
                      <div className="flex-1 flex flex-col justify-center items-start px-6 z-20 text-white">
                        <h2 className="text-xl font-bold mb-2 drop-shadow-lg">{formData.title || 'Título do Slide'}</h2>
                        <p className="text-white/90 text-sm max-w-xs drop-shadow-md mb-4">{formData.description || 'Descrição do slide...'}</p>
                        <div className="flex gap-2">
                          <Button size="sm" type="button">Botão 1</Button>
                          <Button size="sm" variant="outline" type="button">Botão 2</Button>
                        </div>
                      </div>
                      <div className="flex-1 h-full flex items-center justify-center relative">
                        {formData.image && <img src={formData.image} alt="Fundo" className="w-full h-full object-cover rounded-l-2xl absolute inset-0" style={{ zIndex: 1 }} />}
                        <div className="absolute inset-0 bg-black/30 rounded-l-2xl" style={{ zIndex: 2 }} />
                      </div>
                    </div>
                  );
                }
                if (type === 'imagem-esquerda') {
                  return (
                    <div className="flex h-full">
                      <div className="flex-1 h-full flex items-center justify-center relative order-2">
                        {formData.image && <img src={formData.image} alt="Fundo" className="w-full h-full object-cover rounded-r-2xl absolute inset-0" style={{ zIndex: 1 }} />}
                        <div className="absolute inset-0 bg-black/30 rounded-r-2xl" style={{ zIndex: 2 }} />
                      </div>
                      <div className="flex-1 flex flex-col justify-center items-end px-6 z-20 text-white order-1">
                        <h2 className="text-xl font-bold mb-2 drop-shadow-lg text-right">{formData.title || 'Título do Slide'}</h2>
                        <p className="text-white/90 text-sm max-w-xs drop-shadow-md mb-4 text-right">{formData.description || 'Descrição do slide...'}</p>
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" type="button">Botão 1</Button>
                          <Button size="sm" variant="outline" type="button">Botão 2</Button>
                        </div>
                      </div>
                    </div>
                  );
                }
                if (type === 'full-bg') {
                  return (
                    <div className="relative w-full h-full">
                      {formData.image && <img src={formData.image} alt="Fundo" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 1 }} />}
                      <div className="absolute inset-0 bg-black/60 z-10" />
                      <div className="relative z-20 flex flex-col justify-center items-center h-full text-white">
                        <h2 className="text-2xl md:text-4xl font-extrabold mb-4 drop-shadow-2xl">{formData.title || 'Título do Slide'}</h2>
                        <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto drop-shadow-xl">{formData.description || 'Descrição do slide...'}</p>
                      </div>
                    </div>
                  );
                }
                if (type === 'minimalista') {
                  return (
                    <div className="flex items-center justify-center h-full bg-background">
                      <h2 className="text-2xl md:text-4xl font-bold text-primary drop-shadow-none">{formData.title || 'Título do Slide'}</h2>
                    </div>
                  );
                }
                // padrao
                return (
                  <DroppableArea onDrop={handleElementMove}>
                    <DraggableElement id="title" left={formData.positions.title.left} top={formData.positions.title.top} onMove={handleElementMove}>
                      <h2 className="text-xl font-bold text-white drop-shadow-lg">{formData.title || 'Título do Slide'}</h2>
                    </DraggableElement>
                    <DraggableElement id="description" left={formData.positions.description.left} top={formData.positions.description.top} onMove={handleElementMove}>
                      <p className="text-white/90 text-sm max-w-xs drop-shadow-md">{formData.description || 'Descrição do slide...'}</p>
                    </DraggableElement>
                    <DraggableElement id="buttons" left={formData.positions.buttons.left} top={formData.positions.buttons.top} onMove={handleElementMove}>
                      <div className="flex gap-2">
                        <Button size="sm" type="button">Botão 1</Button>
                        <Button size="sm" variant="outline" type="button">Botão 2</Button>
                      </div>
                    </DraggableElement>
                  </DroppableArea>
                );
              })()}
            </div>
          </div>
          <DialogFooter className="pt-4 md:col-span-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};


const SliderSettingsContent = () => {
  const [slides, setSlides] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedSlides = localStorage.getItem('slides');
    if (savedSlides) {
      setSlides(JSON.parse(savedSlides));
    } else {
        const defaultSlides = [
        {
          id: 1,
          image: '', // Will be replaced by img-replace
          imagePrompt: 'Futuristic digital solutions and abstract code background',
          title: 'Transformamos Ideias em Soluções Digitais',
          description: 'Especialistas em desenvolvimento web, mobile e sistemas personalizados.',
          slideType: 'padrao', // Added slideType
          positions: { title: { top: 150, left: 50 }, description: { top: 210, left: 50 }, buttons: { top: 290, left: 50 } },
        },
        {
          id: 2,
          image: '',
          imagePrompt: 'Team of developers collaborating on a project in a modern office',
          title: 'Sua Visão, Nossa Expertise Técnica',
          description: 'Criamos produtos digitais robustos e escaláveis para o seu negócio.',
          slideType: 'padrao', // Added slideType
          positions: { title: { top: 150, left: 50 }, description: { top: 210, left: 50 }, buttons: { top: 290, left: 50 } },
        },
        {
          id: 3,
          image: '',
          imagePrompt: 'Stunning user interface design on multiple devices',
          title: 'Design Inovador, Experiência Superior',
          description: 'Focados na usabilidade e em interfaces que encantam os usuários.',
          slideType: 'padrao', // Added slideType
          positions: { title: { top: 150, left: 50 }, description: { top: 210, left: 50 }, buttons: { top: 290, left: 50 } },
        },
      ];
      setSlides(defaultSlides);
      localStorage.setItem('slides', JSON.stringify(defaultSlides));
    }
  }, []);

  const saveSlidesToStorage = (updatedSlides) => {
    localStorage.setItem('slides', JSON.stringify(updatedSlides));
    window.dispatchEvent(new Event('storage'));
  };

  const handleSaveSlide = (slideData) => {
    let updatedSlides;
    if (editingSlide) {
      updatedSlides = slides.map((s) => (s.id === editingSlide.id ? { ...s, ...slideData } : s));
      toast({ title: 'Slide atualizado!' });
    } else {
      updatedSlides = [...slides, { ...slideData, id: Date.now() }];
      toast({ title: 'Slide adicionado!' });
    }
    setSlides(updatedSlides);
    saveSlidesToStorage(updatedSlides);
    setEditingSlide(null);
  };

  const handleNewSlide = () => {
    setEditingSlide(null);
    setIsModalOpen(true);
  };

  const handleEditSlide = (slide) => {
    setEditingSlide(slide);
    setIsModalOpen(true);
  };

  const handleDeleteSlide = (id) => {
    const updatedSlides = slides.filter((s) => s.id !== id);
    setSlides(updatedSlides);
    saveSlidesToStorage(updatedSlides);
    toast({ title: 'Slide removido!' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Configurações do Slider</h2>
          <p className="text-muted-foreground">Gerencie os slides da página inicial.</p>
        </div>
        <Button onClick={handleNewSlide}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Slide
        </Button>
      </div>

      <div className="grid gap-6">
        {slides.map((slide) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl p-4 border flex items-center gap-6"
          >
            <div className="w-32 h-20 bg-muted rounded-md flex-shrink-0 flex items-center justify-center">
              {slide.image ? (
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover rounded-md"/>
              ) : (
                <ImageIcon className="w-10 h-10 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{slide.title}</h3>
              <p className="text-muted-foreground text-sm truncate">{slide.description}</p>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" onClick={() => handleEditSlide(slide)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDeleteSlide(slide.id)} className="text-red-500 hover:bg-red-500/10">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <SlideModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSaveSlide}
        slide={editingSlide}
      />
    </div>
  );
};

export default SliderSettingsContent;