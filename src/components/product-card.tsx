'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/lib/store';
import { useStore } from '@/lib/store';
import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, wishlist, addToRecentlyViewed } = useStore();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const isWishlisted = wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    addToRecentlyViewed(product);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleProductView = () => {
    addToRecentlyViewed(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
        <div className="relative overflow-hidden">
          {/* Image */}
          <div className="relative h-64 bg-muted">
            {isImageLoading && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setIsImageLoading(false)}
            />
          </div>

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="icon"
                variant="secondary"
                onClick={handleWishlistToggle}
                className="h-8 w-8 rounded-full shadow-lg"
              >
                <Heart 
                  className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} 
                />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={handleProductView}
                className="h-8 w-8 rounded-full shadow-lg"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
              ₹ {product.price.toLocaleString()}
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>
          
          <Button 
            onClick={handleAddToCart}
            className="w-full group/button"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2 group-hover/button:animate-bounce" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}