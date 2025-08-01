
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Share2, Flag, Play, Check, Plus, Clock, StopCircle, Copy
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import AssigneeAvatar from '@/components/task-detail/AssigneeAvatar';

const ShareModal = ({ open, onOpenChange, task }) => {
    const { toast } = useToast();
    const [permission, setPermission] = useState('private');
    const taskUrl = `${window.location.origin}/task/${task.id}`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(taskUrl).then(() => {
            toast({ title: "Link copiado!", description: "O link da tarefa foi copiado para a área de transferência." });
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Compartilhar Tarefa</DialogTitle>
                    <DialogDescription>
                        Copie o link abaixo ou defina as permissões de visualização.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="flex items-center space-x-2">
                        <Input value={taskUrl} readOnly />
                        <Button onClick={handleCopyLink} size="icon">
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                    <div>
                        <Label className="font-semibold">Permissões do Link</Label>
                        <RadioGroup defaultValue="private" className="mt-2 space-y-2" onValueChange={setPermission}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="private" id="private" />
                                <Label htmlFor="private">Qualquer pessoa com o link pode visualizar</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="restricted" id="restricted" />
                                <Label htmlFor="restricted">Apenas clientes e colaboradores do projeto</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>Fechar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const AssigneeSelectionModal = ({ open, onOpenChange, assignees, selectedAssignees, onUpdate }) => {
    const [currentSelection, setCurrentSelection] = useState(selectedAssignees);

    const handleToggle = (assigneeName) => {
        setCurrentSelection(prev => 
            prev.includes(assigneeName) 
            ? prev.filter(name => name !== assigneeName) 
            : [...prev, assigneeName]
        );
    };

    const handleSave = () => {
        onUpdate(currentSelection);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Alocar Colaborador</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    {assignees.map(assignee => (
                        <div key={assignee.id} className="flex items-center space-x-2">
                             <Checkbox 
                                id={`assignee-${assignee.id}`} 
                                checked={currentSelection.includes(assignee.name)}
                                onCheckedChange={() => handleToggle(assignee.name)}
                            />
                            <Label htmlFor={`assignee-${assignee.id}`} className="flex items-center gap-2">
                                <AssigneeAvatar assignee={assignee.name} size="8" />
                                {assignee.name}
                            </Label>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const TaskDetailHeader = ({ task, onUpdate, onComplete, onTimerToggle, isTimerRunning, assignees, isReadOnly }) => {
    const { toast } = useToast();
    const [isAssigneeModalOpen, setIsAssigneeModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const handleSetUrgent = () => {
        onUpdate({ priority: 'Urgente' });
        toast({ title: "Prioridade alterada!", description: "A tarefa foi marcada como Urgente." });
    };

    const handleUpdateAssignees = (newAssignees) => {
        onUpdate({ assignees: newAssignees });
    };

    return (
        <>
            <div className="flex-shrink-0 p-4 border-b flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={onTimerToggle} disabled={isReadOnly}>
                        {isTimerRunning ? <StopCircle className="h-4 w-4 text-red-500" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={onComplete} disabled={isReadOnly}>
                        <Check className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center">
                        {task.assignees?.map(a => <AssigneeAvatar key={a} assignee={a} />)}
                        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 -ml-2 bg-muted hover:bg-muted-foreground/20" onClick={() => setIsAssigneeModalOpen(true)} disabled={isReadOnly}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{task.timeWorked} / {task.timeEstimated}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => setIsShareModalOpen(true)}><Share2 className="h-4 w-4 mr-2" />Compartilhar</Button>
                    <Button variant="ghost" size="icon" onClick={handleSetUrgent} className="mr-2" disabled={isReadOnly}>
                        <Flag className={`h-4 w-4 ${task.priority === 'Urgente' ? 'text-red-500 fill-current' : ''}`} />
                    </Button>
                </div>
            </div>
            <AssigneeSelectionModal 
                open={isAssigneeModalOpen}
                onOpenChange={setIsAssigneeModalOpen}
                assignees={assignees}
                selectedAssignees={task.assignees}
                onUpdate={handleUpdateAssignees}
            />
            <ShareModal
                open={isShareModalOpen}
                onOpenChange={setIsShareModalOpen}
                task={task}
            />
        </>
    );
};

export default TaskDetailHeader;
