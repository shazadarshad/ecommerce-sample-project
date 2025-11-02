'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, Plus, Minus, Check, Truck, Shield, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { useCartStore } from '@/lib/store';
import { formatCurrency } from '@/utils/formatCurrency';
import toast from 'react-hot-toast';

export default function HeroSection() {
  // Get featured product (first product)
  const featuredProduct = products[0];
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(featuredProduct, quantity);
    toast.success(
      `${quantity} ${featuredProduct.name}${quantity > 1 ? ' items' : ''} added to cart!`,
      {
        icon: '🛒',
        duration: 3000,
      }
    );
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gray-bg/50 dark:bg-dark-bg overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-dark-bg dark:via-dark-card dark:to-dark-bg"></div>

      <div className="max-w-7xl mx-auto container-padding relative z-10 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full border border-primary/20 dark:border-primary/30">
              <span className="text-xs font-semibold text-primary dark:text-light-blue">BESTSELLER</span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark-navy dark:text-gray-100 leading-tight">
              {featuredProduct.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-dark-navy dark:text-gray-100">4.8</span> (1,234 reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl md:text-5xl font-bold text-dark-navy dark:text-gray-100">
                {formatCurrency(featuredProduct.price)}
              </span>
              <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                {formatCurrency(featuredProduct.price * 1.2)}
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold">
                Save 17%
              </span>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
              {featuredProduct.description}
            </p>

            {/* Key Features */}
            <div className="space-y-2">
              {[
                'Active Noise Cancellation',
                '30-Hour Battery Life',
                'Premium Sound Quality',
                'Comfortable Design'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-semibold text-dark-navy dark:text-gray-100">
                Quantity:
              </label>
              <div className="flex items-center gap-2 border-2 border-gray-200 dark:border-dark-border rounded-lg overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-4 py-2 bg-gray-100 dark:bg-dark-border hover:bg-gray-200 dark:hover:bg-dark-border/80 transition-colors duration-200"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4 text-dark-navy dark:text-gray-100" />
                </button>
                <span className="px-6 py-2 text-lg font-semibold text-dark-navy dark:text-gray-100 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-4 py-2 bg-gray-100 dark:bg-dark-border hover:bg-gray-200 dark:hover:bg-dark-border/80 transition-colors duration-200"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4 text-dark-navy dark:text-gray-100" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-lg transition-all duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>
              <Link
                href={`/products/${featuredProduct.id}`}
                className="flex-1 px-8 py-4 bg-white dark:bg-dark-card border-2 border-gray-300 dark:border-dark-border text-dark-navy dark:text-gray-100 rounded-lg font-semibold text-lg text-center hover:border-primary dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-200 flex items-center justify-center gap-2"
              >
                View Details
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-200 dark:border-dark-border">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-700 dark:text-gray-300">30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Secure Payment</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Product Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden bg-white dark:bg-dark-card shadow-2xl border border-gray-200 dark:border-dark-border"
          >
            <Image
              src={featuredProduct.image}
              alt={featuredProduct.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Sale Badge */}
            <div className="absolute top-6 left-6 px-4 py-2 bg-accent text-white rounded-full text-sm font-bold shadow-lg">
              Sale 17% Off
            </div>
            {/* New Badge */}
            <div className="absolute top-6 right-6 px-4 py-2 bg-primary text-white rounded-full text-sm font-bold shadow-lg">
              New
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
