'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCartStore } from '@/lib/store';
import toast from 'react-hot-toast';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotal = useCartStore((state) => state.getTotal);

  const handleQuantityChange = (id: number, delta: number) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity > 0) {
        updateQuantity(id, newQuantity);
        toast.success(`Updated ${item.name} quantity`, {
          icon: '✓',
          duration: 2000,
        });
      } else {
        removeItem(id);
        toast.success(`${item.name} removed from cart`, {
          icon: '🗑️',
          duration: 2000,
        });
      }
    }
  };

  const handleRemoveItem = (id: number) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      removeItem(id);
      toast.success(`${item.name} removed from cart`, {
        icon: '🗑️',
        duration: 2000,
      });
    }
  };

  const handleClearCart = () => {
    if (items.length > 0) {
      clearCart();
      toast.success('Cart cleared', {
        icon: '🗑️',
        duration: 2000,
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white/95 backdrop-blur-xl shadow-2xl z-50 flex flex-col border-l border-white/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-light-blue/10 to-purple-accent/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-light-blue/20 to-purple-accent/20 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-purple-accent" />
                </div>
                <h2 className="text-2xl font-bold text-dark-navy">
                  Shopping Cart
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 bg-white/80 backdrop-blur-md hover:bg-red-50 rounded-lg transition-colors duration-200 border border-gray-200"
              >
                <X className="w-6 h-6 text-dark-navy hover:text-red-500 transition-colors" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-light-bg/30">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <div className="p-6 bg-gradient-to-br from-light-blue/20 to-purple-accent/20 rounded-full mb-4">
                      <ShoppingBag className="w-16 h-16 text-purple-accent" />
                    </div>
                  </motion.div>
                  <p className="text-xl font-bold text-dark-navy mb-2">
                    Your cart is empty
                  </p>
                  <p className="text-gray-500 mb-6">
                    Start adding items to your cart
                  </p>
                <Link
                  href="/products"
                    onClick={onClose}
                    className="px-6 py-3 bg-gradient-to-r from-light-blue to-purple-accent text-white rounded-lg font-semibold hover:shadow-lg transition-shadow duration-200"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 p-4 bg-white/80 backdrop-blur-md rounded-xl border border-white/30 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="relative w-20 h-20 bg-gradient-to-br from-light-blue/20 to-purple-accent/20 rounded-xl overflow-hidden flex-shrink-0 border border-white/30">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-dark-navy truncate mb-1 group-hover:text-purple-accent transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-purple-accent font-semibold mb-3">
                          {formatCurrency(item.price)}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-gradient-to-r from-light-blue/10 to-purple-accent/10 rounded-lg border border-white/30">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="p-2 hover:bg-white/50 transition-colors duration-200 rounded-l-lg"
                            >
                              <Minus className="w-4 h-4 text-dark-navy" />
                            </motion.button>
                            <span className="px-3 py-2 font-semibold text-dark-navy min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="p-2 hover:bg-white/50 transition-colors duration-200 rounded-r-lg"
                            >
                              <Plus className="w-4 h-4 text-dark-navy" />
                            </motion.button>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          Subtotal:{' '}
                          <span className="font-semibold text-dark-navy">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-light-blue/5 to-purple-accent/5 space-y-4">
                <div className="flex items-center justify-between text-lg bg-white/60 backdrop-blur-md rounded-xl p-4 border border-white/30">
                  <span className="font-semibold text-dark-navy flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-accent" />
                    Total:
                  </span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-light-blue to-purple-accent bg-clip-text text-transparent">
                    {formatCurrency(getTotal())}
                  </span>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClearCart}
                    className="flex-1 py-3 border-2 border-red-500/50 text-red-500 rounded-xl font-semibold hover:bg-red-50 transition-colors duration-200 backdrop-blur-md bg-white/60"
                  >
                    Clear Cart
                  </motion.button>
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="flex-1 py-3 bg-gradient-to-r from-light-blue to-purple-accent text-white rounded-xl font-semibold text-center hover:shadow-lg transition-shadow duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Checkout</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
