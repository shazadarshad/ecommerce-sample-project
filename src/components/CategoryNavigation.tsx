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
    <div       className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200/50 dark:border-dark-border shadow-sm mb-6 transition-colors duration-300">
        <h3 className="text-lg font-bold text-dark-navy dark:text-gray-100 mb-4 transition-colors duration-300">Categories</h3>
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
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-50 dark:bg-dark-border text-dark-navy dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-dark-border/80 border border-transparent hover:border-gray-200 dark:hover:border-dark-border transition-colors duration-300'
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

