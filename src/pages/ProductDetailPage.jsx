import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProduct, getProductQuantities } from '@/api/EcommerceApi';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, Loader2, ArrowLeft, CheckCircle, Minus, Plus, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProduct = await getProduct(id);

        try {
          const quantitiesResponse = await getProductQuantities({
            fields: 'inventory_quantity',
            product_ids: [fetchedProduct.id]
          });

          const variantQuantityMap = new Map();
          quantitiesResponse.variants.forEach(variant => {
            variantQuantityMap.set(variant.id, variant.inventory_quantity);
          });

          const productWithQuantities = {
            ...fetchedProduct,
            variants: fetchedProduct.variants.map(variant => ({
              ...variant,
              inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
            }))
          };

          setProduct(productWithQuantities);

          if (productWithQuantities.variants && productWithQuantities.variants.length > 0) {
            setSelectedVariant(productWithQuantities.variants[0]);
          }
        } catch (quantityError) {
          // even if quantities fail, we can still show the product
          console.error("Failed to fetch quantities:", quantityError);
          setProduct(fetchedProduct);
           if (fetchedProduct.variants && fetchedProduct.variants.length > 0) {
            setSelectedVariant(fetchedProduct.variants[0]);
          }
        }
      } catch (err) {
        setError(err.message || 'Falha ao carregar o produto');
        if(err.message.includes('404')) {
           navigate('/store', {replace: true});
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, navigate]);
  
  const handleAddToCart = useCallback(async () => {
    if (product && selectedVariant) {
      const availableQuantity = selectedVariant.inventory_quantity;
      try {
        await addToCart(product, selectedVariant, quantity, availableQuantity);
        toast({
          title: "Adicionado ao Carrinho! 🛒",
          description: `${quantity} x ${product.title} (${selectedVariant.title}) adicionado.`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oh não! Algo deu errado.",
          description: error.message,
        });
      }
    }
  }, [product, selectedVariant, quantity, addToCart, toast]);

  const handleQuantityChange = useCallback((amount) => {
    setQuantity(prevQuantity => {
        const newQuantity = prevQuantity + amount;
        if (newQuantity < 1) return 1;
        
        if (selectedVariant?.manage_inventory) {
          const availableStock = selectedVariant.inventory_quantity;
          if (newQuantity > availableStock) return availableStock;
        }

        return newQuantity;
    });
  }, [selectedVariant]);

  const handlePrevImage = useCallback(() => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1);
    }
  }, [product?.images?.length]);

  const handleNextImage = useCallback(() => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1);
    }
  }, [product?.images?.length]);

  const handleVariantSelect = useCallback((variant) => {
    setSelectedVariant(variant);
    setQuantity(1); // Reset quantity when variant changes

    if (variant.image_url && product?.images?.length > 0) {
      const imageIndex = product.images.findIndex(image => image.url === variant.image_url);

      if (imageIndex !== -1) {
        setCurrentImageIndex(imageIndex);
      }
    }
  }, [product?.images]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <Loader2 className="h-16 w-16 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-10 px-6">
        <Link to="/store" className="inline-flex items-center gap-2 hover:text-primary transition-colors mb-6">
          <ArrowLeft size={16} />
          Voltar para a loja
        </Link>
        <div className="text-center text-red-500 p-8 bg-destructive/10 rounded-lg">
          <XCircle className="mx-auto h-16 w-16 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Erro ao carregar o produto</h2>
          <p className="mb-6">{error}</p>
        </div>
      </div>
    );
  }

  const price = selectedVariant?.sale_price_in_cents_formatted ?? selectedVariant?.price_in_cents_formatted;
  const originalPrice = selectedVariant?.sale_price_in_cents ? selectedVariant?.price_in_cents_formatted : null;
  const availableStock = selectedVariant ? selectedVariant.inventory_quantity : 0;
  const isStockManaged = selectedVariant?.manage_inventory ?? false;
  const outOfStock = isStockManaged && availableStock < 1;
  const canAddToCart = product.purchasable && !outOfStock;

  const currentImage = product.images[currentImageIndex];
  const hasMultipleImages = product.images.length > 1;

  return (
    <>
      <Helmet>
        <title>{`${product.title || 'Produto'} - Nossa Loja`}</title>
        <meta name="description" content={product.description?.substring(0, 160) || product.title} />
      </Helmet>
      <div className="container mx-auto py-10 px-6">
        <div className="mb-6">
            <Link to="/store" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
              <ArrowLeft size={16} />
              Voltar para a loja
            </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 bg-card border rounded-lg p-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
            <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square">
              <img
                src={!currentImage?.url ? placeholderImage : currentImage.url}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {hasMultipleImages && (
                <>
                  <Button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full"
                    variant="secondary"
                    size="icon"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </Button>
                  <Button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                    variant="secondary"
                    size="icon"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </Button>
                </>
              )}
              {product.ribbon_text && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                  {product.ribbon_text}
                </div>
              )}
            </div>

            {hasMultipleImages && (
              <div className="flex justify-center gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-primary' : 'border-transparent hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={!image.url ? placeholderImage : image.url}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col">
            <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{product.subtitle}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-primary">{price}</span>
              {originalPrice && (
                <span className="text-2xl text-muted-foreground line-through">{originalPrice}</span>
              )}
            </div>

            <div className="prose dark:prose-invert text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: product.description }} />

            {product.variants.length > 1 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Estilo</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(variant => (
                    <Button
                      key={variant.id}
                      variant={selectedVariant?.id === variant.id ? 'default' : 'outline'}
                      onClick={() => handleVariantSelect(variant)}
                      className="transition-all"
                    >
                      {variant.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-4 mb-6">
              <p className="text-sm font-medium">Quantidade:</p>
              <div className="flex items-center border rounded-full p-1">
                <Button onClick={() => handleQuantityChange(-1)} variant="ghost" size="icon" className="rounded-full h-8 w-8"><Minus size={16} /></Button>
                <span className="w-10 text-center font-bold">{quantity}</span>
                <Button onClick={() => handleQuantityChange(1)} variant="ghost" size="icon" className="rounded-full h-8 w-8"><Plus size={16} /></Button>
              </div>
            </div>

            <div className="mt-auto">
              <Button onClick={handleAddToCart} size="lg" className="w-full" disabled={!canAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {outOfStock ? 'Esgotado' : 'Adicionar ao Carrinho'}
              </Button>

              {canAddToCart && isStockManaged && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-3 flex items-center justify-center gap-2">
                  <CheckCircle size={16} /> {availableStock} em estoque!
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;