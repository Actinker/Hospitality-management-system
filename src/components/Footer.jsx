// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-6 mt-auto" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <span className="text-sm">
          &copy; {new Date().getFullYear()}{' '}
          <Link to="/" className="hover:underline text-gray-400 hover:text-gold">
            Continental Suite
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 md:mt-0">
          <li>
            <Link to="/about" className="text-gray-400 hover:text-gold mx-2">
              About
            </Link>
          </li>
          <li>
            <Link to="/privacy" className="text-gray-400 hover:text-gold mx-2">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms" className="text-gray-400 hover:text-gold mx-2">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-400 hover:text-gold mx-2">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
