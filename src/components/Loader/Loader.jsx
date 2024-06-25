// components/Loader.js
import React from 'react';
import { FaSpinner, FaCircleNotch, FaCog } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex space-x-4">
        <FaSpinner className="text-4xl text-gray-500 animate-spin" />
        <FaCircleNotch className="text-4xl text-gray-500 animate-spin" />
        <FaCog className="text-4xl text-gray-500 animate-spin" />
      </div>
      <p className="mt-4 text-lg text-gray-600">Loading...</p>
    </div>
  );
};

export default Loader;
