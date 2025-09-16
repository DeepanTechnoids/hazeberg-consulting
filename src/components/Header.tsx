import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentPage?: 'home' | 'careers';
  onNavigateHome?: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage = 'home', onNavigateHome }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const homeNavItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Team', href: '#team' },
    { name: 'Blog', href: '#blog' },
    { name: 'Careers', href: '#careers' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    if (currentPage === 'careers' && href !== '#careers') {
      // If we're on careers page and clicking non-careers nav, go back to home first
      if (onNavigateHome) {
        onNavigateHome();
        // Wait for page transition then scroll
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={onNavigateHome}>
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Hazeberg
            </div>
            <span className={`ml-2 text-lg font-medium ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Consulting
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {currentPage === 'home' ? (
              homeNavItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-yellow-500 ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))
            ) : (
              <button
                onClick={onNavigateHome}
                className={`text-sm font-medium transition-colors duration-200 hover:text-yellow-500 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                Back to Home
              </button>
            )}
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2 rounded-full font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
            <div className="py-4">
              {currentPage === 'home' ? (
                homeNavItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left px-4 py-3 text-gray-900 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                ))
              ) : (
                <button
                  onClick={onNavigateHome}
                  className="block w-full text-left px-4 py-3 text-gray-900 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                >
                  Back to Home
                </button>
              )}
              <div className="px-4 pt-3">
                <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-lg font-medium">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;