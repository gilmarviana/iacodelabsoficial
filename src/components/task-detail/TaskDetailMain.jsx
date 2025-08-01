import React from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import TaskDetailComments from '@/components/task-detail/TaskDetailComments';
import TaskDetailChecklist from '@/components/task-detail/TaskDetailChecklist';
import TaskDetailAttachments from '@/components/task-detail/TaskDetailAttachments';
import RichTextEditor from '@/components/RichTextEditor';

const TaskDetailMain = ({ task, onUpdate, clients, assignees, isReadOnly }) => {
    const taskCreationDate = task.createdAt ? format(new Date(task.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR }) : '';

    const handleTitleBlur = (e) => {
        onUpdate({ [e.target.name]: e.target.value });
    };

    const handleDescriptionChange = (value) => {
        onUpdate({ description: value });
    };
    
    return (
        <div className="flex-grow flex flex-col p-6 overflow-y-auto">
            <Input 
                name="title"
                defaultValue={task.title} 
                onBlur={handleTitleBlur}
                className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 p-0 h-auto mb-1"
                readOnly={isReadOnly}
            />
            <p className="text-sm text-muted-foreground mb-6">#{task.id.split('-')[1]} Criada por: {task.createdBy} em {taskCreationDate}</p>

            <Tabs defaultValue="description" className="flex-grow flex flex-col">
              <TabsList>
                <TabsTrigger value="description">Descrição</TabsTrigger>
                <TabsTrigger value="comments">Comentários</TabsTrigger>
                <TabsTrigger value="checklist">Checklist</TabsTrigger>
                <TabsTrigger value="attachments">Anexos</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4 flex-grow">
                 <RichTextEditor 
                    value={task.description} 
                    onChange={handleDescriptionChange}
                    placeholder="Adicione uma descrição para a tarefa..."
                    className="h-full"
                    readOnly={isReadOnly}
                />
              </TabsContent>
              <TabsContent value="comments" className="mt-4 flex-grow">
                <TaskDetailComments 
                    comments={task.comments || []}
                    onUpdate={(newComments) => onUpdate({ comments: newComments })}
                    clients={clients}
                    assignees={assignees}
                    isReadOnly={isReadOnly}
                />
              </TabsContent>
               <TabsContent value="checklist" className="mt-4 flex-grow">
                 <TaskDetailChecklist 
                    checklist={task.checklist || []}
                    onUpdate={(newChecklist) => onUpdate({ checklist: newChecklist })}
                    isReadOnly={isReadOnly}
                 />
              </TabsContent>
              <TabsContent value="attachments" className="mt-4 flex-grow">
                <TaskDetailAttachments 
                    attachments={task.attachments || []}
                    onUpdate={(newAttachments) => onUpdate({ attachments: newAttachments })}
                    isReadOnly={isReadOnly}
                />
              </TabsContent>
            </Tabs>
        </div>
    );
};

export default TaskDetailMain;