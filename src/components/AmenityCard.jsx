// src/components/AmenityCard.jsx
import React from 'react';

function AmenityCard({ title, description }) {
  return (
    <div className="w-full md:w-1/3 px-4 mb-8">
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold mb-3 text-darkShade">{title}</h3>
        <p className="text-subtleText">
          {description}
        </p>
      </div>
    </div>
  );
}

export default AmenityCard;
