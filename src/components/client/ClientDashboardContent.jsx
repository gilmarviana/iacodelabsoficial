import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx';
import { ClipboardCheck, MessageSquare, AlertCircle } from 'lucide-react';

const ClientDashboardContent = () => {
    const stats = [
        { title: "Tarefas Ativas", value: "5", icon: ClipboardCheck, color: "text-blue-500" },
        { title: "Mensagens Não Lidas", value: "2", icon: MessageSquare, color: "text-green-500" },
        { title: "Tarefas com Atraso", value: "1", icon: AlertCircle, color: "text-red-500" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <p className="text-muted-foreground">Bem-vindo de volta! Aqui está um resumo do seu projeto.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Atividade Recente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            <li className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                                    <ClipboardCheck className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">Nova tarefa "Implementar Login" foi criada.</p>
                                    <p className="text-sm text-muted-foreground">há 2 horas</p>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                                    <MessageSquare className="w-4 h-4 text-green-500" />
                                </div>
                                <div>
                                    <p className="font-medium">Você recebeu uma nova mensagem do admin.</p>
                                    <p className="text-sm text-muted-foreground">ontem</p>
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Progresso do Projeto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-2">GDO Fantasy Game</p>
                        <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <p className="text-right text-sm font-medium mt-2">75% Concluído</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ClientDashboardContent;