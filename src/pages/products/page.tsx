import { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Layout, Sparkles, Eye } from 'lucide-react';
import { fetchProducts, optimisedImageUrl, getImageSrcSet } from '../../lib/sanity';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';

import { useSEO } from '../../utils/seo';

// Lazy load the heavy preview modal
const QuickPreviewModal = lazy(() => import('./components/QuickPreviewModal'));

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
        <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-6 relative overflow-hidden border-b border-white/5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -z-10"></div>
          <div className="max-w-7xl mx-auto text-center space-y-4 md:space-y-6">
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
        <section className="py-10 md:py-20 px-6 bg-gray-950/50">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-gray-900 h-[400px] rounded-3xl border border-white/5"></div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                            src={optimisedImageUrl(product.imageUrl, { w: 600, h: 450 })} 
                            srcSet={getImageSrcSet(product.imageUrl, [300, 600, 900])}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt={product.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                            width="600"
                            height="450"
                            decoding="async"
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

      {/* Quick Preview Modal - Lazy Loaded */}
      <Suspense fallback={null}>
        {previewProduct && (
          <QuickPreviewModal 
            product={previewProduct}
            activePreviewIndex={activePreviewIndex}
            setActivePreviewIndex={setActivePreviewIndex}
            onClose={() => setPreviewProduct(null)}
          />
        )}
      </Suspense>

      <Footer />
    </div>
  );
}
