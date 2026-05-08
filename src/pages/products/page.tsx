import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Layout, Search, Sparkles, X, Eye, ArrowRight } from 'lucide-react';
import { fetchProducts } from '../../lib/sanity';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';

import { useSEO } from '../../utils/seo';

interface SanityProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  actualPrice: number;
  offerPrice: number;
  type?: string;
  tag?: string;
  previewUrls?: string[];
}

export default function ProductsPage() {
  useSEO({
    title: 'The Growth Store | Premium Digital Assets for Businesses',
    description: 'Explore our catalog of high-converting templates, expert guides, and digital business systems to scale your agency or freelance work.',
    canonical: '/products',
  });
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewProduct, setPreviewProduct] = useState<SanityProduct | null>(null);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 relative overflow-hidden border-b border-white/5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -z-10"></div>
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} /> Premium Business Assets
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white">
              The <span className="text-emerald-400">Growth</span> Store
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Plug-and-play systems, high-converting templates, and expert guides to help you scale your freelance or agency business.
            </p>
          </div>
        </section>

        {/* Catalog Section */}
        <section className="py-20 px-6 bg-gray-950/50">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-gray-900 h-[400px] rounded-3xl border border-white/5"></div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div 
                      key={product._id}
                      className="group bg-gray-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500 flex flex-col hover:shadow-2xl hover:shadow-emerald-500/5 relative"
                    >
                      {/* Product Image Container */}
                      <div className="aspect-[4/3] bg-gray-800 relative overflow-hidden">
                        {product.imageUrl ? (
                          <img 
                            src={product.imageUrl} 
                            alt={product.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-emerald-400/20">
                            <Layout size={64} />
                          </div>
                        )}
                        
                        {/* Overlay with Quick Preview Button */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                          <button 
                            onClick={() => {
                              setPreviewProduct(product);
                              setActivePreviewIndex(0);
                            }}
                            className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 active:scale-95 shadow-xl"
                          >
                            <Eye size={18} /> Quick Preview
                          </button>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-60 pointer-events-none"></div>
                        
                        {product.tag && (
                          <span className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                            {product.tag}
                          </span>
                        )}
                        
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                           <span className="text-gray-400 text-xs font-bold uppercase tracking-widest bg-gray-900/80 backdrop-blur-md px-3 py-1 rounded-lg">
                            {product.type || 'Digital Asset'}
                           </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                            {product.title}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-bold uppercase line-through">₹{product.actualPrice}</span>
                            <span className="text-2xl font-black text-white">₹{product.offerPrice}</span>
                          </div>
                          <Link 
                            to={`/${product.slug}`}
                            className="bg-emerald-500 text-white p-3 rounded-xl hover:bg-emerald-600 transition-all active:scale-90 shadow-lg shadow-emerald-500/20"
                          >
                            <ChevronRight size={24} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center space-y-6">
                    <div className="bg-gray-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-gray-700">
                      <ShoppingBag size={40} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white">No products yet</h3>
                      <p className="text-gray-400">Check back soon for new premium resources!</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Quick Preview Modal */}
      {previewProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
            onClick={() => setPreviewProduct(null)}
          ></div>
          
          <div className="relative bg-gray-900 border border-white/10 rounded-[2.5rem] w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in fade-in zoom-in duration-300 max-h-[90vh]">
            <button 
              onClick={() => setPreviewProduct(null)}
              className="absolute top-6 right-6 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X size={24} />
            </button>

            {/* Modal PDF Sample Section */}
            <div className="w-full lg:w-[60%] bg-gray-800 relative flex flex-col">
              <div className="flex-1 overflow-hidden relative group">
                {previewProduct.previewUrls && previewProduct.previewUrls.length > 0 ? (
                  <>
                    <img 
                      src={previewProduct.previewUrls[activePreviewIndex]} 
                      alt={`${previewProduct.title} Preview ${activePreviewIndex + 1}`} 
                      className="w-full h-full object-contain bg-gray-950" 
                    />
                    
                    {/* Navigation Arrows */}
                    {previewProduct.previewUrls.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePreviewIndex(prev => prev > 0 ? prev - 1 : previewProduct.previewUrls!.length - 1);
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronRight size={24} className="rotate-180" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePreviewIndex(prev => prev < previewProduct.previewUrls!.length - 1 ? prev + 1 : 0);
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 p-12 text-center space-y-4">
                    <Layout size={80} className="text-gray-700" />
                    <p className="text-lg">Full PDF preview not available for this item yet.</p>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Strip */}
              {previewProduct.previewUrls && previewProduct.previewUrls.length > 1 && (
                <div className="bg-gray-950/50 p-4 flex gap-2 overflow-x-auto border-t border-white/5 scrollbar-hide">
                  {previewProduct.previewUrls.map((url, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActivePreviewIndex(idx)}
                      className={`relative flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${activePreviewIndex === idx ? 'border-emerald-500 scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Info */}
            <div className="w-full lg:w-[40%] p-8 sm:p-10 flex flex-col overflow-y-auto bg-gray-900">
              <div className="space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    PDF Sample Preview
                  </span>
                  <h2 className="text-3xl font-black text-white leading-tight mb-4">
                    {previewProduct.title}
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-black text-white">₹{previewProduct.offerPrice}</span>
                    <span className="text-lg text-gray-500 font-bold uppercase line-through">₹{previewProduct.actualPrice}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-400 leading-relaxed">
                    {previewProduct.description}
                  </p>
                  
                  <div className="bg-gray-800/50 rounded-2xl p-6 border border-white/5 space-y-3">
                    <h4 className="text-white font-bold flex items-center gap-2">
                      <Sparkles size={16} className="text-emerald-400" /> What's included:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                        Full High-Resolution PDF Playbook
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                        Ready-to-use Worksheets & Checklists
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                        Bonus Video Walkthrough (if applicable)
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6">
                  <Link 
                    to={`/${previewProduct.slug}`}
                    className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black text-xl hover:bg-emerald-600 transition-all text-center flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 active:scale-95"
                  >
                    Get Full Access <ArrowRight size={20} />
                  </Link>
                  <p className="text-center text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-4">
                    SECURE RAZORPAY CHECKOUT • INSTANT DELIVERY
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
