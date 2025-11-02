'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart, Star, Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCartStore } from '@/lib/store';
import type { Product } from '@/types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    onClose();
    setQuantity(1);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-md rounded-full p-3 shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 group"
              >
                <X className="w-5 h-5 text-dark-navy group-hover:text-red-500 transition-colors" />
              </button>

              {/* Favorite Button */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md rounded-full p-3 shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isFavorite
                      ? 'text-red-500 fill-red-500'
                      : 'text-gray-400 hover:text-red-500'
                  }`}
                />
              </button>

              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Product Image */}
                <div className="relative h-96 w-full bg-gradient-to-br from-light-blue/20 to-purple-accent/20 rounded-2xl overflow-hidden group">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Image Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Rating Stars */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-lg px-3 py-2 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="ml-2 text-sm font-semibold text-dark-navy">4.9</span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-purple-accent/10 text-purple-accent rounded-full text-sm font-semibold inline-block mb-3">
                        {product.category}
                      </span>
                    </div>
                    <h2 className="text-4xl font-bold text-dark-navy mb-4">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6 p-4 bg-gradient-to-r from-light-blue/10 to-purple-accent/10 rounded-xl border border-white/30">
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-accent rounded-full"></span>
                          Premium Quality Material
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-accent rounded-full"></span>
                          Free Shipping Worldwide
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-accent rounded-full"></span>
                          30-Day Money Back Guarantee
                        </li>
                      </ul>
                    </div>

                    <div className="mb-6">
                      <div className="text-4xl font-bold bg-gradient-to-r from-light-blue to-purple-accent bg-clip-text text-transparent mb-2">
                        {formatCurrency(product.price)}
                      </div>
                      <p className="text-sm text-gray-500">
                        Taxes included. Shipping calculated at checkout.
                      </p>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-dark-navy mb-3">
                      Quantity
                    </label>
                    <div className="flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleQuantityChange(-1)}
                        className="p-3 bg-gradient-to-br from-light-blue/20 to-purple-accent/20 rounded-xl hover:from-light-blue/30 hover:to-purple-accent/30 transition-all duration-200 border border-white/30"
                      >
                        <Minus className="w-5 h-5 text-dark-navy" />
                      </motion.button>
                      <span className="text-2xl font-bold w-16 text-center bg-gradient-to-r from-light-blue/10 to-purple-accent/10 rounded-xl py-2">
                        {quantity}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleQuantityChange(1)}
                        className="p-3 bg-gradient-to-br from-light-blue/20 to-purple-accent/20 rounded-xl hover:from-light-blue/30 hover:to-purple-accent/30 transition-all duration-200 border border-white/30"
                      >
                        <Plus className="w-5 h-5 text-dark-navy" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-gradient-to-r from-light-blue to-purple-accent text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart - {formatCurrency(product.price * quantity)}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-accent to-light-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
