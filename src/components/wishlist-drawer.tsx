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
import { useStore } from '@/lib/store';
import Image from 'next/image';
import { useState } from 'react';

export function WishlistDrawer() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToCart = (product: any) => {
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
      
      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden flex flex-col">
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
          <div className="space-y-4 pr-2">
            <AnimatePresence>
              {wishlist.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-primary font-semibold">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                      className="h-7 px-2 text-xs"
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromWishlist(item.id)}
                      className="h-7 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {wishlist.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Heart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Your wishlist is empty</p>
                <p className="text-sm mt-1">Add items you love to keep track of them</p>
              </div>
            )}
          </div>
        </div>

        {wishlist.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <Button 
              onClick={() => {
                wishlist.forEach(item => addToCart(item));
                setIsOpen(false);
              }}
              className="w-full"
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