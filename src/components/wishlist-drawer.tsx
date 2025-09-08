'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, Product } from '@/lib/store';
import Image from 'next/image';
import { useState } from 'react';

export function WishlistDrawer() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          {wishlist.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {wishlist.length}
            </motion.span>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md w-[95vw] sm:w-full max-h-[90vh] overflow-hidden flex flex-col mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Wishlist
          </DialogTitle>
          <DialogDescription>
            {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-3 sm:space-y-4 pr-2">
            <AnimatePresence>
              {wishlist.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg"
                >
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-xs sm:text-sm line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-primary font-semibold text-sm">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                      className="h-6 sm:h-7 px-2 text-xs"
                    >
                      <ShoppingCart className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                      <span className="hidden xs:inline">Add</span>
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromWishlist(item.id)}
                      className="h-6 sm:h-7 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                      <span className="hidden xs:inline">Remove</span>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {wishlist.length === 0 && (
              <div className="text-center py-6 sm:py-8 px-4 text-muted-foreground">
                <Heart className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm sm:text-base">Your wishlist is empty</p>
                <p className="text-xs sm:text-sm mt-1">Add items you love to keep track of them</p>
              </div>
            )}
          </div>
        </div>

        {wishlist.length > 0 && (
          <div className="border-t pt-3 sm:pt-4 mt-3 sm:mt-4">
            <Button 
              onClick={() => {
                wishlist.forEach(item => addToCart(item));
                setIsOpen(false);
              }}
              className="w-full h-10 sm:h-11"
              size="lg"
            >
              Add All to Cart
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}