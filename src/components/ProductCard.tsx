'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { formatCurrency } from '@/utils/formatCurrency';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export default function ProductCard({
  product,
  onProductClick,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-200/50 transition-all duration-300 cursor-pointer"
      onClick={() => onProductClick(product)}
    >
      {/* Image Container */}
      <div className="relative h-64 w-full bg-gradient-to-br from-light-blue/20 to-purple-accent/20 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full border border-gray-200 shadow-lg">
          <span className="text-xs font-semibold text-dark-navy">{product.category}</span>
        </div>

        {/* Quick Add Button (shows on hover) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onProductClick(product);
            }}
            className="px-6 py-2 bg-gradient-to-r from-light-blue to-purple-accent text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Quick View
          </button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-dark-navy mb-2 line-clamp-2 group-hover:text-purple-accent transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.shortDescription || product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-light-blue to-purple-accent bg-clip-text text-transparent">
            {formatCurrency(product.price)}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onProductClick(product);
            }}
            className="px-5 py-2 bg-gradient-to-r from-light-blue to-purple-accent text-white rounded-lg font-semibold hover:shadow-lg transition-shadow duration-200 text-sm"
          >
            View Details
          </motion.button>
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
    </motion.div>
  );
}
