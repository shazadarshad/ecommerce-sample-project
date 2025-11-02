'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  Truck,
  RotateCcw,
  CreditCard,
  Star,
  Award,
} from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '256-bit SSL encryption',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $100',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
  {
    icon: CreditCard,
    title: 'Multiple Payment',
    description: 'All major cards accepted',
  },
  {
    icon: Star,
    title: 'Premium Quality',
    description: 'Hand-picked products',
  },
  {
    icon: Award,
    title: 'Customer Support',
    description: '24/7 assistance',
  },
];

export default function TrustBadgesSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark-navy">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're committed to providing the best shopping experience
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 text-center group"
              >
                <div className="bg-gradient-to-br from-light-blue/20 to-purple-accent/20 rounded-xl p-4 w-fit mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-purple-accent" />
                </div>
                <h3 className="font-bold text-dark-navy text-sm mb-1">
                  {badge.title}
                </h3>
                <p className="text-xs text-gray-600">{badge.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

