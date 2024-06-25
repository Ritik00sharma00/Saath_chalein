import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black px-6 ml-3 flex text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-xl font-bold mb-4">Company Name</h2>
            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula scelerisque felis. Cras sollicitudin dictum erat, eget efficitur ipsum lacinia vel.</p>
          </div>
          <div className="md:col-span-3">
            <div className="flex flex-wrap gap-4">
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                <ul className="text-sm">
                  <li><a href="#" className="hover:text-gray-400">Home</a></li>
                  <li><a href="#" className="hover:text-gray-400">About Us</a></li>
                  <li><a href="#" className="hover:text-gray-400">Services</a></li>
                  <li><a href="#" className="hover:text-gray-400">Contact</a></li>
                </ul>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-semibold mb-2">Social Media</h3>
                <ul className="text-sm">
                  <li><a href="#" className="hover:text-gray-400">Facebook</a></li>
                  <li><a href="#" className="hover:text-gray-400">Twitter</a></li>
                  <li><a href="#" className="hover:text-gray-400">Instagram</a></li>
                  <li><a href="#" className="hover:text-gray-400">LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-600" />
        <div className="flex justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Company Name. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-sm hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-gray-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
