import React, { useState } from 'react';
import { X, Mail, User, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, email: string) => void;
  productName: string;
  price: number;
}

export default function CheckoutModal({ isOpen, onClose, onConfirm, productName, price }: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    // Proceed immediately for better perceived performance
    onConfirm(name, email);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal */}
      <div className="relative bg-gray-900 w-full max-w-md rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] -z-0"></div>
        
        <div className="relative z-10 p-8 sm:p-10 space-y-8">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 id="modal-title" className="text-2xl font-black text-white">Almost there — one step to access</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Enter your email below — we'll send your Notion access link here instantly after payment.
              </p>
            </div>
            <button 
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Product</p>
              <p className="text-sm font-bold text-white truncate max-w-[200px]">{productName}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Total</p>
              <p className="text-xl font-black text-emerald-400">₹{price}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="checkout-name" className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                  <input
                    id="checkout-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 transition-all"
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="checkout-email" className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                  <input
                    id="checkout-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 transition-all"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm ml-1" role="alert">{error}</p>}

            <p className="text-[11px] text-gray-500 text-center leading-relaxed">
              🔒 Secure payment via Razorpay · No account needed · Instant delivery
            </p>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black text-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(16,185,129,0.3)] disabled:opacity-70 group"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" aria-hidden="true" />
                ) : (
                  <>
                    Proceed to Payment
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </>
                )}
              </button>
              
              <p className="text-center text-[10px] text-gray-500 uppercase font-bold tracking-widest flex items-center justify-center gap-2">
                <ShieldCheck size={12} className="text-emerald-500" aria-hidden="true" /> Secure payment via Razorpay
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
