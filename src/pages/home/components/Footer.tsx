export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-3 sm:mb-4">
              <img 
                src="https://static.readdy.ai/image/3a79f3d26d575281f009959c52307d03/4faeac9cacf9a888180dbe48ffa35e91.png" 
                alt="Grow Your Business Logo" 
                className="h-8 sm:h-10 w-auto rounded-lg"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4 sm:mb-6">
              Helping businesses across India get more customer calls
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110 cursor-pointer">
                <i className="ri-facebook-fill text-base sm:text-lg"></i>
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110 cursor-pointer">
                <i className="ri-instagram-line text-base sm:text-lg"></i>
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110 cursor-pointer">
                <i className="ri-linkedin-fill text-base sm:text-lg"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold mb-4 sm:mb-6 flex items-center space-x-2">
              <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full"></div>
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <button onClick={() => scrollToSection('hero')} className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors cursor-pointer hover:translate-x-1 inline-block">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors cursor-pointer hover:translate-x-1 inline-block">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors cursor-pointer hover:translate-x-1 inline-block">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('pricing')} className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors cursor-pointer hover:translate-x-1 inline-block">
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold mb-4 sm:mb-6 flex items-center space-x-2">
              <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full"></div>
              <span>Our Services</span>
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="text-xs sm:text-sm text-gray-400 flex items-center space-x-2">
                <i className="ri-arrow-right-s-line text-emerald-500 text-sm"></i>
                <span>Website Development</span>
              </li>
              <li className="text-xs sm:text-sm text-gray-400 flex items-center space-x-2">
                <i className="ri-arrow-right-s-line text-emerald-500 text-sm"></i>
                <span>WhatsApp Business Setup</span>
              </li>
              <li className="text-xs sm:text-sm text-gray-400 flex items-center space-x-2">
                <i className="ri-arrow-right-s-line text-emerald-500 text-sm"></i>
                <span>Google Maps Profile</span>
              </li>
              <li className="text-xs sm:text-sm text-gray-400 flex items-center space-x-2">
                <i className="ri-arrow-right-s-line text-emerald-500 text-sm"></i>
                <span>Digital Marketing</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold mb-4 sm:mb-6 flex items-center space-x-2">
              <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full"></div>
              <span>Contact Us</span>
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <a
                href="https://wa.me/8282863459"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors cursor-pointer group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500 transition-all">
                  <i className="ri-whatsapp-line text-base sm:text-lg text-emerald-400 group-hover:text-white"></i>
                </div>
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+918282863459"
                className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors cursor-pointer group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-blue-500/20 rounded-lg group-hover:bg-blue-500 transition-all">
                  <i className="ri-phone-line text-base sm:text-lg text-blue-400 group-hover:text-white"></i>
                </div>
                <span>+91 8282863459</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
            © 2024 Grow Your Business. All rights reserved.
          </p>
          <a 
            href="https://readdy.ai/?ref=logo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
          >
            <span>Powered by</span>
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-emerald-300">Readdy</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
