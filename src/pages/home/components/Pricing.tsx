export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Simple, Transparent Packages
          </h2>
          <p className="text-lg sm:text-xl text-gray-400">
            Choose the package that works best for your business size. One-time payment, no hidden monthly fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Starter Plan */}
          <div className="bg-gray-950 rounded-3xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-4">Starter</h3>
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-white">₹7,999</span>
              <span className="text-gray-400 ml-2">/ one-time</span>
            </div>
            <p className="text-gray-400 mb-8 border-b border-gray-800 pb-8">
              Perfect for new businesses looking to get a professional online presence quickly.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start space-x-3 text-gray-300">
                <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5"></i>
                <span>1-Page Professional Website</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-300">
                <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5"></i>
                <span>WhatsApp Integration</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-300">
                <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5"></i>
                <span>Basic Setup & Configuration</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-300">
                <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5"></i>
                <span>Mobile Responsive Design</span>
              </li>
            </ul>
            <a
              href="https://wa.me/916282863459?text=I'm%20interested%20in%20the%20Starter%20Package"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 text-center text-white font-bold bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors border border-gray-700 hover:border-gray-600"
            >
              Get Starter Package
            </a>
          </div>

          {/* Growth Plan */}
          <div className="bg-gradient-to-b from-gray-950 to-gray-900 rounded-3xl p-8 border-2 border-emerald-500 relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 mt-2">Growth</h3>
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-emerald-400">₹14,999</span>
              <span className="text-gray-400 ml-2">/ one-time</span>
            </div>
            <p className="text-gray-400 mb-8 border-b border-gray-800 pb-8">
              The sweet spot for established local businesses wanting to dominate local search.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start space-x-3 text-white">
                <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5"></i>
                <span className="font-semibold">5-Page Professional Website</span>
              </li>
              <li className="flex items-start space-x-3 text-white">
                <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5"></i>
                <span className="font-semibold">Lead Capture Forms</span>
              </li>
              <li className="flex items-start space-x-3 text-white">
                <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5"></i>
                <span className="font-semibold">Google Maps Profile Setup</span>
              </li>
              <li className="flex items-start space-x-3 text-white">
                <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5"></i>
                <span className="font-semibold">Local SEO Basics</span>
              </li>
              <li className="flex items-start space-x-3 text-white">
                <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5"></i>
                <span className="font-semibold">WhatsApp Integration</span>
              </li>
            </ul>
            <a
              href="https://wa.me/916282863459?text=I'm%20interested%20in%20the%20Growth%20Package"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 text-center text-white font-bold bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-colors shadow-lg"
            >
              Get Growth Package
            </a>
          </div>

          {/* Premium Plan */}
          <div className="bg-gray-950 rounded-3xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-white">₹24,999</span>
              <span className="text-gray-400 ml-2">/ one-time</span>
            </div>
            <p className="text-gray-400 mb-8 border-b border-gray-800 pb-8">
              For businesses that need advanced features, custom design, and ongoing help.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start space-x-3 text-gray-300">
                <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5"></i>
                <span>Advanced Features & Custom Pages</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-300">
                <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5"></i>
                <span>Deep Speed Optimization</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-300">
                <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5"></i>
                <span>1-Month Dedicated Support</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-300">
                <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5"></i>
                <span>Advanced SEO Setup</span>
              </li>
            </ul>
            <a
              href="https://wa.me/916282863459?text=I'm%20interested%20in%20the%20Premium%20Package"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 text-center text-white font-bold bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors border border-gray-700 hover:border-gray-600"
            >
              Get Premium Package
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
