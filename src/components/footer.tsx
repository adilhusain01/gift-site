'use client';

import { Gift, Heart, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3 sm:space-y-4 sm:col-span-2 md:col-span-1"
          >
            <div className="flex items-center space-x-2">
              <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                GiftStore
              </span>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base">
              Creating moments of joy through thoughtfully curated gifts for every special occasion.
            </p>
            <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
              <span>for gift lovers</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="font-semibold text-base sm:text-lg">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-muted-foreground text-sm sm:text-base">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Gift Cards</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Bulk Orders</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Corporate Gifts</a></li>
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="font-semibold text-base sm:text-lg">Categories</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-muted-foreground text-sm sm:text-base">
              <li><a href="#" className="hover:text-primary transition-colors">For Her</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">For Him</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">For Couples</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">For Kids</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="font-semibold text-base sm:text-lg">Get in Touch</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">hello@giftstore.com</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Mumbai, India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-muted-foreground text-xs sm:text-sm"
        >
          <p className="px-2">© 2024 GiftStore. All rights reserved. | Privacy Policy | Terms of Service</p>
          <p className="mt-2 px-2">
            Order through WhatsApp for quick and easy gifting experience.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}