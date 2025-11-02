'use client';

import Link from 'next/link';
import { Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative bg-dark-navy text-white mt-auto overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-accent/10 via-transparent to-transparent"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-light-blue to-purple-accent bg-clip-text text-transparent">
              Zenva Digitals
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Building modern, responsive web experiences with cutting-edge
              technology and premium quality.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/shazad.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 border border-white/20"
              >
                <Instagram className="w-5 h-5 text-light-blue" />
              </a>
              <a
                href="https://instagram.com/zenvadigitals"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 border border-white/20"
              >
                <Instagram className="w-5 h-5 text-purple-accent" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-light-blue transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-light-blue rounded-full"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#products"
                  className="hover:text-light-blue transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-light-blue rounded-full"></span>
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="hover:text-light-blue transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-light-blue rounded-full"></span>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-light-blue transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-light-blue rounded-full"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/cart"
                  className="hover:text-light-blue transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-light-blue rounded-full"></span>
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="hover:text-light-blue transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-light-blue rounded-full"></span>
                  Checkout
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-light-blue mt-0.5 flex-shrink-0" />
                <span>hello@zenvastore.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-light-blue mt-0.5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-light-blue mt-0.5 flex-shrink-0" />
                <span>123 Commerce St, New York, NY 10001</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Made with{' '}
              <Heart className="w-4 h-4 inline text-red-500 fill-red-500" />{' '}
              by{' '}
              <span className="text-light-blue font-semibold">
                Shazad Arshad
              </span>{' '}
              |{' '}
              <span className="text-purple-accent font-semibold">
                Zenva Digitals
              </span>
            </p>
            <div className="flex gap-4 text-sm text-gray-400">
              <Link
                href="https://instagram.com/shazad.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-light-blue transition-colors"
              >
                @shazad.ar
              </Link>
              <span>|</span>
              <Link
                href="https://instagram.com/zenvadigitals"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-accent transition-colors"
              >
                @zenvadigitals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
