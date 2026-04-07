import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-950/95 backdrop-blur-md shadow-lg border-b border-gray-800' : 'bg-transparent'
      }`}
    >
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-4" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="group flex items-center space-x-3" aria-label="Grow Your Business - Home">
            <img src="/logo.png" alt="Grow Your Business Logo" className="h-16 sm:h-20 w-auto object-contain transition-transform group-hover:scale-105" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <button onClick={() => scrollToSection('problem')} className={`text-sm font-medium transition-colors hover:text-emerald-400 ${isScrolled ? 'text-gray-300' : 'text-gray-100'}`}>
              Why Us
            </button>
            <button onClick={() => scrollToSection('solution')} className={`text-sm font-medium transition-colors hover:text-emerald-400 ${isScrolled ? 'text-gray-300' : 'text-gray-100'}`}>
              Growth System
            </button>
            <button onClick={() => scrollToSection('pricing')} className={`text-sm font-medium transition-colors hover:text-emerald-400 ${isScrolled ? 'text-gray-300' : 'text-gray-100'}`}>
              Packages
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className={`text-sm font-medium transition-colors hover:text-emerald-400 ${isScrolled ? 'text-gray-300' : 'text-gray-100'}`}>
              How It Works
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center">
            <a
              href="https://wa.me/916282863459"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-500 text-white text-sm font-bold rounded-lg hover:bg-emerald-600 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center space-x-2"
            >
              <i className="ri-whatsapp-fill text-lg"></i>
              <span>Get My Business Online</span>
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
              <button onClick={() => scrollToSection('problem')} className="text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg">
                Why Us
              </button>
              <button onClick={() => scrollToSection('solution')} className="text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg">
                Growth System
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg">
                Packages
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg">
                How It Works
              </button>
            </nav>
            <div className="mt-6">
              <a
                href="https://wa.me/916282863459"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-5 py-3.5 bg-emerald-500 text-white text-center text-sm font-bold rounded-lg hover:bg-emerald-600 transition-all flex items-center justify-center space-x-2"
              >
                <i className="ri-whatsapp-fill text-lg"></i>
                <span>Get My Business Online</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
