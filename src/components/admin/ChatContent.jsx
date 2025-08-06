import React, { useState, useMemo, useEffect } from 'react';
import { Send, Search, User, MessageSquare, Mail, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const initialConversations = [
  { id: 1, name: 'Visitante 1', lastMessage: 'Olá, gostaria de um orçamento.', unread: 2, type: 'live-chat' },
  { id: 2, name: 'Visitante 2', lastMessage: 'Vocês fazem apps mobile?', unread: 0, type: 'live-chat' },
  { id: 3, name: 'Ana Costa (FoodCorp)', lastMessage: 'Podemos discutir a nova feature?', unread: 1, type: 'client' },
  { id: 4, name: 'João Santos', lastMessage: 'Gostaria de saber mais sobre seus serviços.', unread: 0, type: 'form' },
  { id: 5, name: 'Maria Silva (Tech Solutions)', lastMessage: 'Tudo certo para a reunião de amanhã?', unread: 0, type: 'client' },
  { id: 6, name: 'Administrador', lastMessage: 'Olá! Como posso ajudar?', unread: 0, type: 'admin' },
];

const initialMessages = {
  1: [
    { from: 'visitor', text: 'Olá, gostaria de um orçamento.' },
    { from: 'admin', text: 'Olá! Claro, em que podemos ajudar?' },
    { from: 'visitor', text: 'Preciso de um site institucional.' },
  ],
  2: [
    { from: 'visitor', text: 'Vocês fazem apps mobile?' },
  ],
  3: [
    { from: 'client', text: 'Podemos discutir a nova feature?' },
    { from: 'admin', text: 'Com certeza, Ana. Qual o melhor horário para você?' },
  ],
  4: [
    { from: 'visitor', text: 'Gostaria de saber mais sobre seus serviços.' },
  ],
  5: [
    { from: 'client', text: 'Tudo certo para a reunião de amanhã?' },
  ],
  6: [
    { from: 'client', text: 'Olá, preciso de ajuda com uma tarefa.' },
    { from: 'admin', text: 'Olá! Como posso ajudar?' },
  ],
};

const ChatContent = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === 'admin';

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  
  useEffect(() => {
    const savedConversations = JSON.parse(localStorage.getItem('chatConversations')) || initialConversations;
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || initialMessages;

    // Ensure client has an admin conversation
    if (!isAdmin) {
      const adminConvo = savedConversations.find(c => c.type === 'admin');
      if (!adminConvo) {
        const newAdminConvo = { id: 6, name: 'Administrador', lastMessage: 'Olá! Como posso ajudar?', unread: 0, type: 'admin' };
        savedConversations.unshift(newAdminConvo);
        if (!savedMessages[6]) {
            savedMessages[6] = [{ from: 'admin', text: 'Olá! Como posso ajudar?' }];
        }
      }
    }

    setConversations(savedConversations);
    setMessages(savedMessages);
  }, [isAdmin]);

  const saveChatData = (newConversations, newMessages) => {
    setConversations(newConversations);
    setMessages(newMessages);
    localStorage.setItem('chatConversations', JSON.stringify(newConversations));
    localStorage.setItem('chatMessages', JSON.stringify(newMessages));
  };
  
  const [activeConversation, setActiveConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (conversations.length > 0) {
      setActiveConversation(isAdmin ? conversations[0] : conversations.find(c => c.type === 'admin'));
    }
  }, [conversations, isAdmin]);

  const handleSendMessage = () => {
    if (!message.trim() || !activeConversation) return;

    const newMessage = {
      from: isAdmin ? 'admin' : 'client',
      text: message.trim(),
    };

    const updatedMessages = {
      ...messages,
      [activeConversation.id]: [...(messages[activeConversation.id] || []), newMessage],
    };

    const updatedConversations = conversations.map(convo => 
      convo.id === activeConversation.id 
        ? { ...convo, lastMessage: message.trim() }
        : convo
    );

    saveChatData(updatedConversations, updatedMessages);
    setMessage('');
    toast({ title: "Mensagem enviada!" });
  };

  const availableConversations = useMemo(() => {
    if (isAdmin) return conversations;
    return conversations.filter(c => c.type === 'admin');
  }, [isAdmin, conversations]);

  const filteredConversations = useMemo(() => {
    return availableConversations
      .filter(convo => {
        if (!isAdmin || filter === 'all') return true;
        return convo.type === filter;
      })
      .filter(convo =>
        convo.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, filter, isAdmin, availableConversations]);

  const getIconForType = (type) => {
    switch (type) {
      case 'client': return <User className="w-5 h-5 text-blue-500" />;
      case 'live-chat': return <MessageSquare className="w-5 h-5 text-green-500" />;
      case 'form': return <Mail className="w-5 h-5 text-orange-500" />;
      default: return <User />;
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-bold mb-1">Chat</h2>
        {isAdmin && <p className="text-muted-foreground">Converse com seus clientes e visitantes.</p>}
      </div>
      <div className="flex-grow bg-card rounded-xl border flex overflow-hidden">
        <div className={`border-r flex-col ${isAdmin ? 'w-1/3 flex' : 'hidden'}`}>
          <div className="p-4 border-b space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Buscar conversas..."
                className="w-full bg-background border rounded-lg pl-10 pr-4 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar por tipo
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Fonte da Mensagem</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                  <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="client">Clientes</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="live-chat">Chat ao Vivo</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="form">Formulário de Contato</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex-grow overflow-y-auto">
            {filteredConversations.map(convo => (
              <button
                key={convo.id}
                onClick={() => setActiveConversation(convo)}
                className={`w-full text-left p-4 flex items-center gap-3 border-b ${activeConversation?.id === convo.id ? 'bg-primary/10' : 'hover:bg-accent'}`}
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  {getIconForType(convo.type)}
                </div>
                <div className="flex-grow">
                  <p className="font-semibold">{convo.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
                {convo.unread > 0 && <div className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">{convo.unread}</div>}
              </button>
            ))}
          </div>
        </div>
        <div className={isAdmin ? 'w-2/3 flex flex-col' : 'w-full flex flex-col'}>
          {activeConversation ? (
            <>
              <div className="p-4 border-b flex items-center">
                <h3 className="font-bold text-lg">{activeConversation.name}</h3>
              </div>
              <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {(messages[activeConversation.id] || []).map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.from === (isAdmin ? 'admin' : 'client') ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${msg.from === 'admin' ? 'bg-primary text-primary-foreground' : (msg.from === 'client' ? 'bg-blue-500/20 text-foreground' : 'bg-muted')}`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
              <form className="p-4 border-t flex items-center gap-2" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                <Input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow bg-background border rounded-lg px-4 py-2"
                />
                <Button type="submit" size="icon"><Send /></Button>
              </form>
            </>
          ) : (
             <div className="flex-grow flex items-center justify-center text-muted-foreground">
                <p>Nenhuma conversa ativa.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatContent;