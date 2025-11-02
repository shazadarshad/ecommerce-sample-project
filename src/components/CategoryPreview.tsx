'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import type { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

interface CategoryPreviewProps {
  category: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  onProductClick?: (product: Product) => void;
}

export default function CategoryPreview({
  category,
  title,
  description,
  icon,
  image,
  onProductClick = () => {},
}: CategoryPreviewProps) {
  // Get first 3 products from this category
  const categoryProducts = products
    .filter((p) => p.category === category)
    .slice(0, 3);

  if (categoryProducts.length === 0) return null;

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-blue/5 via-purple-accent/5 to-transparent dark:from-transparent dark:via-transparent"></div>

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white dark:bg-dark-card rounded-full border border-gray-200/50 dark:border-dark-border shadow-sm">
            <span className="text-2xl">{icon}</span>
            <span className="text-sm font-semibold text-dark-navy dark:text-gray-100">
              {category}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-dark-navy dark:text-gray-100">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

          {/* Products Grid - Show 3 products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categoryProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onProductClick={onProductClick}
              />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href={`/products/${category.toLowerCase()}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:shadow-lg hover:bg-primary/90 transition-all duration-200 group"
          >
            <span>View All {category} Products</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

