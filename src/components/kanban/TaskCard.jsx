
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreHorizontal, Flag, CheckSquare, Edit, Trash2, Move, MessageSquare, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AssigneeAvatar from '@/components/task-detail/AssigneeAvatar';

const TaskCard = ({ task, onTaskClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const { toast } = useToast();
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 100 : 'auto',
  };

  const showNotImplementedToast = () => {
    toast({
      title: "🚧 Funcionalidade não implementada!",
      description: "Você pode solicitar isso no seu próximo prompt! 🚀",
    });
  };

  const priorityColors = {
    'Baixa': 'text-blue-500',
    'Média': 'text-yellow-500',
    'Alta': 'text-orange-500',
    'Urgente': 'text-red-500',
  };

  const getPriorityLabel = (priorityValue) => {
    if (typeof priorityValue === 'object' && priorityValue !== null) {
      return priorityValue.label;
    }
    return priorityValue;
  }
  
  const priorityLabel = getPriorityLabel(task.priority);

  const stripHtml = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }
  const descriptionSnippet = task.description ? stripHtml(task.description).substring(0, 80) + '...' : '';

  return (
    <div ref={setNodeRef} style={style} className="bg-card p-3 rounded-lg border mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing w-full">
        <div onClick={(e) => { e.stopPropagation(); onTaskClick(task); }} className="cursor-pointer">
          <div className="flex justify-between items-start mb-2">
             <div className="flex items-center gap-2">
                {task.type && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium" style={{ backgroundColor: `${task.type.color}20`, color: task.type.color }}>
                        <Type size={12} /> {task.type.label}
                    </span>
                )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onClick={() => onTaskClick(task)}><Edit className="mr-2 h-4 w-4" /> Editar</DropdownMenuItem>
                <DropdownMenuItem onClick={showNotImplementedToast}><Move className="mr-2 h-4 w-4" /> Mover</DropdownMenuItem>
                <DropdownMenuItem onClick={showNotImplementedToast} className="text-red-500"><Trash2 className="mr-2 h-4 w-4" /> Excluir</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="font-medium mb-2 text-sm">{task.title}</p>
          {descriptionSnippet && <p className="text-xs text-muted-foreground mb-3">{descriptionSnippet}</p>}
           <div className="flex flex-wrap gap-1 mb-3">
              {task.tags?.map(tag => (
                <span key={tag.label} className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: `${tag.color}20`, color: tag.color }}>
                  {tag.label}
                </span>
              ))}
            </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 text-muted-foreground">
                {priorityLabel && <Flag size={14} className={priorityColors[priorityLabel]} />}
                {(task.checklist?.length > 0) && (
                  <div className="flex items-center gap-1">
                    <CheckSquare size={14} />
                    <span className="text-xs">{task.checklist.filter(c => c.completed).length}/{task.checklist.length}</span>
                  </div>
                )}
                {(task.comments?.length > 0) && (
                    <div className="flex items-center gap-1">
                        <MessageSquare size={14} />
                        <span className="text-xs">{task.comments.length}</span>
                    </div>
                )}
            </div>
            <div className="flex items-center -space-x-2">
              {task.assignees?.map(a => <AssigneeAvatar key={a} assignee={a} size="6"/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
