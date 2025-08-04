
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Como posso ajudá-lo hoje?',
      sender: 'support',
    }
  ]);
  const { toast } = useToast();

  // Atualiza mensagens em tempo real ao receber evento do localStorage
  React.useEffect(() => {
    function handleStorage(e) {
      if (e.key === 'chatConversations' || e.key === 'chatMessages') {
        // Busca a conversa live-chat mais recente
        const savedConversations = JSON.parse(localStorage.getItem('chatConversations') || '[]');
        const savedMessages = JSON.parse(localStorage.getItem('chatMessages') || '{}');
        let liveChatConversation = savedConversations.find(c => c.type === 'live-chat' && c.name.startsWith('Visitante'));
        if (liveChatConversation && savedMessages[liveChatConversation.id]) {
          setMessages([
            {
              id: 1,
              text: 'Olá! Como posso ajudá-lo hoje?',
              sender: 'support',
            },
            ...savedMessages[liveChatConversation.id].map((msg, idx) => ({
              id: idx + 2,
              text: msg.text,
              sender: msg.from === 'visitor' ? 'user' : 'support',
            }))
          ]);
        }
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { id: Date.now(), text: message, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    const savedConversations = JSON.parse(localStorage.getItem('chatConversations') || '[]');
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages') || '{}');

    let liveChatConversation = savedConversations.find(c => c.type === 'live-chat' && c.name.startsWith('Visitante'));
    
    if (!liveChatConversation) {
        const newId = Date.now();
        liveChatConversation = {
            id: newId,
            name: `Visitante ${newId.toString().slice(-4)}`,
            lastMessage: message,
            unread: 1,
            type: 'live-chat'
        };
        savedConversations.push(liveChatConversation);
        savedMessages[liveChatConversation.id] = [];
    } else {
        liveChatConversation.lastMessage = message;
        liveChatConversation.unread = (liveChatConversation.unread || 0) + 1;
    }

    const newMessageForAdmin = {
        from: 'visitor',
        text: message,
    };
    savedMessages[liveChatConversation.id].push(newMessageForAdmin);

    localStorage.setItem('chatConversations', JSON.stringify(savedConversations));
    localStorage.setItem('chatMessages', JSON.stringify(savedMessages));

    setMessage('');

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: 'Obrigado! Nossa equipe entrará em contato.', sender: 'support' }]);
    }, 1000);

    toast({
      title: "Mensagem enviada!",
      description: "Responderemos em breve."
    });
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full shadow-lg"
              size="icon"
            >
              <MessageCircle className="w-8 h-8" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0, height: isMinimized ? 60 : 450 }}
            exit={{ scale: 0, opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 w-80 bg-card rounded-2xl border shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            <header className="flex items-center justify-between p-3 border-b bg-card">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Suporte IA Code Labs</h3>
                  <p className="text-muted-foreground text-xs">Online</p>
                </div>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={() => setIsMinimized(!isMinimized)} className="w-8 h-8">
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="w-8 h-8">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </header>

            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-3 border-t bg-card">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button type="submit" size="icon">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
