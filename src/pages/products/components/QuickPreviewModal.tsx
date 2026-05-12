import { X, ChevronRight, Layout, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { optimisedImageUrl, getImageSrcSet } from '../../../lib/sanity';

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

interface QuickPreviewModalProps {
  product: SanityProduct;
  activePreviewIndex: number;
  setActivePreviewIndex: (index: number | ((prev: number) => number)) => void;
  onClose: () => void;
}

export default function QuickPreviewModal({ 
  product, 
  activePreviewIndex, 
  setActivePreviewIndex, 
  onClose 
}: QuickPreviewModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-gray-900 border border-white/10 rounded-3xl lg:rounded-[2.5rem] w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in fade-in zoom-in duration-300 max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-md transition-colors"
        >
          <X size={24} />
        </button>

        {/* Modal PDF Sample Section */}
        <div className="w-full lg:w-[60%] bg-gray-800 relative flex flex-col">
          <div className="flex-1 overflow-hidden relative group">
            {product.previewUrls && product.previewUrls.length > 0 ? (
              <>
                <img 
                  src={optimisedImageUrl(product.previewUrls[activePreviewIndex], { w: 1000 })} 
                  srcSet={getImageSrcSet(product.previewUrls[activePreviewIndex], [600, 1000, 1400])}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  alt={`${product.title} Preview ${activePreviewIndex + 1}`} 
                  className="w-full h-full object-contain bg-gray-950" 
                  loading="eager"
                  decoding="async"
                />
                
                {/* Navigation Arrows */}
                {product.previewUrls.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePreviewIndex(prev => prev > 0 ? (prev as number) - 1 : product.previewUrls!.length - 1);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight size={24} className="rotate-180" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePreviewIndex(prev => (prev as number) < product.previewUrls!.length - 1 ? (prev as number) + 1 : 0);
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
          {product.previewUrls && product.previewUrls.length > 1 && (
            <div className="bg-gray-950/50 p-4 flex gap-2 overflow-x-auto border-t border-white/5 scrollbar-hide">
              {product.previewUrls.map((url, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActivePreviewIndex(idx)}
                  className={`relative flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${activePreviewIndex === idx ? 'border-emerald-500 scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img 
                    src={optimisedImageUrl(url, { w: 200, h: 250 })} 
                    srcSet={getImageSrcSet(url, [100, 200])}
                    alt="" 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                    width="64"
                    height="80"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Info */}
        <div className="w-full lg:w-[40%] p-6 sm:p-10 flex flex-col overflow-y-auto bg-gray-900">
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                PDF Sample Preview
              </span>
              <h2 className="text-3xl font-black text-white leading-tight mb-4">
                {product.title}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-white">₹{product.offerPrice}</span>
                <span className="text-lg text-gray-500 font-bold uppercase line-through">₹{product.actualPrice}</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-400 leading-relaxed">
                {product.description}
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
                to={`/${product.slug}`}
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
  );
}
