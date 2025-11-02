'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import CartDrawer from '@/components/CartDrawer';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import ProductFilters from '@/components/ProductFilters';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import { products } from '@/data/products';
import type { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const itemCount = useCartStore((state) => state.getItemCount());

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
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

      {/* Featured Products Section */}
      <FeaturedProducts onProductClick={handleProductClick} />

      {/* Products Section */}
      <section id="products" className="py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-light-blue/5 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-light-blue to-purple-accent bg-clip-text text-transparent">
              All Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our complete collection of premium products
            </p>
          </motion.div>

          {/* Filters */}
          <ProductFilters
            products={products}
            onFilterChange={setFilteredProducts}
          />

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="bg-white rounded-3xl p-12 border border-gray-200/50 max-w-md mx-auto shadow-lg">
                <p className="text-2xl font-bold text-dark-navy mb-2">
                  No Products Found
                </p>
                <p className="text-gray-600">
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
            className="text-center mt-8 text-gray-600"
          >
            Showing {filteredProducts.length} of {products.length} products
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />

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
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse"
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
