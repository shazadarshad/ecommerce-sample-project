'use client';

import { motion } from 'framer-motion';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const offers = [
  {
    id: 1,
    title: 'Flash Sale',
    subtitle: 'Up to 50% Off',
    description: 'Limited time offer on selected electronics',
    discount: '50%',
    color: 'from-red-500 to-orange-500',
    bgColor: 'from-red-500/10 to-orange-500/10',
    textColor: 'text-red-600',
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Free Shipping',
    description: 'On all orders over $100',
    discount: 'FREE',
    color: 'from-purple-accent to-light-blue',
    bgColor: 'from-purple-accent/10 to-light-blue/10',
    textColor: 'text-purple-accent',
  },
  {
    id: 3,
    title: 'Weekend Special',
    subtitle: 'Buy 2 Get 1',
    description: 'On clothing & accessories',
    discount: 'B2G1',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-500/10 to-emerald-500/10',
    textColor: 'text-green-600',
  },
];

export default function OffersSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-blue/5 via-purple-accent/5 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-light-blue/20 to-purple-accent/20 rounded-full border border-white/20 backdrop-blur-md">
            <Tag className="w-5 h-5 text-purple-accent" />
            <span className="text-sm font-semibold text-dark-navy">
              Special Offers
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-light-blue to-purple-accent bg-clip-text text-transparent">
            Exclusive Deals & Offers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't miss out on our amazing promotions and limited-time offers
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${offer.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/20 to-transparent rounded-full -ml-12 -mb-12"></div>

              <div className="relative z-10">
                {/* Discount Badge */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-block px-4 py-2 bg-gradient-to-r ${offer.color} text-white rounded-full text-sm font-bold mb-4 shadow-lg`}
                >
                  {offer.discount} OFF
                </motion.div>

                <h3 className="text-2xl font-bold text-dark-navy mb-2 group-hover:text-purple-accent transition-colors">
                  {offer.title}
                </h3>
                <p className={`text-lg font-semibold mb-2 ${offer.textColor}`}>
                  {offer.subtitle}
                </p>
                <p className="text-gray-600 mb-6">{offer.description}</p>

                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:shadow-lg hover:bg-primary/90 transition-all duration-300 group/link"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Sparkle Icon */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <Sparkles className={`w-8 h-8 ${offer.textColor}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

