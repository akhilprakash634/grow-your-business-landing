import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How long does the setup take?',
      answer: 'Usually 3 days. We work efficiently to get your business online as quickly as possible without compromising quality.'
    },
    {
      question: 'Do I need technical knowledge?',
      answer: 'No, we handle everything. From website creation to WhatsApp Business setup and Google Maps optimization, our team takes care of all technical aspects.'
    },
    {
      question: 'Can I use my existing domain?',
      answer: 'Yes, absolutely! If you already have a domain name, we can use it for your new website. If not, we can help you register a new one.'
    },
    {
      question: 'Is support available after delivery?',
      answer: 'Yes, maintenance options are available. We offer monthly maintenance packages starting from ₹2,000/month to keep your website updated and running smoothly.'
    },
    {
      question: 'How do I get started?',
      answer: 'Simply message us on WhatsApp! Share your business details, and we\'ll guide you through the entire process from start to finish.'
    }
  ];

  return (
    <section id="faq" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-full mb-3 sm:mb-4">
            <i className="ri-question-line text-blue-600 text-sm"></i>
            <span className="text-xs sm:text-sm font-medium text-gray-700">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Everything you need to know about our services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 lg:p-6 text-left"
              >
                <div className="flex items-start space-x-2.5 sm:space-x-3 lg:space-x-4 flex-1">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-lg sm:rounded-xl flex-shrink-0 transition-all duration-300 ${
                    openIndex === index
                      ? 'bg-gradient-to-br from-blue-500 to-emerald-500'
                      : 'bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-500/10 group-hover:to-emerald-500/10'
                  }`}>
                    <i className={`ri-question-line text-sm sm:text-base lg:text-lg ${
                      openIndex === index ? 'text-white' : 'text-gray-600'
                    }`}></i>
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 pt-0.5 sm:pt-1">
                    {faq.question}
                  </h3>
                </div>
                <div className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg flex-shrink-0 transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-gradient-to-br from-blue-500 to-emerald-500 rotate-180'
                    : 'bg-gray-100'
                }`}>
                  <i className={`ri-arrow-down-s-line text-base sm:text-lg ${
                    openIndex === index ? 'text-white' : 'text-gray-600'
                  }`}></i>
                </div>
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 pl-12 sm:pl-14 lg:pl-20">
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-16 text-center">
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Still have questions?</p>
          <a
            href="https://wa.me/8282863459"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            <i className="ri-whatsapp-line text-lg sm:text-xl"></i>
            <span>Chat with Us on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
