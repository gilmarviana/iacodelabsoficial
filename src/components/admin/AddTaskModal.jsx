import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import RichTextEditor from '@/components/RichTextEditor';
import TagInput from '@/components/TagInput';
import CreatableSelect from '@/components/CreatableSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarPlus as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const AddTaskModal = ({ onSave, onDismiss, projects, clients, assignees, existingTaskData, userRole, handleUpdateOption, handleUpdateTag }) => {
    const { toast } = useToast();
    const [taskData, setTaskData] = useState({
        title: '',
        assignees: [],
        project: projects.length > 0 ? projects[0].title : '',
        type: null,
        description: '',
        priority: 'Média',
        tags: [],
        startDate: null,
        endDate: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSelectChange = (name, value) => {
      if (name === 'type' && value && !uniqueTypes.find(t => t.value === value.value)) {
        setUniqueTypes(prev => [...prev, value]);
      }
      setTaskData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (name, date) => {
        setTaskData(prev => ({ ...prev, [name]: date }));
    };

    const handleDescriptionChange = (value) => {
        setTaskData(prev => ({ ...prev, description: value }));
    };

    const handleTagsChange = (newTags) => {
        setTaskData(prev => ({ ...prev, tags: newTags }));
    };
    
    const handleAssigneeToggle = (assignee) => {
        setTaskData(prev => {
            const currentAssignees = prev.assignees || [];
            if (currentAssignees.includes(assignee)) {
                return { ...prev, assignees: currentAssignees.filter(a => a !== assignee) };
            } else {
                return { ...prev, assignees: [...currentAssignees, assignee] };
            }
        });
    };

    const resetForm = () => {
         setTaskData({
            title: '',
            assignees: [],
            project: projects.length > 0 ? projects[0].title : '',
            type: null,
            description: '',
            priority: 'Média',
            tags: [],
            startDate: null,
            endDate: null,
        });
    }

    const handleSubmit = (e, createAnother = false) => {
        e.preventDefault();
        if (!taskData.title || !taskData.type) {
            toast({
                title: 'Campos Obrigatórios',
                description: 'Por favor, preencha o Título e o Tipo da tarefa.',
                variant: 'destructive',
            });
            return;
        }
        onSave(taskData);

        if (createAnother) {
            resetForm();
            toast({
                title: 'Tarefa Salva!',
                description: 'Crie a próxima tarefa.',
            });
        } else {
            resetForm();
            onDismiss();
        }
    };

    const allTasksFlat = Object.values(existingTaskData || {}).flat();
    const [uniqueTypes, setUniqueTypes] = useState(() => [...new Map(allTasksFlat.filter(t => t.type).map(t => [t.type.value, t.type])).values()]);
    const uniqueTags = [...new Map(allTasksFlat.flatMap(t => t.tags || []).map(t => [t.value, t])).values()];
    const canCreateOptions = true;
    const canEditColorOptions = userRole === 'admin';

    return (
        <DialogContent className="sm:max-w-[725px]">
            <DialogHeader>
                <DialogTitle className="flex items-center">
                    Criar nova tarefa
                </DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => handleSubmit(e, false)}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Título da tarefa <span className="text-red-500">*</span></Label>
                        <div className="col-span-3 relative">
                            <Input id="title" name="title" value={taskData.title} onChange={handleInputChange} placeholder="Título da tarefa" required/>
                        </div>
                    </div>
                    {userRole === 'admin' && (
                        <>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="assignees" className="text-right">Alocados</Label>
                                <div className="col-span-3">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                {taskData.assignees.length > 0 ? taskData.assignees.join(', ') : 'Selecionar alocados'}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full">
                                            {assignees.map(assignee => (
                                                <DropdownMenuCheckboxItem
                                                    key={assignee.id}
                                                    checked={taskData.assignees.includes(assignee.name)}
                                                    onCheckedChange={() => handleAssigneeToggle(assignee.name)}
                                                >
                                                    {assignee.name}
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="project" className="text-right">Projeto <span className="text-red-500">*</span></Label>
                                <Select name="project" value={taskData.project} onValueChange={(value) => handleSelectChange('project', value)}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Selecione um projeto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {projects.map(p => <SelectItem key={p.id} value={p.title}>{p.title}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">Tipo <span className="text-red-500">*</span></Label>
                        <div className="col-span-3">
                             <CreatableSelect 
                                options={uniqueTypes}
                                value={uniqueTypes.find(t => t.value === taskData.type?.value) || taskData.type}
                                onChange={(value) => handleSelectChange('type', value)}
                                placeholder="Selecione ou crie um tipo"
                                onUpdateOption={(option, oldValue) => {
                                  setUniqueTypes(prev => {
                                    const idx = prev.findIndex(t => t.value === (oldValue || option.value));
                                    if (idx > -1) {
                                      const updated = [...prev];
                                      updated[idx] = option;
                                      return updated;
                                    }
                                    return prev;
                                  });
                                }}
                                canCreate={canCreateOptions}
                                canEditColor={canEditColorOptions}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tags" className="text-right">Tags</Label>
                        <div className="col-span-3">
                            <TagInput 
                                value={taskData.tags} 
                                onChange={handleTagsChange} 
                                existingTags={uniqueTags} 
                                onUpdateTag={(tag, oldValue) => handleUpdateTag('tags', tag, oldValue)}
                                canCreate={canCreateOptions}
                                canEditColor={canEditColorOptions}
                             />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                         <Label htmlFor="priority" className="text-right">Prioridade</Label>
                         <Select name="priority" value={taskData.priority} onValueChange={(value) => handleSelectChange('priority', value)}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Definir prioridade"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Baixa">Baixa</SelectItem>
                                <SelectItem value="Média">Média</SelectItem>
                                <SelectItem value="Alta">Alta</SelectItem>
                                <SelectItem value="Urgente">Urgente</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Datas</Label>
                        <div className="col-span-3 grid grid-cols-2 gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {taskData.startDate ? format(taskData.startDate, 'PPP', { locale: ptBR }) : <span>Data de início</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={taskData.startDate} onSelect={(date) => handleDateChange('startDate', date)} initialFocus />
                                </PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {taskData.endDate ? format(taskData.endDate, 'PPP', { locale: ptBR }) : <span>Data de fim</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={taskData.endDate} onSelect={(date) => handleDateChange('endDate', date)} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="description" className="text-right mt-2">Descrição</Label>
                        <div className="col-span-3 min-h-[200px]">
                            <RichTextEditor value={taskData.description} onChange={handleDescriptionChange} placeholder="Digite uma breve descrição para a tarefa aqui..." />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={() => { resetForm(); onDismiss(); }}>Descartar</Button>
                    <Button type="submit" variant="outline">Salvar</Button>
                    {userRole === 'admin' && <Button type="button" onClick={(e) => handleSubmit(e, true)}>Salvar e Criar outra</Button>}
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default AddTaskModal;
