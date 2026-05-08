import { useState, useEffect } from 'react';
import { Star, CheckCircle, Trash2, Clock, Package, ShieldCheck } from 'lucide-react';
import Header from '../../home/components/Header';
import Footer from '../../home/components/Footer';

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
  productTitle: string;
}

const apiUrl = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : (import.meta.env.VITE_API_URL || 'http://localhost:5000');

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (reviewId: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/approve-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId }),
      });
      if (response.ok) {
        setReviews(reviews.map(r => r._id === reviewId ? { ...r, approved: true } : r));
      }
    } catch (err) {
      alert('Failed to approve review');
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      const response = await fetch(`${apiUrl}/api/admin/delete-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId }),
      });
      if (response.ok) {
        setReviews(reviews.filter(r => r._id !== reviewId));
      }
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-indigo-600" />
              Review Moderation
            </h1>
            <p className="text-slate-600 mt-2">Manage and approve customer reviews for your products.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
              <span className="text-sm text-slate-500">Total Reviews</span>
              <p className="text-xl font-bold text-slate-900">{reviews.length}</p>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
              <span className="text-sm text-slate-500">Pending</span>
              <p className="text-xl font-bold text-amber-600">{reviews.filter(r => !r.approved).length}</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900">No reviews found</h3>
                <p className="text-slate-500">Reviews submitted by customers will appear here.</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div 
                  key={review._id} 
                  className={`bg-white rounded-2xl shadow-sm border transition-all ${
                    review.approved ? 'border-slate-200' : 'border-amber-200 bg-amber-50/30'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex flex-wrap justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-slate-900 text-lg">{review.name}</h3>
                          {!review.approved && (
                            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                              Pending Approval
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                            />
                          ))}
                          <span className="text-slate-400 text-sm ml-2">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-slate-700 text-lg leading-relaxed mb-4">"{review.comment}"</p>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Package className="w-4 h-4" />
                          <span>Product: <span className="font-medium text-slate-700">{review.productTitle || 'Unknown Product'}</span></span>
                        </div>
                      </div>

                      <div className="flex flex-row sm:flex-col gap-3 justify-end">
                        {!review.approved && (
                          <button
                            onClick={() => handleApprove(review._id)}
                            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-200"
                          >
                            <CheckCircle className="w-5 h-5" />
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 px-6 py-2.5 rounded-xl font-bold transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
