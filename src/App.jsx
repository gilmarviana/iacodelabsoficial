
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import AdminDashboard from '@/pages/AdminDashboard';
import ClientDashboard from '@/pages/ClientDashboard';
import StorePage from '@/pages/StorePage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import SuccessPage from '@/pages/SuccessPage';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CartProvider } from '@/hooks/useCart';
import ShoppingCart from '@/components/ShoppingCart';
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'react-quill/dist/quill.snow.css';
import 'react-day-picker/dist/style.css';
import TaskPublicView from '@/pages/TaskPublicView';

const CartButton = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartItems } = useCart();
    const location = useLocation();

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    const hiddenPaths = ['/admin', '/client', '/', '/task/'];
    if (hiddenPaths.some(path => location.pathname.startsWith(path))) {
        return null;
    }

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <Button 
                    onClick={() => setIsCartOpen(true)}
                    className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center relative"
                >
                    <ShoppingCartIcon className="h-7 w-7 text-primary-foreground" />
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </div>
            <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        </>
    );
};

const AppContent = () => {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/task/:taskId" element={<TaskPublicView />} />
        </Routes>
        <Toaster />
        <CartButton />
      </div>
    </>
  );
};


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <CartProvider>
          <DndProvider backend={HTML5Backend}>
            <Router>
              <AppContent />
            </Router>
          </DndProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
