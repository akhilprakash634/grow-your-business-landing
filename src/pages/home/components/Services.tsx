export default function Services() {
  const services = [
    {
      icon: 'ri-global-line',
      title: 'Business Starter Website',
      description: 'One-page mobile-friendly website with call and WhatsApp buttons, enquiry form, and basic SEO.',
      delivery: '2–3 days',
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-500/10 to-blue-600/10'
    },
    {
      icon: 'ri-whatsapp-line',
      title: 'WhatsApp Business Setup',
      description: 'Catalog setup, greeting message, auto-replies, labels, and enquiry flow configuration.',
      delivery: '1 day',
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-500/10 to-emerald-600/10'
    },
    {
      icon: 'ri-map-pin-line',
      title: 'Google Maps Business Profile Setup',
      description: 'Business profile setup and optimization to improve visibility and customer calls.',
      delivery: '1–2 days',
      gradient: 'from-blue-500 to-emerald-500',
      bgGradient: 'from-blue-500/10 to-emerald-500/10'
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-full mb-3 sm:mb-4">
            <i className="ri-service-line text-blue-600 text-sm"></i>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            What We <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Offer</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Complete digital solutions to help your business grow and attract more customers
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center bg-gradient-to-br ${service.gradient} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <i className={`${service.icon} text-white text-xl sm:text-2xl lg:text-3xl`}></i>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-gray-900">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed group-hover:text-gray-700">
                  {service.description}
                </p>

                {/* Delivery Badge */}
                <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-100 group-hover:bg-white rounded-full mb-4 sm:mb-6">
                  <i className="ri-time-line text-gray-600 text-xs sm:text-sm"></i>
                  <span className="text-xs font-medium text-gray-700">Delivery: {service.delivery}</span>
                </div>

                {/* CTA */}
                <a
                  href="https://wa.me/8282863459"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent group-hover:translate-x-2 transition-transform duration-300 cursor-pointer`}
                >
                  <span>Get Demo on WhatsApp</span>
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>

              {/* Decorative Corner */}
              <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-16">
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Need a custom solution for your business?</p>
          <a
            href="https://wa.me/8282863459"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            <i className="ri-whatsapp-line text-lg sm:text-xl"></i>
            <span>Talk to Our Team</span>
          </a>
        </div>
      </div>
    </section>
  );
}
