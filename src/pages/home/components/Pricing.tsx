export default function Pricing() {
  const plans = [
    {
      name: 'Starter Pack',
      price: '₹15,000',
      description: 'Ideal for small businesses getting online for the first time.',
      features: [
        'One-page professional website',
        'WhatsApp Business setup (catalog + auto-reply)',
        'Google Maps business profile setup',
        'Mobile-friendly & fast loading'
      ],
      popular: false,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Growth Pack',
      price: '₹25,000',
      description: 'For businesses that want more enquiries and better visibility.',
      features: [
        'Multi-page website (up to 5 pages)',
        'Advanced WhatsApp Business automation',
        'Google Maps optimization for better reach',
        'Basic SEO setup',
        'Contact & enquiry forms'
      ],
      popular: true,
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      name: 'Pro Business Pack',
      price: '₹40,000',
      description: 'Best for service providers and growing businesses.',
      features: [
        'Fully customized website (up to 8 pages)',
        'WhatsApp Business with enquiry flow & labels',
        'Google Maps optimization + review setup',
        'Advanced SEO (on-page)',
        'Performance & speed optimization'
      ],
      popular: false,
      gradient: 'from-blue-500 to-emerald-500'
    }
  ];

  const addons = [
    { name: 'Monthly Website Maintenance', price: 'From ₹2,000 / month', icon: 'ri-settings-3-line' },
    { name: 'Google Ads Setup & Tracking', price: 'From ₹5,000', icon: 'ri-advertisement-line' },
    { name: 'Extra Website Pages', price: 'From ₹1,500 / page', icon: 'ri-file-add-line' },
    { name: 'Social Media Page Setup', price: 'From ₹3,000', icon: 'ri-share-line' },
    { name: 'WhatsApp Broadcast Setup', price: 'From ₹2,000', icon: 'ri-broadcast-line' }
  ];

  return (
    <section id="pricing" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-full mb-3 sm:mb-4">
            <i className="ri-price-tag-3-line text-blue-600 text-sm"></i>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Simple & <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Transparent Pricing</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border transition-all duration-500 ${
                plan.popular
                  ? 'border-emerald-500 shadow-2xl lg:scale-105'
                  : 'border-gray-100 hover:border-blue-200 hover:shadow-xl'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                  <div className="px-3 py-1 sm:px-4 sm:py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg flex items-center space-x-1">
                    <i className="ri-star-fill text-xs"></i>
                    <span>MOST POPULAR</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent mb-2 sm:mb-3`}>
                  {plan.price}
                </div>
                <p className="text-xs sm:text-sm text-gray-600">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 sm:space-y-3 lg:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2 sm:space-x-3">
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center bg-gradient-to-br ${plan.gradient} rounded-full flex-shrink-0 mt-0.5`}>
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="https://wa.me/8282863459"
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-3 sm:py-4 text-center text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl transition-all duration-300 whitespace-nowrap ${
                  plan.popular
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg hover:scale-105'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Get Exact Quote on WhatsApp
              </a>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-gray-100">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              Add-On <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Services</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">Enhance your package with optional services</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {addons.map((addon, index) => (
              <div
                key={index}
                className="group flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 lg:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-lg sm:rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  <i className={`${addon.icon} text-base sm:text-lg lg:text-xl bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent`}></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-xs sm:text-sm">{addon.name}</h4>
                  <p className="text-xs text-gray-600">{addon.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-gray-500 italic">
            Final pricing depends on business requirements and scope.
          </p>
        </div>
      </div>
    </section>
  );
}
