'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { formatCurrency } from '@/utils/formatCurrency';
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
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onProductClick(product)}
    >
      <div className="relative h-64 w-full bg-light-bg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-dark-navy mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.shortDescription || product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-purple-accent">
            {formatCurrency(product.price)}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onProductClick(product);
            }}
            className="px-4 py-2 bg-gradient-to-r from-light-blue to-purple-accent text-white rounded-lg font-semibold hover:shadow-lg transition-shadow duration-200"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

