
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const TaskDetailChecklist = ({ checklist, onUpdate }) => {
    const [newItemText, setNewItemText] = useState('');

    const handleAddItem = (e) => {
        if (e.key === 'Enter' && newItemText.trim()) {
            e.preventDefault();
            const newItem = { id: Date.now(), text: newItemText.trim(), completed: false };
            onUpdate([...checklist, newItem]);
            setNewItemText('');
        }
    };

    const handleToggleItem = (itemId) => {
        const updatedList = checklist.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        onUpdate(updatedList);
    };

    return (
        <div className="space-y-2">
            {checklist.map(item => (
                <div key={item.id} className="flex items-center gap-2">
                    <Checkbox id={`item-${item.id}`} checked={item.completed} onCheckedChange={() => handleToggleItem(item.id)} />
                    <Label htmlFor={`item-${item.id}`} className={item.completed ? 'line-through text-muted-foreground' : ''}>
                        {item.text}
                    </Label>
                </div>
            ))}
            <Input 
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                onKeyDown={handleAddItem}
                placeholder="Adicionar um item e pressionar Enter..."
                className="mt-2"
            />
        </div>
    );
};

export default TaskDetailChecklist;
