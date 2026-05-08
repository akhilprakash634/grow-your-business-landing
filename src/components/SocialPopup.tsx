import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// Using simple SVG icons since Lucide doesn't have WhatsApp/Telegram brand icons
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white fill-current">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white fill-current">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

export default function SocialPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    // Check if user has previously dismissed the popup persistently
    const dismissed = localStorage.getItem('socialPopupDismissedPermanent');
    if (dismissed) {
      setHasDismissed(true);
      return;
    }

    // Show popup after 8 seconds (slightly faster to catch attention but not too soon)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 8000);

    // Escape key listener to close
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleDismiss();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setHasDismissed(true);
      // Persistent dismissal so it doesn't irritate users on every visit
      localStorage.setItem('socialPopupDismissedPermanent', 'true');
    }, 500); // Wait for transition
  };

  if (hasDismissed) return null;

  return (
    <>
      {/* Backdrop for closing on click outside (Mobile/Desktop) */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleDismiss}
      />
      
      <div
        className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-[70] transition-all duration-500 ease-out transform ${isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-20 scale-95 opacity-0 pointer-events-none'
          }`}
      >
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-6 border border-slate-100 w-full max-w-sm md:w-80 relative overflow-hidden group">
          {/* Decorative background accent */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all z-20 rounded-full p-2"
            aria-label="Close"
          >
            <X size={20} strokeWidth={3} />
          </button>

          <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold border-2 border-white shadow-sm">
                  <WhatsAppIcon />
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm z-10">
                  <TelegramIcon />
                </div>
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-lg leading-tight tracking-tight">Join Our Community</h3>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] uppercase font-black text-emerald-600 tracking-widest">Free Access</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed font-medium">
              Join <strong className="text-slate-900">5,000+ entrepreneurs</strong> getting exclusive strategies and free high-value resources.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="https://chat.whatsapp.com/Hnv1hJpBYZcA7LvUPnBV6D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-3.5 px-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-sm font-black shadow-lg shadow-emerald-500/30 transition-all active:scale-95 group/btn"
              >
                <WhatsAppIcon />
                Join WhatsApp Group
              </a>
              <a
                href="https://t.me/+nU7ZzIXV_dkyNTJl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-3.5 px-6 bg-[#2AABEE] hover:bg-[#2298D6] text-white rounded-2xl text-sm font-black shadow-lg shadow-[#2AABEE]/30 transition-all active:scale-95 group/btn"
              >
                <TelegramIcon />
                Join Telegram Channel
              </a>
            </div>
            
            <button 
              onClick={handleDismiss}
              className="w-full mt-4 text-xs text-slate-400 font-bold uppercase tracking-widest hover:text-slate-600 transition-colors"
            >
              No thanks, maybe later
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
