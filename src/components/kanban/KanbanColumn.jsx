import React from 'react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { MoreHorizontal, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TaskCard from '@/components/kanban/TaskCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

const KanbanColumn = ({ col, tasks, onRemoveColumn, onEditColumn, onTaskClick, onNewTask, canAddTask, userRole }) => {
  const { setNodeRef } = useSortable({ id: col.id, data: { type: 'column' } });
  const isCompletedColumn = col.status === 'Concluído';

  return (
    <div className={`rounded-xl p-3 border w-[320px] flex-shrink-0 flex flex-col ${isCompletedColumn ? 'bg-green-500/5' : 'bg-secondary/50'}`}>
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="font-bold text-foreground">{col.title} <span className="text-sm font-normal text-muted-foreground">{tasks.length}</span></h3>
        {userRole === 'admin' && (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal size={18} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditColumn(col)}><Edit className="mr-2 h-4 w-4" /> Editar</DropdownMenuItem>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                             <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500"><Trash2 className="mr-2 h-4 w-4" /> Remover</DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta ação não pode ser desfeita. Isso removerá permanentemente a coluna e todas as suas tarefas.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onRemoveColumn(col.id)} className="bg-destructive hover:bg-destructive/90">Remover</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuContent>
            </DropdownMenu>
        )}
      </div>
      <SortableContext id={col.id} items={tasks}>
        <div ref={setNodeRef} className="min-h-[100px] flex-grow overflow-y-auto px-1 -mx-1 custom-scrollbar">
          {tasks.map(task => <TaskCard key={task.id} task={task} onTaskClick={onTaskClick} />)}
        </div>
      </SortableContext>
      {canAddTask && (
        <Button variant="ghost" className="w-full mt-2 justify-start" onClick={onNewTask}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Tarefa
        </Button>
      )}
    </div>
  );
};

export default KanbanColumn;