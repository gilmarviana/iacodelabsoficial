
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

const SchedulingModal = ({ isOpen, onClose }) => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dateTime: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.dateTime) {
            toast({
                title: 'Campos obrigatórios',
                description: 'Por favor, preencha todos os campos para agendar.',
                variant: 'destructive',
            });
            return;
        }

        const newEvent = {
            id: Date.now(),
            title: `Reunião Agendada: ${formData.name}`,
            dateTime: new Date(formData.dateTime).toISOString(),
            participants: `${formData.name} (${formData.email})`,
            meetLink: ''
        };

        const existingEvents = JSON.parse(localStorage.getItem('scheduleEvents') || '[]');
        localStorage.setItem('scheduleEvents', JSON.stringify([...existingEvents, newEvent]));
        
        toast({
            title: 'Agendamento Confirmado!',
            description: `Sua reunião foi agendada para ${format(new Date(formData.dateTime), "dd/MM/yyyy 'às' HH:mm")}.`,
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agendar uma Chamada</DialogTitle>
                    <DialogDescription>
                        Escolha o melhor horário para conversarmos sobre o seu projeto.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div>
                        <Label htmlFor="name-schedule">Seu Nome</Label>
                        <Input id="name-schedule" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="email-schedule">Seu Email</Label>
                        <Input id="email-schedule" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="dateTime-schedule">Data e Hora</Label>
                        <Input id="dateTime-schedule" name="dateTime" type="datetime-local" value={formData.dateTime} onChange={handleChange} required 
                         min={new Date().toISOString().slice(0, 16)}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                        <Button type="submit">Agendar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SchedulingModal;
