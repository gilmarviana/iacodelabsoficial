
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, AlertTriangle, Flag, CheckSquare, MessageSquare, Type, Tag, User, Calendar, Users } from 'lucide-react';
import AssigneeAvatar from '@/components/task-detail/AssigneeAvatar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const TaskPublicView = () => {
    const { taskId } = useParams();
    const { toast } = useToast();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const allTasksString = localStorage.getItem('kanbanTasks');
            if (!allTasksString) {
                throw new Error("Nenhuma tarefa encontrada no armazenamento local.");
            }
            const allTasksObject = JSON.parse(allTasksString);
            const allTasksFlat = Object.values(allTasksObject).flat();
            const foundTask = allTasksFlat.find(t => t.id === taskId);

            if (foundTask) {
                setTask(foundTask);
            } else {
                throw new Error("Tarefa não encontrada.");
            }
        } catch (e) {
            setError(e.message);
            toast({
                title: "Erro ao carregar tarefa",
                description: e.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }, [taskId, toast]);

    const priorityColors = {
        'Baixa': 'text-blue-500',
        'Média': 'text-yellow-500',
        'Alta': 'text-orange-500',
        'Urgente': 'text-red-500',
    };

    const stripHtml = (html) => {
        if (!html) return "";
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.innerHTML || "";
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
                <h1 className="text-2xl font-bold">Erro ao Carregar Tarefa</h1>
                <p className="text-muted-foreground mt-2">{error}</p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{task.title} - Visualização Pública</title>
                <meta name="description" content={`Detalhes da tarefa: ${task.title}`} />
            </Helmet>
            <div className="min-h-screen bg-secondary/30 p-4 sm:p-6 md:p-8">
                <div className="max-w-4xl mx-auto bg-card p-6 sm:p-8 rounded-2xl shadow-lg border">
                    <h1 className="text-3xl font-bold mb-2">{task.title}</h1>
                    <p className="text-sm text-muted-foreground mb-6">
                        Projeto: <span className="font-semibold text-foreground">{task.project}</span>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="flex items-center gap-3 bg-secondary/50 p-3 rounded-lg">
                            <User className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Criado por</p>
                                <p className="font-medium">{task.createdBy}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-secondary/50 p-3 rounded-lg">
                            <Calendar className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Criado em</p>
                                <p className="font-medium">{format(new Date(task.createdAt), "dd/MM/yyyy", { locale: ptBR })}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-secondary/50 p-3 rounded-lg">
                            <Flag className={`w-5 h-5 ${priorityColors[task.priority]}`} />
                            <div>
                                <p className="text-xs text-muted-foreground">Prioridade</p>
                                <p className="font-medium">{task.priority}</p>
                            </div>
                        </div>
                    </div>

                    {task.description && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-3">Descrição</h2>
                            <div className="prose prose-sm dark:prose-invert max-w-none p-4 border rounded-lg bg-background" dangerouslySetInnerHTML={{ __html: stripHtml(task.description) }} />
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2"><Type className="w-4 h-4" /> Tipo</h3>
                            {task.type ? (
                                <span className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium w-fit" style={{ backgroundColor: `${task.type.color}20`, color: task.type.color }}>
                                    {task.type.label}
                                </span>
                            ) : <p className="text-sm text-muted-foreground">N/A</p>}
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2"><Tag className="w-4 h-4" /> Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {task.tags?.length > 0 ? task.tags.map(tag => (
                                    <span key={tag.label} className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: `${tag.color}20`, color: tag.color }}>
                                        {tag.label}
                                    </span>
                                )) : <p className="text-sm text-muted-foreground">Nenhuma tag</p>}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2"><Users className="w-4 h-4" /> Alocados</h3>
                            <div className="flex items-center -space-x-2">
                                {task.assignees?.length > 0 ? task.assignees.map(a => <AssigneeAvatar key={a} assignee={a} size="8"/>) : <p className="text-sm text-muted-foreground">Ninguém alocado</p>}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2"><CheckSquare className="w-4 h-4" /> Checklist</h3>
                            {task.checklist?.length > 0 ? (
                                <p className="text-sm">{task.checklist.filter(c => c.completed).length} de {task.checklist.length} itens concluídos</p>
                            ) : <p className="text-sm text-muted-foreground">Nenhum checklist</p>}
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Comentários</h3>
                            <p className="text-sm">{task.comments?.length || 0} comentários</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskPublicView;
