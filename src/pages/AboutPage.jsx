import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-primary-900 bg-black sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
              <div className="text-2xl sm:text-3xl">🏈</div>
              <h1 className="text-lg sm:text-2xl font-bold text-white">
                About CFB Dynasty Picker
              </h1>
            </Link>
            <Link
              to="/"
              className="text-sm sm:text-base text-primary-300 hover:text-white transition-colors"
            >
              ← Back
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* About Section */}
        <section className="bg-card border border-primary-900 rounded-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">What is CFB Dynasty Picker?</h2>
          <div className="space-y-4 text-primary-300">
            <p>
              CFB Dynasty Picker is a free tool designed to help college football video game fans find the perfect team for their next Dynasty Mode playthrough.
            </p>
            <p>
              Whether you're looking for a rebuilding challenge, a powerhouse program, or something in between, our advanced filters and random selection make it easy to discover your next favorite team.
            </p>
            <div className="bg-highlight/10 border border-highlight/30 rounded-lg p-4 mt-6">
              <p className="text-sm text-primary-400">
                ⚠️ <strong className="text-primary-300">Disclaimer:</strong> This is an unofficial fan-made tool. We are not affiliated with EA Sports, the NCAA, or any university. All team names and ratings are used for informational purposes only. Compatible with college football video games.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-card border border-primary-900 rounded-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How It Works</h2>
          <div className="space-y-4 text-primary-300">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">1. Browse All 136 FBS Teams</h3>
              <p>Our database includes every FBS team with accurate ratings, conference affiliations, and difficulty levels.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">2. Use Advanced Filters</h3>
              <p>Filter by conference, category (Blue Bloods, Rebuild Projects, etc.), difficulty, star rating, and overall rating to narrow down your options.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">3. Search & Sort</h3>
              <p>Quickly find specific teams with the search bar, or sort by name, rating, stars, prestige, or difficulty.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">4. Random Pick</h3>
              <p>Can't decide? Hit the Random Pick button to let fate choose your next dynasty team based on your active filters.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">5. Exclude Teams</h3>
              <p>Already played with a team? Exclude them from future random picks so you always get fresh options.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-card border border-primary-900 rounded-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Where does the team data come from?</h3>
              <p className="text-primary-300">Team ratings and stats are community-sourced and based on publicly available information. We regularly update our database to ensure accuracy.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">What does "difficulty" mean?</h3>
              <p className="text-primary-300">Difficulty represents how challenging it would be to build a successful dynasty with that team, based on factors like current talent, recruiting location, prestige, and conference strength.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Is this updated for conference realignment?</h3>
              <p className="text-primary-300">Yes! Our database reflects the latest conference realignment changes.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Can I suggest new features?</h3>
              <p className="text-primary-300">Absolutely! We're always looking to improve. Reach out through our contact info below with your ideas.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Is my data tracked or collected?</h3>
              <p className="text-primary-300">No. We don't collect any personal information. Your team picks, filters, and searches stay on your device. We may use basic analytics to understand site usage, but nothing personally identifiable.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Is this site free?</h3>
              <p className="text-primary-300">Yes, completely free! However, hosting and maintenance costs money. If you find this tool useful, consider supporting us with a small donation (see below).</p>
            </div>
          </div>
        </section>

        {/* Support/Donation Section */}
        <section id="support" className="bg-gradient-to-r from-accent to-accent-600 border-2 border-accent rounded-lg p-6 sm:p-8 mb-8 text-white shadow-xl">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">☕ Support This Project</h2>
            <p className="text-lg mb-6">
              CFB Dynasty Picker is completely free to use, but hosting and maintaining this site costs money.
            </p>
            <p className="mb-6">
              If you've found this tool helpful and want to support future development, consider sending a donation! Every contribution helps keep the site running and supports new features.
            </p>
            
            {/* Donation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://venmo.com/u/th4nkmelater"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#008CFF] text-white rounded-lg hover:bg-[#0074D9] transition-colors font-semibold text-base sm:text-lg shadow-lg"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.83 4.2c.8 1.6 1.17 3.2 1.17 5.2 0 6.4-5.47 14.7-9.9 14.7H7.8L4 3.7l5.66-.5 2.77 16.5c1.87-2.9 4.47-8.1 4.47-12.2 0-1.4-.2-2.5-.6-3.5l3.53-.8z"/>
                </svg>
                Donate via Venmo
              </a>
              <a
                href="https://paypal.me/liftoffgaming"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0070BA] text-white rounded-lg hover:bg-[#005A94] transition-colors font-semibold text-base sm:text-lg shadow-lg"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
                </svg>
                Donate via PayPal
              </a>
            </div>
            
            <p className="text-sm mt-6 text-white/90">
              All donations are optional and greatly appreciated! 🙏
            </p>
            
            {/* Optional: Add suggested amounts */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm text-white/90 mb-3">Suggested amounts:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">$3 - Coffee ☕</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">$5 - Pizza Slice 🍕</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">$10 - Server Hosting 🖥️</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Custom Amount 💰</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-card border border-primary-900 rounded-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Contact & Feedback</h2>
          <div className="space-y-4 text-primary-300">
            <p>Have questions, suggestions, or found a bug? I'd love to hear from you!</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="https://www.reddit.com/user/arcanefuse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors text-sm sm:text-base"
              >
                <span>💬</span> u/arcanefuse
              </a>
              <a
                href="https://twitter.com/liftoffgaminghq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors text-sm sm:text-base"
              >
                <span>🐦</span> @liftoffgaminghq
              </a>
              <a
                href="mailto:user@liftoffgaming.com"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors text-sm sm:text-base"
              >
                <span>📧</span> Email
              </a>
            </div>
          </div>
        </section>

        {/* Credits */}
        <section className="mt-8 text-center text-sm text-primary-500">
          <p>Built with ❤️ for the CFB gaming community</p>
          <p className="mt-2">© {new Date().getFullYear()} CFB Dynasty Picker • Fan Project</p>
        </section>
      </main>
    </div>
  )
}
