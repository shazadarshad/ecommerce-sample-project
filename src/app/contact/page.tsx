'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ContactSection from '@/components/ContactSection';
import NewsletterSection from '@/components/NewsletterSection';
import { ArrowLeft } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-bg/30 dark:bg-dark-bg/50 transition-colors duration-300">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto container-padding pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-light-blue transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>

      {/* Contact Section */}
      <ContactSection />

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}

