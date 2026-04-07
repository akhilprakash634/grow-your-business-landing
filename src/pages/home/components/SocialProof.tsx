import { testimonials } from '../../../data/testimonials';
import { useRef, useEffect, useState } from 'react';

export default function SocialProof() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollAmount = 0.5; // Speed of scroll

    const scroll = () => {
      if (!isHovered && scrollContainer) {
        scrollContainer.scrollLeft += scrollAmount;
        
        // If we've reached the end of the original set, reset to start smoothly
        // We use a safe threshold to snap back
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  // We duplicate the array 3 times to ensure there's enough content to seamlessly loop 
  // on large screens or when manually swiping fast
  const repeatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-emerald-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
        <div className="w-96 h-96 bg-emerald-800 rounded-full blur-3xl opacity-50"></div>
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
        <div className="w-96 h-96 bg-emerald-950 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Real Results for Local Businesses
          </h2>
          <p className="text-emerald-100 text-lg sm:text-xl">
            See how our system is helping business owners across Kerala grow their customers.
          </p>
        </div>
      </div>

      {/* Manual + Auto Carousel Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
          className="flex space-x-6 overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory px-4 md:px-0"
          style={{ 
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          {/* Hide Webkit Scrollbar using inline style hack or rely on hide-scrollbar class */}
          <style>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {repeatedTestimonials.map((testimonial, index) => (
            <div 
              key={`${testimonial.id}-${index}`} 
              className="snap-center bg-emerald-950/80 backdrop-blur-sm p-8 rounded-2xl border border-emerald-800/50 flex flex-col w-[85vw] sm:w-[350px] shrink-0"
            >
              <div className="flex text-emerald-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-xl"></i>
                ))}
              </div>
              <p className="text-white text-lg font-medium mb-6 flex-grow whitespace-normal">
                {testimonial.content}
              </p>
              <div className="flex items-center space-x-4 mt-auto">
                <div className="w-12 h-12 bg-emerald-800 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {testimonial.initial}
                </div>
                <div>
                  <h4 className="text-white font-bold whitespace-normal">{testimonial.name}</h4>
                  <span className="text-emerald-200 text-sm whitespace-normal">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
