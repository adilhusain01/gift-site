import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'all' | 'her' | 'him' | 'couple' | 'parents' | 'kids';
}

export interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  cart: CartItem[];
  wishlist: Product[];
  recentlyViewed: Product[];
  theme: 'light' | 'dark';
  searchQuery: string;
  selectedCategory: Product['category'];
  
  // Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  
  addToRecentlyViewed: (product: Product) => void;
  
  toggleTheme: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: Product['category']) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      recentlyViewed: [],
      theme: 'light',
      searchQuery: '',
      selectedCategory: 'all',

      addToCart: (product) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set({
          cart: get().cart.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        });
      },

      clearCart: () => set({ cart: [] }),

      addToWishlist: (product) => {
        const { wishlist } = get();
        if (!wishlist.some(item => item.id === product.id)) {
          set({ wishlist: [...wishlist, product] });
        }
      },

      removeFromWishlist: (productId) => {
        set({ wishlist: get().wishlist.filter(item => item.id !== productId) });
      },

      addToRecentlyViewed: (product) => {
        const { recentlyViewed } = get();
        const filtered = recentlyViewed.filter(item => item.id !== product.id);
        set({ recentlyViewed: [product, ...filtered].slice(0, 10) });
      },

      toggleTheme: () => {
        set({ theme: get().theme === 'light' ? 'dark' : 'light' });
      },

      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
    }),
    {
      name: 'gift-store',
    }
  )
);