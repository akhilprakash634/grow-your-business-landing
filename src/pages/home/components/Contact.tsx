import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', businessName: '', phone: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50"></div>
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-full mb-3 sm:mb-4">
            <i className="ri-mail-line text-blue-600 text-sm"></i>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Ready to Grow <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Your Business?</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Message us for a quick demo and pricing details
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="businessName" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  placeholder="Enter your business name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm"
                  placeholder="Tell us about your business needs..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="p-3 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-lg sm:rounded-xl flex items-center space-x-2 sm:space-x-3">
                  <i className="ri-check-line text-emerald-600 text-lg sm:text-xl"></i>
                  <p className="text-xs sm:text-sm text-emerald-700 font-medium">Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            {/* Quick Contact Cards */}
            <div className="space-y-3 sm:space-y-4">
              <a
                href="https://wa.me/YOURNUMBER"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform">
                  <i className="ri-whatsapp-line text-white text-2xl sm:text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-0.5 sm:mb-1">WhatsApp Now</h3>
                  <p className="text-white/90 text-xs sm:text-sm">Get instant response on WhatsApp</p>
                </div>
                <i className="ri-arrow-right-line text-white text-xl sm:text-2xl group-hover:translate-x-2 transition-transform"></i>
              </a>

              <a
                href="tel:+91YOURNUMBER"
                className="group flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform">
                  <i className="ri-phone-line text-white text-2xl sm:text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-0.5 sm:mb-1">Call Now</h3>
                  <p className="text-white/90 text-xs sm:text-sm">+91 YOURNUMBER</p>
                </div>
                <i className="ri-arrow-right-line text-white text-xl sm:text-2xl group-hover:translate-x-2 transition-transform"></i>
              </a>
            </div>

            {/* Info Cards */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Why Choose Us?</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-2.5 sm:space-x-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex-shrink-0">
                    <i className="ri-time-line text-white text-xs sm:text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-0.5 sm:mb-1">Quick Turnaround</h4>
                    <p className="text-xs text-gray-600">Get your business online in just 3 days</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2.5 sm:space-x-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex-shrink-0">
                    <i className="ri-shield-check-line text-white text-xs sm:text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-0.5 sm:mb-1">Trusted Service</h4>
                    <p className="text-xs text-gray-600">500+ happy businesses across India</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2.5 sm:space-x-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex-shrink-0">
                    <i className="ri-customer-service-2-line text-white text-xs sm:text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-0.5 sm:mb-1">Ongoing Support</h4>
                    <p className="text-xs text-gray-600">We're here to help you grow</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
