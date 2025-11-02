import Link from 'next/link';
import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-navy text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-light-blue to-purple-accent bg-clip-text text-transparent">
              Zenva Digitals
            </h3>
            <p className="text-gray-400">
              Building modern, responsive web experiences with cutting-edge
              technology.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-light-blue transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="hover:text-light-blue transition-colors duration-200"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="hover:text-light-blue transition-colors duration-200"
                >
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/shazad.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-light-blue transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
                <span>@shazad.ar</span>
              </a>
              <a
                href="https://instagram.com/zenvadigitals"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-light-blue transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
                <span>@zenvadigitals</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Made by{' '}
            <span className="text-light-blue font-semibold">
              Shazad Arshad
            </span>{' '}
            |{' '}
            <span className="text-purple-accent font-semibold">
              Zenva Digitals
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

