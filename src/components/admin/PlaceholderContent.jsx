import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const PlaceholderContent = ({ title, description, icon: Icon, buttonText }) => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="bg-card rounded-xl p-8 border text-center flex flex-col items-center">
        {Icon && <Icon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />}
        <h3 className="text-xl font-bold mb-2">Módulo em Construção</h3>
        <p className="text-muted-foreground mb-4 max-w-md">
          Esta seção permitirá o gerenciamento completo de {title.toLowerCase()}.
        </p>
        <Button
          onClick={() => toast({
            title: "🚧 Funcionalidade não implementada ainda—mas não se preocupe! Você pode solicitar isso no seu próximo prompt! 🚀"
          })}
        >
          {buttonText || `Implementar ${title}`}
        </Button>
      </div>
    </div>
  );
};

export default PlaceholderContent;