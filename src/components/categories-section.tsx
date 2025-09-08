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
    <section id="categories" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {selectedCategoryData?.name === 'All' 
              ? selectedCategoryData.description 
              : `Gifts ${selectedCategoryData?.name}`
            }
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {selectedCategoryData?.description}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
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
                className="flex items-center gap-2 h-12"
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {category.name}
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
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={`Search in ${selectedCategoryData?.name.toLowerCase()} category...`}
              value={categorySearchQuery}
              onChange={(e) => setCategorySearchQuery(e.target.value)}
              className="pl-10 pr-4 h-12"
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or browse other categories
              </p>
              <Button 
                variant="outline" 
                onClick={() => setCategorySearchQuery('')}
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