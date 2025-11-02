'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/types';

interface ProductFiltersProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
}

export default function ProductFilters({
  products,
  onFilterChange,
}: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const maxPrice = Math.max(...products.map((p) => p.price));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

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
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    onFilterChange(filtered);
  };

  // Auto-filter on change
  useEffect(() => {
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
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    onFilterChange(filtered);
  }, [searchTerm, selectedCategory, priceRange, products, onFilterChange]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceRange([0, maxPrice]);
    onFilterChange(products);
  };

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:border-purple-accent transition-all duration-300"
          />
          {searchTerm && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-full border-2 border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
        {(selectedCategory !== 'All' || priceRange[1] < maxPrice || searchTerm) && (
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-red-500/20 backdrop-blur-md text-white rounded-full border-2 border-red-500/30 hover:bg-red-500/30 transition-all duration-300"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 mb-6 border border-white/20 backdrop-blur-xl"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-light-blue to-purple-accent text-white'
                          : 'bg-white/10 text-white/80 hover:bg-white/20'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) =>
                      handlePriceChange(priceRange[0], Number(e.target.value))
                    }
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-accent"
                    style={{
                      background: `linear-gradient(to right, #A855F7 0%, #A855F7 ${(priceRange[1] / maxPrice) * 100}%, rgba(255,255,255,0.2) ${(priceRange[1] / maxPrice) * 100}%, rgba(255,255,255,0.2) 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-white/60 text-sm">
                    <span>$0</span>
                    <span>${maxPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

