"use client"
import React, { useState, useEffect } from 'react';
import Loader from '@/components/Loader/Loader'; 

function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    loading ? <Loader /> : 
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-4">About Trip Planner</h2>
      <p className="text-gray-700 mb-4">
        Welcome to Trip Planner, your go-to platform for planning trips and adventures with new friends! Our mission is to connect like-minded travelers who are eager to explore new destinations and create unforgettable memories together.
      </p>
      <p className="text-gray-700 mb-4">
        Whether you're looking for a travel buddy for a weekend getaway or planning a grand adventure across continents, Trip Planner makes it easy to find and connect with people who share your travel interests and goals.
      </p>
      <p className="text-gray-700 mb-4">
        Here’s how you can use Trip Planner:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Browse through profiles of fellow travelers.</li>
        <li>Send and receive trip requests to plan trips together.</li>
        <li>Invite others to join your travel plans or accept invitations.</li>
        <li>Build your profile to showcase your travel interests and experiences.</li>
      </ul>
      <p className="text-gray-700">
        Join our community today and start your journey with new friends. Adventure awaits!
      </p>
    </div>
  );
}

export default About;
