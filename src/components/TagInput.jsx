
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { X, PlusCircle, Palette } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import ColorPicker from '@/components/ColorPicker';

const TagInput = ({ value = [], onChange, existingTags = [], onUpdateTag, canCreate = true, canEditColor = true }) => {
    const [inputValue, setInputValue] = useState('');
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [newColor, setNewColor] = useState('#3b82f6');

    const handleAddTag = (tagValue) => {
        const isString = typeof tagValue === 'string';
        const newTagLabel = (isString ? tagValue : tagValue.label).trim();

        if (newTagLabel && !value.some(t => t.label === newTagLabel)) {
            let tagToAdd;
            if (isString) {
                tagToAdd = existingTags.find(t => t.value && t.value.toLowerCase() === newTagLabel.toLowerCase());
                if (!tagToAdd) {
                    if (!canCreate) return;
                    tagToAdd = { label: newTagLabel, value: newTagLabel, color: newColor };
                    if (onUpdateTag) {
                        onUpdateTag(tagToAdd);
                    }
                }
            } else {
                tagToAdd = tagValue;
            }
            onChange([...value, tagToAdd]);
        }
        setInputValue('');
        setPopoverOpen(false);
    };

    const handleKeyDown = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && inputValue) {
            e.preventDefault();
            handleAddTag(inputValue);
        }
    };
    
    const handleColorChange = (tag, color) => {
        const updatedTag = { ...tag, color };
        if (onUpdateTag) {
            onUpdateTag(updatedTag, tag.value);
        }
    };

    const removeTag = (tagToRemove) => {
        onChange(value.filter(tag => tag.label !== tagToRemove.label));
    };

    const valueLabels = value.map(v => v.label);
    const filteredOptions = existingTags.filter(tag => tag.value && !valueLabels.includes(tag.value));

    return (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                {value.map(tag => (
                    <div key={tag.label} className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: `${tag.color}20`, color: tag.color }}>
                        {tag.label}
                        <button onClick={() => removeTag(tag)} className="rounded-full hover:bg-black/10">
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}
                 <PopoverTrigger asChild>
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                           setInputValue(e.target.value);
                           if(!popoverOpen) setPopoverOpen(true);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Adicionar tags..."
                        className="flex-1 border-none shadow-none focus-visible:ring-0 h-auto p-0 m-0"
                        onFocus={() => setPopoverOpen(true)}
                    />
                 </PopoverTrigger>
            </div>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <Command>
                    <CommandInput value={inputValue} onValueChange={setInputValue} placeholder="Pesquisar ou criar tags..." />
                    <CommandList>
                        <CommandEmpty>
                             {canCreate ? (
                                <div className="flex items-center justify-between p-2">
                                    <Button variant="ghost" className="flex-grow justify-start" onMouseDown={(e) => { e.preventDefault(); handleAddTag(inputValue); }}>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Criar tag "{inputValue}"
                                    </Button>
                                    <ColorPicker value={newColor} onChange={setNewColor} />
                                </div>
                             ) : (
                                <div className="p-2 text-sm text-center text-muted-foreground">Nenhuma tag encontrada.</div>
                             )}
                        </CommandEmpty>
                        <CommandGroup>
                            {filteredOptions.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={() => handleAddTag(option)}
                                    className="flex justify-between items-center group"
                                >
                                     <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: option.color }} />
                                        {option.label}
                                    </div>
                                    {onUpdateTag && canEditColor && (
                                       <ColorPicker 
                                         value={option.color} 
                                         onChange={(color) => handleColorChange(option, color)}
                                         trigger={
                                           <Button variant="ghost" size="icon" className="h-6 w-6 invisible group-hover:visible" onMouseDown={(e) => e.stopPropagation()}>
                                             <Palette className="h-4 w-4" />
                                           </Button>
                                         }
                                       />
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default TagInput;
