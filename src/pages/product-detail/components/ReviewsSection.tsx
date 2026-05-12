import React from 'react';
import { Star, Loader2 } from 'lucide-react';

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  profession?: string;
  createdAt: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  showReviewForm: boolean;
  setShowReviewForm: (show: boolean) => void;
  handleSubmitReview: (e: React.FormEvent) => void;
  reviewStatus: { type: 'success' | 'error', message: string } | null;
  reviewName: string;
  setReviewName: (name: string) => void;
  reviewProfession: string;
  setReviewProfession: (prof: string) => void;
  reviewRating: number;
  setReviewRating: (rating: number) => void;
  reviewComment: string;
  setReviewComment: (comment: string) => void;
  isSubmittingReview: boolean;
}

export default function ReviewsSection({
  reviews,
  showReviewForm,
  setShowReviewForm,
  handleSubmitReview,
  reviewStatus,
  reviewName,
  setReviewName,
  reviewProfession,
  setReviewProfession,
  reviewRating,
  setReviewRating,
  reviewComment,
  setReviewComment,
  isSubmittingReview
}: ReviewsSectionProps) {
  return (
    <div className="pt-20 border-t border-white/5 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">Customer Reviews</h2>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-3xl font-black text-white">
              <Star className="text-yellow-500 fill-yellow-500" size={32} /> 4.9/5
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
            <div className="text-gray-400 font-bold text-lg">Based on 500+ happy buyers</div>
          </div>
        </div>

        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          aria-expanded={showReviewForm}
          aria-controls="review-form"
          className="inline-flex items-center gap-3 px-8 py-5 bg-white text-black font-black rounded-2xl hover:bg-emerald-500 hover:text-white transition-all active:scale-95 shadow-2xl"
        >
          <Star size={20} className={showReviewForm ? 'fill-current' : ''} aria-hidden="true" />
          {showReviewForm ? 'Close Review Form' : 'Write a Review'}
        </button>
      </div>

      {/* Review Form */}
      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${showReviewForm ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <form onSubmit={handleSubmitReview} id="review-form" className="bg-gray-900 border border-white/10 rounded-[3rem] p-8 sm:p-12 space-y-10 shadow-3xl">
          <h4 className="text-3xl font-black text-white tracking-tight">Share Your Experience</h4>
          
          {reviewStatus && (
            <div className={`p-6 rounded-2xl text-base font-bold ${reviewStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              {reviewStatus.message}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label htmlFor="review-name" className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Public Name</label>
              <input
                id="review-name"
                required
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                placeholder="e.g. John D."
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-lg font-bold"
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="review-profession" className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Profession/Role</label>
              <input
                id="review-profession"
                value={reviewProfession}
                onChange={(e) => setReviewProfession(e.target.value)}
                placeholder="e.g. Digital Marketer"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-lg font-bold"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Star Rating</label>
            <div className="flex items-center gap-4 bg-black/40 border border-white/10 rounded-2xl px-8 py-4 w-fit">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewRating(star)}
                  className="transition-transform hover:scale-125 active:scale-90"
                >
                  <Star 
                    size={40} 
                    className={`${star <= reviewRating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-800'}`} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label htmlFor="review-comment" className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Your Review</label>
            <textarea
              id="review-comment"
              required
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="What did you like most about this product?"
              rows={4}
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-gray-700 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none text-lg font-medium"
            />
          </div>

          <button 
            disabled={isSubmittingReview}
            className="w-full md:w-auto px-12 py-5 bg-emerald-500 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(16,185,129,0.3)] text-xl"
          >
            {isSubmittingReview ? <Loader2 className="animate-spin" /> : 'Publish My Review'}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 space-y-6 hover:bg-white/[0.05] transition-all group">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center text-emerald-400 font-black text-xl shadow-inner">
                    {review.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-lg">{review.name}</h5>
                    {review.profession && (
                      <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-wider">{review.profession}</p>
                    )}
                    <div className="flex items-center gap-1 mt-1">
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
              <p className="text-gray-400 leading-relaxed font-medium text-base italic group-hover:text-gray-300 transition-colors">
                "{review.comment}"
              </p>
            </div>
          ))
        ) : (
          <div className="lg:col-span-3 text-center py-20 bg-white/[0.02] border border-white/5 border-dashed rounded-[3rem]">
            <div className="inline-flex w-16 h-16 rounded-full bg-white/5 items-center justify-center mb-6">
              <Star size={32} className="text-gray-700" />
            </div>
            <p className="text-2xl text-gray-600 font-black italic">No reviews yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  );
}
