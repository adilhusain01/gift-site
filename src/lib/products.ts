import { Product } from './store';

export const CATEGORIES = [
  {
    id: 'all',
    name: 'All',
    description: 'Perfect Picks for Every Relationship',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop&crop=center'
  },
  {
    id: 'her',
    name: 'For Her',
    description: 'Thoughtful gifts for special women',
    image: 'https://www.boxupgifting.com/cdn/shop/files/DSC00966_copy_300x300.jpg?v=1753429314'
  },
  {
    id: 'him',
    name: 'For Him',
    description: 'Perfect presents for the men you care about',
    image: 'https://www.boxupgifting.com/cdn/shop/files/DSC00809_copy_2_300x300.jpg?v=1753429329'
  },
  {
    id: 'couple',
    name: 'For Couple',
    description: 'Romantic gifts for couples',
    image: 'https://www.boxupgifting.com/cdn/shop/files/DSC01003_copy_2_300x300.jpg?v=1753429344'
  },
  {
    id: 'parents',
    name: 'For Parents',
    description: 'Show your love and appreciation',
    image: 'https://www.boxupgifting.com/cdn/shop/files/03-03-25_copy_300x300.jpg?v=1753429360'
  },
  {
    id: 'kids',
    name: 'For Kids',
    description: 'Delightful gifts for little ones',
    image: 'https://www.boxupgifting.com/cdn/shop/files/Rakhi_Hamper_9_-_Brother_2_sister_-_Kits_-_4_copy_300x300.jpg?v=1753429372'
  }
] as const;

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Mini Treasures Hamper',
    price: 670,
    image: 'https://www.boxupgifting.com/cdn/shop/files/Crunchynutspairof2-1_800x.jpg?v=1756187572',
    category: 'her'
  },
  {
    id: '2',
    name: 'Delights of Diwali',
    price: 760,
    image: 'https://www.boxupgifting.com/cdn/shop/files/DSC07153_b0be0dba-2c70-4d86-982b-65c4931627f3.jpg?v=1729168409&width=713',
    category: 'all'
  },
  {
    id: '3',
    name: 'Diwali basket',
    price: 850,
    image: 'https://www.boxupgifting.com/cdn/shop/files/DSC07091.jpg?v=1729168386&width=713',
    category: 'parents'
  },
  // Additional sample products
  {
    id: '4',
    name: 'Elegant Watch Set',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center',
    category: 'him'
  },
  {
    id: '5',
    name: 'Romantic Dinner Box',
    price: 950,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop&crop=center',
    category: 'couple'
  },
  {
    id: '6',
    name: 'Kids Adventure Kit',
    price: 580,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center',
    category: 'kids'
  }
];

export function getProductsByCategory(category: Product['category'], searchQuery = '') {
  let filtered = category === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);
  
  if (searchQuery) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  return filtered;
}