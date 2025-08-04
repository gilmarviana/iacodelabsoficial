
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Palette, Image as ImageIcon, Type } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { HexColorPicker } from 'react-colorful';
import ColorPicker from '@/components/ColorPicker';

const SectionPreview = ({ section }) => {
    if (!section) return null;

    const sectionStyle = {
        backgroundColor: section.bgImage ? 'transparent' : section.bgColor,
        backgroundImage: section.bgImage ? `url(${section.bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const titleStyle = { color: section.titleColor || '#FFFFFF' };
    const subtitleStyle = { color: section.subtitleColor || '#FFFFFF' };

    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="p-4 bg-muted text-sm text-muted-foreground">Pré-visualização</div>
            <div className="relative p-12 flex items-center justify-center text-center" style={sectionStyle}>
                {section.bgImage && <div className="absolute inset-0 bg-black/50 z-0"></div>}
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2" style={titleStyle}>{section.title}</h2>
                    <p className="opacity-80" style={subtitleStyle}>{section.subtitle}</p>
                </div>
            </div>
        </div>
    );
};

const SectionEditor = ({ isOpen, onClose, onSave, section }) => {
    const [editedSection, setEditedSection] = useState(null);

    useEffect(() => {
        if (section) {
            setEditedSection({ 
                ...section,
                titleColor: section.titleColor || '#FFFFFF',
                subtitleColor: section.subtitleColor || '#FFFFFF',
                bgColor: section.bgColor || '#1a202c',
            });
        }
    }, [section]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedSection(prev => ({ ...prev, [name]: value }));
    };

    const handleColorChange = (name, color) => {
        setEditedSection(prev => ({ ...prev, [name]: color }));
    };

    const handleBgColorChange = (color) => {
        setEditedSection(prev => ({ ...prev, bgImage: null, bgColor: color }));
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            setEditedSection(prev => ({ ...prev, bgColor: null, bgImage: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    if (!editedSection) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Editar Seção: {editedSection.name}</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow overflow-hidden">
                    <div className="space-y-4 overflow-y-auto pr-4">
                        <div>
                            <Label htmlFor="section-name">Nome da Seção</Label>
                            <Input id="section-name" name="name" value={editedSection.name || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="section-title">Título</Label>
                            <Input id="section-title" name="title" value={editedSection.title || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="section-subtitle">Subtítulo / Descrição</Label>
                            <Textarea id="section-subtitle" name="subtitle" value={editedSection.subtitle || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Cores do Texto</Label>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-2">
                                    <Label>Título:</Label>
                                    <ColorPicker value={editedSection.titleColor} onChange={(color) => handleColorChange('titleColor', color)} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Label>Subtítulo:</Label>
                                    <ColorPicker value={editedSection.subtitleColor} onChange={(color) => handleColorChange('subtitleColor', color)} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label>Fundo da Seção</Label>
                            <Tabs defaultValue="color" className="w-full mt-2">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="color"><Palette className="w-4 h-4 mr-2" /> Cor</TabsTrigger>
                                    <TabsTrigger value="image"><ImageIcon className="w-4 h-4 mr-2" /> Imagem</TabsTrigger>
                                </TabsList>
                                <TabsContent value="color" className="pt-4">
                                    <div className="flex justify-center">
                                        <HexColorPicker color={editedSection.bgColor} onChange={handleBgColorChange} />
                                    </div>
                                </TabsContent>
                                <TabsContent value="image" className="pt-4">
                                    <div {...getRootProps()} className={`w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center text-center cursor-pointer ${isDragActive ? 'border-primary' : 'border-border'}`}>
                                        <input {...getInputProps()} />
                                        {editedSection.bgImage ? (
                                            <img src={editedSection.bgImage} alt="Preview do fundo" className="w-full h-full object-cover rounded-md" />
                                        ) : (
                                            <div className="flex flex-col items-center text-muted-foreground">
                                                <Upload className="w-8 h-8 mb-2" />
                                                <p>Arraste uma imagem ou clique para selecionar</p>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4 overflow-y-auto">
                        <SectionPreview section={editedSection} />
                    </div>
                </div>
                <DialogFooter className="mt-auto pt-4 border-t">
                    <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                    <Button type="button" onClick={() => onSave(editedSection)}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SectionEditor;
