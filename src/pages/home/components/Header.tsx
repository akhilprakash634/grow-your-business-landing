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
        isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <img 
              src="https://static.readdy.ai/image/3a79f3d26d575281f009959c52307d03/4faeac9cacf9a888180dbe48ffa35e91.png" 
              alt="Grow Your Business Logo" 
              className="h-8 sm:h-10 w-auto rounded-lg group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button onClick={() => scrollToSection('hero')} className={`px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className={`px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
              About
            </button>
            <button onClick={() => scrollToSection('services')} className={`px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
              Services
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className={`px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
              How It Works
            </button>
            <button onClick={() => scrollToSection('pricing')} className={`px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
              Pricing
            </button>
            <button onClick={() => scrollToSection('faq')} className={`px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
              FAQ
            </button>
            <button onClick={() => scrollToSection('contact')} className={`px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
              Contact
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="https://wa.me/8282863459"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all hover:shadow-lg flex items-center space-x-1.5 whitespace-nowrap"
            >
              <i className="ri-whatsapp-line text-base"></i>
              <span>WhatsApp Now</span>
            </a>
            <a
              href="tel:+918282863459"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                isScrolled 
                  ? 'bg-gray-900 text-white hover:bg-gray-800' 
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
              }`}
            >
              <i className="ri-phone-line text-base"></i>
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
          >
            <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl sm:text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 py-3 sm:py-4 rounded-b-2xl">
            <nav className="flex flex-col space-y-1">
              <button onClick={() => scrollToSection('hero')} className="text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors text-left px-4 py-2.5 rounded-lg whitespace-nowrap">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors text-left px-4 py-2.5 rounded-lg whitespace-nowrap">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors text-left px-4 py-2.5 rounded-lg whitespace-nowrap">
                Services
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors text-left px-4 py-2.5 rounded-lg whitespace-nowrap">
                How It Works
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors text-left px-4 py-2.5 rounded-lg whitespace-nowrap">
                Pricing
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors text-left px-4 py-2.5 rounded-lg whitespace-nowrap">
                FAQ
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors text-left px-4 py-2.5 rounded-lg whitespace-nowrap">
                Contact
              </button>
            </nav>
            <div className="flex flex-col space-y-2 mt-3 sm:mt-4 px-4">
              <a
                href="https://wa.me/8282863459"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all flex items-center justify-center space-x-2 whitespace-nowrap"
              >
                <i className="ri-whatsapp-line text-base"></i>
                <span>WhatsApp Now</span>
              </a>
              <a
                href="tel:+918282863459"
                className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center space-x-2 whitespace-nowrap"
              >
                <i className="ri-phone-line text-base"></i>
                <span>Call Now</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
