import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} ACnP. All rights reserved.
        </p>
        <div className="mt-2">
          <a href="/privacy" className="hover:text-gray-300">
            Privacy Policy
          </a>
          <span className="mx-2">|</span>
          <a href="/terms" className="hover:text-gray-300">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
