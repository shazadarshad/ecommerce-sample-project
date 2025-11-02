'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-6 h-6 text-dark-navy" />
              </button>

              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Product Image */}
                <div className="relative h-96 w-full bg-light-bg rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-dark-navy mb-3">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-gray-500">Category:</span>
                      <span className="px-3 py-1 bg-purple-accent/10 text-purple-accent rounded-full text-sm font-semibold">
                        {product.category}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-purple-accent mb-6">
                      {formatCurrency(product.price)}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-dark-navy mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="p-2 bg-light-bg rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="text-xl font-semibold w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="p-2 bg-light-bg rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-gradient-to-r from-light-blue to-purple-accent text-white rounded-lg font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-shadow duration-200"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart - {formatCurrency(product.price * quantity)}
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

