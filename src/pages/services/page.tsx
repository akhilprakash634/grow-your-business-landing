import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import { useSEO, generateWebPageSchema, generateServiceSchema } from '../../utils/seo';

export default function ServicesPage() {
  useSEO({
    title: 'Professional IT Services & Web Design | Grow Your Business',
    description: 'Comprehensive digital services including custom website development, WhatsApp marketing systems, and Google Business Profile optimization for Kerala and UAE businesses.',
    canonical: '/services',
  });

  const schemas = [
    generateWebPageSchema('/services', 'Our Services', 'Comprehensive digital services for business growth'),
    generateServiceSchema()
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-white">Our Services</h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl">
            We provide end-to-end digital solutions to help local businesses in Kerala and UAE dominate their market.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-2xl font-bold mb-4 text-emerald-400">Website Development</h2>
              <p className="text-gray-400 mb-6">High-converting, mobile-first websites designed to turn visitors into customers.</p>
              <a href="/website-dev" className="text-emerald-400 font-semibold hover:underline">Learn more →</a>
            </div>
            
            <div className="p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-2xl font-bold mb-4 text-emerald-400">WhatsApp Marketing</h2>
              <p className="text-gray-400 mb-6">Automated enquiry systems and catalog setup for seamless customer communication.</p>
              <a href="/it-support" className="text-emerald-400 font-semibold hover:underline">Learn more →</a>
            </div>
            
            <div className="p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-2xl font-bold mb-4 text-emerald-400">Local SEO & GMB</h2>
              <p className="text-gray-400 mb-6">Google My Business optimization to ensure you show up when customers search nearby.</p>
              <a href="/contact" className="text-emerald-400 font-semibold hover:underline">Learn more →</a>
            </div>
          </div>
        </div>
        
        <script type="application/ld+json">
          {JSON.stringify(schemas)}
        </script>
      </main>
      <Footer />
    </div>
  );
}
