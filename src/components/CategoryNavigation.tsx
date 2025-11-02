'use client';

import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { useState } from 'react';

interface CategoryNavigationProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

export default function CategoryNavigation({
  onCategorySelect,
  selectedCategory,
}: CategoryNavigationProps) {
  const categories = [
    'All',
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'electronics':
        return '📱';
      case 'clothing':
        return '👕';
      case 'accessories':
        return '🎒';
      case 'sports':
        return '⚽';
      case 'home':
        return '🏠';
      default:
        return '🛍️';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm mb-6">
      <h3 className="text-lg font-bold text-dark-navy mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onCategorySelect(category)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-light-blue to-purple-accent text-white shadow-lg'
                : 'bg-gray-50 text-dark-navy hover:bg-gray-100 border border-transparent hover:border-gray-200'
            }`}
          >
            <span className="text-2xl">{getCategoryIcon(category)}</span>
            <span className="font-semibold flex-1 text-left">{category}</span>
            {selectedCategory === category && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2 h-2 bg-white rounded-full"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

