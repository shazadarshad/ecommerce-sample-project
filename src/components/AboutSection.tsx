'use client';

import { motion } from 'framer-motion';
import { Award, Users, Globe, Heart } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Curated selection of high-quality products',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Dedicated to providing exceptional customer experience',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving customers worldwide with fast shipping',
    },
    {
      icon: Heart,
      title: 'Ethical Values',
      description: 'Committed to sustainability and ethical practices',
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-accent/10 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-light-blue to-purple-accent bg-clip-text text-transparent">
            About Zenva Store
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a modern e-commerce platform dedicated to bringing you the
            best products with an exceptional shopping experience.
          </p>
        </motion.div>

        {/* Glassmorphic Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 group shadow-sm"
              >
                <div className="bg-gradient-to-br from-light-blue/20 to-purple-accent/20 rounded-xl p-4 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-purple-accent" />
                </div>
                <h3 className="text-xl font-bold text-dark-navy mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200/50 max-w-4xl mx-auto shadow-lg"
        >
          <h3 className="text-3xl font-bold mb-6 text-dark-navy">
            Our Story
          </h3>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Founded with a vision to revolutionize online shopping, Zenva
              Store combines cutting-edge technology with a passion for quality.
              We carefully select each product in our collection to ensure it
              meets our high standards of excellence.
            </p>
            <p>
              Our team is dedicated to providing you with a seamless shopping
              experience, from browsing our catalog to receiving your order. We
              believe in transparency, quality, and customer satisfaction above
              all else.
            </p>
            <p>
              Join thousands of satisfied customers who trust Zenva Store for
              their shopping needs. We're here to serve you with the best
              products and an unforgettable experience.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

