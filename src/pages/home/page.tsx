
import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useSEO, generateLocalBusinessSchema, generateServiceSchema } from '../../utils/seo';

export default function Home() {
  useSEO({
    title: 'Kerala Business Website + WhatsApp + Google Maps Setup | Grow Your Business',
    description: 'Get more customer calls for your local business in Kerala. Professional website, WhatsApp Business setup, and Google Maps optimization. Fast delivery in 3 days, affordable pricing. Trusted by 500+ businesses across India. Website design, digital presence, and business growth solutions.',
    keywords: 'business website Kerala, WhatsApp Business setup, Google Maps profile, local business Kerala, website design, digital presence',
    canonical: '/',
    ogType: 'website',
    ogImage: 'https://static.readdy.ai/image/3a79f3d26d575281f009959c52307d03/4faeac9cacf9a888180dbe48ffa35e91.png'
  });

  useEffect(() => {
    // Add multiple Schema.org structured data
    const schemas = [
      generateLocalBusinessSchema(),
      generateServiceSchema()
    ];

    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'application/ld+json');
    scriptTag.textContent = JSON.stringify(schemas);
    document.head.appendChild(scriptTag);

    return () => {
      if (scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Pricing />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
