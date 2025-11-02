'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const itemCount = useCartStore((state) => state.getItemCount());
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
    { href: '#products', label: 'Products' },
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
          ? 'bg-dark-navy/95 backdrop-blur-xl shadow-lg'
          : 'bg-dark-navy/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-light-blue to-purple-accent bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
          >
            Zenva Store
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-white/90 hover:text-light-blue transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-light-blue to-purple-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group"
            >
              <ShoppingCart className="w-6 h-6 text-white group-hover:text-light-blue transition-colors" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-purple-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 space-y-3 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block py-2 text-white hover:text-light-blue transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="block py-2 text-white hover:text-light-blue transition-colors duration-200 flex items-center gap-2"
            >
              Cart
              {itemCount > 0 && (
                <span className="bg-purple-accent text-white text-xs font-bold rounded-full px-2 py-1">
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
