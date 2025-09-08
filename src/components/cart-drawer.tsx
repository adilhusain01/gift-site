'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import Image from 'next/image';
import { useState } from 'react';

interface CheckoutFormData {
  name: string;
  address: string;
  phone: string;
}

export function CartDrawer() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    address: '',
    phone: ''
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    if (!formData.name.trim() || !formData.address.trim()) {
      alert('Please fill in your name and address');
      return;
    }

    // Create WhatsApp message
    const orderDetails = cart.map(item => 
      `• ${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const message = `🎁 New Order Request

Customer Details:
Name: ${formData.name}
Address: ${formData.address}
Phone: ${formData.phone}

Order Items:
${orderDetails}

Total Amount: ₹${total.toLocaleString()}

Please confirm this order. Thank you!`;

    const whatsappUrl = `https://wa.me/+918604135956?text=${encodeURIComponent(message)}`;
    
    // Clear cart and close modal
    clearCart();
    setIsOpen(false);
    setShowCheckout(false);
    setFormData({ name: '', address: '', phone: '' });
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {totalItems}
            </motion.span>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md w-[95vw] sm:w-full max-h-[90vh] overflow-hidden flex flex-col mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            {showCheckout ? 'Checkout' : 'Shopping Cart'}
          </DialogTitle>
          <DialogDescription>
            {showCheckout 
              ? 'Enter your details to place the order'
              : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {!showCheckout ? (
            // Cart Items
            <div className="space-y-3 sm:space-y-4 overflow-y-auto max-h-80 sm:max-h-96 pr-2">
              <AnimatePresence>
                {cart.map((item) => (
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
                    
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 sm:h-8 sm:w-8"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      </Button>
                      
                      <span className="w-6 sm:w-8 text-center font-medium text-sm">
                        {item.quantity}
                      </span>
                      
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 sm:h-8 sm:w-8"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      </Button>
                      
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 sm:h-8 sm:w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {cart.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Your cart is empty</p>
                </div>
              )}
            </div>
          ) : (
            // Checkout Form
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 sm:mb-2">Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="h-10 sm:h-11"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1.5 sm:mb-2">Delivery Address *</label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter your complete address"
                  className="h-10 sm:h-11"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1.5 sm:mb-2">Phone Number</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  className="h-10 sm:h-11"
                />
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t pt-3 sm:pt-4 mt-3 sm:mt-4">
            <div className="flex justify-between items-center text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              <span>Total:</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            
            {!showCheckout ? (
              <Button 
                onClick={() => setShowCheckout(true)}
                className="w-full h-10 sm:h-11"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 h-10 sm:h-11"
                  size="sm"
                >
                  Back to Cart
                </Button>
                <Button 
                  onClick={handleCheckout}
                  className="flex-1 h-10 sm:h-11"
                  size="sm"
                >
                  Place Order
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}