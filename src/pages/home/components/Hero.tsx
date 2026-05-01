export default function Hero() {
  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-950">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.15),transparent_50%)]"></div>
      </div>

      {/* Floating Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8 backdrop-blur-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-semibold text-emerald-400 uppercase tracking-wider">Local Business Growth System</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] px-2 tracking-tight">
          Expert IT Services & 
          <span className="block mt-2 text-emerald-400">
            Digital Growth in Kerala & UAE
          </span>
        </h1>
        
        <p className="text-lg sm:text-2xl text-gray-300 mb-10 font-medium max-w-3xl mx-auto px-4 leading-relaxed">
          We build high-converting websites + WhatsApp systems that bring you real customers, not just visitors.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 px-4">
          <a
            href="https://wa.me/916282863459"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto px-8 py-4 bg-emerald-500 text-white text-lg font-bold rounded-xl hover:bg-emerald-600 transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center space-x-3 whitespace-nowrap"
          >
            <i className="ri-whatsapp-fill text-2xl group-hover:rotate-12 transition-transform"></i>
            <span>Get My Business Online</span>
          </a>
          <button
            onClick={scrollToPricing}
            className="w-full sm:w-auto px-8 py-4 bg-gray-800 text-white text-lg font-bold rounded-xl border border-gray-700 hover:bg-gray-700 transition-all transform hover:scale-105 whitespace-nowrap"
          >
            View Plans
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 text-sm font-medium px-4">
          <div className="flex items-center space-x-2">
            <i className="ri-checkbox-circle-fill text-emerald-500 text-xl"></i>
            <span>No technical skills required</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="ri-checkbox-circle-fill text-emerald-500 text-xl"></i>
            <span>Start seeing results in days</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <i className="ri-arrow-down-s-line text-emerald-500/50 text-3xl"></i>
      </div>
    </section>
  );
}
