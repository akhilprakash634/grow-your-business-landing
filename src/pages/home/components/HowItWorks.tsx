export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: 'ri-chat-3-line',
      title: 'Share your business details',
      description: 'Tell us about your business, services, and what you want to achieve online.'
    },
    {
      number: '02',
      icon: 'ri-tools-line',
      title: 'We build & set up everything',
      description: 'Our team creates your website, sets up WhatsApp Business, and optimizes your Google profile.'
    },
    {
      number: '03',
      icon: 'ri-phone-line',
      title: 'Start getting calls & enquiries',
      description: 'Go live and watch your business grow with more customer calls and enquiries.'
    }
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 sm:w-72 sm:h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 sm:w-72 sm:h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-full mb-3 sm:mb-4">
            <i className="ri-lightbulb-line text-blue-600 text-sm"></i>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Simple Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            How It <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Get your business online in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500 -translate-y-1/2 opacity-20"></div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Card */}
                <div className="group bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl lg:text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500">
                    <i className={`${step.icon} text-2xl sm:text-3xl bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent`}></i>
                  </div>

                  {/* Content */}
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-20">
                    <i className="ri-arrow-right-line text-2xl sm:text-3xl text-emerald-500"></i>
                  </div>
                )}

                {/* Arrow (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4 sm:my-6">
                    <i className="ri-arrow-down-line text-2xl sm:text-3xl text-emerald-500"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-10 sm:mt-16 text-center">
          <div className="inline-flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-xl sm:rounded-2xl">
            <i className="ri-customer-service-2-line text-xl sm:text-2xl text-blue-600"></i>
            <p className="text-xs sm:text-sm font-medium text-gray-700">
              We guide you through every step and handle all approvals and updates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
