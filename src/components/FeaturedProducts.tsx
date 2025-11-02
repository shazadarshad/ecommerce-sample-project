'use client';

import { motion } from 'framer-motion';
import { Star, TrendingUp } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import type { Product } from '@/types';

interface FeaturedProductsProps {
  onProductClick: (product: Product) => void;
}

export default function FeaturedProducts({
  onProductClick,
}: FeaturedProductsProps) {
  // Get featured products (first 4 products or top-rated)
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-blue/5 via-purple-accent/5 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-light-blue/20 to-purple-accent/20 rounded-full border border-white/20 backdrop-blur-md">
            <TrendingUp className="w-5 h-5 text-purple-accent" />
            <span className="text-sm font-semibold text-dark-navy">
              Featured Products
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-light-blue to-purple-accent bg-clip-text text-transparent">
            Best Sellers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular products, loved by thousands of customers
          </p>
        </motion.div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative">
                {/* Featured Badge */}
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Star className="w-3 h-3 fill-white" />
                  Featured
                </div>
                <ProductCard
                  product={product}
                  onProductClick={onProductClick}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

