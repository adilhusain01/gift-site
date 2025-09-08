'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { CATEGORIES, getProductsByCategory } from '@/lib/products';
import { ProductCard } from './product-card';
import { useState } from 'react';
import Image from 'next/image';

export function CategoriesSection() {
  const { selectedCategory, setSelectedCategory } = useStore();
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  
  // Get products for current category with search
  const products = getProductsByCategory(selectedCategory, categorySearchQuery);

  const selectedCategoryData = CATEGORIES.find(cat => cat.id === selectedCategory);

  return (
    <section id="categories" className="py-12 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
            {selectedCategoryData?.name === 'All' 
              ? selectedCategoryData.description 
              : `Gifts ${selectedCategoryData?.name}`
            }
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            {selectedCategoryData?.description}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8 px-2"
        >
          {CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id as 'all' | 'her' | 'him' | 'couple' | 'parents' | 'kids')}
                className="flex items-center gap-1.5 sm:gap-2 h-10 sm:h-12 text-xs sm:text-sm px-3 sm:px-4"
              >
                <div className="relative w-4 h-4 sm:w-6 sm:h-6 rounded-full overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="hidden xs:inline">{category.name}</span>
                <span className="xs:hidden">{category.name.split(' ')[0]}</span>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-md mx-auto mb-8 sm:mb-12 px-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={`Search in ${selectedCategoryData?.name.toLowerCase()} category...`}
              value={categorySearchQuery}
              onChange={(e) => setCategorySearchQuery(e.target.value)}
              className="pl-10 pr-4 h-10 sm:h-12 text-sm sm:text-base"
            />
          </div>
        </motion.div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-0"
          >
            {products.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index} 
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-8 sm:py-12 px-4"
          >
            <div className="max-w-md mx-auto">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                Try adjusting your search or browse other categories
              </p>
              <Button 
                variant="outline" 
                onClick={() => setCategorySearchQuery('')}
                size="sm"
              >
                Clear Search
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}