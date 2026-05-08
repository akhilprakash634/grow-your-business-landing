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
    // Check if user has previously dismissed the popup in this session
    const dismissed = sessionStorage.getItem('socialPopupDismissed');
    if (dismissed) {
      setHasDismissed(true);
      return;
    }

    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setHasDismissed(true);
    sessionStorage.setItem('socialPopupDismissed', 'true');
  };

  if (hasDismissed) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-500 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-5 border border-slate-100 w-80 relative overflow-hidden group">
        {/* Decorative background blur */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>

        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors z-10 bg-slate-50 rounded-full p-1"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold border-2 border-white shadow-sm">
                <WhatsAppIcon />
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm z-10">
                <TelegramIcon />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 leading-tight">Join Our Community</h3>
              <div className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Free Access</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            Get exclusive access to <strong className="text-slate-800">new products</strong>, free resources, and premium business strategies.
          </p>

          <div className="flex flex-col gap-2">
            <a
              href="https://chat.whatsapp.com/Hnv1hJpBYZcA7LvUPnBV6D" // TODO: Replace with actual link
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-emerald-500/20 transition-all active:scale-95 group/btn"
            >
              <WhatsAppIcon />
              Join WhatsApp Group
            </a>
            <a
              href="https://t.me/+nU7ZzIXV_dkyNTJl" // TODO: Replace with actual link
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#2AABEE] hover:bg-[#2298D6] text-white rounded-xl text-sm font-semibold shadow-md shadow-[#2AABEE]/20 transition-all active:scale-95 group/btn"
            >
              <TelegramIcon />
              Join Telegram Channel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
