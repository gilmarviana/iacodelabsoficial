
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { LayoutGrid, AlertTriangle, Users, Plus, X, Tag, Type, CalendarPlus as CalendarIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import CreatableSelect from '@/components/CreatableSelect';
import TagInput from '@/components/TagInput';
import { useAuth } from '@/contexts/AuthContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const TaskDetailSidebar = ({ task, onUpdate, columns, projects, clients, getTasks, onUpdateTask, existingTaskData, isReadOnly, handleUpdateOption, handleUpdateTag }) => {
    const { toast } = useToast();
    const { user } = useAuth();

    const priorities = [
        { value: 'Baixa', label: 'Baixa', color: 'bg-blue-500' },
        { value: 'Média', label: 'Média', color: 'bg-yellow-500' },
        { value: 'Alta', label: 'Alta', color: 'bg-orange-500' },
        { value: 'Urgente', label: 'Urgente', color: 'bg-red-500' },
    ];
    
    const priorityValue = (typeof task.priority === 'object' && task.priority !== null) ? task.priority.value : task.priority;

    const findColumnIdForTask = () => {
        const tasksByColumn = getTasks();
        if (!tasksByColumn) return columns[0]?.id;
        for (const colId in tasksByColumn) {
            if (tasksByColumn[colId]?.some(t => t.id === task.id)) return colId;
        }
        return columns[0]?.id;
    };
    const currentColumnId = findColumnIdForTask();
    
    const handleValueChange = (name, value) => {
        if (isReadOnly) {
            toast({ title: "Ação não permitida", description: "Você não tem permissão para editar este campo.", variant: "destructive" });
            return;
        }
        if (name === 'columnId') {
            const originalColumnId = findColumnIdForTask();
            onUpdateTask(task, value, originalColumnId);
            toast({ title: "Etapa alterada!", description: `Tarefa movida.` });
        } else {
             const newPriority = priorities.find(p => p.value === value);
             if (name === 'priority' && newPriority) {
                onUpdate({ [name]: newPriority.value });
             } else {
                onUpdate({ [name]: value });
             }
        }
    };
    
    const handleAddFollower = (followerName) => {
        if (followerName && !(task.followers || []).includes(followerName)) {
            onUpdate({ followers: [...(task.followers || []), followerName] });
        }
    };

    const handleRemoveFollower = (followerName) => {
        onUpdate({ followers: (task.followers || []).filter(f => f !== followerName) });
    };

    const projectClients = clients.filter(c => task.project === "GDO Fantasy Game" || Math.random() > 0.5); 
    
    const allTasksFlat = Object.values(existingTaskData || {}).flat();
    const uniqueTypes = [...new Map(allTasksFlat.filter(t => t.type).map(t => [t.type.value, t.type])).values()];
    const uniqueTags = [...new Map(allTasksFlat.flatMap(t => t.tags || []).map(t => [t.value, t])).values()];
    const canCreateOptions = user?.role === 'admin';

    return (
        <div className="w-[350px] flex-shrink-0 border-l bg-secondary/50 p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-sm"><LayoutGrid className="w-4 h-4 text-muted-foreground"/> Projeto</Label>
                <span className="font-semibold text-right">{task.project}</span>
            </div>
            <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-sm"><LayoutGrid className="w-4 h-4 text-muted-foreground"/> Etapa</Label>
                <Select value={currentColumnId} onValueChange={(value) => handleValueChange('columnId', value)} disabled={isReadOnly}>
                    <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {columns.map(c => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-sm"><AlertTriangle className="w-4 h-4 text-muted-foreground"/> Prioridade</Label>
                <Select value={priorityValue} onValueChange={(value) => handleValueChange('priority', value)} disabled={isReadOnly}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${priorities.find(p => p.value === priorityValue)?.color}`}></div>
                                <span>{priorities.find(p => p.value === priorityValue)?.label}</span>
                            </div>
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {priorities.map(p => <SelectItem key={p.value} value={p.value}>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${p.color}`}></div>
                                {p.label}
                            </div>
                        </SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label className="flex items-center gap-2 text-sm mb-2">Datas</Label>
                <div className="space-y-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal" disabled={isReadOnly}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {task.startDate ? format(new Date(task.startDate), 'PPP', { locale: ptBR }) : <span>Data de início</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={task.startDate ? new Date(task.startDate) : null} onSelect={(date) => handleValueChange('startDate', date)} initialFocus />
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal" disabled={isReadOnly}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {task.endDate ? format(new Date(task.endDate), 'PPP', { locale: ptBR }) : <span>Data de fim</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={task.endDate ? new Date(task.endDate) : null} onSelect={(date) => handleValueChange('endDate', date)} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
             <div>
                <Label className="flex items-center gap-2 text-sm mb-2"><Type className="w-4 h-4 text-muted-foreground"/> Tipo</Label>
                <div className={isReadOnly ? 'pointer-events-none opacity-50' : ''}>
                    <CreatableSelect
                        options={uniqueTypes}
                        value={task.type}
                        onChange={(value) => handleValueChange('type', value)}
                        placeholder="Selecione ou crie um tipo"
                        onUpdateOption={(option, oldValue) => handleUpdateOption('type', option, oldValue)}
                        canCreate={canCreateOptions}
                        canEditColor={canCreateOptions}
                    />
                </div>
            </div>
             <div>
                <Label className="flex items-center gap-2 text-sm mb-2"><Tag className="w-4 h-4 text-muted-foreground"/> Tags</Label>
                <div className={isReadOnly ? 'pointer-events-none opacity-50' : ''}>
                    <TagInput 
                        value={task.tags || []}
                        onChange={(value) => handleValueChange('tags', value)}
                        existingTags={uniqueTags}
                        onUpdateTag={(tag, oldValue) => handleUpdateTag('tags', tag, oldValue)}
                        canCreate={canCreateOptions}
                        canEditColor={canCreateOptions}
                    />
                </div>
            </div>
            <div>
                 <Label className="flex items-center gap-2 text-sm"><Users className="w-4 h-4 text-muted-foreground"/> Seguidores</Label>
                 <div className="flex flex-wrap gap-1 mt-2">
                    {(task.followers || []).map(f => (
                        <div key={f} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full flex items-center gap-1">
                            {f}
                            <button onClick={() => handleRemoveFollower(f)} className="hover:text-foreground">
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                 </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="mt-2 w-full">
                            <Plus className="w-4 h-4 mr-2" /> Adicionar Seguidor
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[300px]">
                        {projectClients.map(client => (
                            <DropdownMenuItem key={client.id} onSelect={() => handleAddFollower(client.name)}>
                                {client.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                 </DropdownMenu>
            </div>
        </div>
    );
};

export default TaskDetailSidebar;
