export default function Services() {
  return (
    <section id="solution" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6 backdrop-blur-sm">
            <i className="ri-briefcase-line text-emerald-400"></i>
            <span className="text-xs sm:text-sm font-semibold text-emerald-400 uppercase tracking-wider">Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Built for Business Growth
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-medium">
            "We don't just offer technical services. We help businesses grow, operate smoothly, and scale with the right digital systems."
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="flex flex-col bg-gray-900 rounded-3xl border border-gray-800 hover:border-emerald-500/50 transition-all hover:-translate-y-1 group overflow-hidden">
            <div className="p-8 pb-0">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors mb-6">
                <i className="ri-line-chart-line text-3xl text-emerald-500"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Customer Growth Systems</h3>
              <p className="text-emerald-400 font-medium mb-6">Get more enquiries and customers online</p>
              <ul className="space-y-3 mb-8 text-gray-400">
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                  <span>High-converting business websites</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                  <span>WhatsApp integration for instant leads</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                  <span>Google Maps setup & visibility</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                  <span>Landing pages for campaigns</span>
                </li>
              </ul>
            </div>
            <div className="mt-auto bg-gray-950/50 p-6 border-t border-gray-800 flex items-center space-x-3">
              <i className="ri-arrow-right-line text-emerald-500"></i>
              <span className="text-white font-medium text-sm">Turn visitors into real customers</span>
            </div>
          </div>

          {/* Service 2 */}
          <div className="flex flex-col bg-gray-900 rounded-3xl border border-gray-800 hover:border-emerald-500/50 transition-all hover:-translate-y-1 group overflow-hidden">
            <div className="p-8 pb-0">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors mb-6">
                <i className="ri-tools-line text-3xl text-emerald-500"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Website Upgrade & Optimization</h3>
              <p className="text-emerald-400 font-medium mb-6">Fix slow, outdated, or non-performing websites</p>
              <ul className="space-y-3 mb-8 text-gray-400">
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                  <span>Website speed optimization</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                  <span>UI/UX redesign (modern look)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                  <span>Content restructuring for conversions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                  <span>Full website revamp</span>
                </li>
              </ul>
            </div>
            <div className="mt-auto bg-gray-950/50 p-6 border-t border-gray-800 flex items-center space-x-3">
              <i className="ri-arrow-right-line text-emerald-500"></i>
              <span className="text-white font-medium text-sm">Make your existing website actually work</span>
            </div>
          </div>

          {/* Service 3 */}
          <div className="flex flex-col bg-gray-900 rounded-3xl border border-gray-800 hover:border-emerald-500/50 transition-all hover:-translate-y-1 group overflow-hidden">
            <div className="p-8 pb-0">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors mb-6">
                <i className="ri-server-line text-3xl text-emerald-500"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Hosting & Performance</h3>
              <p className="text-emerald-400 font-medium mb-6">Reliable, fast, and secure infrastructure</p>
              <ul className="space-y-3 mb-8 text-gray-400">
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                  <span>Hosting setup & migration</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                  <span>Server optimization</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                  <span>SSL & security setup</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                  <span>Ongoing maintenance & support</span>
                </li>
              </ul>
            </div>
            <div className="mt-auto bg-gray-950/50 p-6 border-t border-gray-800 flex items-center space-x-3">
              <i className="ri-arrow-right-line text-emerald-500"></i>
              <span className="text-white font-medium text-sm">No downtime, no stress</span>
            </div>
          </div>

          {/* Service 4 */}
          <div className="flex flex-col bg-gray-900 rounded-3xl border border-gray-800 hover:border-emerald-500/50 transition-all hover:-translate-y-1 group overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="p-8 pb-0">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors mb-6">
                <i className="ri-mail-send-line text-3xl text-emerald-500"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Business Email & Microsoft 365</h3>
              <p className="text-emerald-400 font-medium mb-6">Professional email solutions & migration</p>
              <ul className="space-y-3 mb-8 text-gray-400">
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                  <span>Migration from old mail systems</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                  <span>Microsoft 365 setup & configuration</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                  <span>Domain-based professional email</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                  <span>Ongoing email support</span>
                </li>
              </ul>
            </div>
            <div className="mt-auto bg-gray-950/50 p-6 border-t border-gray-800 flex items-center space-x-3">
              <i className="ri-arrow-right-line text-emerald-500"></i>
              <span className="text-white font-medium text-sm leading-tight">Improve communication & security</span>
            </div>
          </div>

          {/* Service 5 */}
          <div className="flex flex-col bg-gray-900 rounded-3xl border border-gray-800 hover:border-emerald-500/50 transition-all hover:-translate-y-1 group overflow-hidden md:col-span-2 lg:col-span-2 lg:flex-row">
            <div className="p-8 pb-0 lg:flex-1">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors mb-6">
                <i className="ri-customer-service-2-line text-3xl text-emerald-500"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Ongoing Support & Maintenance</h3>
              <p className="text-emerald-400 font-medium mb-6">We handle everything after launch</p>
              <div className="grid sm:grid-cols-2 gap-4 text-gray-400 mb-8">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                    <span>Regular updates & fixes</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                    <span>Performance monitoring</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                    <span>Small changes & improvements</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="ri-check-line text-emerald-500 text-xl font-bold mt-0.5 shrink-0"></i>
                    <span>Reliable Technical support</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gray-950/50 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-800 flex items-center justify-center lg:w-1/3">
              <div className="flex items-center space-x-3 lg:flex-col lg:space-x-0 lg:space-y-4 lg:text-center">
                <div className="w-10 h-10 lg:w-16 lg:h-16 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
                  <i className="ri-shield-user-line text-emerald-400 text-xl lg:text-3xl"></i>
                </div>
                <span className="text-white font-bold text-lg lg:text-xl">Focus on your business, we handle the tech.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Tagline */}
        <div className="mt-20 text-center relative max-w-4xl mx-auto">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-950 px-6 py-2 text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              "Everything your business needs to grow online — under one roof"
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
