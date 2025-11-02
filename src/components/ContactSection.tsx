'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-light-blue/10 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-light-blue to-purple-accent bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a question? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-light-blue/20 to-purple-accent/20 rounded-lg p-3">
                  <Mail className="w-6 h-6 text-purple-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-dark-navy mb-1">Email</h3>
                  <p className="text-gray-600">hello@zenvastore.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-light-blue/20 to-purple-accent/20 rounded-lg p-3">
                  <Phone className="w-6 h-6 text-purple-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-dark-navy mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-light-blue/20 to-purple-accent/20 rounded-lg p-3">
                  <MapPin className="w-6 h-6 text-purple-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-dark-navy mb-1">Address</h3>
                  <p className="text-gray-600">
                    123 Commerce Street<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-dark-navy font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-lg focus:outline-none focus:border-purple-accent transition-colors duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-dark-navy font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-lg focus:outline-none focus:border-purple-accent transition-colors duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-dark-navy font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-lg focus:outline-none focus:border-purple-accent transition-colors duration-300 resize-none"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-light-blue to-purple-accent text-white rounded-lg font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-shadow duration-200"
              >
                <Send className="w-5 h-5" />
                {submitted ? 'Message Sent!' : 'Send Message'}
              </motion.button>

              {submitted && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-green-500 font-semibold"
                >
                  Thank you! We'll get back to you soon.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

