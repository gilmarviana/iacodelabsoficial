
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AssigneeAvatar from '@/components/task-detail/AssigneeAvatar';
import { Switch } from '@/components/ui/switch';

const allPermissions = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'projects', label: 'Projetos' },
  { id: 'tasks', label: 'Tarefas' },
  { id: 'collaborators', label: 'Colaboradores' },
  { id: 'contacts', label: 'Contatos' },
  { id: 'chat', label: 'Chat' },
  { id: 'financial', label: 'Financeiro' },
  { id: 'schedule', label: 'Agenda' },
  { id: 'settings', label: 'Configurações' },
];

const PermissionSwitch = ({ label, checked, onCheckedChange }) => (
    <div className="flex items-center space-x-2">
        <Switch id={label} checked={checked} onCheckedChange={onCheckedChange} />
        <Label htmlFor={label} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</Label>
    </div>
);

const CollaboratorModal = ({ isOpen, onClose, onSave, collaborator, menuItems }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Colaborador');
    const [permissions, setPermissions] = useState({});

    useEffect(() => {
        if (collaborator) {
            setName(collaborator.name);
            setEmail(collaborator.email);
            setRole(collaborator.role);
            setPermissions(collaborator.permissions || {});
        } else {
            setName('');
            setEmail('');
            setRole('Colaborador');
            setPermissions({});
        }
    }, [collaborator, isOpen]);
    
    const handlePermissionChange = (menuId, action) => {
        setPermissions(prev => ({
            ...prev,
            [menuId]: {
                ...prev[menuId],
                [action]: !prev[menuId]?.[action]
            }
        }));
    };

    const handleAccessChange = (menuId) => {
        setPermissions(prev => {
            const newPerms = { ...prev };
            if (newPerms[menuId]) {
                delete newPerms[menuId];
            } else {
                newPerms[menuId] = { view: true, add: false, edit: false, remove: false };
            }
            return newPerms;
        });
    };

    const handleSave = () => {
        onSave({ id: collaborator?.id, name, email, role, permissions });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>{collaborator ? 'Editar Colaborador' : 'Adicionar Colaborador'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nome</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">Função</Label>
                        <Select value={role} onValueChange={setRole}>
                           <SelectTrigger className="col-span-3">
                               <SelectValue placeholder="Selecione a função" />
                           </SelectTrigger>
                           <SelectContent>
                               <SelectItem value="Administrador">Administrador</SelectItem>
                               <SelectItem value="Gerente">Gerente</SelectItem>
                               <SelectItem value="Colaborador">Colaborador</SelectItem>
                           </SelectContent>
                       </Select>
                    </div>
                    <div>
                        <Label className="font-semibold">Permissões de Acesso ao Menu</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2 p-4 border rounded-md">
                           {menuItems.map(item => (
                                <div key={item.id} className="flex flex-col space-y-2 p-3 bg-muted/50 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`access-${item.id}`}
                                            checked={!!permissions[item.id]?.view}
                                            onCheckedChange={() => handleAccessChange(item.id)}
                                        />
                                        <Label htmlFor={`access-${item.id}`} className="font-semibold">{item.label}</Label>
                                    </div>
                                    {permissions[item.id]?.view && (
                                        <div className="pl-6 flex items-center space-x-4 text-xs">
                                             <div className="flex items-center space-x-1"><Checkbox id={`${item.id}-add`} checked={!!permissions[item.id]?.add} onCheckedChange={() => handlePermissionChange(item.id, 'add')} /><Label htmlFor={`${item.id}-add`}>Add</Label></div>
                                             <div className="flex items-center space-x-1"><Checkbox id={`${item.id}-edit`} checked={!!permissions[item.id]?.edit} onCheckedChange={() => handlePermissionChange(item.id, 'edit')} /><Label htmlFor={`${item.id}-edit`}>Edit</Label></div>
                                             <div className="flex items-center space-x-1"><Checkbox id={`${item.id}-remove`} checked={!!permissions[item.id]?.remove} onCheckedChange={() => handlePermissionChange(item.id, 'remove')} /><Label htmlFor={`${item.id}-remove`}>Remover</Label></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const CollaboratorsContent = () => {
    const [collaborators, setCollaborators] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCollaborator, setEditingCollaborator] = useState(null);
    const { toast } = useToast();

    useEffect(() => {
        const savedData = localStorage.getItem('collaborators');
        if (savedData) {
            setCollaborators(JSON.parse(savedData));
        } else {
            const initialData = [
                { id: 1, name: 'Guilherme Victor', email: 'guilherme@example.com', role: 'Administrador', permissions: { dashboard: { view: true }, projects: { view: true, add: true, edit: true, remove: true } } },
                { id: 2, name: 'Ricardo Takeshi', email: 'ricardo@example.com', role: 'Gerente', permissions: { dashboard: { view: true }, projects: { view: true, add: true } } },
            ];
            setCollaborators(initialData);
            localStorage.setItem('collaborators', JSON.stringify(initialData));
        }
    }, []);

    const handleSave = (collaboratorData) => {
        let updatedList;
        if (collaboratorData.id) {
            updatedList = collaborators.map(c => c.id === collaboratorData.id ? collaboratorData : c);
            toast({ title: "Colaborador atualizado!" });
        } else {
            const newCollaborator = { ...collaboratorData, id: Date.now() };
            updatedList = [...collaborators, newCollaborator];
            toast({ title: "Colaborador adicionado!" });
        }
        setCollaborators(updatedList);
        localStorage.setItem('collaborators', JSON.stringify(updatedList));
    };

    const handleDelete = (id) => {
        const updatedList = collaborators.filter(c => c.id !== id);
        setCollaborators(updatedList);
        localStorage.setItem('collaborators', JSON.stringify(updatedList));
        toast({ title: "Colaborador removido." });
    };

    const handleEdit = (collaborator) => {
        setEditingCollaborator(collaborator);
        setIsModalOpen(true);
    };
    
    const handleNew = () => {
        setEditingCollaborator(null);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-1">Colaboradores</h2>
                    <p className="text-muted-foreground">Gerencie sua equipe e suas permissões.</p>
                </div>
                <Button onClick={handleNew}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Colaborador
                </Button>
            </div>
            
            <div className="border rounded-lg">
                <div className="grid grid-cols-12 p-4 font-semibold border-b bg-muted/50">
                    <div className="col-span-4">Nome</div>
                    <div className="col-span-3">Função</div>
                    <div className="col-span-3">Acessos</div>
                    <div className="col-span-2 text-right">Ações</div>
                </div>
                {collaborators.map(collaborator => (
                    <motion.div
                        key={collaborator.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-12 p-4 items-center border-b last:border-b-0 hover:bg-muted/50"
                    >
                        <div className="col-span-4 flex items-center gap-3">
                            <AssigneeAvatar assignee={collaborator.name} size="10"/>
                            <div>
                                <div className="font-medium">{collaborator.name}</div>
                                <div className="text-sm text-muted-foreground">{collaborator.email}</div>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">{collaborator.role}</span>
                        </div>
                        <div className="col-span-3 text-sm text-muted-foreground">
                            {Object.keys(collaborator.permissions || {}).length} menus
                        </div>
                        <div className="col-span-2 flex justify-end gap-2">
                             <Button variant="ghost" size="icon" onClick={() => handleEdit(collaborator)}>
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-500" onClick={() => handleDelete(collaborator.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <CollaboratorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                collaborator={editingCollaborator}
                menuItems={allPermissions.filter(p => p.id !== 'collaborators')}
            />
        </div>
    );
};

export default CollaboratorsContent;