
import React, { useState, useEffect } from 'react';
import { Plus, Filter, Download, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const initialTransactions = [
    { id: 1, description: 'Desenvolvimento E-commerce', amount: 5000, type: 'Receita', category: 'Projeto', date: '2025-07-15', status: 'Pago' },
    { id: 2, description: 'Assinatura Ferramenta de Design', amount: -50, type: 'Despesa', category: 'Software', date: '2025-07-10', status: 'Pago' },
    { id: 3, description: 'Manutenção App de Delivery', amount: 800, type: 'Receita', category: 'Manutenção', date: '2025-07-05', status: 'Pendente' },
    { id: 4, description: 'Hospedagem Servidor', amount: -100, type: 'Despesa', category: 'Infraestrutura', date: '2025-07-01', status: 'Pago' },
];

const TransactionForm = ({ isOpen, onClose, onSave, transaction }) => {
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: 'Receita',
        category: '',
        date: '',
        status: 'Pendente'
    });

    useEffect(() => {
        if (transaction) {
            setFormData({
                description: transaction.description || '',
                amount: Math.abs(transaction.amount) || '',
                type: transaction.type || 'Receita',
                category: transaction.category || '',
                date: transaction.date || '',
                status: transaction.status || 'Pendente'
            });
        } else {
            setFormData({ description: '', amount: '', type: 'Receita', category: '', date: new Date().toISOString().split('T')[0], status: 'Pendente' });
        }
    }, [transaction, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalAmount = formData.type === 'Despesa' ? -Math.abs(parseFloat(formData.amount)) : Math.abs(parseFloat(formData.amount));
        onSave({ ...formData, amount: finalAmount, id: transaction?.id || Date.now() });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{transaction ? 'Editar Lançamento' : 'Novo Lançamento'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div>
                        <Label htmlFor="description">Descrição</Label>
                        <Input id="description" name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="amount">Valor</Label>
                            <Input id="amount" name="amount" type="number" value={formData.amount} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="type">Tipo</Label>
                            <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Receita">Receita</SelectItem>
                                    <SelectItem value="Despesa">Despesa</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="category">Categoria</Label>
                            <Input id="category" name="category" value={formData.category} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="date">Data</Label>
                            <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pago">Pago</SelectItem>
                                <SelectItem value="Pendente">Pendente</SelectItem>
                                <SelectItem value="Atrasado">Atrasado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const FinancialContent = () => {
    const [transactions, setTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const { toast } = useToast();

    useEffect(() => {
        const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || initialTransactions;
        setTransactions(savedTransactions);
    }, []);

    const saveTransactions = (updatedTransactions) => {
        setTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    };

    const handleSaveTransaction = (data) => {
        const isEditing = transactions.some(t => t.id === data.id);
        let updated;
        if (isEditing) {
            updated = transactions.map(t => t.id === data.id ? data : t);
            toast({ title: "Lançamento atualizado!" });
        } else {
            updated = [...transactions, data];
            toast({ title: "Novo lançamento adicionado!" });
        }
        saveTransactions(updated.sort((a, b) => new Date(b.date) - new Date(a.date)));
    };

    const handleDeleteTransaction = (id) => {
        const updated = transactions.filter(t => t.id !== id);
        saveTransactions(updated);
        toast({ title: "Lançamento removido." });
    };

    const handleOpenModal = (transaction = null) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const filteredTransactions = transactions.filter(t => {
        const typeMatch = filterType === 'all' || t.type === filterType;
        const statusMatch = filterStatus === 'all' || t.status === filterStatus;
        return typeMatch && statusMatch;
    });

    const totalReceitas = transactions.filter(t => t.type === 'Receita' && t.status === 'Pago').reduce((acc, t) => acc + t.amount, 0);
    const totalDespesas = transactions.filter(t => t.type === 'Despesa' && t.status === 'Pago').reduce((acc, t) => acc + t.amount, 0);
    const saldo = totalReceitas + totalDespesas;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-1">Financeiro</h2>
                    <p className="text-muted-foreground">Acompanhe suas receitas e despesas.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Exportar</Button>
                    <Button onClick={() => handleOpenModal()}>
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Lançamento
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader><CardTitle>Receitas (Pago)</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold text-green-500">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalReceitas)}</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Despesas (Pago)</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold text-red-500">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Math.abs(totalDespesas))}</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Saldo</CardTitle></CardHeader>
                    <CardContent><p className={`text-2xl font-bold ${saldo >= 0 ? 'text-blue-500' : 'text-red-500'}`}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saldo)}</p></CardContent>
                </Card>
            </div>

            <div className="flex gap-4">
                <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[180px]"><Filter className="mr-2 h-4 w-4" /><SelectValue placeholder="Filtrar por tipo" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos os Tipos</SelectItem>
                        <SelectItem value="Receita">Receita</SelectItem>
                        <SelectItem value="Despesa">Despesa</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]"><Filter className="mr-2 h-4 w-4" /><SelectValue placeholder="Filtrar por status" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos os Status</SelectItem>
                        <SelectItem value="Pago">Pago</SelectItem>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                        <SelectItem value="Atrasado">Atrasado</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="bg-card rounded-xl border">
                <div className="grid grid-cols-5 font-semibold p-4 border-b">
                    <span>Descrição</span>
                    <span>Valor</span>
                    <span>Categoria</span>
                    <span>Data</span>
                    <span>Ações</span>
                </div>
                {filteredTransactions.map((t, index) => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="grid grid-cols-5 items-center p-4 border-b last:border-b-0"
                    >
                        <div>
                            <p className="font-medium">{t.description}</p>
                            <p className={`text-sm ${t.type === 'Receita' ? 'text-green-500' : 'text-red-500'}`}>{t.type}</p>
                        </div>
                        <div className={`font-bold ${t.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.amount)}
                        </div>
                        <div>{t.category}</div>
                        <div>
                            <p>{new Date(t.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${t.status === 'Pago' ? 'bg-green-500/20 text-green-700' : 'bg-yellow-500/20 text-yellow-700'}`}>{t.status}</span>
                        </div>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => handleOpenModal(t)}><Edit className="w-4 h-4 mr-2" />Editar</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteTransaction(t.id)} className="text-red-500"><Trash2 className="w-4 h-4 mr-2" />Excluir</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </motion.div>
                ))}
            </div>
            <TransactionForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTransaction}
                transaction={editingTransaction}
            />
        </div>
    );
};

export default FinancialContent;
