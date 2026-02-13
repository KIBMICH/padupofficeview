import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { SignupPage } from '../pages/SignupPage';
import { SignupFormPage } from '../pages/SignupFormPage';
import { TrackOrderPage } from '../pages/TrackOrderPage';
import { LearnMorePage } from '../pages/LearnMorePage';
import logo from '../assets/images/logo.png';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white py-3 px-4 md:px-8 border-b border-gray-100 sticky top-0 z-50 relative">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop Nav Links */}
            <div className="hidden md:flex gap-6 text-xs">
              <Link to="/" className="text-gray-600 hover:text-black">
                Home
              </Link>
              <Link to="/#benefits" className="text-gray-600 hover:text-black">
                Benefits
              </Link>
              <Link to="/#packages" className="text-gray-600 hover:text-black">
                Packages
              </Link>
              <Link to="/track-order" className="text-gray-600 hover:text-black">
                Track Order
              </Link>
              <Link to="/track-order" className="text-gray-600 hover:text-black">
                Contact
              </Link>
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-0.5 bg-gray-700 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-5 h-0.5 bg-gray-700 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-5 h-0.5 bg-gray-700 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-50">
          <div className="flex flex-col py-4 px-4">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-black py-3 border-b border-gray-100"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/#benefits" 
              className="text-gray-600 hover:text-black py-3 border-b border-gray-100"
              onClick={closeMenu}
            >
              Benefits
            </Link>
            <Link 
              to="/#packages" 
              className="text-gray-600 hover:text-black py-3 border-b border-gray-100"
              onClick={closeMenu}
            >
              Packages
            </Link>
            <Link 
              to="/track-order" 
              className="text-gray-600 hover:text-black py-3 border-b border-gray-100"
              onClick={closeMenu}
            >
              Track Order
            </Link>
            <Link 
              to="/track-order" 
              className="text-gray-600 hover:text-black py-3"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<SignupPage />} />
            <Route path="/signup-form" element={<SignupFormPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
            <Route path="/learn-more" element={<LearnMorePage />} />
          </Routes>
        </main>

        <footer className="bg-white py-4 px-4 md:px-8 border-t border-gray-100">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xs text-gray-500">
              © 2026 Distributor & Sales Agent Portal. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};
