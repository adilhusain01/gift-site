'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  const scrollToProducts = () => {
    const element = document.getElementById('categories');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[60vh] sm:h-[70vh] min-h-[450px] sm:min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1521478706270-f2e33c203d95?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 sm:bg-black/30" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto">
       

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
        >
          Perfect Gifts for
          <br className="hidden sm:block" />
          <span className="block sm:inline bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Every Occasion
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-100 max-w-2xl mx-auto px-2"
        >
          Curated collections of thoughtful gifts that bring joy to your loved ones. 
          <span className="hidden sm:inline">From intimate moments to grand celebrations.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2"
        >
          <Button 
            size="lg" 
            onClick={scrollToProducts}
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white border-0 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold group"
          >
            Explore Gifts
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold"
          >
            View Categories
          </Button>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 hidden lg:block"
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-yellow-400" />
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 right-10 hidden lg:block"
        >
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-orange-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}