import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import { useSEO, generateLocalBusinessSchema } from '../../utils/seo';

export default function AboutPage() {
  useSEO({
    title: 'About Grow Your Business | Leading IT Agency in Kerala & UAE',
    description: 'Learn about our mission to digitize local businesses in Kerala and UAE. Over 500+ successful projects delivered.',
    canonical: '/about',
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-white">About Us</h1>
          <div className="max-w-3xl">
            <p className="text-xl text-gray-400 mb-6">
              Grow Your Business was founded with a single mission: to help local entrepreneurs in Kerala and the UAE harness the power of the internet to scale their operations.
            </p>
            <p className="text-gray-300 text-lg mb-8">
              We specialize in bridging the gap between traditional business and the digital world. Our team of experts understands the local market nuances in both Kerala and the UAE, allowing us to deliver solutions that actually work for our clients.
            </p>
          </div>
        </div>
        <script type="application/ld+json">
          {JSON.stringify(generateLocalBusinessSchema())}
        </script>
      </main>
      <Footer />
    </div>
  );
}
