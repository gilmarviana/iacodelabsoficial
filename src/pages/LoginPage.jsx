import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({});
  const { toast } = useToast();
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem('authPageConfig') || '{}');
    const defaultConfig = {
      backgroundImageUrl: '',
      title: 'IA Code Labs',
      subtitle: 'Faça login para continuar',
    };
    setConfig({ ...defaultConfig, ...savedConfig });

    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/client');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.username || !formData.password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    const result = login(formData.username, formData.password);
    
    if (result.success) {
      toast({
        title: "Login realizado!",
        description: `Bem-vindo, ${result.user.name}!`
      });
      navigate(result.user.role === 'admin' ? '/admin' : '/client');
    } else {
      toast({
        title: "Erro no login",
        description: result.error,
        variant: "destructive"
      });
    }

    setLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fillDemoCredentials = (type) => {
    setFormData(type === 'admin' 
      ? { username: 'admin', password: 'admin123' }
      : { username: 'cliente', password: 'cliente123' });
  };

  return (
    <>
      <Helmet>
        <title>{`Login - ${config.title || 'IA Code Labs'}`}</title>
        <meta name="description" content="Faça login para acessar sua área administrativa ou de cliente." />
      </Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
        {config.backgroundImageUrl && (
          <div className="absolute inset-0 z-0">
            <img-replace src={config.backgroundImageUrl} alt="Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        )}
        <div className="absolute top-6 right-6 z-20">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button variant="ghost" onClick={() => navigate('/')} className={config.backgroundImageUrl ? 'text-white hover:text-white/80' : ''}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao site
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 border"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">
                {config.title}
              </h1>
              <p className="text-muted-foreground">{config.subtitle}</p>
            </div>

            <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-primary text-sm mb-3 font-semibold">Credenciais de Demonstração:</p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => fillDemoCredentials('admin')}>Admin</Button>
                <Button variant="outline" size="sm" onClick={() => fillDemoCredentials('client')}>Cliente</Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Usuário</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Digite seu usuário"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Digite sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full py-3 text-lg font-medium">
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Esqueceu sua senha?{' '}
                <button 
                  onClick={() => toast({ title: "🚧 Funcionalidade não implementada ainda—mas não se preocupe! Você pode solicitar isso no seu próximo prompt! 🚀" })}
                  className="text-primary hover:underline"
                >
                  Clique aqui
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;