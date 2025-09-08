'use client';

import { Card, CardContent } from '@/components/ui/card';
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
    <section className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2"
        >
          <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Recently Viewed Gifts</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 px-2 sm:px-0">
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
                  <div className="relative h-32 sm:h-40">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 right-1.5 sm:right-2">
                      <div className="text-white text-xs font-medium mb-0.5 sm:mb-1 line-clamp-2">
                        {product.name}
                      </div>
                      <div className="text-yellow-400 font-bold text-xs sm:text-sm">
                        ₹ {product.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-2 sm:p-3">
                    <div className="flex gap-1.5 sm:gap-2">
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="flex-1 h-7 sm:h-8 text-xs px-2"
                      >
                        <ShoppingCart className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                        <span className="hidden xs:inline">Add</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                      >
                        <Heart 
                          className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} 
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