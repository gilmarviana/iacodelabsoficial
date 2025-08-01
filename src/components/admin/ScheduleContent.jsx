
import React, { useState, useEffect } from 'react';
import { Plus, Video, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const initialEvents = [
    { id: 1, title: 'Reunião de Kick-off: E-commerce', dateTime: '2025-08-05T10:00:00', participants: 'Tech Solutions, Equipe de Dev', meetLink: 'https://meet.google.com/xyz-abc-def' },
    { id: 2, title: 'Apresentação de Design: App Delivery', dateTime: '2025-08-07T14:30:00', participants: 'FoodCorp, Ana Costa', meetLink: 'https://meet.google.com/ghi-jkl-mno' },
    { id: 3, title: 'Daily Stand-up', dateTime: '2025-08-08T09:00:00', participants: 'Equipe Interna', meetLink: '' },
];

const EventForm = ({ isOpen, onClose, onSave, event }) => {
    const [formData, setFormData] = useState({
        title: '',
        dateTime: '',
        participants: '',
        meetLink: ''
    });

    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title || '',
                dateTime: event.dateTime ? format(parseISO(event.dateTime), "yyyy-MM-dd'T'HH:mm") : '',
                participants: event.participants || '',
                meetLink: event.meetLink || ''
            });
        } else {
            setFormData({ title: '', dateTime: '', participants: '', meetLink: '' });
        }
    }, [event, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateMeetLink = () => {
        const randomStr = () => Math.random().toString(36).substring(7);
        setFormData(prev => ({ ...prev, meetLink: `https://meet.google.com/${randomStr()}-${randomStr()}-${randomStr()}` }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, id: event?.id || Date.now() });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{event ? 'Editar Agendamento' : 'Novo Agendamento'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div>
                        <Label htmlFor="title">Título</Label>
                        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="dateTime">Data e Hora</Label>
                        <Input id="dateTime" name="dateTime" type="datetime-local" value={formData.dateTime} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="participants">Participantes</Label>
                        <Input id="participants" name="participants" value={formData.participants} onChange={handleChange} placeholder="Ex: Cliente X, Equipe Y" />
                    </div>
                    <div>
                        <Label htmlFor="meetLink">Link da Videochamada</Label>
                        <div className="flex items-center gap-2">
                            <Input id="meetLink" name="meetLink" value={formData.meetLink} onChange={handleChange} placeholder="https://meet.google.com/..." />
                            <Button type="button" variant="outline" size="icon" onClick={generateMeetLink}><Video className="w-4 h-4" /></Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const ScheduleContent = () => {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const { toast } = useToast();

    useEffect(() => {
        const savedEvents = JSON.parse(localStorage.getItem('scheduleEvents')) || initialEvents;
        setEvents(savedEvents.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)));
    }, []);

    const saveEvents = (updatedEvents) => {
        const sortedEvents = updatedEvents.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        setEvents(sortedEvents);
        localStorage.setItem('scheduleEvents', JSON.stringify(sortedEvents));
    };

    const handleSaveEvent = (data) => {
        const isEditing = events.some(e => e.id === data.id);
        let updated;
        if (isEditing) {
            updated = events.map(e => e.id === data.id ? data : e);
            toast({ title: "Agendamento atualizado!" });
        } else {
            updated = [...events, data];
            toast({ title: "Novo agendamento criado!" });
        }
        saveEvents(updated);
    };

    const handleDeleteEvent = (id) => {
        const updated = events.filter(e => e.id !== id);
        saveEvents(updated);
        toast({ title: "Agendamento removido." });
    };

    const handleOpenModal = (event = null) => {
        setEditingEvent(event);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-1">Agenda</h2>
                    <p className="text-muted-foreground">Gerencie seus compromissos e reuniões.</p>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Agendamento
                </Button>
            </div>

            <div className="bg-card rounded-xl border">
                <div className="grid grid-cols-[1fr,2fr,2fr,auto] font-semibold p-4 border-b">
                    <span>Data e Hora</span>
                    <span>Compromisso</span>
                    <span>Participantes</span>
                    <span>Ações</span>
                </div>
                {events.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="grid grid-cols-[1fr,2fr,2fr,auto] items-center p-4 border-b last:border-b-0"
                    >
                        <div>
                            <p className="font-medium">{format(parseISO(event.dateTime), 'dd/MM/yyyy')}</p>
                            <p className="text-sm text-muted-foreground">{format(parseISO(event.dateTime), 'HH:mm', { locale: ptBR })}</p>
                        </div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">{event.participants}</div>
                        <div className="flex items-center gap-1">
                            {event.meetLink && (
                                <Button asChild variant="outline" size="icon">
                                    <a href={event.meetLink} target="_blank" rel="noopener noreferrer">
                                        <Video className="w-4 h-4" />
                                    </a>
                                </Button>
                            )}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => handleOpenModal(event)}><Edit className="w-4 h-4 mr-2" />Editar</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteEvent(event.id)} className="text-red-500"><Trash2 className="w-4 h-4 mr-2" />Excluir</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </motion.div>
                ))}
            </div>
            <EventForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEvent}
                event={editingEvent}
            />
        </div>
    );
};

export default ScheduleContent;
