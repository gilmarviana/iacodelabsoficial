import { useState, useEffect } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const useKanban = () => {
    const [tasks, setTasks] = useState({});
    const [columns, setColumns] = useState([]);
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [assignees, setAssignees] = useState([]);
    const { toast } = useToast();
    const { user } = useAuth();

    useEffect(() => {
        const savedTasks = localStorage.getItem('kanbanTasks');
        const savedColumns = localStorage.getItem('kanbanColumns');
        const savedProjects = localStorage.getItem('projects');
        
        const mockClients = [
            { id: 1, name: 'Tech Solutions' },
            { id: 2, name: 'FoodCorp' },
            { id: 3, name: 'Innovate Inc.' },
            { id: 4, name: 'Global Web' },
            { id: 5, name: 'Cliente Demo' },
        ];
        setClients(mockClients);

        const mockAssignees = [
            { id: 1, name: 'Guilherme Victor' },
            { id: 2, name: 'Ricardo Takeshi' },
            { id: 3, name: 'João Silva' },
            { id: 4, name: 'Maria Souza' },
            { id: 5, name: 'Administrador' },
        ];
        setAssignees(mockAssignees);

        if (savedProjects) {
            setProjects(JSON.parse(savedProjects));
        }
        
        if (savedTasks && savedColumns) {
            setTasks(JSON.parse(savedTasks));
            setColumns(JSON.parse(savedColumns));
        } else {
            const initialTasksData = {
              'backlog': [
                { id: 'task-1', title: 'Tela de perfil sem opção de redefinir senha', description: 'Não está aparecendo a opção de redefinir senha no "Meu Perfil" ou em qualquer outro lugar da plataforma. O botão existia.', type: { value: 'Bug', label: 'Bug', color: '#ef4444' }, tags: [{value: 'autenticação', label: 'autenticação', color: '#3b82f6'}, {value: 'perfil', label: 'perfil', color: '#8b5cf6'}], assignees: ['Guilherme Victor', 'Ricardo Takeshi'], subtasks: { total: 0, completed: 0 }, timeWorked: '00:30:00', timeEstimated: '01:00:00', project: 'GDO Fantasy Game', createdBy: 'Ricardo Takeshi', createdAt: '2025-07-31T10:30:00', followers: [], checklist: [], comments: [], priority: 'Alta' },
              ],
              'todo': [
                { id: 'task-3', title: 'Colocar somente as rodadas concluídas e em andamento como visíveis no "Histórico"', description: '', type: { value: 'Melhoria', label: 'Melhoria', color: '#f97316' }, tags: [{value: 'histórico', label: 'histórico', color: '#22c55e'}, {value: 'configurações gerais', label: 'configurações gerais', color: '#14b8a6'}], assignees: [], subtasks: { total: 0, completed: 0 }, timeWorked: '00:00:00', timeEstimated: '02:00:00', project: 'GDO Fantasy Game', createdBy: 'Admin', createdAt: '2025-07-29T11:00:00', followers: [], checklist: [], comments: [], priority: 'Média' },
              ],
              'in-progress': [
                { id: 'task-5', title: 'Anulação de Jogos', description: '', type: { value: 'Feature', label: 'Feature', color: '#84cc16' }, tags: [{value: 'partidas', label: 'partidas', color: '#d946ef'}], assignees: [], subtasks: { total: 0, completed: 0 }, timeWorked: '01:15:00', timeEstimated: '03:00:00', project: 'GDO Fantasy Game', createdBy: 'Admin', createdAt: '2025-07-27T18:00:00', followers: ['Admin'], checklist: [{id: 1, text: 'Verificar logs', completed: true}], comments: [], priority: 'Média' },
              ],
              'development': [
                { id: 'task-9', title: 'Reconciliação Bolão', description: '', type: { value: 'Bug', label: 'Bug', color: '#ef4444' }, tags: [{value: 'bolão', label: 'bolão', color: '#ec4899'}], assignees: ['Guilherme Victor'], subtasks: { total: 5, completed: 2 }, timeWorked: '02:48:21', timeEstimated: '08:00:00', progress: 40, project: 'GDO Fantasy Game', createdBy: 'Admin', createdAt: '2025-07-23T10:10:00', followers: [], checklist: [], comments: [], priority: 'Urgente' },
              ],
              'review': [
                { id: 'task-10', title: 'Mural de Avisos', description: '', type: { value: 'Nova Feature', label: 'Nova Feature', color: '#0ea5e9' }, tags: [{value: 'comunicação', label: 'comunicação', color: '#6366f1'}], assignees: ['Guilherme Victor'], subtasks: { total: 0, completed: 0 }, timeWorked: '04:45:00', timeEstimated: '05:00:00', project: 'GDO Fantasy Game', createdBy: 'Admin', createdAt: '2025-07-22T11:55:00', followers: [], checklist: [], comments: [], priority: 'Baixa' },
              ],
            };
            const initialColumns = [
              { id: 'backlog', title: 'Backlog', status: 'Em produção' },
              { id: 'todo', title: 'A Fazer', status: 'Em produção' },
              { id: 'in-progress', title: 'Em Progresso', status: 'Em produção' },
              { id: 'development', title: 'Desenvolvimento', status: 'Em produção' },
              { id: 'review', title: 'Revisão', status: 'Concluído' },
            ];
            setTasks(initialTasksData);
            setColumns(initialColumns);
            localStorage.setItem('kanbanTasks', JSON.stringify(initialTasksData));
            localStorage.setItem('kanbanColumns', JSON.stringify(initialColumns));
        }
    }, []);

    const saveData = (newTasks, newColumns) => {
        localStorage.setItem('kanbanTasks', JSON.stringify(newTasks));
        localStorage.setItem('kanbanColumns', JSON.stringify(newColumns));
    }

    const findContainer = (id) => {
        if (columns.some(c => c.id === id)) return id;
        return Object.keys(tasks).find((key) => tasks[key] && tasks[key].find((item) => item.id === id));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;
        const activeId = active.id;
        const overId = over.id;

        const activeContainer = findContainer(activeId);
        let overContainer = findContainer(overId);

        if (!overContainer) {
            const overColumn = columns.find(c => c.id === overId);
            if (overColumn) overContainer = overId;
        }
        
        if (!activeContainer || !overContainer || activeContainer === overContainer && activeId === overId) return;

        let newTasks = { ...tasks };

        if (activeContainer === overContainer) {
            const activeIndex = newTasks[activeContainer].findIndex(t => t.id === activeId);
            const overIndex = newTasks[overContainer].findIndex(t => t.id === overId);
            if (activeIndex !== -1 && overIndex !== -1) {
                newTasks[overContainer] = arrayMove(newTasks[overContainer], activeIndex, overIndex);
            }
        } else {
            const activeItems = newTasks[activeContainer] || [];
            const overItems = newTasks[overContainer] || [];
            const activeIndex = activeItems.findIndex(t => t.id === activeId);
            
            let overIndex = overItems.findIndex(t => t.id === overId);
            if (overIndex === -1 && overId === overContainer) {
                overIndex = overItems.length;
            }

            const [movedItem] = activeItems.splice(activeIndex, 1);
            overItems.splice(overIndex, 0, movedItem);
            
            newTasks[activeContainer] = activeItems;
            newTasks[overContainer] = overItems;
        }
        setTasks(newTasks);
        saveData(newTasks, columns);
    };

    const handleAddTask = (columnId, newTaskData) => {
        const newTaskId = `task-${Date.now()}`;
        const task = {
            id: newTaskId,
            ...newTaskData,
            createdBy: user?.name || 'Anônimo',
            createdAt: new Date().toISOString(),
            followers: [],
            checklist: [],
            comments: [],
            subtasks: { total: 0, completed: 0 },
            timeWorked: '00:00:00',
            timeEstimated: '00:00:00',
        };
        const newTasks = { ...tasks, [columnId]: [...(tasks[columnId] || []), task] };
        setTasks(newTasks);
        saveData(newTasks, columns);
        toast({ title: "Tarefa Adicionada!", description: `"${task.title}" foi adicionada.` });
    };

    const handleUpdateTask = (updatedTask, newColumnId = null, oldColumnId = null) => {
        let newTasks = { ...tasks };
        
        if (newColumnId && oldColumnId && newColumnId !== oldColumnId) {
            const taskIndex = newTasks[oldColumnId].findIndex(t => t.id === updatedTask.id);
            if (taskIndex !== -1) {
                const [movedTask] = newTasks[oldColumnId].splice(taskIndex, 1);
                if (!newTasks[newColumnId]) newTasks[newColumnId] = [];
                newTasks[newColumnId].push({ ...movedTask, ...updatedTask });
            }
        } else {
            let taskFound = false;
            for (const columnId in newTasks) {
                const taskIndex = newTasks[columnId].findIndex(t => t.id === updatedTask.id);
                if (taskIndex !== -1) {
                    newTasks[columnId][taskIndex] = updatedTask;
                    taskFound = true;
                    break;
                }
            }
        }
        
        setTasks(newTasks);
        saveData(newTasks, columns);
    };
    
    handleUpdateTask.getTasks = () => tasks;

    const handleSaveColumn = (columnData, editingColumn) => {
        let newColumns = [...columns];
        let newTasks = {...tasks};
        if (editingColumn) {
            newColumns = newColumns.map(c => c.id === editingColumn.id ? {...c, ...columnData} : c);
            toast({ title: "Sucesso!", description: `Coluna "${columnData.title}" atualizada.` });
        } else {
            const newColumnId = columnData.title.toLowerCase().replace(/\s+/g, '-').concat(`-${Date.now()}`);
            if (columns.some(col => col.id === newColumnId)) {
                toast({ title: "Erro", description: "Uma coluna com este nome já existe.", variant: "destructive" });
                return;
            }
            const newColumn = { id: newColumnId, ...columnData };
            newColumns.push(newColumn);
            newTasks[newColumnId] = [];
            toast({ title: "Sucesso!", description: `Coluna "${columnData.title}" adicionada.` });
        }
        setColumns(newColumns);
        setTasks(newTasks);
        saveData(newTasks, newColumns);
    };

    const handleRemoveColumn = (columnId) => {
        const newColumns = columns.filter(c => c.id !== columnId);
        const newTasks = {...tasks};
        delete newTasks[columnId];
        
        setColumns(newColumns);
        setTasks(newTasks);
        saveData(newTasks, newColumns);
        toast({ title: "Coluna removida", description: "A coluna e suas tarefas foram removidas."});
    };
    
    const updateAllTasksWithOptions = (optionType, newOption, oldValue) => {
        const newTasks = { ...tasks };
        let updated = false;

        for (const columnId in newTasks) {
            newTasks[columnId] = newTasks[columnId].map(task => {
                if (optionType === 'type' && task.type?.value === oldValue) {
                    updated = true;
                    return { ...task, type: newOption };
                }
                if (optionType === 'tags') {
                    const tagIndex = task.tags?.findIndex(t => t.value === oldValue);
                    if (tagIndex > -1) {
                        updated = true;
                        const newTags = [...task.tags];
                        newTags[tagIndex] = newOption;
                        return { ...task, tags: newTags };
                    }
                }
                return task;
            });
        }
        
        if(updated) {
            setTasks(newTasks);
            saveData(newTasks, columns);
        }
    };
    
    const handleUpdateOption = (optionType, newOption, oldValue) => {
        updateAllTasksWithOptions(optionType, newOption, oldValue || newOption.value);
    };

    const handleUpdateTag = (optionType, newTag, oldValue) => {
        updateAllTasksWithOptions(optionType, newTag, oldValue || newTag.value);
    };


    return {
        tasks,
        columns,
        projects,
        clients,
        assignees,
        handleDragEnd,
        handleAddTask,
        handleUpdateTask,
        handleSaveColumn,
        handleRemoveColumn,
        handleUpdateOption,
        handleUpdateTag,
    };
};

export default useKanban;