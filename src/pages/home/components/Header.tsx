import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'IT Support', path: '/it-support' },
    { name: 'Website Dev', path: '/website-dev' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-950/95 backdrop-blur-md shadow-lg border-b border-gray-800' : 'bg-transparent'
      }`}
    >
      <nav 
        className={`w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-3 sm:py-4'
        }`} 
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-3" aria-label="Grow Your Business - Home">
            <img 
              src="/logo.png" 
              alt="Grow Your Business Logo" 
              width="160"
              height="50"
              className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                isScrolled ? 'h-8 sm:h-10' : 'h-10 sm:h-12'
              }`} 
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-emerald-400 ${
                  isScrolled || location.pathname !== '/' ? 'text-gray-300' : 'text-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center">
            <a
              href="https://wa.me/916282863459"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2 bg-emerald-500 text-white text-sm font-bold rounded-lg hover:bg-emerald-600 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center space-x-2 ${
                isScrolled ? 'scale-90' : 'scale-100'
              }`}
            >
              <i className="ri-whatsapp-fill text-lg"></i>
              <span>Free Consultation</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-200 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-gray-950 border-b border-gray-800 py-4 px-4 shadow-xl">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-6">
              <a
                href="https://wa.me/916282863459"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-5 py-3.5 bg-emerald-500 text-white text-center text-sm font-bold rounded-lg hover:bg-emerald-600 transition-all flex items-center justify-center space-x-2"
              >
                <i className="ri-whatsapp-fill text-lg"></i>
                <span>Free Consultation</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
