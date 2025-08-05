
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


// Mock data for accounts, categories, and tags
const mockAccounts = [
  { id: 1, name: 'Conta Corrente', icon: '💳' },
  { id: 2, name: 'Cartão Nubank', icon: '💳' },
];
const mockCategories = [
  'Salário', 'Projeto', 'Freelance', 'Investimento', 'Alimentação', 'Transporte', 'Lazer', 'Software', 'Infraestrutura', 'Manutenção'
];
const mockTags = ['TESTE', 'teste 2', 'fixo', 'parcela'];


const iconBtnClass = "flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-full bg-gray-100 text-gray-400 cursor-pointer disabled:opacity-60 disabled:cursor-default";


const TransactionForm = ({ isOpen, onClose, onSave, transaction }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'Receita',
    category: '',
    date: '',
    status: 'Pendente',
    account: mockAccounts[0],
    tags: [],
  });
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [repeatType, setRepeatType] = useState('parcelado');
  const [repeatCount, setRepeatCount] = useState(2);
  const [repeatPeriod, setRepeatPeriod] = useState('Meses');

  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description || '',
        amount: Math.abs(transaction.amount) || '',
        type: transaction.type || 'Receita',
        category: transaction.category || '',
        date: transaction.date || '',
        status: transaction.status || 'Pendente',
        account: transaction.account || mockAccounts[0],
        tags: transaction.tags || [],
      });
      setShowRepeat(false);
    } else {
      setFormData({
        description: '',
        amount: '',
        type: 'Receita',
        category: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Pendente',
        account: mockAccounts[0],
        tags: [],
      });
      setShowRepeat(false);
    }
  }, [transaction, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeToggle = (type) => {
    setFormData(prev => ({ ...prev, type }));
  };

  const handleAccountChange = (id) => {
    const acc = mockAccounts.find(a => a.id === Number(id));
    setFormData(prev => ({ ...prev, account: acc }));
  };

  const handleCategoryChange = (value) => {
    setFormData(prev => ({ ...prev, category: value }));
    setCategoryOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalAmount = formData.type === 'Despesa' ? -Math.abs(parseFloat(formData.amount)) : Math.abs(parseFloat(formData.amount));
    onSave({ ...formData, amount: finalAmount, id: transaction?.id || Date.now() });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400 font-medium">Nova receita / despesa</span>
            <DialogTitle>{formData.type === 'Receita' ? 'Nova receita' : 'Nova despesa'}</DialogTitle>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Toggle Receita/Despesa */}
          <div className="flex justify-center gap-2 mb-2">
            <button
              type="button"
              className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors ${formData.type === 'Receita' ? 'bg-green-100 text-green-700 border-green-400' : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-100'}`}
              onClick={() => handleTypeToggle('Receita')}
            >
              Receita
            </button>
            <button
              type="button"
              className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors ${formData.type === 'Despesa' ? 'bg-red-100 text-red-700 border-red-400' : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-100'}`}
              onClick={() => handleTypeToggle('Despesa')}
            >
              Despesa
            </button>
          </div>
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
              <Label htmlFor="date">Data</Label>
              <div className="flex items-center gap-2">
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                <button type="button" className="text-green-600 hover:text-green-800" tabIndex={-1} title="Confirmar data"><span role="img" aria-label="like">👍</span></button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="account">Conta/Cartão</Label>
              <div className="flex items-center gap-2">
                <Select value={String(formData.account?.id || '')} onValueChange={handleAccountChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue>{formData.account?.icon} {formData.account?.name}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {mockAccounts.map(acc => (
                      <SelectItem key={acc.id} value={String(acc.id)}>{acc.icon} {acc.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.account && (
                  <button type="button" className="ml-1 text-gray-400 hover:text-red-500" onClick={() => setFormData(prev => ({ ...prev, account: null }))} title="Remover conta">×</button>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select open={categoryOpen} onOpenChange={setCategoryOpen} value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full">
                  <SelectValue>{formData.category || 'Buscar a categoria...'}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {mockCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {showRepeat && (
            <div className="mt-2">
              <Label>Repetir</Label>
              <div className="flex items-center gap-4 mt-1">
                <label className="flex items-center gap-1 text-sm">
                  <input type="radio" name="repeatType" checked={repeatType === 'fixa'} onChange={() => setRepeatType('fixa')} />
                  é uma receita fixa
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input type="radio" name="repeatType" checked={repeatType === 'parcelado'} onChange={() => setRepeatType('parcelado')} />
                  é um lançamento parcelado em
                  <Input type="number" min={2} max={60} className="w-14 ml-1" value={repeatCount} disabled={repeatType !== 'parcelado'} onChange={e => setRepeatCount(Math.max(2, Number(e.target.value)))} />
                  <Select value={repeatPeriod} onValueChange={v => setRepeatPeriod(v)} disabled={repeatType !== 'parcelado'}>
                    <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Meses">Meses</SelectItem>
                      <SelectItem value="Semanas">Semanas</SelectItem>
                    </SelectContent>
                  </Select>
                </label>
              </div>
              {repeatType === 'parcelado' && (
                <div className="text-xs mt-1 text-green-700">
                  Serão lançadas {repeatCount} parcelas de R$ {((parseFloat(formData.amount) || 0) / repeatCount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  <div className="text-gray-500">Em caso de divisão não exata, a sobra será somada à primeira parcela.</div>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-center gap-4 mt-6 mb-2">
            <button type="button" className={iconBtnClass} onClick={() => setShowRepeat(v => !v)} aria-label="Repetir">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
              <span className="text-xs">Repetir</span>
            </button>
            <button type="button" className={iconBtnClass} disabled aria-label="Observação">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 9h8M8 13h6"/></svg>
              <span className="text-xs">Observação</span>
            </button>
            <button type="button" className={iconBtnClass} disabled aria-label="Anexo">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15V7a2 2 0 00-2-2H7a2 2 0 00-2 2v8"/><rect x="3" y="15" width="18" height="6" rx="2"/></svg>
              <span className="text-xs">Anexo</span>
            </button>
            <button type="button" className={iconBtnClass} disabled aria-label="Tags">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.59 13.41l-8.59 8.59a2 2 0 01-2.83 0l-6.59-6.59a2 2 0 010-2.83l8.59-8.59a2 2 0 012.83 0l6.59 6.59a2 2 0 010 2.83z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>
              <span className="text-xs">Tags</span>
            </button>
          </div>
          <div className="flex justify-center mt-2">
            <Button type="submit" className="rounded-full w-16 h-16 p-0 bg-green-500 hover:bg-green-600 text-white text-3xl flex items-center justify-center shadow-lg">✓</Button>
          </div>
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
  const [filterDateStart, setFilterDateStart] = useState('');
  const [filterDateEnd, setFilterDateEnd] = useState('');
  const [activeTab, setActiveTab] = useState('lancamentos');
  const { toast } = useToast();

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || initialTransactions;
    // Atualiza status para 'Atrasado' se necessário
    const today = new Date();
    today.setHours(0,0,0,0);
    const updated = savedTransactions.map(t => {
      if (
        t.status !== 'Pago' &&
        t.status !== 'Reprovado' &&
        t.status !== 'Atrasado' &&
        t.date &&
        new Date(t.date) < today
      ) {
        return { ...t, status: 'Atrasado' };
      }
      // Se já está como 'Atrasado', mas a data não é mais anterior, volta para pendente
      if (
        t.status === 'Atrasado' &&
        t.date &&
        new Date(t.date) >= today
      ) {
        return { ...t, status: 'Pendente' };
      }
      return t;
    });
    setTransactions(updated);
    localStorage.setItem('transactions', JSON.stringify(updated));
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
    let dateMatch = true;
    if (filterDateStart) {
      dateMatch = dateMatch && new Date(t.date) >= new Date(filterDateStart);
    }
    if (filterDateEnd) {
      dateMatch = dateMatch && new Date(t.date) <= new Date(filterDateEnd);
    }
    return typeMatch && statusMatch && dateMatch;
  });

  // Aplica os mesmos filtros dos lançamentos nos cards
  const filteredForCards = transactions.filter(t => {
    const typeMatch = filterType === 'all' || t.type === filterType;
    const statusMatch = filterStatus === 'all' || t.status === filterStatus;
    let dateMatch = true;
    if (filterDateStart) {
      dateMatch = dateMatch && new Date(t.date) >= new Date(filterDateStart);
    }
    if (filterDateEnd) {
      dateMatch = dateMatch && new Date(t.date) <= new Date(filterDateEnd);
    }
    return typeMatch && statusMatch && dateMatch;
  });

  const totalReceitas = filteredForCards.filter(t => t.type === 'Receita' && t.status === 'Pago').reduce((acc, t) => acc + t.amount, 0);
  const totalDespesas = filteredForCards.filter(t => t.type === 'Despesa' && t.status === 'Pago').reduce((acc, t) => acc + t.amount, 0);
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
          {activeTab === 'lancamentos' && (
            <Button onClick={() => handleOpenModal()}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Lançamento
            </Button>
          )}
        </div>
      </div>

      {/* Submenu */}
      <div className="flex gap-2 border-b mb-2">
        <button
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === 'lancamentos' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-primary'}`}
          onClick={() => setActiveTab('lancamentos')}
        >
          Lançamentos
        </button>
        <button
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === 'relatorios' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-primary'}`}
          onClick={() => setActiveTab('relatorios')}
        >
          Relatórios
        </button>
      </div>

      {activeTab === 'lancamentos' && (
        <>
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

          <div className="flex flex-wrap gap-4 items-end">
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
                <SelectItem value="Reprovado">Reprovado</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1" htmlFor="filterDateStart">Data início</label>
              <Input id="filterDateStart" type="date" value={filterDateStart} onChange={e => setFilterDateStart(e.target.value)} className="w-[140px]" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1" htmlFor="filterDateEnd">Data fim</label>
              <Input id="filterDateEnd" type="date" value={filterDateEnd} onChange={e => setFilterDateEnd(e.target.value)} className="w-[140px]" />
            </div>
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
                  <span
                    className={`text-xs px-2 py-1 rounded-full
                      ${t.status === 'Pago' ? 'bg-green-500/20 text-green-700'
                        : t.status === 'Reprovado' ? 'bg-red-500/20 text-red-700'
                        : 'bg-gray-200 text-gray-600'}
                    `}
                  >
                    {t.status}
                  </span>
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleOpenModal(t)}><Edit className="w-4 h-4 mr-2" />Editar</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteTransaction(t.id)} className="text-red-500"><Trash2 className="w-4 h-4 mr-2" />Excluir</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          const updated = transactions.map(tx => {
                            if (tx.id === t.id) {
                              if (tx.status === 'Pago') {
                                toast({ title: 'Pagamento marcado como pendente.' });
                                return { ...tx, status: 'Pendente' };
                              } else {
                                toast({ title: 'Pagamento aprovado!' });
                                return { ...tx, status: 'Pago' };
                              }
                            }
                            return tx;
                          });
                          saveTransactions(updated);
                        }}
                        className="text-green-600"
                      >
                        <span className="inline-flex items-center"><span role="img" aria-label="like" className="mr-2">👍</span>Aprovar pagamento</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          const updated = transactions.map(tx => {
                            if (tx.id === t.id) {
                              if (tx.status === 'Reprovado') {
                                toast({ title: 'Pagamento marcado como pendente.' });
                                return { ...tx, status: 'Pendente' };
                              } else {
                                toast({ title: 'Pagamento reprovado.' });
                                return { ...tx, status: 'Reprovado' };
                              }
                            }
                            return tx;
                          });
                          saveTransactions(updated);
                        }}
                        className="text-gray-600"
                      >
                        <span className="inline-flex items-center"><span role="img" aria-label="dislike" className="mr-2">👎</span>Reprovar pagamento</span>
                      </DropdownMenuItem>
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
        </>
      )}
      {activeTab === 'relatorios' && (
        <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-400">
          <span className="text-3xl mb-2">📊</span>
          <p className="text-lg font-medium">Relatórios em breve</p>
        </div>
      )}
    </div>
  );
};

export default FinancialContent;
