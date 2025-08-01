
import React, { useState, useMemo, useEffect } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, closestCorners } from '@dnd-kit/core';
import { Plus, Filter, Share2, Copy, Kanban, GanttChartSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import KanbanColumn from '@/components/kanban/KanbanColumn';
import TaskDetailModal from '@/components/admin/TaskDetailModal';
import AddTaskModal from '@/components/admin/AddTaskModal';
import ColumnForm from '@/components/kanban/ColumnForm';
import useKanban from '@/hooks/useKanban';
import { useAuth } from '@/contexts/AuthContext';
import GanttView from '@/components/kanban/GanttView';

const ShareBoardModal = ({ open, onOpenChange }) => {
    const { toast } = useToast();
    const boardUrl = window.location.href;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(boardUrl).then(() => {
            toast({ title: "Link copiado!", description: "O link do quadro foi copiado." });
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Compartilhar Quadro</DialogTitle>
                    <DialogDescription>
                        Qualquer pessoa com o link poderá visualizar este quadro.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <Input value={boardUrl} readOnly />
                    <Button onClick={handleCopyLink} size="icon">
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                 <RadioGroup defaultValue="public" className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="public" />
                        <Label htmlFor="public">Qualquer pessoa com o link pode visualizar</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="restricted" id="restricted" />
                        <Label htmlFor="restricted">Apenas clientes e colaboradores do projeto</Label>
                    </div>
                </RadioGroup>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


const TasksContent = () => {
  const { 
    tasks, 
    columns, 
    handleDragEnd, 
    handleAddTask, 
    handleUpdateTask, 
    handleSaveColumn, 
    handleRemoveColumn,
    handleUpdateOption,
    handleUpdateTag,
    projects,
    clients,
    assignees,
  } = useKanban();
  
  const { user } = useAuth();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [viewMode, setViewMode] = useState('kanban');
  const [filters, setFilters] = useState({
    project: 'all',
  });

  useEffect(() => {
    if (user?.role === 'client') {
        const clientProject = projects.find(p => p.client === user.name);
        if (clientProject) {
            setFilters({ project: clientProject.title });
        }
    }
  }, [user, projects]);


  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const onSaveTask = (taskData) => {
      const firstColumnId = columns.length > 0 ? columns[0].id : null;
      if (!firstColumnId) return;

      let projectForTask = taskData.project;
      if (user?.role === 'client') {
          const clientProject = projects.find(p => p.client === user.name);
          if (clientProject) {
              projectForTask = clientProject.title;
          }
      }
      
      const taskPayload = { ...taskData, project: projectForTask };
      handleAddTask(firstColumnId, taskPayload);
      setIsTaskModalOpen(false);
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };
  
  const handleCloseTaskDetail = () => {
    setSelectedTask(null);
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const handleOpenColumnModal = (col = null) => {
    setEditingColumn(col);
    setIsColumnModalOpen(true);
  };
  
  const allTasks = useMemo(() => Object.values(tasks).flat(), [tasks]);

  const filteredTasksForKanban = useMemo(() => {
    let tasksToFilter = allTasks;

    if (user?.role === 'client') {
        const clientProjectTitle = projects.find(p => p.client === user.name)?.title;
        tasksToFilter = allTasks.filter(task => task.project === clientProjectTitle);
    } else if (filters.project !== 'all') {
        tasksToFilter = allTasks.filter(task => task.project === filters.project);
    }
    
    const tasksByColumn = {};
    columns.forEach(col => {
        tasksByColumn[col.id] = [];
    });
    
    tasksToFilter.forEach(task => {
        const originalColumnId = Object.keys(tasks).find(key => tasks[key].some(t => t.id === task.id));
        if (originalColumnId && tasksByColumn[originalColumnId]) {
            tasksByColumn[originalColumnId].push(task);
        }
    });

    return tasksByColumn;
}, [allTasks, filters.project, columns, tasks, user, projects]);

  const filteredTasksForGantt = useMemo(() => {
    if (user?.role === 'client') {
        const clientProjectTitle = projects.find(p => p.client === user.name)?.title;
        return allTasks.filter(task => task.project === clientProjectTitle);
    }
    if (filters.project === 'all') {
        return allTasks;
    }
    return allTasks.filter(task => task.project === filters.project);
  }, [allTasks, filters.project, user, projects]);

  const uniqueProjects = useMemo(() => {
    if (user?.role === 'client') {
        return projects.filter(p => p.client === user.name);
    }
    return projects;
  }, [projects, user]);
  
  const getBoardTitle = () => {
      if (user?.role === 'client') {
         const clientProject = projects.find(p => p.client === user.name);
         return clientProject ? `Projeto: ${clientProject.title}` : "Meu Quadro";
      }
      if (filters.project === 'all') {
          return "Todos os Projetos";
      }
      const projectDetails = projects.find(p => p.title === filters.project);
      return projectDetails ? `Projeto: ${projectDetails.title}` : "Quadro";
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 mb-4 flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold">Quadro de Tarefas</h2>
            <p className="text-muted-foreground">{getBoardTitle()}</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setViewMode(viewMode === 'kanban' ? 'gantt' : 'kanban')}>
                {viewMode === 'kanban' ? <GanttChartSquare className="mr-2 h-4 w-4" /> : <Kanban className="mr-2 h-4 w-4" />}
                {viewMode === 'kanban' ? 'Gantt' : 'Kanban'}
            </Button>
            <Button variant="outline" onClick={() => setIsShareModalOpen(true)}>
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
            </Button>
            {user?.role === 'admin' && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filtros
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Filtrar por Projeto</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked={filters.project === 'all'} onCheckedChange={() => handleFilterChange('project', 'all')}>Todos</DropdownMenuCheckboxItem>
                        {uniqueProjects.map(p => <DropdownMenuCheckboxItem key={p.id} checked={filters.project === p.title} onCheckedChange={() => handleFilterChange('project', p.title)}>{p.title}</DropdownMenuCheckboxItem>)}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus size={16} className="mr-2" /> Adicionar Tarefa
                </Button>
              </DialogTrigger>
              <AddTaskModal 
                  onSave={onSaveTask}
                  onDismiss={() => setIsTaskModalOpen(false)}
                  projects={projects}
                  clients={clients}
                  assignees={assignees}
                  existingTaskData={allTasks}
                  userRole={user?.role}
                  handleUpdateOption={handleUpdateOption}
                  handleUpdateTag={handleUpdateTag}
              />
            </Dialog>
        </div>
      </div>
      {viewMode === 'kanban' ? (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
            <div className="flex-grow flex gap-4 overflow-x-auto pb-4 items-start">
            {columns.map((col, index) => (
                <KanbanColumn 
                key={col.id} 
                col={col}
                tasks={filteredTasksForKanban[col.id] || []}
                onRemoveColumn={handleRemoveColumn}
                onEditColumn={handleOpenColumnModal}
                onTaskClick={handleTaskClick}
                onNewTask={() => setIsTaskModalOpen(true)}
                canAddTask={user?.role === 'admin' || (user?.role === 'client' && index === 0)}
                userRole={user?.role}
                />
            ))}
            {user?.role === 'admin' && (
                <div className="flex-shrink-0">
                <Button variant="outline" className="h-full" onClick={() => handleOpenColumnModal()}>
                        <Plus size={16} className="mr-2" /> Adicionar Coluna
                </Button>
                </div>
            )}
            </div>
        </DndContext>
      ) : (
        <GanttView tasks={filteredTasksForGantt} onTaskClick={handleTaskClick} />
      )}
      <Dialog open={isColumnModalOpen} onOpenChange={setIsColumnModalOpen}>
          <ColumnForm
              onSave={(data) => {
                  handleSaveColumn(data, editingColumn);
                  setIsColumnModalOpen(false);
              }}
              initialData={editingColumn}
              onDismiss={() => setIsColumnModalOpen(false)}
          />
      </Dialog>
      {selectedTask && (
        <TaskDetailModal 
            isOpen={!!selectedTask} 
            onClose={handleCloseTaskDetail} 
            task={selectedTask}
            onUpdateTask={handleUpdateTask}
            columns={columns}
            projects={projects}
            clients={clients}
            assignees={assignees}
            existingTaskData={allTasks}
            handleUpdateOption={handleUpdateOption}
            handleUpdateTag={handleUpdateTag}
        />
      )}
       <ShareBoardModal open={isShareModalOpen} onOpenChange={setIsShareModalOpen} />
    </div>
  );
};

export default TasksContent;
