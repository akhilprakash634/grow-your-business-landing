import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Layout, ArrowRight } from 'lucide-react';
import { fetchProducts } from '../../../lib/sanity';

interface SanityProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  price: number;
  downloadLink: string;
  type?: string;
  tag?: string;
  oldPrice?: string;
}

export default function Products() {
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products from Sanity:', error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return (
      <section id="products" className="py-24 bg-gray-950">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-4 w-32 bg-gray-800 rounded mb-4"></div>
            <div className="h-8 w-64 bg-gray-800 rounded mb-4"></div>
            <div className="h-4 w-96 bg-gray-800 rounded mb-16"></div>
            <div className="grid gap-6 w-full">
              {[1, 2].map((i) => (
                <div key={i} className="h-40 bg-gray-800 rounded-2xl w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback products if Sanity is empty
  const displayProducts = products.length > 0 ? products : [
    {
      _id: 'first-client',
      title: 'First Freelance Client System',
      slug: 'first-client',
      description: 'The exact step-by-step system for beginners to land their first high-paying client in 72 hours.',
      price: 199,
      oldPrice: '₹299',
      imageUrl: '/product-hero.png',
      downloadLink: '#',
      type: 'Digital System (PDF)',
      tag: 'Bestseller'
    },
    {
      _id: 'women-income-ideas',
      title: 'Income Making Ideas for Women (Hindi/Marathi)',
      slug: 'women-income-ideas',
      description: '50+ proven work-from-home and business ideas for women in Hindi and Marathi. Start with zero investment.',
      price: 99,
      oldPrice: '₹199',
      imageUrl: '/women-income.png',
      downloadLink: '#',
      type: 'Digital Guide (PDF)',
      tag: 'New'
    }
  ];

  return (
    <section id="products" className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-emerald-400 font-bold tracking-wider text-xs uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <ShoppingBag className="w-3 h-3" /> Digital Store
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Scale Faster with <span className="text-emerald-400">Our Assets</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Premium systems, templates, and guides designed to help you build and grow your business.
          </p>
        </div>

        <div className="grid gap-6">
          {displayProducts.map((product) => (
            <div 
              key={product._id}
              className="group bg-gray-900/40 border border-white/5 rounded-2xl p-4 md:p-6 hover:bg-gray-900 hover:border-emerald-500/30 transition-all duration-300 relative"
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-32 lg:w-40 aspect-square bg-emerald-500/10 rounded-xl overflow-hidden flex-shrink-0 group-hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)] transition-all">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-emerald-400">
                      <Layout className="w-8 h-8" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-3 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center justify-center md:justify-start gap-3">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{product.type || 'Digital Product'}</span>
                        {product.tag && (
                          <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {product.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{product.title}</h3>
                    </div>
                    
                    <div className="flex items-baseline justify-center md:justify-end gap-2">
                      <span className="text-2xl font-black text-white">₹{product.price}</span>
                      {product.oldPrice && (
                        <span className="text-gray-500 line-through text-xs font-medium">{product.oldPrice}</span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                    {product.description}
                  </p>

                  <div className="pt-2 flex justify-center md:justify-start">
                    <Link 
                      to={`/${product.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all bg-emerald-500 text-white hover:bg-emerald-600 hover:translate-x-1 active:scale-95 shadow-[0_10px_20px_rgba(16,185,129,0.15)]"
                    >
                      Get Instant Access <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-400 transition-colors text-sm font-semibold group">
            View All Resources <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
