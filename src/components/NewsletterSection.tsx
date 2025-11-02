'use client';

import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-blue/10 via-purple-accent/10 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/5 via-transparent to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-light-blue/20 to-purple-accent/20 rounded-3xl p-8 md:p-12 border border-white/30 backdrop-blur-xl shadow-2xl">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg">
                <Mail className="w-8 h-8 text-purple-accent" />
              </div>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-dark-navy mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Subscribe to our newsletter and get exclusive deals, new product
              launches, and special offers delivered straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl text-dark-navy placeholder-gray-400 focus:outline-none focus:border-purple-accent transition-colors shadow-sm"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-light-blue to-purple-accent text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow duration-200"
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Subscribe
                  </>
                )}
              </motion.button>
            </form>

            {submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-green-600 font-semibold flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Thank you for subscribing!
              </motion.p>
            )}

            <p className="text-sm text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

