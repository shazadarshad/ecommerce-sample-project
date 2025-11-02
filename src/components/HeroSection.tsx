'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-navy via-dark-navy to-purple-accent/20 dark:from-dark-bg dark:via-dark-card dark:to-purple-accent/10 transition-colors duration-500">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-20 w-72 h-72 sm:w-96 sm:h-96 bg-light-blue rounded-full blur-3xl dark:opacity-30"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-20 right-20 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-purple-accent rounded-full blur-3xl dark:opacity-30"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Glassmorphic Card with Better Contrast */}
          <div className="bg-white/95 dark:bg-dark-card/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border-2 border-white/50 dark:border-dark-border/50 transition-colors duration-300">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block mb-4 sm:mb-6"
            >
              <div className="p-3 sm:p-4 bg-gradient-to-br from-light-blue/20 to-purple-accent/20 dark:from-light-blue/30 dark:to-purple-accent/30 rounded-xl sm:rounded-2xl inline-block transition-colors duration-300">
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-purple-accent" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6"
            >
              <span className="block text-dark-navy dark:text-gray-100 mb-2 transition-colors duration-300">Welcome to</span>
              <span className="block bg-gradient-to-r from-light-blue via-purple-accent to-light-blue bg-clip-text text-transparent">
                Zenva Store
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 font-light leading-relaxed px-2 transition-colors duration-300"
            >
              Discover Premium Products with Unmatched Quality
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            >
                <Link
                  href="/products"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-light-blue to-purple-accent text-white rounded-full font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 w-full sm:w-auto text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Shop Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-accent to-light-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>

              <Link
                href="#about"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-dark-card border-2 border-gray-300 dark:border-dark-border text-dark-navy dark:text-gray-100 rounded-full font-semibold text-base sm:text-lg hover:border-purple-accent dark:hover:border-light-blue hover:bg-purple-accent/5 dark:hover:bg-purple-accent/10 transition-all duration-300 hover:shadow-lg w-full sm:w-auto text-center"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/80 dark:border-gray-400/80 rounded-full flex justify-center bg-white/10 dark:bg-dark-card/30 backdrop-blur-md"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white dark:bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
