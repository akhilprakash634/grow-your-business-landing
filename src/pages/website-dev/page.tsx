import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import { useSEO } from '../../utils/seo';

export default function WebsiteDevPage() {
  useSEO({
    title: 'Professional Website Development Kerala & UAE | High Converting Designs',
    description: 'Get a mobile-friendly, fast-loading website for your business. Specializing in local business growth in Kerala and UAE.',
    canonical: '/website-dev',
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-white">Website Development</h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl">
            Your website is your 24/7 salesperson. We build sites that don't just look good but drive real business results.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <div>
              <h2 className="text-3xl font-bold text-emerald-400 mb-6">Mobile-First Design</h2>
              <p className="text-gray-300 text-lg">
                Over 80% of your customers in Kerala and UAE access your site via mobile. We ensure your site is lightning-fast and perfectly responsive on every device.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-emerald-400 mb-6">SEO Optimized</h2>
              <p className="text-gray-300 text-lg">
                Every site we build is optimized for search engines from day one. Proper H1-H6 structure, meta tags, and schema markup are standard.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
