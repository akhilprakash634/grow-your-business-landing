export default function About() {
  return (
    <section id="about" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-full mb-3 sm:mb-4">
            <i className="ri-information-line text-blue-600 text-sm"></i>
            <span className="text-xs sm:text-sm font-medium text-gray-700">About Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Grow Your Business</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              Grow Your Business helps businesses across India increase customer enquiries and calls by building a strong online presence. We create clean, easy-to-use websites, set up WhatsApp Business for customer communication, and optimize Google Business Profiles so customers can easily find and contact your business.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              Our focus is on simple, fast, and affordable solutions that deliver real results.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8">
              <div className="text-center p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-0.5 sm:mb-1">500+</div>
                <div className="text-xs sm:text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-0.5 sm:mb-1">3</div>
                <div className="text-xs sm:text-sm text-gray-600">Days Setup</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-0.5 sm:mb-1">24/7</div>
                <div className="text-xs sm:text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-3 sm:space-y-4">
            <div className="group p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  <i className="ri-rocket-line text-white text-base sm:text-xl"></i>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Fast & Reliable</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Get your complete online presence set up in just 3 days with our streamlined process.</p>
                </div>
              </div>
            </div>

            <div className="group p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg sm:rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  <i className="ri-price-tag-3-line text-white text-base sm:text-xl"></i>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Affordable Pricing</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Professional solutions designed for small and medium businesses with transparent pricing.</p>
                </div>
              </div>
            </div>

            <div className="group p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg sm:rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  <i className="ri-customer-service-2-line text-white text-base sm:text-xl"></i>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Expert Support</h3>
                  <p className="text-xs sm:text-sm text-gray-600">We guide you through every step and provide ongoing support to ensure your success.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
