
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { ChevronsUpDown, Check, PlusCircle, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import ColorPicker from '@/components/ColorPicker';

const CreatableSelect = ({ options, value, onChange, placeholder, onUpdateOption, canCreate = true, canEditColor = true }) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [newColor, setNewColor] = useState('#3b82f6');

    const handleSelect = (currentValue) => {
        const selectedOption = options.find(option => option.value === currentValue);
        onChange(selectedOption);
        setInputValue("");
        setOpen(false);
    };
    
    const handleCreate = () => {
        if (inputValue && canCreate) {
            const newOption = { value: inputValue, label: inputValue, color: newColor };
            if (onUpdateOption) {
                onUpdateOption(newOption); 
            }
            onChange(newOption);
            setInputValue('');
            setOpen(false);
        }
    }

    const handleColorChange = (option, color) => {
        const updatedOption = { ...option, color };
        if (onUpdateOption) {
            onUpdateOption(updatedOption, option.value);
        }
    };
    
    const selectedOption = value ? (typeof value === 'string' ? options.find(o => o.value === value) : value) : null;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    <div className="flex items-center gap-2 truncate">
                        {selectedOption?.color && <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: selectedOption.color }} />}
                        <span className="truncate">{selectedOption?.label || placeholder}</span>
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <Command>
                    <CommandInput 
                        placeholder="Pesquisar ou criar..." 
                        value={inputValue}
                        onValueChange={setInputValue}
                    />
                    <CommandList>
                        <CommandEmpty>
                             {canCreate ? (
                                <div className="flex items-center justify-between p-2">
                                    <Button variant="ghost" className="flex-grow justify-start" onMouseDown={handleCreate}>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Criar "{inputValue}"
                                    </Button>
                                    <ColorPicker value={newColor} onChange={setNewColor} />
                                </div>
                             ) : (
                                <div className="p-2 text-sm text-center text-muted-foreground">Nenhuma opção encontrada.</div>
                             )}
                        </CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={handleSelect}
                                    className="flex justify-between items-center group"
                                >
                                    <div className="flex items-center gap-2">
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedOption?.value === option.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: option.color }} />
                                        {option.label}
                                    </div>
                                    {onUpdateOption && canEditColor && (
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

export default CreatableSelect;
