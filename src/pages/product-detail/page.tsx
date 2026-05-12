import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gtag } from '../../utils/analytics';
import { client } from '../../lib/sanity';
import { initiateCheckout } from '../../utils/razorpay';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import CheckoutModal from './CheckoutModal';
import { useSEO, generateProductSchema, generateBreadcrumbSchema } from '../../utils/seo';
import { ChevronLeft, ChevronRight, Download, ShieldCheck, Zap, ArrowRight, Loader2, Star, CheckCircle2, Clock, Users, Lock, X, Images } from 'lucide-react';

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
}

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  profession?: string;
  createdAt: string;
}

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

    window.addEventListener('scroll', handleScroll);
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
      
      <main className="flex-1 pt-20 md:pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-10 md:space-y-20">
          {/* Breadcrumb & Top Section */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors mb-6 md:mb-8 group">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Store
            </Link>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Side: Product Image & Pricing (Sticky on Desktop) */}
              <div className="lg:col-span-5 space-y-6 md:space-y-8 lg:sticky lg:top-24">
                <div className="bg-gray-900 rounded-3xl lg:rounded-[2rem] p-4 md:p-8 border border-white/5 shadow-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-50"></div>
                  <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] group-hover:bg-emerald-500/30 transition-colors duration-700"></div>
                  
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.title} 
                      className="w-full h-auto rounded-2xl shadow-2xl relative z-10 transform group-hover:scale-[1.03] transition-transform duration-700 brightness-[1.1] contrast-[1.05] drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                    />
                  ) : (
                    <div className="aspect-[4/5] bg-gray-800 rounded-2xl flex items-center justify-center relative z-10">
                      <Download size={64} className="text-gray-700" />
                    </div>
                  )}
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center space-y-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-white">4.9/5 Rating</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center space-y-2">
                    <Users className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-bold text-white">500+ Buyers</span>
                  </div>
                </div>

                {/* Pricing Card */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl lg:rounded-[2.5rem] shadow-2xl relative overflow-hidden group/card">
                  {/* Countdown Banner */}
                  {timeLeft > 0 && (
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 py-3 px-4 text-center border-b border-white/10 relative z-20">
                      <div className="flex items-center justify-center gap-3">
                        <Clock size={16} className="text-white animate-pulse" />
                        <p className="text-white text-sm font-black uppercase tracking-tighter">
                          Limited Time Launch Offer: <span className="text-yellow-300 ml-1">{formatTime(timeLeft)}</span> left
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="p-5 sm:p-10 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] -z-0"></div>
                    
                    <div className="relative z-10 space-y-8">
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Special Launch Price</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-4xl sm:text-5xl font-black text-white">₹{product.offerPrice}</span>
                          {product.actualPrice > product.offerPrice && (
                            <span className="text-lg sm:text-xl text-gray-600 font-medium line-through decoration-emerald-500/50 decoration-2">₹{product.actualPrice}</span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <button 
                          onClick={handlePurchase}
                          disabled={isPurchasing}
                          className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xl rounded-2xl transition-all active:scale-[0.98] shadow-[0_20px_50px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 disabled:opacity-70 group"
                        >
                          {isPurchasing ? (
                            <>
                              <Loader2 className="w-6 h-6 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              Get Instant Access for ₹{product.offerPrice} →
                            </>
                          )}
                        </button>
                        
                        <p className="text-center text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-2 flex items-center justify-center gap-2">
                          <Lock size={12} className="text-emerald-500" /> 256-bit Secure Checkout
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <ShieldCheck size={18} className="text-emerald-500" />
                          Verified Digital Access
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <Clock size={18} className="text-blue-500" />
                          Lifetime Updates Included
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Persuasive Landing Page Flow */}
              <div className="lg:col-span-7 space-y-10 md:space-y-16">
                {/* 1. Hero / Hook */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                    <Zap size={10} className="fill-emerald-400" /> High-Performance System
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] text-white tracking-tight">
                    {product.headline || product.title.replace(/-/g, ' ')}
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-medium">
                    {product.subheadline || product.description}
                  </p>
                </div>

                {/* 2. Problem Section */}
                {product.problemPoints && product.problemPoints.length > 0 && (
                  <div className="bg-red-500/5 border border-red-500/10 rounded-[2rem] p-8 space-y-6">
                    <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
                      <X className="w-5 h-5" /> Does this sound like you?
                    </h3>
                    <ul className="space-y-4">
                      {product.problemPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500/40 mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 3. Solution Section */}
                {product.solutionText && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white">The Simple Solution</h3>
                    <div className="prose prose-invert max-w-none text-gray-400 text-lg leading-relaxed whitespace-pre-wrap">
                      {product.solutionText}
                    </div>
                  </div>
                )}

                {/* 4. What You Get (Deliverables) */}
                <div className="bg-gray-900/40 border border-white/5 rounded-[2rem] p-8 space-y-8">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-500" /> What's Included Today
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {(product.deliverables || [
                      "Full Digital Playbook (PDF)",
                      "Step-by-Step Execution Guide",
                      "Ready-to-use Templates",
                      "Bonus Resource Library"
                    ]).map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-emerald-500/30 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                          <CheckCircle2 size={16} />
                        </div>
                        <span className="text-gray-300 font-medium leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Screenshots / Preview Images Section */}
                {product.previewUrls && product.previewUrls.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <Images size={20} />
                      </span>
                      Inside Preview
                    </h3>
                    <p className="text-gray-500 text-sm">Click any image to view full size</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product.previewUrls.map((url, i) => (
                        <button
                          key={i}
                          onClick={() => openLightbox(i)}
                          className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gray-900 aspect-video shadow-lg hover:border-emerald-500/40 hover:shadow-emerald-500/10 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <img
                            src={`${url}?w=1200&q=90`}
                            alt={`Preview ${i + 1}`}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs font-bold bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                              View Full
                            </span>
                          </div>
                          <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                            {i + 1}/{product.previewUrls!.length}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. Audience Section */}
                {product.audience && product.audience.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white">Who is this for?</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.audience.map((person, i) => (
                        <span key={i} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 font-bold text-sm">
                          {person}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. Benefits Section */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-8">
                    {product.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 shadow-lg shadow-emerald-500/10">
                          <Zap size={24} className="fill-current" />
                        </div>
                        <span className="text-gray-300 font-bold text-lg leading-tight">{benefit}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* 7. FAQ Section */}
                {product.faqs && product.faqs.length > 0 && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>
                    <div className="grid gap-4">
                      {product.faqs.map((faq, i) => (
                        <div key={i} className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 space-y-2">
                          <h4 className="font-bold text-white text-lg">Q: {faq.question}</h4>
                          <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Customer Reviews Section (Full Width) */}
          <div className="pt-10 md:pt-16 border-t border-white/5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-8 md:mb-12">
              <div className="space-y-4">
                <h3 className="text-3xl sm:text-4xl font-black text-white">Customer Reviews</h3>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-2xl font-bold text-white">
                    <Star className="text-yellow-500 fill-yellow-500" size={24} /> 4.9/5
                  </div>
                  <div className="h-4 w-px bg-white/10"></div>
                  <div className="text-gray-400 font-medium">Based on 500+ happy buyers</div>
                </div>
              </div>

              <button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-emerald-500 hover:text-white transition-all active:scale-95 shadow-xl"
              >
                <Star size={20} className={showReviewForm ? 'fill-current' : ''} />
                {showReviewForm ? 'Close Review Form' : 'Write a Review'}
              </button>
            </div>

            {/* Review Form (Toggleable) */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showReviewForm ? 'max-h-[800px] opacity-100 mb-16' : 'max-h-0 opacity-0'}`}>
              <form onSubmit={handleSubmitReview} className="bg-gray-900 border border-white/10 rounded-[2.5rem] p-8 sm:p-12 space-y-8 shadow-3xl">
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-bold text-white">Your Experience Matters</h4>
                  <button type="button" onClick={() => setShowReviewForm(false)} className="text-gray-500 hover:text-white">
                    <ChevronLeft size={24} className="rotate-90" />
                  </button>
                </div>
                
                {reviewStatus && (
                  <div className={`p-6 rounded-2xl text-sm font-bold ${reviewStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {reviewStatus.message}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Public Name</label>
                    <input 
                      required
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. John D."
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Profession/Role</label>
                    <input 
                      value={reviewProfession}
                      onChange={(e) => setReviewProfession(e.target.value)}
                      placeholder="e.g. Entrepreneur, Digital Marketer"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Star Rating</label>
                    <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-2xl px-6 py-3 h-[60px]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="transition-transform hover:scale-125 active:scale-90"
                        >
                          <Star 
                            size={32} 
                            className={`${star <= reviewRating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-800'}`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Your Review</label>
                  <textarea 
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="What did you like most about this product?"
                    rows={4}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none text-lg"
                  />
                </div>

                <div className="flex justify-end">
                  <button 
                    disabled={isSubmittingReview}
                    className="w-full md:w-auto px-12 py-5 bg-emerald-500 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(16,185,129,0.3)] text-xl"
                  >
                    {isSubmittingReview ? <Loader2 className="animate-spin" /> : 'Publish My Review'}
                  </button>
                </div>
              </form>
            </div>

            {/* Reviews List (3-Column Grid) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review._id} className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 space-y-6 hover:bg-white/[0.05] transition-colors group">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center text-emerald-400 font-black text-xl shadow-inner">
                          {review.name[0]}
                        </div>
                        <div>
                          <h5 className="font-bold text-white text-lg">{review.name}</h5>
                          {review.profession && (
                            <p className="text-emerald-500/80 text-xs font-bold uppercase tracking-wider mb-1">{review.profession}</p>
                          )}
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} className={`${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-800'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                        {new Date(review.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                    <p className="text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors">
                      "{review.comment}"
                    </p>
                  </div>
                ))
              ) : (
                <div className="lg:col-span-3 text-center py-20 bg-white/[0.02] border border-white/5 border-dashed rounded-[3rem]">
                  <div className="inline-flex w-16 h-16 rounded-full bg-white/5 items-center justify-center mb-4">
                    <Star size={32} className="text-gray-700" />
                  </div>
                  <p className="text-xl text-gray-500 font-medium italic">No reviews yet. Be the first to share your experience!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Mobile Button */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-gray-950/80 backdrop-blur-xl border-t border-white/10 z-[60] transition-transform duration-300 ${showSticky ? 'translate-y-0 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]' : 'translate-y-full'}`}>
        <button
          onClick={handlePurchase}
          disabled={isPurchasing}
          className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isPurchasing ? <Loader2 className="w-5 h-5 animate-spin" /> : `Get Instant Access for ₹${product.offerPrice} →`}
        </button>
      </div>

      <Footer />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onConfirm={handleConfirmCheckout}
        productName={product.title}
        price={product.offerPrice}
      />

      {/* Lightbox */}
      {lightboxOpen && product.previewUrls && product.previewUrls.length > 0 && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-bold bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
            {lightboxIndex + 1} / {product.previewUrls.length}
          </div>

          {/* Prev */}
          {product.previewUrls.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-4xl max-h-[85vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={lightboxIndex}
              src={product.previewUrls[lightboxIndex]}
              alt={`Preview ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl animate-in fade-in duration-200"
            />
          </div>

          {/* Next */}
          {product.previewUrls.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Thumbnails strip */}
          {product.previewUrls.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] pb-1">
              {product.previewUrls.map((url, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    i === lightboxIndex
                      ? 'border-emerald-500 opacity-100 scale-110'
                      : 'border-white/20 opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={url} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


