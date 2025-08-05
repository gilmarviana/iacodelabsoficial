import React, { useState, useEffect, useMemo } from 'react';
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar as BaseCalendar } from '@/components/ui/calendar';

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
const initialCategories = [
  'Salário', 'Projeto', 'Freelance', 'Investimento', 'Alimentação', 'Transporte', 'Lazer', 'Software', 'Infraestrutura', 'Manutenção'
];
const mockTags = ['TESTE', 'teste 2', 'fixo', 'parcela'];


const iconBtnClass = "flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-full bg-gray-100 text-gray-400 cursor-pointer disabled:opacity-60 disabled:cursor-default";


const TransactionForm = ({ isOpen, onClose, onSave, transaction }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'Receita',
    category: '',
    date: '',
    status: 'Pendente',
    account: mockAccounts[0],
    tags: [],
    tagInput: '',
    note: '',
  });
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [repeatType, setRepeatType] = useState('parcelado');
  const [repeatCount, setRepeatCount] = useState(2);
  const [repeatPeriod, setRepeatPeriod] = useState('Meses');
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = React.useRef();

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
        tagInput: '',
        note: transaction.note || '',
      });
      setShowRepeat(false);
      setShowNote(!!(transaction && transaction.note));
      setShowTags(!!(transaction && transaction.tags && transaction.tags.length));
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
        tagInput: '',
        note: '',
      });
      setShowRepeat(false);
      setShowNote(false);
      setShowTags(false);
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

  const handleAddCategory = (e) => {
    const value = e.target.value.trim();
    if (e.key === 'Enter' && value) {
      if (!categories.includes(value)) {
        setCategories(prev => [...prev, value]);
      }
      setFormData(prev => ({ ...prev, category: value }));
      setTimeout(() => setCategoryOpen(false), 100);
      e.target.value = '';
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalAmount = formData.type === 'Despesa' ? -Math.abs(parseFloat(formData.amount)) : Math.abs(parseFloat(formData.amount));
    onSave({ ...formData, amount: finalAmount, id: transaction?.id || Date.now() });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
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
              <div className="relative flex items-center gap-2">
                <Input
                  id="category"
                  placeholder="Digite ou crie uma categoria..."
                  className="w-full pr-10"
                  value={formData.category}
                  onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      const value = formData.category.trim();
                      const filtered = categories.filter(cat => cat.toLowerCase().includes(value.toLowerCase()));
                      if (filtered.length === 1 && filtered[0].toLowerCase() === value.toLowerCase()) {
                        setFormData(prev => ({ ...prev, category: filtered[0] }));
                        e.preventDefault();
                      }
                    }
                  }}
                  autoComplete="off"
                />
                {/* Botão de adicionar nova categoria */}
                {formData.category && !categories.includes(formData.category.trim()) && (
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:bg-primary/10 rounded-full p-1"
                    title="Adicionar categoria"
                    onClick={() => {
                      const value = formData.category.trim();
                      if (value && !categories.includes(value)) {
                        setCategories(prev => [...prev, value]);
                        setFormData(prev => ({ ...prev, category: value }));
                      }
                    }}
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
                  </button>
                )}
                {formData.category && (
                  <div
                    className="absolute left-0 bg-white border rounded shadow max-h-60 flex flex-col overflow-y-auto p-0"
                    style={{
                      zIndex: 50,
                      minWidth: '100%',
                      width: 'max-content',
                      maxWidth: '350px',
                    }}
                  >
                    {/* Sugestões filtradas */}
                    {categories.filter(cat => cat.toLowerCase().includes(formData.category.toLowerCase()) && cat !== formData.category).map(cat => (
                      <div
                        key={cat}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        onMouseDown={() => setFormData(prev => ({ ...prev, category: cat }))}
                      >
                        {cat}
                      </div>
                    ))}
                    {/* Sugestão de criar categoria, sempre fixa ao final se não existe */}
                    {formData.category.trim() && !categories.includes(formData.category.trim()) && (
                      <div
                        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100 border-t"
                        onMouseDown={() => {
                          const value = formData.category.trim();
                          if (value && !categories.includes(value)) {
                            setCategories(prev => [...prev, value]);
                            setFormData(prev => ({ ...prev, category: value }));
                          }
                        }}
                      >
                        <span className="flex items-center gap-2 text-primary">
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
                          Criar categoria "{formData.category}"
                        </span>
                        <span className="w-3 h-3 rounded-full bg-blue-500 inline-block ml-2"></span>
                      </div>
                    )}
                  </div>
                )}
              </div>
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
          {/* Observação (só aparece se ativada) */}
          {showNote && (
            <div>
              <Label htmlFor="note">Observação</Label>
              <textarea
                id="note"
                name="note"
                className="w-full border rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none min-h-[60px]"
                value={formData.note}
                onChange={e => setFormData(prev => ({ ...prev, note: e.target.value }))}
                placeholder="Digite uma observação..."
              />
            </div>
          )}
          {/* Tags (só aparece se ativada) */}
          {showTags && (
            <div>
              <Label htmlFor="tags">Tags</Label>
              <div className="w-full border rounded-md px-3 py-2 mt-1 text-sm flex flex-wrap gap-2 min-h-[42px] bg-white">
                {formData.tags.map((tag, idx) => {
                  const tagColors = [
                    'bg-blue-100 text-blue-700',
                    'bg-green-100 text-green-700',
                    'bg-yellow-100 text-yellow-700',
                    'bg-pink-100 text-pink-700',
                    'bg-purple-100 text-purple-700',
                    'bg-red-100 text-red-700',
                    'bg-indigo-100 text-indigo-700',
                    'bg-teal-100 text-teal-700',
                  ];
                  const color = tagColors[idx % tagColors.length];
                  return (
                    <span key={tag} className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`} style={{maxWidth:'120px'}}>
                      <span className="truncate">{tag}</span>
                      <button type="button" className="ml-1 text-xs text-gray-400 hover:text-red-500" onClick={() => setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))} title="Remover tag">×</button>
                    </span>
                  );
                })}
                <input
                  id="tags"
                  name="tags"
                  className="flex-1 min-w-[80px] outline-none border-none bg-transparent text-sm"
                  value={formData.tagInput || ''}
                  onChange={e => setFormData(prev => ({ ...prev, tagInput: e.target.value }))}
                  onKeyDown={e => {
                    if ((e.key === 'Enter' || e.key === ',' || e.key === 'Tab') && formData.tagInput && formData.tagInput.trim()) {
                      e.preventDefault();
                      const newTag = formData.tagInput.trim();
                      if (!formData.tags.includes(newTag)) {
                        setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag], tagInput: '' }));
                      } else {
                        setFormData(prev => ({ ...prev, tagInput: '' }));
                      }
                    } else if (e.key === 'Backspace' && !formData.tagInput && formData.tags.length) {
                      setFormData(prev => ({ ...prev, tags: prev.tags.slice(0, -1) }));
                    }
                  }}
                  placeholder="Digite e pressione Enter..."
                  autoComplete="off"
                />
              </div>
            </div>
          )}
          {/* Botões de ação */}
          <div className="flex justify-center gap-4 mt-6 mb-2">
            <button
              type="button"
              className={iconBtnClass + (showRepeat ? ' bg-primary/10 text-primary' : '')}
              onClick={() => setShowRepeat(v => !v)}
              aria-label="Repetir"
            >
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
              <span className="text-xs">Repetir</span>
            </button>
            <button
              type="button"
              className={iconBtnClass + (showNote ? ' bg-primary/10 text-primary' : '')}
              aria-label="Observação"
              onClick={() => setShowNote(v => !v)}
            >
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 9h8M8 13h6"/></svg>
              <span className="text-xs">Observação</span>
            </button>
            <button
              type="button"
              className={iconBtnClass + (attachment ? ' bg-primary/10 text-primary' : '')}
              aria-label="Anexo"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15V7a2 2 0 00-2-2H7a2 2 0 00-2 2v8"/><rect x="3" y="15" width="18" height="6" rx="2"/></svg>
              <span className="text-xs">Anexo</span>
              <input
                type="file"
                accept="image/*,application/pdf"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setAttachment(e.target.files[0]);
                  }
                }}
              />
            </button>
          {/* Exibe nome do arquivo anexado, se houver */}
          {attachment && (
            <div className="w-full flex items-center gap-2 text-xs text-gray-600 mt-1">
              <span className="truncate max-w-[180px]">{attachment.name}</span>
              <button type="button" className="text-red-400 hover:text-red-600" onClick={() => setAttachment(null)}>Remover</button>
            </div>
          )}
            <button
              type="button"
              className={iconBtnClass + (showTags ? ' bg-primary/10 text-primary' : '')}
              aria-label="Tags"
              onClick={() => setShowTags(v => !v)}
            >
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.59 13.41l-8.59 8.59a2 2 0 01-2.83 0l-6.59-6.59a2 2 0 010-2.83l8.59-8.59a2 2 0 012.83 0l6.59 6.59a2 2 0 010 2.83z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>
              <span className="text-xs">Tags</span>
            </button>
          </div>
          <div className="flex flex-col items-center gap-4 mt-2">
            <div className="flex items-center justify-center gap-12 w-full">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 text-base font-medium"
                onClick={onClose}
                tabIndex={-1}
              >
                Cancelar
              </button>
              <Button type="submit" className="rounded-full w-16 h-16 p-0 bg-green-500 hover:bg-green-600 text-white text-3xl flex items-center justify-center shadow-lg">✓</Button>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 text-base font-medium"
                onClick={() => {
                  const finalAmount = formData.type === 'Despesa' ? -Math.abs(parseFloat(formData.amount)) : Math.abs(parseFloat(formData.amount));
                  onSave({ ...formData, amount: finalAmount, id: transaction?.id || Date.now(), attachment });
                  setFormData({
                    description: '',
                    amount: '',
                    type: 'Receita',
                    category: '',
                    date: new Date().toISOString().split('T')[0],
                    status: 'Pendente',
                    account: mockAccounts[0],
                    tags: [],
                    tagInput: '',
                    note: '',
                  });
                  setShowRepeat(false);
                  setShowNote(false);
                  setShowTags(false);
                  setAttachment(null);
                }}
              >
                Salvar e criar outra
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};


// Calendar wrapper to allow custom day rendering
function AgendaCalendar({ transactions, selected, onSelect, onDayClick }) {
  // Agrupa por dia
  const dayMap = useMemo(() => {
    const map = {};
    transactions.forEach(t => {
      const key = t.date;
      if (!map[key]) map[key] = [];
      map[key].push(t);
    });
    return map;
  }, [transactions]);

  return (
    <BaseCalendar
      selected={selected}
      onSelect={onSelect}
      renderDay={(date) => {
        const key = date.toISOString().split('T')[0];
        const ags = dayMap[key] || [];
        let color = '';
        const iconList = [];
        if (ags.length) {
          if (ags.some(a => a.status === 'Atrasado' || a.status === 'Pendente')) {
            color = 'bg-red-200 border-red-500 text-red-800';
            iconList.push(<span key="venc" title="Vencimento" className="absolute left-1/2 -translate-x-1/2 -top-3 text-red-500 text-base leading-none">⚠️</span>);
          }
          if (ags.some(a => a.status === 'Pago')) {
            if (!color) color = 'bg-green-200 border-green-500 text-green-800';
            iconList.push(<span key="pago" title="Pago" className="absolute left-1/2 -translate-x-1/2 -top-6 text-green-500 text-base leading-none">✔️</span>);
          }
          if (ags.some(a => a.status === 'Reprovado')) {
            iconList.push(<span key="reprovado" title="Reprovado" className="absolute left-1/2 -translate-x-1/2 -top-9 text-gray-500 text-base leading-none">❌</span>);
          }
        }
        return (
          <div
            className={`relative w-8 h-8 flex items-center justify-center rounded-full border cursor-pointer transition-colors ${color} ${selected && key === selected.toISOString().split('T')[0] ? 'ring-2 ring-primary' : ''}`}
            onMouseEnter={e => {
              if (ags.length) {
                const tooltip = document.createElement('div');
                tooltip.className = 'z-50 fixed px-2 py-1 rounded bg-black text-white text-xs pointer-events-none';
                tooltip.style.top = (e.clientY + 10) + 'px';
                tooltip.style.left = (e.clientX + 10) + 'px';
                tooltip.innerText = ags.map(a => `${a.type}: R$ ${Math.abs(a.amount).toLocaleString('pt-BR', {minimumFractionDigits:2})}`).join('\n');
                tooltip.id = 'calendar-tooltip';
                document.body.appendChild(tooltip);
              }
            }}
            onMouseLeave={() => {
              const el = document.getElementById('calendar-tooltip');
              if (el) el.remove();
            }}
            onClick={e => {
              onSelect(date); // Atualiza seleção visual
              onDayClick(date); // Abre detalhes
            }}
            tabIndex={0}
            title={ags.length ? ags.map(a => `${a.type}: R$ ${Math.abs(a.amount).toLocaleString('pt-BR', {minimumFractionDigits:2})}`).join(' | ') : ''}
          >
            {iconList}
            {date.getDate()}
            {ags.length > 0 && (
              <span className="absolute -bottom-1 right-0 w-2 h-2 rounded-full bg-primary border border-white"></span>
            )}
          </div>
        );
      }}
    />
  );
}

const FinancialContent = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDateStart, setFilterDateStart] = useState('');
  const [filterDateEnd, setFilterDateEnd] = useState('');
  const [activeTab, setActiveTab] = useState('lancamentos');
  // Novo estado para agenda
  const [agendaView, setAgendaView] = useState('mes');
  const [agendaDate, setAgendaDate] = useState(new Date());
  const [agendaDetails, setAgendaDetails] = useState(null); // Para exibir detalhes do dia
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

  // Função para agrupar lançamentos filtrados por mês, semana e dia
  const getAgendaGrouped = () => {
    const agendamentos = filteredTransactions; // Usa os mesmos filtros da tela de lançamentos
    const byMonth = {};
    const byWeek = {};
    const byDay = {};
    agendamentos.forEach(t => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`;
      const weekKey = `${date.getFullYear()}-W${getWeekNumber(date)}`;
      const dayKey = date.toISOString().split('T')[0];
      if (!byMonth[monthKey]) byMonth[monthKey] = [];
      if (!byWeek[weekKey]) byWeek[weekKey] = [];
      if (!byDay[dayKey]) byDay[dayKey] = [];
      byMonth[monthKey].push(t);
      byWeek[weekKey].push(t);
      byDay[dayKey].push(t);
    });
    return { byMonth, byWeek, byDay };
  };

  function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
  }

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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex gap-2 border-b mb-2 bg-transparent">
          <TabsTrigger value="lancamentos" className="px-4 py-2 font-medium border-b-2 transition-colors data-[state=active]:border-primary data-[state=active]:text-primary border-transparent text-gray-500 hover:text-primary">Lançamentos</TabsTrigger>
          <TabsTrigger value="agenda" className="px-4 py-2 font-medium border-b-2 transition-colors data-[state=active]:border-primary data-[state=active]:text-primary border-transparent text-gray-500 hover:text-primary">Agenda</TabsTrigger>
        </TabsList>
        <TabsContent value="lancamentos">
          {/* Conteúdo de lançamentos sempre visível */}
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
        </TabsContent>
        <TabsContent value="agenda">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 mb-2">
              <Button variant={agendaView==='mes'?'default':'outline'} onClick={()=>setAgendaView('mes')}>Mês</Button>
              <Button variant={agendaView==='semana'?'default':'outline'} onClick={()=>setAgendaView('semana')}>Semana</Button>
              <Button variant={agendaView==='dia'?'default':'outline'} onClick={()=>setAgendaView('dia')}>Dia</Button>
            </div>
            <div className="flex gap-8">
              <div>
                <AgendaCalendar
                  transactions={filteredTransactions}
                  selected={agendaDate}
                  onSelect={date => {
                    setAgendaDate(date);
                    setAgendaDetails(null); // Fecha painel ao navegar
                  }}
                  onDayClick={date => {
                    setAgendaDate(date);
                    const key = date.toISOString().split('T')[0];
                    const ags = filteredTransactions.filter(t => t.date === key);
                    setAgendaDetails({ date, ags });
                  }}
                />
              </div>
              <div className="flex-1">
                {agendaDetails ? (
                  <div className="mb-4 p-4 border rounded bg-white shadow">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Detalhes de {agendaDetails.date.toLocaleDateString('pt-BR')}</h4>
                      <button className="text-xs text-gray-400 hover:text-red-500" onClick={()=>setAgendaDetails(null)}>Fechar</button>
                    </div>
                    <ul className="space-y-2">
                      {agendaDetails.ags.map((t, i) => (
                        <li key={t.id} className="border rounded p-2 flex flex-col bg-gray-50">
                          <span className="font-medium">{t.description}</span>
                          <span className={t.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.amount)}
                          </span>
                          <span className="text-xs text-gray-500">{t.category} • {t.status}</span>
                          <span className={`text-xs font-semibold ${t.type === 'Receita' ? 'text-green-500' : 'text-red-500'}`}>{t.type}</span>
                          {t.tags && t.tags.length > 0 && (
                            <span className="text-xs text-gray-400">Tags: {t.tags.join(', ')}</span>
                          )}
                          {t.note && (
                            <span className="text-xs text-gray-400">Obs: {t.note}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (() => {
                  const { byMonth, byWeek, byDay } = getAgendaGrouped();
                  let list = [];
                  let title = '';
                  if (agendaView === 'mes') {
                    const key = `${agendaDate.getFullYear()}-${String(agendaDate.getMonth()+1).padStart(2,'0')}`;
                    list = byMonth[key] || [];
                    title = `Agendamentos de ${agendaDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}`;
                  } else if (agendaView === 'semana') {
                    const key = `${agendaDate.getFullYear()}-W${getWeekNumber(agendaDate)}`;
                    list = byWeek[key] || [];
                    const week = getWeekNumber(agendaDate);
                    title = `Agendamentos da semana ${week} de ${agendaDate.getFullYear()}`;
                  } else {
                    const key = agendaDate.toISOString().split('T')[0];
                    list = byDay[key] || [];
                    title = `Agendamentos de ${agendaDate.toLocaleDateString('pt-BR')}`;
                  }
                  return (
                    <div>
                      <h4 className="font-semibold mb-2">{title}</h4>
                      {list.length === 0 ? (
                        <div className="text-gray-400">Nenhum agendamento.</div>
                      ) : (
                        <ul className="space-y-2">
                          {list.map((t, i) => (
                            <li key={t.id} className="border rounded p-2 flex flex-col bg-gray-50">
                              <span className="font-medium">{t.description}</span>
                              <span className={t.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.amount)}
                              </span>
                              <span className="text-xs text-gray-500">{t.category} • {new Date(t.date).toLocaleDateString('pt-BR')}</span>
                              <span className={`text-xs font-semibold ${t.type === 'Receita' ? 'text-green-500' : 'text-red-500'}`}>{t.type}</span>
                              {t.tags && t.tags.length > 0 && (
                                <span className="text-xs text-gray-400">Tags: {t.tags.join(', ')}</span>
                              )}
                              {t.note && (
                                <span className="text-xs text-gray-400">Obs: {t.note}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialContent;
