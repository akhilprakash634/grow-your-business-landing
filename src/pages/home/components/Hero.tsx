export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.15),transparent_50%)]"></div>
      </div>

      {/* Floating Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-full mb-6 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-medium text-blue-200">Trusted by 500+ Businesses Across India</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
          Get More Customer Calls
          <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
            for Your Business
          </span>
        </h1>
        
        <p className="text-base sm:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-10 font-light max-w-3xl mx-auto px-2">
          Website + WhatsApp Business + Google Maps setup — Done in 3 Days
        </p>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-4xl mx-auto">
          <div className="group p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all duration-300">
            <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform">
              <i className="ri-global-line text-white text-base sm:text-xl"></i>
            </div>
            <span className="text-white text-xs sm:text-sm font-medium">Simple professional website</span>
          </div>
          <div className="group p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all duration-300">
            <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg sm:rounded-xl mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform">
              <i className="ri-whatsapp-line text-white text-base sm:text-xl"></i>
            </div>
            <span className="text-white text-xs sm:text-sm font-medium">WhatsApp Business setup with auto-replies</span>
          </div>
          <div className="group p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all duration-300">
            <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg sm:rounded-xl mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform">
              <i className="ri-map-pin-line text-white text-base sm:text-xl"></i>
            </div>
            <span className="text-white text-xs sm:text-sm font-medium">Google Maps business visibility</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
          <a
            href="https://wa.me/916282863459"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-base sm:text-lg font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center space-x-2 whitespace-nowrap"
          >
            <i className="ri-whatsapp-line text-xl sm:text-2xl group-hover:rotate-12 transition-transform"></i>
            <span>WhatsApp Now</span>
          </a>
          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white text-base sm:text-lg font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 whitespace-nowrap"
          >
            Request a Demo
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-gray-400 text-xs sm:text-sm px-4">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <i className="ri-flashlight-line text-emerald-400 text-sm sm:text-base"></i>
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <i className="ri-price-tag-3-line text-blue-400 text-sm sm:text-base"></i>
            <span>Affordable Pricing</span>
          </div>
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <i className="ri-store-2-line text-emerald-400 text-sm sm:text-base"></i>
            <span>Business-Friendly Setup</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <i className="ri-arrow-down-line text-white/50 text-xl sm:text-2xl"></i>
      </div>
    </section>
  );
}
