import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import { useSEO, generateFAQSchema } from '../../utils/seo';

export default function FastWebsiteKerala() {
  const faqs = [
    { 
      question: "What is a good page load time for a business website?", 
      answer: "Ideally, your site should load in under 2 seconds. Any longer, and you risk losing up to 40% of your visitors." 
    },
    { 
      question: "How does site speed affect SEO?", 
      answer: "Google uses Core Web Vitals as a ranking signal. Faster sites provide a better user experience and are prioritized in search results." 
    }
  ];

  useSEO({
    title: 'Why Your Kerala Business Needs a Fast Website in 2025',
    description: 'Speed is the silent killer of conversions. Learn how to optimize your website for the Kerala market where mobile connectivity varies.',
    canonical: '/resources/fast-website-benefits-kerala',
    schema: generateFAQSchema(faqs)
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-4">
        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
              Why Your Kerala Business Needs a Fast Website in 2025
            </h1>
            <div className="flex items-center space-x-4 text-gray-400">
              <span>April 10, 2026</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-8">
            <p>
              In <strong>Kerala</strong>, while 5G is rolling out, many customers still browse on fluctuating mobile data connections while traveling or in rural areas. A slow website isn't just an annoyance; it's lost revenue.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-4">The 3-Second Rule</h2>
            <p>
              Studies show that if a website takes more than 3 seconds to load, 53% of mobile users will abandon the site. For a small business in Kochi or Trivandrum, that's half of your potential customers gone before they even see your offer.
            </p>

            <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-2xl my-10">
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">Speed Check:</h3>
              <p>
                Is your website under 1MB? Large images are the #1 reason for slow websites in Kerala. We use WebP technology to keep sites light and fast.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-4">Trust and Credibility</h2>
            <p>
              A fast website signals professionalism. When a site loads instantly, it builds immediate trust with the customer. Conversely, a sluggish site can make your business look outdated or unreliable.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-4">How to Speed Up Your Site</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>**Optimize Images**: Compress every image before uploading.</li>
              <li>**Use a CDN**: Deliver content from a server close to Kerala (like Mumbai or Chennai).</li>
              <li>**Minimize Code**: Remove unnecessary scripts and plugins.</li>
            </ul>
          </div>

          <section className="mt-20 pt-10 border-t border-gray-800">
            <h2 className="text-3xl font-bold mb-10 text-white">Performance FAQs</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                  <h3 className="text-xl font-bold text-emerald-400 mb-2">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
