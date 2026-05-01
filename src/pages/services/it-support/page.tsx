import Header from '../../home/components/Header';
import Footer from '../../home/components/Footer';
import { useSEO, generateFAQSchema } from '../../../utils/seo';

export default function ITSupportPage() {
  const faqs = [
    { question: "How does the WhatsApp system work?", answer: "We set up an automated flow that captures customer enquiries and sends them directly to your WhatsApp Business app." },
    { question: "Is technical support available 24/7?", answer: "We provide dedicated support during business hours in Kerala and UAE time zones." }
  ];

  useSEO({
    title: 'Business Support & WhatsApp Systems Kerala | UAE',
    description: 'Expert IT support and WhatsApp marketing automation for businesses. Streamline your customer communication today.',
    canonical: '/services/it-support',
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-white">IT Support & Automation</h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl">
            Reliable IT support and smart automation systems designed for the modern business landscape in Kerala and UAE.
          </p>
          
          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-emerald-400 mt-12 mb-6">WhatsApp Business Solutions</h2>
            <p className="text-gray-300 text-lg mb-8">
              We don't just set up an account; we build a customer conversion machine. Our systems include catalog optimization, automated greeting messages, and enquiry tracking.
            </p>
          </div>
          
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-10 text-white">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                  <h3 className="text-xl font-bold text-emerald-400 mb-2">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema(faqs))}
        </script>
      </main>
      <Footer />
    </div>
  );
}
