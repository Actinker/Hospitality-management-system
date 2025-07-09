// src/components/LoadingScreen.jsx
import React from 'react';

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      >
        <source src="/assets/videos/logovid.mp4" type="video/mp4" alt="video logo" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default LoadingScreen;
