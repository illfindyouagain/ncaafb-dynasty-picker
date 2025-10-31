import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTeams } from '../hooks/useTeams'
import Header from '../components/Header'

export default function LandingPage() {
  const { teams, loading } = useTeams()
  const [selectedConference, setSelectedConference] = useState('all')
  const [demoTeam, setDemoTeam] = useState(null)
  const [faqOpen, setFaqOpen] = useState(null)

  const handleDemoPick = () => {
    if (teams.length === 0) return
    
    const filtered = selectedConference === 'all' 
      ? teams 
      : teams.filter(t => t.conference === selectedConference)
    
    const randomTeam = filtered[Math.floor(Math.random() * filtered.length)]
    setDemoTeam(randomTeam)
  }

  // Get unique conferences from teams
  const conferences = [...new Set(teams.map(t => t.conference))].sort()

  const stats = [
    { label: 'Teams', value: '136' },
    { label: 'Categories', value: '10' },
    { label: 'Conferences', value: '10' },
    { label: 'Custom Builder', value: '✓' },
  ]

  const features = [
    {
      title: 'Smart Categories',
      description: 'Pick from Blue Bloods, Dark Horses, Sleeping Giants, Rebuild Projects & more',
      icon: '🏆',
    },
    {
      title: 'Difficulty Tiers',
      description: 'Filter by Easy, Medium, Hard, or Legendary challenges',
      icon: '⚡',
    },
    {
      title: '2025 Realignment Ready',
      description: 'Up-to-date with the latest conference changes including USC, UCLA, Texas & OU',
      icon: '🗺️',
    },
    {
      title: 'Random Dynasty Mode',
      description: 'Can\'t decide? Let fate choose your next dynasty adventure',
      icon: '🎲',
    },
    {
      title: 'Custom Conference Builder',
      description: 'Create your own custom conferences with drag-and-drop team selection',
      icon: '🏗️',
    },
    {
      title: 'Conference Filters',
      description: 'Browse by Big Ten, SEC, Big 12, ACC, or Group of 5',
      icon: '🏈',
    },
    {
      title: 'All 136 FBS Teams',
      description: 'Complete coverage from Alabama to UMass - every team, every conference',
      icon: '📊',
    },
  ]

  const faqs = [
    {
      q: 'What is a Dynasty Team Picker?',
      a: 'It helps you choose the perfect team for your NCAA Football 26 Dynasty Mode career. Whether you want a powerhouse or a rebuild challenge, we\'ve got you covered.',
    },
    {
      q: 'Is the data up-to-date with 2025 realignment?',
      a: 'Yes! We include USC, UCLA, Oregon, Washington in the Big Ten, and Texas & Oklahoma in the SEC, plus all other conference changes.',
    },
    {
      q: 'What are "Blue Bloods" and "Dark Horses"?',
      a: 'Blue Bloods are historically elite programs (Alabama, Ohio State, Michigan, etc.). Dark Horses are teams that can compete but aren\'t traditional powers. We have 10+ categories to match your play style.',
    },
    {
      q: 'Can I filter by difficulty?',
      a: 'Absolutely! Teams are rated Easy (powerhouses), Medium (competitive programs), Hard (rebuilds), and Legendary (major projects like Kansas or UMass).',
    },
    {
      q: 'Will you add more features?',
      a: 'Yes! We\'re planning constraint builders, shareable picks, export cards, and crowd-sourced team updates. Check back for new features!',
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-highlight/20 border border-highlight rounded-full text-highlight text-xs sm:text-sm font-medium">
            ⚠️ Unofficial Fan Tool
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-white leading-tight">
            Your Dynasty Toolkit
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-primary-300 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            Pick teams, build custom conferences, and plan your perfect CFB dynasty with our suite of free tools.
          </p>
        </div>

        {/* Two Column Tool Showcase */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
          {/* Team Picker Tool */}
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent rounded-xl p-6 sm:p-8 hover:border-accent-400 transition-all">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-3">Team Picker</h3>
            <p className="text-primary-300 mb-6">
              Find your perfect dynasty challenge from 136 FBS teams with smart filters and categories.
            </p>
            <Link
              to="/picker"
              className="inline-block w-full bg-accent hover:bg-accent-600 px-6 py-3 rounded-lg font-bold text-center transition-all"
            >
              Launch Picker →
            </Link>
          </div>

          {/* Conference Builder Tool */}
          <div className="bg-gradient-to-br from-highlight/10 to-highlight/5 border-2 border-highlight rounded-xl p-6 sm:p-8 hover:border-highlight-400 transition-all">
            <div className="text-4xl mb-4">🏗️</div>
            <h3 className="text-2xl font-bold text-white mb-3">Conference Builder</h3>
            <p className="text-primary-300 mb-6">
              Create custom conferences with drag-and-drop. Add divisions, export, and build your dream setup.
            </p>
            <Link
              to="/conference-builder"
              className="inline-block w-full bg-highlight hover:bg-highlight-600 text-black px-6 py-3 rounded-lg font-bold text-center transition-all"
            >
              Build Conference →
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="bg-card border border-primary-900 rounded-lg p-4 sm:p-6 hover:border-accent transition-colors">
              <div className="text-2xl sm:text-3xl font-bold text-accent">{stat.value}</div>
              <div className="text-primary-400 text-xs sm:text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Changelog Button */}
        <div className="flex justify-center mt-8 sm:mt-12">
          <Link
            to="/changelog"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-accent transition-colors text-sm sm:text-base font-medium"
          >
            <span>📋</span>
            <span>View Changelog</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why Use Dynasty Picker?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-card border border-primary-900 rounded-lg p-5 sm:p-6 hover:border-accent transition-all hover:bg-card-hover"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm sm:text-base text-primary-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mini Demo */}
      <section id="demo" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="bg-card border border-primary-900 rounded-xl sm:rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Quick Demo - Random Pick</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-primary-300">Conference Filter</label>
              <select
                value={selectedConference}
                onChange={(e) => setSelectedConference(e.target.value)}
                className="w-full bg-primary-950 border border-primary-800 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-accent focus:border-transparent text-sm sm:text-base text-white"
                disabled={loading}
              >
                <option value="all">All Conferences</option>
                {conferences.map((conf) => (
                  <option key={conf} value={conf}>{conf}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleDemoPick}
              disabled={loading || teams.length === 0}
              className="w-full bg-accent hover:bg-accent-600 px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : '🎲 Pick Random Team'}
            </button>

            {demoTeam && (
              <div className="mt-6 bg-card-hover border-2 border-accent rounded-lg p-4 sm:p-6 animate-pulse-once shadow-xl shadow-accent/20">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-primary-800"
                    style={{ backgroundColor: demoTeam.colors[0] }}
                  />
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-primary-800"
                    style={{ backgroundColor: demoTeam.colors[1] }}
                  />
                  <h4 className="text-xl sm:text-2xl font-bold">{demoTeam.name}</h4>
                </div>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <p><span className="text-primary-400">Conference:</span> {demoTeam.conference}</p>
                  <p><span className="text-primary-400">Location:</span> {demoTeam.location}</p>
                  <p><span className="text-primary-400">Difficulty:</span> {demoTeam.difficulty}</p>
                  <p><span className="text-primary-400">Prestige:</span> {demoTeam.prestige}/100</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
                    {demoTeam.categories.map((cat, i) => (
                      <span key={i} className="bg-accent/20 border border-accent/30 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs text-accent">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-sm text-primary-400 mt-6">
            Try the <Link to="/picker" className="text-accent hover:text-accent-400 hover:underline">full picker</Link> for advanced filters!
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Frequently Asked Questions</h3>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card border border-primary-900 rounded-lg overflow-hidden hover:border-accent transition-colors">
              <button
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left text-sm sm:text-base font-semibold flex justify-between items-center hover:bg-card-hover transition-all"
              >
                <span className="pr-4">{faq.q}</span>
                <span className="text-accent flex-shrink-0">{faqOpen === i ? '−' : '+'}</span>
              </button>
              {faqOpen === i && (
                <div className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-primary-300 bg-primary-950">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary-900 bg-card py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {/* About */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-bold text-lg mb-3">CFB Dynasty Tools</h3>
              <p className="text-sm text-primary-400 mb-3">
                Find your perfect college football dynasty team
              </p>
              <p className="text-xs text-primary-500">
                Community-sourced team ratings • 2025 conference data
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h3 className="text-white font-bold text-lg mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-primary-400 hover:text-accent text-sm transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/picker" className="text-primary-400 hover:text-accent text-sm transition-colors">
                    Team Picker
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-primary-400 hover:text-accent text-sm transition-colors">
                    About & FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/changelog" className="text-primary-400 hover:text-accent text-sm transition-colors">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="text-center md:text-right">
              <h3 className="text-white font-bold text-lg mb-3">Support</h3>
              <p className="text-primary-400 text-sm mb-3">
                Help keep this site running!
              </p>
              <Link
                to="/about#support"
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-600 transition-colors text-sm font-semibold"
              >
                ☕ Donate
              </Link>
            </div>
          </div>
          
          <div className="text-center mb-4 sm:mb-6 md:hidden">
            <p className="text-sm sm:text-base text-primary-400 mb-2">
              Unofficial fan tool for college football dynasty mode enthusiasts 🏈
            </p>
            <p className="text-xs sm:text-sm text-primary-500">
              Community-sourced team ratings • 2025 conference data
            </p>
          </div>
          
          {/* Disclaimer */}
          <div className="border-t border-primary-900 pt-4 sm:pt-6">
            <p className="text-primary-500 text-xs sm:text-sm text-center max-w-3xl mx-auto px-2">
              <strong className="text-primary-400">Disclaimer:</strong> This is an unofficial, fan-made tool not affiliated with, endorsed by, or connected to EA Sports, 
              the NCAA, or any university. All team names, conference names, and trademarks are property of their respective owners. 
              Team ratings are community-contributed and for informational/entertainment purposes only. Compatible with college football video games.
            </p>
          </div>
          
          {/* Feature Note */}
          <div className="mt-3 sm:mt-4">
            <p className="text-primary-600 text-xs text-center">
              Now featuring Custom Conference Builder • Create your own conferences with drag-and-drop
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
