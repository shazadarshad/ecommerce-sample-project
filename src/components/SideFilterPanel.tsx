'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, Search, SlidersHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { products } from '@/data/products';
import type { Product } from '@/types';

interface SideFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filteredProducts: Product[]) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function SideFilterPanel({
  isOpen,
  onClose,
  onFilterChange,
  selectedCategory,
  onCategoryChange,
}: SideFilterPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('default');

  const maxPrice = Math.max(...products.map((p) => p.price));
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  const handleFilter = () => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    onFilterChange(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    onCategoryChange('All');
    setPriceRange([0, maxPrice]);
    setSortBy('default');
    onFilterChange(products);
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-full max-w-sm bg-white dark:bg-dark-card shadow-2xl z-50 overflow-y-auto border-r border-gray-200 dark:border-dark-border transition-colors duration-300"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border p-6 z-10 transition-colors duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-light-blue/20 to-purple-accent/20 rounded-lg">
                    <Filter className="w-5 h-5 text-purple-accent" />
                  </div>
                  <h2 className="text-xl font-bold text-dark-navy dark:text-gray-100 transition-colors duration-300">Filters</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-dark-navy dark:text-gray-100 transition-colors duration-300" />
                </motion.button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-dark-navy placeholder-gray-400 focus:outline-none focus:border-purple-accent focus:bg-white transition-colors"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-dark-navy"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Content */}
            <div className="p-6 space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="text-lg font-bold text-dark-navy dark:text-gray-100 mb-4 flex items-center gap-2 transition-colors duration-300">
                  <SlidersHorizontal className="w-5 h-5 text-primary" />
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => onCategoryChange(category)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-gray-50 dark:bg-dark-border text-dark-navy dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-dark-border/80 border border-transparent hover:border-gray-200 dark:hover:border-dark-border'
                      }`}
                    >
                      <span className="font-semibold">{category}</span>
                      {selectedCategory === category && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-lg font-bold text-dark-navy mb-4">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-accent"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    <span>$0</span>
                    <span>${maxPrice}</span>
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="text-lg font-bold text-dark-navy dark:text-gray-100 mb-4 transition-colors duration-300">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-border border-2 border-gray-200 dark:border-dark-border rounded-xl text-dark-navy dark:text-gray-100 focus:outline-none focus:border-primary dark:focus:border-primary focus:bg-white dark:focus:bg-dark-card transition-colors"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* Clear Filters */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearFilters}
                className="w-full py-3 bg-gray-100 dark:bg-dark-border text-dark-navy dark:text-gray-100 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-dark-border/80 transition-colors border border-gray-200 dark:border-dark-border"
              >
                Clear All Filters
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

