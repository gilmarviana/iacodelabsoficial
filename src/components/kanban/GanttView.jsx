import React, { useEffect, useState } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const GanttView = ({ tasks, onTaskClick }) => {
    const { theme } = useTheme();
    const [view, setView] = useState(ViewMode.Day);
    const [ganttTasks, setGanttTasks] = useState([]);

    useEffect(() => {
        const formattedTasks = tasks
            .filter(t => t.startDate && t.endDate) 
            .map(t => {
                const startDate = new Date(t.startDate);
                const endDate = new Date(t.endDate);

                if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                    return null;
                }

                return {
                    start: startDate,
                    end: endDate,
                    name: t.title,
                    id: t.id,
                    type: 'task',
                    progress: t.progress || 0,
                    isDisabled: false,
                    styles: { progressColor: '#a3a3ff', progressSelectedColor: '#8787ff' },
                    project: t.project,
                };
            }).filter(Boolean); 
        setGanttTasks(formattedTasks);
    }, [tasks]);

    const ganttThemeProps = theme === 'dark' ? {
        headerHeight: 50,
        columnWidth: 30,
        listCellWidth: "155px",
        rowHeight: 50,
        ganttHeight: 300,
        barProgressColor: "#a3a3ff",
        barProgressSelectedColor: "#8787ff",
        barBackgroundColor: "#b8c2cc",
        barBackgroundSelectedColor: "#aeb8c2",
        projectProgressColor: "#7db59a",
        projectProgressSelectedColor: "#59a985",
        projectBackgroundColor: "#fac465",
        projectBackgroundSelectedColor: "#f7bb53",
        milestoneBackgroundColor: "#f79646",
        milestoneBackgroundSelectedColor: "#f58f3b",
        arrowColor: "grey",
        arrowIndent: 20,
        todayColor: "rgba(252, 248, 227, 0.5)",
        fontFamily: 'inherit',
        fontSize: '14px',
    } : {};

    if (ganttTasks.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground">
                Nenhuma tarefa com datas de início e fim para exibir no gráfico de Gantt.
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex-shrink-0 mb-4 flex gap-2">
                <Button variant={view === ViewMode.Day ? 'secondary' : 'outline'} onClick={() => setView(ViewMode.Day)}>Dia</Button>
                <Button variant={view === ViewMode.Week ? 'secondary' : 'outline'} onClick={() => setView(ViewMode.Week)}>Semana</Button>
                <Button variant={view === ViewMode.Month ? 'secondary' : 'outline'} onClick={() => setView(ViewMode.Month)}>Mês</Button>
            </div>
            <div className="flex-grow overflow-auto">
                <Gantt
                    tasks={ganttTasks}
                    viewMode={view}
                    onDoubleClick={onTaskClick}
                    listCellWidth={ganttTasks.some(t => t.progress) ? "155px" : ""}
                    locale="pt-BR"
                    {...ganttThemeProps}
                />
            </div>
        </div>
    );
};

export default GanttView;