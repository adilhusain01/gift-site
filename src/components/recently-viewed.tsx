'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import Image from 'next/image';

export function RecentlyViewed() {
  const { recentlyViewed, addToCart, addToWishlist, removeFromWishlist, wishlist } = useStore();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <Eye className="h-6 w-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">Recently Viewed Gifts</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recentlyViewed.slice(0, 4).map((product, index) => {
            const isWishlisted = wishlist.some(item => item.id === product.id);
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-40">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="text-white text-xs font-medium mb-1">
                        {product.name}
                      </div>
                      <div className="text-yellow-400 font-bold">
                        ₹ {product.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="flex-1 h-8 text-xs"
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                        className="h-8 w-8 p-0"
                      >
                        <Heart 
                          className={`h-3 w-3 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} 
                        />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}