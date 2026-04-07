export default function Problem() {
  return (
    <section id="problem" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Losing Customers Every Day?
          </h2>
          <p className="text-lg sm:text-xl text-gray-400">
            If you are running a local business, you might be facing these common problems while your competitors steal your customers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-gray-950 p-8 rounded-2xl border border-gray-800 hover:border-red-500/50 transition-colors">
            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
              <i className="ri-store-3-line text-3xl text-red-500"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">No Online Presence</h3>
            <p className="text-gray-400">Customers can't find you when they search for your services on Google.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-950 p-8 rounded-2xl border border-gray-800 hover:border-red-500/50 transition-colors">
            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
              <i className="ri-user-unfollow-line text-3xl text-red-500"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">No New Enquiries</h3>
            <p className="text-gray-400">Your phone isn't ringing and you are not getting any new leads online.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-950 p-8 rounded-2xl border border-gray-800 hover:border-red-500/50 transition-colors">
            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
              <i className="ri-walk-line text-3xl text-red-500"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Only Walk-ins</h3>
            <p className="text-gray-400">Relying completely on foot traffic while ignoring thousands of online customers.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-950 p-8 rounded-2xl border border-gray-800 hover:border-red-500/50 transition-colors">
            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
              <i className="ri-trophy-line text-3xl text-red-500"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Losing to Competitors</h3>
            <p className="text-gray-400">Other businesses with modern websites are taking away your potential buyers.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
