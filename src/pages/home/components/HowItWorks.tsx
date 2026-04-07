export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Get Online in 3 Simple Steps
          </h2>
          <p className="text-lg sm:text-xl text-gray-400">
            No technical headaches for you. We handle everything from design to launch.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden md:absolute md:block top-12 left-0 w-full h-0.5 bg-gray-800" />

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-gray-900 border-4 border-emerald-500 rounded-2xl flex items-center justify-center mb-8 rotate-3 transition-transform group-hover:rotate-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <i className="ri-whatsapp-line text-4xl text-emerald-400"></i>
              </div>
              <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-4 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Contact Us on WhatsApp</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Click the WhatsApp button and tell us about your business. We'll recommend the best package for you.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-gray-900 border-4 border-emerald-500 rounded-2xl flex items-center justify-center mb-8 -rotate-3 transition-transform group-hover:-rotate-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <i className="ri-clipboard-line text-4xl text-emerald-400"></i>
              </div>
              <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-4 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Share Your Details</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Send us your business information, services you offer, and a few photos. That's all we need.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-gray-900 border-4 border-emerald-500 rounded-2xl flex items-center justify-center mb-8 rotate-3 transition-transform group-hover:rotate-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <i className="ri-rocket-2-line text-4xl text-emerald-400"></i>
              </div>
              <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-4 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Go Live in 2-3 Days</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Sit back and relax. We will build your system and make it live in under 3 days so you can start getting calls.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <a
            href="https://wa.me/916282863459"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-gray-950 font-bold text-lg rounded-xl hover:bg-gray-100 transition-colors"
          >
            <span>Start Step 1 Now</span>
            <i className="ri-arrow-right-line"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
