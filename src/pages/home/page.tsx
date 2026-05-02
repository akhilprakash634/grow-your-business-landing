import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Services from './components/Services';
import Pricing from './components/Pricing';
import SocialProof from './components/SocialProof';
import HowItWorks from './components/HowItWorks';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useSEO, generateLocalBusinessSchema, generateServiceSchema, generateOrganizationSchema } from '../../utils/seo';

export default function Home() {
  const schemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateServiceSchema()
  ];

  useSEO({
    title: 'IT Services & Website Design Kerala | Grow Your Business UAE',
    description: 'Expert IT services, professional website design, and digital growth solutions for businesses in Kerala and UAE. High-converting websites, WhatsApp marketing, and GMB optimization.',
    keywords: 'IT services Kerala, website design Kerala, digital marketing UAE, business growth Kerala, WhatsApp marketing Kerala, local SEO Kerala',
    canonical: '/',
    ogType: 'website',
    ogImage: 'https://static.readdy.ai/image/3a79f3d26d575281f009959c52307d03/4faeac9cacf9a888180dbe48ffa35e91.png',
    schema: schemas
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        <Hero />
        <Problem />
        <Services />
        <Pricing />
        <SocialProof />
        <HowItWorks />
        <Products />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
