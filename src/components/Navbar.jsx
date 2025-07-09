// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-black shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <img src="/images/logo1.png" alt="Continental Suite Logo" className="h-8 w-8 mr-2 rounded-full" />
            <Link to="/" className="text-white text-xl font-bold">
              Continental Paris
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-gold px-3 py-2 rounded-md text-sm font-medium transition">
              Home
            </Link>
            {/* <Link to="/rooms" className="text-white hover:text-gold px-3 py-2 rounded-md text-sm font-medium transition">
              Room Booking
            </Link> */}
            <Link to="/admin/room-bookings" className="text-white hover:text-gold px-3 py-2 rounded-md text-sm font-medium transition">
              Room Booking
            </Link>
            <Link to="/events" className="text-white hover:text-gold px-3 py-2 rounded-md text-sm font-medium transition">
              Events
            </Link>
            <Link to="/restaurant" className="text-white hover:text-gold px-3 py-2 rounded-md text-sm font-medium transition">
              Restaurant
            </Link>
            <Link to="/staff" className="text-white hover:text-gold px-3 py-2 rounded-md text-sm font-medium transition">
              Staff Management
            </Link>
            <Link to="/maintenance" className="text-white hover:text-gold px-3 py-2 rounded-md text-sm font-medium transition">
              Maintenance
            </Link>
            <Link to="/login" className="text-white hover:text-gold px-3 py-2 rounded-md text-sm font-medium transition">
              Login
            </Link>
            <Link to="/signup" className="bg-gold text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gold-dark transition">
              Sign Up
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-lightBg inline-flex items-center justify-center p-2 rounded-md text-darkShade hover:text-gold hover:bg-lightBg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-gradient"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                </svg>
              ) : (
                // Icon when menu is open
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-darkShade hover:text-gold px-3 py-2 rounded-md text-base font-medium transition">
              Home
            </Link>
            <Link to="/rooms" className="block text-darkShade hover:text-gold px-3 py-2 rounded-md text-base font-medium transition">
              Room Booking
            </Link>
            <Link to="/restaurant" className="block text-darkShade hover:text-gold px-3 py-2 rounded-md text-base font-medium transition">
              Restaurant
            </Link>
            <Link to="/staff" className="block text-darkShade hover:text-gold px-3 py-2 rounded-md text-base font-medium transition">
              Staff Management
            </Link>
            <Link to="/login" className="block text-darkShade hover:text-gold px-3 py-2 rounded-md text-base font-medium transition">
              Login
            </Link>
            <Link to="/signup" className="block bg-gold text-white px-3 py-2 rounded-md text-base font-medium hover:bg-gold-dark transition">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
