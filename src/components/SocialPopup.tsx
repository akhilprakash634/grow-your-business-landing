import { useState, useEffect } from 'react';
import { X, Users, ArrowRight } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // Check if we should show it at all on this mobile visit (60% chance)
    if (isMobile && Math.random() > 0.6) {
      return;
    }

    // Show the floating button
    // Mobile: Random delay between 15-40 seconds for a more "organic" feel
    // Desktop: Fixed 5 seconds for immediate engagement
    const delay = isMobile
      ? Math.floor(Math.random() * (40000 - 15000 + 1)) + 15000
      : 5000;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      {/* Expanded Menu */}
      <div
        className={`bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-slate-100 p-4 w-72 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right pointer-events-auto ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'
          }`}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-50">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Users size={20} />
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-sm tracking-tight">Community Hub</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Free Resources & Support</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href="https://chat.whatsapp.com/Hnv1hJpBYZcA7LvUPnBV6D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between group/btn p-3 bg-emerald-50 hover:bg-emerald-100 rounded-2xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                  <WhatsAppIcon />
                </div>
                <span className="text-sm font-bold text-slate-700">WhatsApp</span>
              </div>
              <ArrowRight size={16} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://t.me/+nU7ZzIXV_dkyNTJl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between group/btn p-3 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2AABEE] flex items-center justify-center text-white shadow-sm">
                  <TelegramIcon />
                </div>
                <span className="text-sm font-bold text-slate-700">Telegram</span>
              </div>
              <ArrowRight size={16} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating Trigger Button */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className={`bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-100 transition-all duration-500 ${isOpen ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'
          }`}>
          <p className="text-xs font-black text-slate-800 flex items-center gap-2">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Join Our Community
          </p>
        </div>

        <button
          onClick={toggleOpen}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 active:scale-90 ${isOpen
              ? 'bg-slate-800 text-white rotate-90 hover:bg-slate-900'
              : 'bg-emerald-500 text-white hover:bg-emerald-600'
            }`}
        >
          {isOpen ? <X size={24} strokeWidth={3} /> : <Users size={24} strokeWidth={2.5} />}
        </button>
      </div>
    </div>
  );
}
