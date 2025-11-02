'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useTheme } from '@/lib/theme';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-dark-card/95 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-dark-border'
          : 'bg-dark-navy/95 dark:bg-dark-card/95 backdrop-blur-xl'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-light-blue to-purple-accent bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
          >
            Zenva Store
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative group font-medium transition-colors duration-200 ${
                  scrolled
                    ? 'text-dark-navy dark:text-gray-100 hover:text-purple-accent dark:hover:text-light-blue'
                    : 'text-white/90 dark:text-gray-100 hover:text-light-blue dark:hover:text-purple-accent'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-light-blue to-purple-accent group-hover:w-full transition-all duration-300 ${
                    !scrolled && 'bg-white/80 dark:bg-purple-accent'
                  }`}
                ></span>
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                scrolled
                  ? 'text-dark-navy dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-dark-border'
                  : 'text-white dark:text-gray-100 hover:bg-white/10 dark:hover:bg-dark-border'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            <Link
              href="/cart"
              className={`relative p-2 rounded-lg transition-all duration-200 group ${
                scrolled
                  ? 'hover:bg-gray-100 dark:hover:bg-dark-border text-dark-navy dark:text-gray-100'
                  : 'hover:bg-white/10 dark:hover:bg-dark-border text-white dark:text-gray-100'
              }`}
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-purple-accent dark:group-hover:text-light-blue transition-colors" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute -top-1 -right-1 font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-lg ${
                    scrolled
                      ? 'bg-purple-accent dark:bg-light-blue text-white'
                      : 'bg-light-blue dark:bg-purple-accent text-dark-navy dark:text-white'
                  }`}
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors duration-200 text-white dark:text-gray-100 hover:bg-white/10 dark:hover:bg-dark-border"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>
            <button
              className="p-2 rounded-lg transition-colors duration-200 text-white dark:text-gray-100 hover:bg-white/10 dark:hover:bg-dark-border"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden mt-4 pb-4 space-y-3 rounded-xl p-4 border transition-colors duration-300 ${
              scrolled
                ? 'bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border'
                : 'bg-white/10 dark:bg-dark-card/50 backdrop-blur-md border-white/10 dark:border-dark-border'
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`block py-2 transition-colors duration-200 ${
                  scrolled
                    ? 'text-dark-navy dark:text-gray-100 hover:text-purple-accent dark:hover:text-light-blue'
                    : 'text-white dark:text-gray-100 hover:text-light-blue dark:hover:text-purple-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className={`block py-2 transition-colors duration-200 flex items-center gap-2 ${
                scrolled
                  ? 'text-dark-navy dark:text-gray-100 hover:text-purple-accent dark:hover:text-light-blue'
                  : 'text-white dark:text-gray-100 hover:text-light-blue dark:hover:text-purple-accent'
              }`}
            >
              Cart
              {itemCount > 0 && (
                <span className={`font-bold rounded-full px-2 py-1 text-xs ${
                  scrolled
                    ? 'bg-purple-accent dark:bg-light-blue text-white'
                    : 'bg-light-blue dark:bg-purple-accent text-dark-navy dark:text-white'
                }`}>
                  {itemCount}
                </span>
              )}
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
