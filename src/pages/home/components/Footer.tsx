export default function Footer() {
  return (
    <footer className="bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-900">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <a href="/" className="flex items-center justify-center mb-6">
          <img src="/logo.png" alt="Grow Your Business Logo" className="h-20 sm:h-24 w-auto object-contain opacity-90 transition-opacity hover:opacity-100" />
        </a>
        
        <p className="text-gray-400 mb-8 max-w-md">
          Helping local businesses in Kerala and across India grow their online customer base with high-converting websites and WhatsApp systems.
        </p>

        <div className="flex space-x-6 mb-8">
          <a href="#" className="text-gray-500 hover:text-white transition-colors">
            <span className="sr-only">Facebook</span>
            <i className="ri-facebook-fill text-xl"></i>
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">
            <span className="sr-only">Instagram</span>
            <i className="ri-instagram-fill text-xl"></i>
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">
            <span className="sr-only">Twitter</span>
            <i className="ri-twitter-x-fill text-xl"></i>
          </a>
        </div>

        <div className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Grow Your Business. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
