// Import 'useState' and 'useEffect' from 'react' without curly braces
'use client';
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import loading from '@/assets/2.json';

const HomeLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a 2-second waiting time before hiding the loader
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    // Use a single pair of curly braces for conditional rendering
    // Render the loader if 'isLoading' is true, otherwise, render nothing
    isLoading ? (
      <div className="flex justify-center items-center h-screen">
        <Lottie animationData={loading} loop={true} />
      </div>
    ) : null
  );
};

export default HomeLoading;
