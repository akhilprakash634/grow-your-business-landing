import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { optimisedImageUrl, getImageSrcSet } from '../../../lib/sanity';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  index: number;
  setIndex: (index: number) => void;
  urls: string[];
  prevImage: () => void;
  nextImage: () => void;
}

export default function Lightbox({
  isOpen,
  onClose,
  index,
  setIndex,
  urls,
  prevImage,
  nextImage
}: LightboxProps) {
  if (!isOpen || !urls || urls.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close image preview"
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10 hover:rotate-90"
      >
        <X size={24} aria-hidden="true" />
      </button>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white font-black text-sm bg-white/10 px-6 py-2 rounded-full backdrop-blur-md">
        {index + 1} / {urls.length}
      </div>

      {urls.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prevImage(); }}
          aria-label="Previous image"
          className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10 active:scale-90"
        >
          <ChevronLeft size={32} aria-hidden="true" />
        </button>
      )}

      <div
        className="max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={index}
          src={optimisedImageUrl(urls[index], { w: 1200, q: 90 })}
          srcSet={getImageSrcSet(urls[index], [600, 800, 1200, 1600])}
          sizes="90vw"
          alt={`Preview ${index + 1}`}
          width={1200}
          height={800}
          decoding="async"
          className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-3xl animate-in zoom-in duration-300"
        />
      </div>

      {urls.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); nextImage(); }}
          aria-label="Next image"
          className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10 active:scale-90"
        >
          <ChevronRight size={32} aria-hidden="true" />
        </button>
      )}

      {urls.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 overflow-x-auto max-w-[90vw] px-4 py-2 bg-white/5 rounded-2xl backdrop-blur-md">
          {urls.map((url, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIndex(i); }}
              className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                i === index
                  ? 'border-emerald-500 opacity-100 scale-110 shadow-lg'
                  : 'border-white/10 opacity-40 hover:opacity-100'
              }`}
            >
              <img
                src={optimisedImageUrl(url, { w: 150, h: 150, q: 60 })}
                alt={`Thumbnail ${i + 1} of ${urls.length}`}
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
