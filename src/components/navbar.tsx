'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Moon, Sun, Gift } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { CartDrawer } from './cart-drawer';
import { WishlistDrawer } from './wishlist-drawer';

export function Navbar() {
  const {
    searchQuery,
    setSearchQuery,
  } = useStore();
  
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 flex-shrink-0"
        >
          <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hidden xs:block">
            GiftStore
          </span>
        </motion.div>

        {/* Search Bar - Hidden on mobile, shown on larger screens */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 w-full"
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </motion.div>
          </Button>

          {/* Wishlist */}
          <WishlistDrawer />

          {/* Cart */}
          <CartDrawer />
        </div>
      </div>
    </motion.nav>
  );
}