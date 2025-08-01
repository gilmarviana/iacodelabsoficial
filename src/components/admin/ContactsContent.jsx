import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ContactForm = ({ isOpen, onClose, onSave, contact, projects }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        role: '',
        isClient: false,
        projectId: ''
    });

    useEffect(() => {
        if (contact) {
            setFormData({
                name: contact.name || '',
                email: contact.email || '',
                company: contact.company || '',
                role: contact.role || '',
                isClient: contact.isClient || false,
                projectId: contact.projectId || ''
            });
        } else {
            setFormData({ name: '', email: '', company: '', role: '', isClient: false, projectId: '' });
        }
    }, [contact, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (checked) => {
        setFormData(prev => ({ ...prev, isClient: checked }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, id: contact?.id || Date.now() });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{contact ? 'Editar Contato' : 'Novo Contato'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="company">Empresa</Label>
                            <Input id="company" name="company" value={formData.company} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="role">Cargo</Label>
                            <Input id="role" name="role" value={formData.role} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="isClient" checked={formData.isClient} onCheckedChange={handleSwitchChange} />
                        <Label htmlFor="isClient">É um cliente?</Label>
                    </div>
                    {formData.isClient && (
                        <div>
                            <Label htmlFor="projectId">Projeto Associado</Label>
                            <Select value={formData.projectId} onValueChange={(value) => handleSelectChange('projectId', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um projeto" />
                                </SelectTrigger>
                                <SelectContent>
                                    {projects.map(p => <SelectItem key={p.id} value={p.id.toString()}>{p.title}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const ContactsContent = () => {
    const [contacts, setContacts] = useState([]);
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const { toast } = useToast();

    useEffect(() => {
        const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [
            { id: 1, name: 'Maria Silva', email: 'maria.silva@techsolutions.com', company: 'Tech Solutions', role: 'Gerente de Projetos', isClient: true, projectId: '1' },
            { id: 2, name: 'João Santos', email: 'joao.santos@startupxyz.com', company: 'StartupXYZ', role: 'CEO', isClient: false, projectId: '' },
            { id: 3, name: 'Ana Costa', email: 'ana.costa@foodcorp.com', company: 'FoodCorp', role: 'Diretora de Marketing', isClient: true, projectId: '2' },
        ];
        const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        setContacts(savedContacts);
        setProjects(savedProjects);
    }, []);

    const saveContacts = (updatedContacts) => {
        setContacts(updatedContacts);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    };

    const handleSaveContact = (contactData) => {
        const isEditing = contacts.some(c => c.id === contactData.id);
        let updatedContacts;
        if (isEditing) {
            updatedContacts = contacts.map(c => c.id === contactData.id ? contactData : c);
            toast({ title: "Contato atualizado!", description: "As alterações foram salvas." });
        } else {
            updatedContacts = [...contacts, contactData];
            toast({ title: "Contato criado!", description: "Novo contato adicionado." });
        }
        saveContacts(updatedContacts);
    };

    const handleDeleteContact = (contactId) => {
        const updatedContacts = contacts.filter(c => c.id !== contactId);
        saveContacts(updatedContacts);
        toast({ title: "Contato removido", description: "O contato foi excluído." });
    };

    const handleOpenModal = (contact = null) => {
        setEditingContact(contact);
        setIsModalOpen(true);
    };

    const filteredContacts = contacts
        .filter(contact => {
            if (filter === 'all') return true;
            return filter === 'clients' ? contact.isClient : !contact.isClient;
        })
        .filter(contact =>
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.company.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const getProjectTitle = (projectId) => {
        const project = projects.find(p => p.id.toString() === projectId);
        return project ? project.title : 'N/A';
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-1">Contatos</h2>
                    <p className="text-muted-foreground">Gerencie seus contatos e clientes.</p>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Contato
                </Button>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <Input
                        type="text"
                        placeholder="Buscar contatos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-card border rounded-lg pl-10 pr-4 py-2"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filtrar
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Filtrar por Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                            <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="clients">Apenas Clientes</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="non-clients">Não Clientes</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="bg-card rounded-xl border">
                <div className="grid grid-cols-5 font-semibold p-4 border-b">
                    <div>Nome</div>
                    <div>Email</div>
                    <div>Empresa</div>
                    <div>Projeto</div>
                    <div>Ações</div>
                </div>
                {filteredContacts.map((contact, index) => (
                    <motion.div
                        key={contact.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="grid grid-cols-5 items-center p-4 border-b last:border-b-0"
                    >
                        <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-muted-foreground">{contact.role}</p>
                        </div>
                        <div>{contact.email}</div>
                        <div>{contact.company}</div>
                        <div>{contact.isClient ? getProjectTitle(contact.projectId) : '-'}</div>
                        <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="icon" onClick={() => handleOpenModal(contact)}><Edit className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-500/10" onClick={() => handleDeleteContact(contact.id)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                    </motion.div>
                ))}
            </div>
            <ContactForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveContact}
                contact={editingContact}
                projects={projects}
            />
        </div>
    );
};

export default ContactsContent;