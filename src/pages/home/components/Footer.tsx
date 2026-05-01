import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Blog', path: '/blog' },
      { name: 'Growth System', path: '/#solution' },
    ],
    services: [
      { name: 'Website Development', path: '/website-dev' },
      { name: 'IT Support', path: '/it-support' },
      { name: 'WhatsApp Marketing', path: '/services' },
      { name: 'Local SEO / GMB', path: '/services' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
    ]
  };

  return (
    <footer className="bg-gray-950 pt-20 pb-10 px-4 sm:px-6 lg:px-8 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img 
                src="/logo.png" 
                alt="Grow Your Business Logo" 
                width="180" 
                height="60" 
                className="h-16 w-auto object-contain" 
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering local businesses in Kerala and the UAE with high-converting digital systems. We turn your online presence into a customer generation machine.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/916282863459" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all">
                <i className="ri-whatsapp-line text-xl"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all">
                <i className="ri-linkedin-line text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Our Services</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Locations */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <i className="ri-map-pin-2-line text-emerald-500 mt-1"></i>
                <span>Kerala, India <br /> UAE (Dubai & Sharjah)</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <i className="ri-phone-line text-emerald-500"></i>
                <span>+91 62828 63459</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <i className="ri-mail-line text-emerald-500"></i>
                <span>hello@growyourbusiness.today</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-xs">
            &copy; {currentYear} Grow Your Business. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {footerLinks.legal.map((link) => (
              <a key={link.name} href={link.path} className="text-gray-500 hover:text-white text-xs transition-colors">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
