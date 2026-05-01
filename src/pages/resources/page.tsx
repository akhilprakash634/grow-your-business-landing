import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import { useSEO } from '../../utils/seo';

export default function BlogPage() {
  const posts = [
    {
      title: "How AI is Revolutionizing Local Business in Kerala and UAE",
      excerpt: "Discover how smart automation and AI-driven SEO can help your business stay ahead of the competition in 2025.",
      date: "May 1, 2026",
      slug: "ai-business-growth-kerala"
    },
    {
      title: "5 Tips for Optimizing Your Google Business Profile",
      excerpt: "Learn the secrets to ranking #1 on Google Maps in your local area and getting more customer calls.",
      date: "April 25, 2026",
      slug: "google-business-profile-tips"
    },
    {
      title: "The Ultimate Guide to WhatsApp Marketing for UAE Businesses",
      excerpt: "Why WhatsApp is the #1 conversion tool for businesses in Dubai and Abu Dhabi, and how to set it up.",
      date: "April 15, 2026",
      slug: "whatsapp-marketing-guide-uae"
    },
    {
      title: "Why Your Kerala Business Needs a Fast Website in 2025",
      excerpt: "Speed is a ranking factor. See how a fast website improves your SEO and customer trust in Kerala.",
      date: "April 10, 2026",
      slug: "fast-website-benefits-kerala"
    },
    {
      title: "Choosing the Right IT Partner in the Middle East",
      excerpt: "Key factors to consider when hiring an IT agency for your business expansion in the Middle East.",
      date: "April 5, 2026",
      slug: "choosing-right-it-partner"
    }
  ];

  useSEO({
    title: 'Business Growth Blog | IT & Digital Marketing Insights',
    description: 'Expert advice on website design, SEO, and business automation for entrepreneurs in Kerala and UAE.',
    canonical: '/resources',
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold mb-12 text-white">Resources & Insights</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {posts.map((post, i) => (
              <div key={i} className="group p-8 bg-gray-900 rounded-3xl border border-gray-800 hover:border-emerald-500/30 transition-all">
                <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">{post.date}</span>
                <h2 className="text-2xl font-bold mt-4 mb-4 text-white group-hover:text-emerald-400 transition-colors">
                  <a href={`/resources/${post.slug}`}>{post.title}</a>
                </h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">{post.excerpt}</p>
                <a href={`/resources/${post.slug}`} className="inline-flex items-center text-emerald-400 font-bold hover:translate-x-2 transition-transform">
                  Read Full Article <i className="ri-arrow-right-line ml-2"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
