
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useTaskTimer from '@/hooks/useTaskTimer';
import TaskDetailHeader from '@/components/task-detail/TaskDetailHeader';
import TaskDetailMain from '@/components/task-detail/TaskDetailMain';
import TaskDetailSidebar from '@/components/task-detail/TaskDetailSidebar';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const TaskDetailModal = ({ isOpen, onClose, task, onUpdateTask, columns, projects, clients, assignees, existingTaskData, handleUpdateOption, handleUpdateTag }) => {
  const [editableTask, setEditableTask] = useState(task);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const { isRunning, timer, startTimer, stopTimer, setTimer } = useTaskTimer(
      (time) => {
          const newTimeWorked = new Date(time * 1000).toISOString().substr(11, 8);
          setEditableTask(prev => ({ ...prev, timeWorked: newTimeWorked }));
      }
  );

  useEffect(() => {
    setEditableTask(currentTask => ({
      ...{ 
          timeWorked: '00:00:00', 
          timeEstimated: '00:00:00',
          followers: [],
          checklist: [],
          comments: [],
          priority: 'Média',
          assignees: [],
          tags: [],
          attachments: [],
          startDate: null,
          endDate: null,
          ...currentTask
      },
      ...task,
    }));
    
    if (task?.timeWorked) {
        const timeParts = task.timeWorked.split(':').map(Number);
        const initialSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
        setTimer(initialSeconds);
    } else {
        setTimer(0);
    }

  }, [task, setTimer]);

  const handleUpdate = (updatedData) => {
    const newtask = { ...editableTask, ...updatedData };
    setEditableTask(newtask);
    onUpdateTask(newtask);
  };
  
  const handleMoveToCompleted = () => {
    const completedColumn = columns.find(c => c.status === 'Concluído');
    if (completedColumn) {
        const originalColumnId = Object.keys(onUpdateTask.getTasks()).find(key => onUpdateTask.getTasks()[key].some(t => t.id === editableTask.id));
        onUpdateTask(editableTask, completedColumn.id, originalColumnId);
        toast({ title: "Tarefa Concluída!", description: `A tarefa foi movida para "${completedColumn.title}".` });
        onClose();
    } else {
        toast({ title: "Erro", description: "Nenhuma coluna com status 'Concluído' foi encontrada.", variant: "destructive" });
    }
  };
  
  if (!isOpen || !editableTask) return null;

  const isClientAndNotCreator = user?.role === 'client' && user?.name !== editableTask.createdBy;
  const projectClientName = projects.find(p => p.title === editableTask.project)?.client;
  const projectClient = clients.find(c => c.name === projectClientName);
  
  const projectSpecificClients = projectClient ? [projectClient] : [];


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-screen-lg w-full h-[90vh] flex flex-col p-0 gap-0">
        <TaskDetailHeader 
            task={editableTask}
            onUpdate={handleUpdate}
            onComplete={handleMoveToCompleted}
            onTimerToggle={isRunning ? stopTimer : startTimer}
            isTimerRunning={isRunning}
            assignees={assignees}
            isReadOnly={isClientAndNotCreator}
        />
        <div className="flex-grow flex overflow-hidden">
            <TaskDetailMain
                task={editableTask}
                onUpdate={handleUpdate}
                clients={projectSpecificClients}
                assignees={assignees}
                isReadOnly={isClientAndNotCreator}
            />
            <TaskDetailSidebar
                task={editableTask}
                onUpdate={handleUpdate}
                columns={columns}
                projects={projects}
                clients={projectSpecificClients}
                getTasks={onUpdateTask.getTasks}
                onUpdateTask={onUpdateTask}
                existingTaskData={existingTaskData}
                isReadOnly={isClientAndNotCreator}
                handleUpdateOption={handleUpdateOption}
                handleUpdateTag={handleUpdateTag}
            />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailModal;
