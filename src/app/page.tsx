'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import CartDrawer from '@/components/CartDrawer';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import OffersSection from '@/components/OffersSection';
import ProductFilters from '@/components/ProductFilters';
import SideFilterPanel from '@/components/SideFilterPanel';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsletterSection from '@/components/NewsletterSection';
import TrustBadgesSection from '@/components/TrustBadgesSection';
import ContactSection from '@/components/ContactSection';
import { ProductGridSkeleton } from '@/components/LoadingSkeleton';
import { products } from '@/data/products';
import type { Product } from '@/types';
import { ShoppingCart, Filter } from 'lucide-react';
import { useCartStore } from '@/lib/store';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const itemCount = useCartStore((state) => state.getItemCount());

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Offers Section */}
      <OffersSection />

      {/* Featured Products Section */}
      <FeaturedProducts onProductClick={handleProductClick} />

      {/* Trust Badges Section */}
      <TrustBadgesSection />

      {/* Products Section */}
      <section id="products" className="section-spacing relative overflow-hidden bg-gray-bg/30 dark:bg-dark-bg/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-dark-navy dark:text-gray-100">
              All Products
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Browse our complete collection of premium products
            </p>
          </motion.div>

          {/* Filter Toggle Button (Mobile/Tablet) */}
          <div className="mb-6 flex items-center justify-center md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-dark-card text-dark-navy dark:text-gray-100 rounded-xl border-2 border-gray-200 dark:border-dark-border hover:border-primary dark:hover:border-primary transition-all duration-200 shadow-sm"
            >
              <Filter className="w-5 h-5" />
              Filters
            </motion.button>
          </div>

          {/* Filters - Desktop */}
          <div className="hidden md:block mb-8">
            <ProductFilters
              products={products}
              onFilterChange={setFilteredProducts}
            />
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="bg-white dark:bg-dark-card rounded-3xl p-12 border border-gray-200/50 dark:border-dark-border max-w-md mx-auto shadow-lg">
                <p className="text-2xl font-bold text-dark-navy dark:text-gray-100 mb-2">
                  No Products Found
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filters to see more products.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard
                    product={product}
                    onProductClick={handleProductClick}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 text-gray-600 dark:text-gray-400 text-sm"
          >
            Showing <span className="font-semibold text-dark-navy dark:text-gray-100">{filteredProducts.length}</span> of{' '}
            <span className="font-semibold text-dark-navy dark:text-gray-100">{products.length}</span> products
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Side Filter Panel */}
      <SideFilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={setFilteredProducts}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Floating Cart Button (Mobile) */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        onClick={() => setIsCartOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 bg-gradient-to-r from-light-blue to-purple-accent text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-shadow duration-200"
      >
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse"
          >
            {itemCount}
          </motion.span>
        )}
      </motion.button>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
