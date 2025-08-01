import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

const SuccessPage = () => {
  return (
    <>
      <Helmet>
        <title>Compra Concluída! - DevStudio</title>
        <meta name="description" content="Sua compra foi concluída com sucesso." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card border rounded-xl shadow-lg p-8 md:p-12 text-center max-w-lg w-full"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
          >
            <CheckCircle className="mx-auto h-20 w-20 text-green-500 mb-6" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Pagamento Aprovado!</h1>
          <p className="text-muted-foreground mb-8">
            Obrigado pela sua compra! Você receberá um e-mail de confirmação em breve com os detalhes do seu pedido.
          </p>
          
          <Button asChild size="lg">
            <Link to="/store">
              Continuar Comprando <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default SuccessPage;