// src/components/Layout.jsx
import React from 'react';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-20">
        {children}
      </main>
    </div>
  );
}

export default Layout;
