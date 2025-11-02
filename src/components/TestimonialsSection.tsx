'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Tech Enthusiast',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    rating: 5,
    text: 'Amazing quality products and excellent customer service! The shipping was fast and the items exceeded my expectations.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Fashion Blogger',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 5,
    text: 'I love the modern design and premium quality of the products. The shopping experience is smooth and enjoyable.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Lifestyle Influencer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 5,
    text: 'Best online store I\'ve shopped at! Great selection, fair prices, and everything arrives perfectly packaged.',
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Entrepreneur',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    rating: 5,
    text: 'Premium quality products with a professional shopping experience. Highly recommend to everyone!',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-accent/5 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-light-blue to-purple-accent bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <Quote className="w-12 h-12 text-purple-accent" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 relative z-10 italic">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-dark-navy">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              {/* Decorative Gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-light-blue via-purple-accent to-light-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

