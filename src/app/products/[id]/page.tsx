'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import { products } from '@/data/products';
import type { Product } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCartStore } from '@/lib/store';
import { ArrowLeft, Plus, Minus, ShoppingCart, Star, Heart, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);
  
  // Find the product
  const product = products.find((p) => p.id === productId);
  
  // Related products (same category, excluding current product)
  const relatedProducts = product
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const itemCount = useCartStore((state) => state.getItemCount());

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast.success(
        `${quantity} ${product.name}${quantity > 1 ? ' items' : ''} added to cart!`,
        {
          icon: '🛒',
          duration: 3000,
        }
      );
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  // If product not found, show error
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-bg/30 dark:bg-dark-bg/50 transition-colors duration-300 flex items-center justify-center">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-dark-card rounded-3xl p-12 border border-gray-200/50 dark:border-dark-border max-w-md mx-auto shadow-lg"
          >
            <h1 className="text-3xl font-bold text-dark-navy dark:text-gray-100 mb-4">
              Product Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The product you're looking for doesn't exist.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              View All Products
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-bg/30 dark:bg-dark-bg/50 transition-colors duration-300">
        <div className="section-spacing relative overflow-hidden">
          <div className="max-w-7xl mx-auto container-padding relative z-10">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 flex-wrap"
            >
              <Link
                href="/"
                className="hover:text-primary dark:hover:text-light-blue transition-colors duration-200"
              >
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href="/products"
                className="hover:text-primary dark:hover:text-light-blue transition-colors duration-200"
              >
                Products
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href={`/products/${product.category.toLowerCase()}`}
                className="hover:text-primary dark:hover:text-light-blue transition-colors duration-200"
              >
                {product.category}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-dark-navy dark:text-gray-100 font-semibold truncate max-w-xs">
                {product.name}
              </span>
            </motion.div>

            {/* Product Details */}
            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative h-96 lg:h-[600px] w-full bg-gradient-to-br from-light-blue/20 to-purple-accent/20 rounded-3xl overflow-hidden group border border-gray-200/50 dark:border-dark-border shadow-lg"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Favorite Button */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-6 right-6 z-10 bg-white dark:bg-dark-card rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-dark-border hover:scale-110 transition-all duration-200 group"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
                    } group-hover:text-red-500 transition-colors`}
                  />
                </button>
                {/* Rating Badge */}
                <div className="absolute bottom-6 left-6 z-10 px-4 py-2 bg-white dark:bg-dark-card backdrop-blur-md rounded-full border border-gray-200 dark:border-dark-border shadow-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-dark-navy dark:text-gray-100">
                    4.8
                  </span>
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col justify-center"
              >
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white dark:bg-dark-card rounded-full border border-gray-200/50 dark:border-dark-border shadow-sm w-fit">
                  <span className="text-sm font-semibold text-dark-navy dark:text-gray-100">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-dark-navy dark:text-gray-100 mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    (124 reviews)
                  </span>
                </div>

                <div className="text-5xl font-bold bg-gradient-to-r from-light-blue to-purple-accent bg-clip-text text-transparent mb-6">
                  {formatCurrency(product.price)}
                </div>

                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <div className="mb-8 p-6 bg-white dark:bg-dark-card rounded-2xl border border-gray-200/50 dark:border-dark-border shadow-sm">
                  <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Premium Quality Material
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Free Shipping Worldwide
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      30-Day Money Back Guarantee
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      24/7 Customer Support
                    </li>
                  </ul>
                </div>

                {/* Quantity Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-dark-navy dark:text-gray-100 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(-1)}
                      className="p-3 bg-gray-100 dark:bg-dark-border rounded-xl hover:bg-gray-200 dark:hover:bg-dark-border/80 transition-colors duration-200"
                    >
                      <Minus className="w-5 h-5 text-dark-navy dark:text-gray-100" />
                    </motion.button>
                    <span className="text-2xl font-semibold w-16 text-center text-dark-navy dark:text-gray-100">
                      {quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 bg-gray-100 dark:bg-dark-border rounded-xl hover:bg-gray-200 dark:hover:bg-dark-border/80 transition-colors duration-200"
                    >
                      <Plus className="w-5 h-5 text-dark-navy dark:text-gray-100" />
                    </motion.button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-primary text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:bg-primary/90 transition-all duration-200 mb-4"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart - {formatCurrency(product.price * quantity)}
                </motion.button>

                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Taxes included. Shipping calculated at checkout.
                </p>
              </motion.div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-20"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-dark-navy dark:text-gray-100 mb-8">
                  Related Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((relatedProduct) => (
                    <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        <ProductCard
                          product={relatedProduct}
                          onProductClick={() => {}}
                        />
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Cart Button (Mobile) */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        onClick={() => setIsCartOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 bg-primary text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-shadow duration-200"
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

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

