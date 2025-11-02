'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatCurrency } from '@/utils/formatCurrency';

export default function CartPage() {
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
      } else {
        removeItem(id);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-dark-navy" />
          </Link>
          <h1 className="text-3xl font-bold text-dark-navy">Shopping Cart</h1>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-dark-navy mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Start adding items to your cart to see them here
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:shadow-lg hover:bg-primary/90 transition-all duration-200"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 bg-white rounded-lg shadow-md"
                >
                  <div className="relative w-24 h-24 bg-light-bg rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-dark-navy mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-purple-accent font-semibold mb-3">
                      {formatCurrency(item.price)}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-light-bg rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="p-2 hover:bg-gray-200 transition-colors duration-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="p-2 hover:bg-gray-200 transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
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

            {/* Order Summary */}
            <div className="md:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-md p-6 sticky top-24"
              >
                <h2 className="text-xl font-bold text-dark-navy mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(getTotal())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-purple-accent">Free</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold text-dark-navy">
                    <span>Total</span>
                    <span className="text-purple-accent">
                      {formatCurrency(getTotal())}
                    </span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full py-3 bg-primary text-white rounded-lg font-semibold text-center hover:shadow-lg hover:bg-primary/90 transition-all duration-200 mb-3"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full py-3 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-200"
                >
                  Clear Cart
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

