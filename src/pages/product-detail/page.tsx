import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gtag } from '../../utils/analytics';
import { client, optimisedImageUrl, getImageSrcSet } from '../../lib/sanity';
import { initiateCheckout } from '../../utils/razorpay';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';

const CheckoutModal = lazy(() => import('./CheckoutModal'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const ReviewsSection = lazy(() => import('./components/ReviewsSection'));
const Lightbox = lazy(() => import('./components/Lightbox'));
import { useSEO, generateProductSchema, generateBreadcrumbSchema } from '../../utils/seo';
import { ChevronLeft, ChevronRight, Download, ShieldCheck, Zap, Loader2, Star, CheckCircle2, Clock, Users, Lock, X, Images, Plus, Instagram, Twitter, Linkedin, Youtube, Github, Globe } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  actualPrice: number;
  offerPrice: number;
  imageUrl: string;
  downloadLink: string;
  slug: string;
  headline?: string;
  subheadline?: string;
  problemPoints?: string[];
  solutionText?: string;
  deliverables?: string[];
  benefits?: string[];
  audience?: string[];
  faqs?: FAQ[];
  ctaText?: string;
  countdown?: {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  };
  previewUrls?: string[];
  authorName?: string;
  authorBio?: string;
  authorImageUrl?: string;
  authorSocials?: { platform: string; url: string }[];
}

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  profession?: string;
  createdAt: string;
}

const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('instagram')) return Instagram;
  if (p.includes('twitter') || p.includes('x')) return Twitter;
  if (p.includes('linkedin')) return Linkedin;
  if (p.includes('youtube')) return Youtube;
  if (p.includes('github')) return Github;
  return Globe;
};

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  // Review Form State
  const [reviewName, setReviewName] = useState('');
  const [reviewProfession, setReviewProfession] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (product && product.countdown) {
      const { days = 0, hours = 0, minutes = 0, seconds = 0 } = product.countdown;
      const totalSeconds = (days * 24 * 3600) + (hours * 3600) + (minutes * 60) + seconds;
      setTimeLeft(totalSeconds);
    } else if (product) {
      setTimeLeft(0);
    }
  }, [product]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const d = Math.floor(totalSeconds / (3600 * 24));
    const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    
    const parts = [];
    if (d > 0) parts.push(`${d}d`);
    if (d > 0 || h > 0) parts.push(`${h}h`);
    parts.push(`${m}m`);
    parts.push(`${s}s`);
    
    return parts.join(' ');
  };

  // SEO Integration
  useSEO({
    title: product ? `${product.title.replace(/-/g, ' ')} | Grow Your Business` : 'Loading Product...',
    description: product?.description,
    canonical: `/products/${slug}`,
    ogType: 'product',
    ogImage: product?.imageUrl,
    schema: product ? [
      generateProductSchema(product),
      generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Products', url: '/products' },
        { name: product.title, url: `/products/${slug}` }
      ])
    ] : undefined
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setShowSticky(window.scrollY > 400);
    };

    // passive: true — never blocks scrolling, reduces jank
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex(i => (i - 1 + (product?.previewUrls?.length ?? 1)) % (product?.previewUrls?.length ?? 1));
  }, [product?.previewUrls?.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex(i => (i + 1) % (product?.previewUrls?.length ?? 1));
  }, [product?.previewUrls?.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, closeLightbox, prevImage, nextImage]);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const productData = await client.fetch(
          `*[_type == "product" && slug.current == $slug && disabled != true][0]{
            _id,
            title,
            description,
            actualPrice,
            offerPrice,
            "imageUrl": image.asset->url,
            downloadLink,
            "slug": slug.current,
            headline,
            subheadline,
            problemPoints,
            solutionText,
            deliverables,
            benefits,
            audience,
            faqs,
            ctaText,
            countdown,
            "previewUrls": previewImages[].asset->url,
            authorName,
            authorBio,
            "authorImageUrl": authorImage.asset->url,
            authorSocials,
            "reviews": *[_type == "review" && product._ref == ^._id && approved == true] | order(createdAt desc) {
              _id,
              name,
              rating,
              comment,
              profession,
              createdAt
            }
          }`,
          { slug }
        );
        
        if (productData) {
          setProduct(productData);
          
          // Track view_item
          gtag('event', 'view_item', {
            currency: 'INR',
            value: productData.offerPrice,
            items: [{
              item_id: productData._id,
              item_name: productData.title,
              price: productData.offerPrice,
              quantity: 1
            }]
          });

          if (productData.reviews) {
            setReviews(productData.reviews);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    getProductData();
  }, [slug]);

  const handlePurchase = () => {
    if (!product) return;
    
    if (product.offerPrice === 0) {
      if (product.downloadLink) {
        window.open(product.downloadLink, '_blank');
      } else {
        alert('Download link not found. Please contact support.');
      }
      return;
    }

    setIsCheckoutModalOpen(true);

    // Track add_to_cart (opening modal is high intent)
    gtag('event', 'add_to_cart', {
      currency: 'INR',
      value: product.offerPrice,
      items: [{
        item_id: product._id,
        item_name: product.title,
        price: product.offerPrice,
        quantity: 1
      }]
    });
  };

  const handleConfirmCheckout = (name: string, email: string) => {
    if (!product) return;
    setIsCheckoutModalOpen(false);
    setIsPurchasing(true);

    initiateCheckout({
      amount: product.offerPrice * 100,
      currency: 'INR',
      name: product.title,
      description: 'Digital Product Access',
      productId: product._id,
      image: product.imageUrl,
      buyerName: name,
      buyerEmail: email,
      onSuccess: (response) => {
        // Track purchase (pre-verification)
        gtag('event', 'begin_checkout', {
          currency: 'INR',
          value: product.offerPrice,
          items: [{
            item_id: product._id,
            item_name: product.title,
            price: product.offerPrice,
            quantity: 1
          }]
        });

        localStorage.setItem('buyer_email', email);
        navigate(`/thank-you?payment_id=${response.razorpay_payment_id}&product_id=${product._id}`);
      },
      onCancel: () => setIsPurchasing(false),
    });
  };

  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setIsSubmittingReview(true);
    setReviewStatus(null);

    try {
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000' 
        : (import.meta.env.VITE_API_URL || 'http://localhost:5000');

      const response = await fetch(`${apiUrl}/api/submit-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reviewName,
          profession: reviewProfession,
          rating: reviewRating,
          comment: reviewComment,
          productId: product._id
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setReviewStatus({ type: 'success', message: data.message });
        setReviewName('');
        setReviewProfession('');
        setReviewComment('');
        setReviewRating(5);
        // Hide form after success
        setTimeout(() => setShowReviewForm(false), 3000);
      } else {
        setReviewStatus({ type: 'error', message: data.error || 'Failed to submit review' });
      }
    } catch (error) {
      setReviewStatus({ type: 'error', message: 'Something went wrong. Please check if server is running.' });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center mt-20">
          <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-8">The resource you are looking for doesn't exist or has been moved.</p>
          <Link to="/" className="text-emerald-400 hover:underline flex items-center gap-2">
            <ChevronLeft size={20} /> Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      <Header />
      
      {/* 1. Trust Bar (Sticky below the fixed header) */}
      <div className="bg-gray-950 border-b border-white/5 py-2 mt-16 sm:mt-20 sticky top-16 sm:top-20 z-40 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center md:justify-between gap-6 md:gap-0 text-gray-400 text-[10px] sm:text-xs font-medium">
          <div className="flex items-center gap-2">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span>4.9/5 from 500+ buyers</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={12} className="text-emerald-500" />
            <span>Instant access after payment</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Clock size={12} className="text-emerald-500" />
            <span>Lifetime updates included</span>
          </div>
        </div>
      </div>
      
      <main className="flex-1 pt-8 sm:pt-12 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Back Link & Hero Headline */}
          <div className="space-y-8">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors group">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
              <span className="font-bold text-sm tracking-tight">Back to Store</span>
            </Link>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                <Zap size={10} className="fill-emerald-400" /> High-Performance System
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] text-white tracking-tight">
                {product.headline || product.title.replace(/-/g, ' ')}
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-medium max-w-3xl">
                {product.subheadline || product.description}
              </p>

              <div className="flex flex-wrap gap-4 items-center pt-2">
                {product.previewUrls && product.previewUrls.length > 0 && (
                  <button 
                    onClick={() => document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2 inline-flex items-center gap-2 transition-all hover:bg-blue-500/20 hover:scale-105"
                  >
                    <Images size={14} className="text-blue-400" />
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">See what's inside →</span>
                  </button>
                )}

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full shadow-sm">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] font-bold text-white">4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full shadow-sm">
                    <Users size={12} className="text-emerald-500" />
                    <span className="text-[10px] font-bold text-white">500+ Buyers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Side: Product Image & Pricing (Sticky on Desktop) */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
              <div className="bg-gray-900 rounded-3xl lg:rounded-[2rem] p-4 md:p-8 border border-white/5 shadow-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-50"></div>
                {product.imageUrl ? (
                  // LCP element: fetchpriority=high + explicit dims prevent CLS
                  // WebP/resize via Sanity CDN params saves ~2000KB
                  <img
                    src={optimisedImageUrl(product.imageUrl, { w: 800, q: 85 })}
                    srcSet={getImageSrcSet(product.imageUrl, [400, 600, 800, 1200])}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                    alt={product.title}
                    width={600}
                    height={750}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className="w-full h-auto rounded-2xl shadow-2xl relative z-10 transform group-hover:scale-[1.03] transition-transform duration-700 brightness-[1.1] contrast-[1.05] drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                  />
                ) : (
                  <div className="aspect-[4/5] bg-gray-800 rounded-2xl flex items-center justify-center relative z-10">
                    <Download size={64} className="text-gray-700" />
                  </div>
                )}
              </div>
              
              {/* Inside Preview (Repositioned for better mobile conversion) */}
              {product.previewUrls && product.previewUrls.length > 0 && (
                <div id="preview-section" className="space-y-6 scroll-mt-32 bg-white/[0.02] border border-white/5 rounded-3xl p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-tight">
                      <Images className="text-blue-400" size={16} /> Inside Preview
                    </h3>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-full border border-white/5">
                      {product.previewUrls.length} Views
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {product.previewUrls.slice(0, 4).map((url, i) => (
                      <div
                        key={i}
                        onClick={() => openLightbox(i)}
                        className="aspect-video bg-gray-900 rounded-xl overflow-hidden border border-white/5 cursor-zoom-in group/preview relative shadow-lg"
                      >
                        {/* lazy load below-fold thumbs; WebP at 300px saves ~80% size */}
                        <img
                          src={optimisedImageUrl(url, { w: 300, h: 200, q: 70 })}
                          srcSet={getImageSrcSet(url, [300, 600])}
                          sizes="(max-width: 640px) 50vw, 300px"
                          alt={`Inside preview screenshot ${i + 1} of ${product.title}`}
                          width={300}
                          height={200}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Plus size={18} className="text-white/60 scale-75 group-hover:scale-100 transition-transform" />
                        </div>
                      </div>
                    ))}
                    {product.previewUrls.length > 4 && (
                      <button 
                        onClick={() => openLightbox(4)}
                        className="col-span-2 py-2 text-[10px] font-bold text-gray-500 hover:text-emerald-400 transition-colors uppercase tracking-widest border-t border-white/5 mt-2"
                      >
                        + View All {product.previewUrls.length} Screenshots
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Pricing Card */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl lg:rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                {timeLeft > 0 && (
                  <div className="bg-gradient-to-r from-orange-600 to-red-600 py-3 px-4 text-center border-b border-white/10 relative z-20">
                    <div className="flex items-center justify-center gap-2">
                      <Clock size={14} className="text-white animate-pulse" />
                      <p className="text-white text-[10px] sm:text-xs font-black uppercase tracking-tighter">
                        Offer ends in: <span className="text-yellow-300 ml-1">{formatTime(timeLeft)}</span>
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-8 relative">
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Digital Access</p>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                        <CheckCircle2 size={10} className="text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-400">In Stock</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-black text-white">₹{product.offerPrice}</span>
                      {product.actualPrice > product.offerPrice && (
                        <span className="text-lg text-gray-600 font-medium line-through">₹{product.actualPrice}</span>
                      )}
                    </div>

                    <button
                      onClick={handlePurchase}
                      disabled={isPurchasing}
                      aria-label={`Get access to ${product.title} for ₹${product.offerPrice}`}
                      className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg rounded-2xl transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 group"
                    >
                      {isPurchasing ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : `Get Access Now →`}
                    </button>
                    
                    <div className="flex flex-col gap-2">
                      <p className="text-center text-[10px] text-gray-500 uppercase font-bold tracking-widest flex items-center justify-center gap-2">
                        <Lock size={12} className="text-emerald-500" /> 256-bit Secure Checkout
                      </p>
                      <p className="text-center text-[10px] text-gray-500 font-medium mt-1">
                        Questions? Email us — we'll make it right.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Review Strip */}
              {reviews.length > 0 && (
                <div className="space-y-4">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black px-1">What buyers say</p>
                  <div className="space-y-3">
                    {reviews.slice(0, 2).map((review) => (
                      <div key={review._id} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-black uppercase">
                            {review.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h6 className="text-sm font-bold text-white truncate">{review.name}</h6>
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={10} className={`${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-800'}`} />
                                ))}
                              </div>
                            </div>
                            {review.profession && (
                              <p className="text-emerald-500 text-[10px] uppercase font-bold tracking-tight">{review.profession}</p>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-500 text-[11px] italic leading-relaxed">
                          "{review.comment.length > 80 ? review.comment.substring(0, 80) + "..." : review.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Content Flow */}
            <div className="lg:col-span-7 space-y-16">
              

              {/* Problem Section */}
              {product.problemPoints && product.problemPoints.length > 0 && (
                <div className="bg-red-500/5 border border-red-500/10 rounded-[2rem] p-8 sm:p-10 space-y-6">
                  <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
                    <X className="w-5 h-5" /> Does this sound like you?
                  </h3>
                  <ul className="space-y-4">
                    {product.problemPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-4 text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/40 mt-2 shrink-0" />
                        <span className="text-sm sm:text-base leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Solution Section */}
              {product.solutionText && (
                <div className="space-y-6 px-4">
                  <h3 className="text-3xl font-black text-white tracking-tight">The Simple Solution</h3>
                  <div className="prose prose-invert max-w-none text-gray-400 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                    {product.solutionText}
                  </div>
                </div>
              )}

              {/* Deliverables */}
              <div className="bg-gray-900/40 border border-white/5 rounded-[2rem] p-8 sm:p-10 space-y-10">
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-500" size={28} /> What's Included Today
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {(product.deliverables || ["Full Digital Playbook", "Execution Guide", "Ready Templates", "Resource Library"]).map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="text-gray-300 font-bold text-sm leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audience Section */}
              {product.audience && product.audience.length > 0 && (
                <div className="space-y-8 px-4">
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase">Who is this for?</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.audience.map((person, i) => (
                      <span key={i} className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-gray-300 font-bold text-sm hover:bg-white/10 transition-colors">
                        {person}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits Section */}
              {product.benefits && product.benefits.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-8 px-4">
                  {product.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-5 group">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 shadow-lg shadow-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                        <Zap size={28} className="fill-current" />
                      </div>
                      <span className="text-gray-300 font-black text-lg leading-tight">{benefit}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Author Section */}
              {product.authorName && (
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden group">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    {/* Author Image */}
                    <div className="shrink-0">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-800 overflow-hidden border border-white/10 shadow-xl">
                        {product.authorImageUrl ? (
                          <img 
                            src={optimisedImageUrl(product.authorImageUrl, { w: 200, h: 200, q: 80 })}
                            srcSet={getImageSrcSet(product.authorImageUrl, [100, 200, 400])}
                            sizes="96px"
                            alt={product.authorName} 
                            width={96}
                            height={96}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-700">
                            <Users size={32} />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Author Details */}
                    <div className="flex-1 space-y-4 text-center sm:text-left">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Creator</span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{product.authorName}</h3>
                      </div>
                      
                      {product.authorBio && (
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-medium">
                          {product.authorBio}
                        </p>
                      )}

                      {/* Social Links */}
                      {product.authorSocials && product.authorSocials.length > 0 && (
                        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                          {product.authorSocials.map((social, i) => {
                            const Icon = getSocialIcon(social.platform);
                            return (
                              <a 
                                key={i}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-all"
                                title={social.platform}
                              >
                                <Icon size={16} />
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* FAQ Section */}
              <Suspense fallback={<div className="h-20 animate-pulse bg-white/5 rounded-3xl" />}>
                <FAQSection faqs={product.faqs || []} />
              </Suspense>
            </div>
          </div>

          {/* Full Width Reviews Section */}
          <Suspense fallback={<div className="h-40 animate-pulse bg-white/5 rounded-[3rem]" />}>
            <ReviewsSection
              reviews={reviews}
              showReviewForm={showReviewForm}
              setShowReviewForm={setShowReviewForm}
              handleSubmitReview={handleSubmitReview}
              reviewStatus={reviewStatus}
              reviewName={reviewName}
              setReviewName={setReviewName}
              reviewProfession={reviewProfession}
              setReviewProfession={setReviewProfession}
              reviewRating={reviewRating}
              setReviewRating={setReviewRating}
              reviewComment={reviewComment}
              setReviewComment={setReviewComment}
              isSubmittingReview={isSubmittingReview}
            />
          </Suspense>
        </div>
      </main>

      {/* Sticky Mobile Purchase Button */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-gray-950/80 backdrop-blur-xl border-t border-white/10 z-[110] transition-transform duration-300 ${showSticky && !isCheckoutModalOpen ? 'translate-y-0 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]' : 'translate-y-full'}`}>
        <button
          onClick={handlePurchase}
          disabled={isPurchasing}
          aria-label={`Get instant access to ${product.title} for ₹${product.offerPrice}`}
          className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isPurchasing ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : `Get Instant Access for ₹${product.offerPrice} →`}
        </button>
      </div>

      <Footer />

      <Suspense fallback={null}>
        <CheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          onConfirm={handleConfirmCheckout}
          productName={product.title}
          price={product.offerPrice}
        />
      </Suspense>

      {/* Lightbox */}
      <Suspense fallback={null}>
        <Lightbox
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          index={lightboxIndex}
          setIndex={setLightboxIndex}
          urls={product.previewUrls || []}
          prevImage={prevImage}
          nextImage={nextImage}
        />
      </Suspense>
    </div>
  );
}


