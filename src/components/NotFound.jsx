// src/components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6">Sorry, the page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="bg-gold text-black py-2 px-4 rounded-md hover:bg-gold-dark transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
