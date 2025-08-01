import React from 'react';
import { Helmet } from 'react-helmet';
import ProductsList from '@/components/ProductsList';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const StorePage = () => {
  return (
    <>
      <Helmet>
        <title>Loja - DevStudio</title>
        <meta name="description" content="Explore nossos produtos e soluções digitais." />
      </Helmet>
      <div className="bg-background min-h-screen">
        <header className="bg-card border-b sticky top-0 z-40">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">Nossa Loja</h1>
                  <p className="text-muted-foreground">Produtos digitais para impulsionar seu negócio</p>
                </div>
                <Button asChild variant="outline">
                    <Link to="/">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o Início
                    </Link>
                </Button>
            </div>
        </header>
        <main className="container mx-auto px-6 py-10">
          <ProductsList />
        </main>
      </div>
    </>
  );
};

export default StorePage;