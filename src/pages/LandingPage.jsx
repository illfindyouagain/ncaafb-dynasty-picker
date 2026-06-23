import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useTeams } from '../hooks/useTeams'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'
import { staggerContainer, staggerItem } from '../lib/motionTokens'

export default function LandingPage() {
  const { teams, loading } = useTeams()
  const [selectedConference, setSelectedConference] = useState('all')
  const [demoTeam, setDemoTeam] = useState(null)
  const [faqOpen, setFaqOpen] = useState(null)
  const reduce = useReducedMotion()

  const handleDemoPick = () => {
    if (teams.length === 0) return
    const filtered = selectedConference === 'all'
      ? teams
      : teams.filter(t => t.conference === selectedConference)
    const randomTeam = filtered[Math.floor(Math.random() * filtered.length)]
    setDemoTeam(randomTeam)
  }

  const conferences = [...new Set(teams.map(t => t.conference))].sort()

  const stats = [
    { label: 'Teams', value: teams.length > 0 ? teams.length.toString() : '135' },
    { label: 'Categories', value: '10' },
    { label: 'Conferences', value: '10' },
    { label: 'Free', value: '✓' },
  ]

  const features = [
    { title: 'Smart Categories', description: 'Blue Bloods, Dark Horses, Sleeping Giants, Rebuild Projects & more', icon: '🏆' },
    { title: 'Difficulty Tiers', description: 'Filter by Easy, Medium, Hard, or Legendary challenges', icon: '⚡' },
    { title: '2025 Realignment', description: 'USC, UCLA, Oregon, Washington in the Big Ten — Texas & OU in the SEC', icon: '🗺️' },
    { title: 'Random Dynasty Mode', description: "Can't decide? Let fate pick your next dynasty adventure", icon: '🎲' },
    { title: 'Conference Builder', description: 'Create custom conferences with click-to-add team selection and division support', icon: '🏗️' },
    { title: 'Advanced Filters', description: 'Sort and filter by overall rating, stars, prestige, and more', icon: '🏈' },
    { title: 'All 135 FBS Teams', description: 'Complete coverage from Alabama to UMass — every team, every conference', icon: '📊' },
  ]

  const faqs = [
    {
      q: 'What is a Dynasty Team Picker?',
      a: "It helps you choose the perfect team for your NCAA Football 26 Dynasty Mode career. Whether you want a powerhouse or a rebuild challenge, we've got you covered.",
    },
    {
      q: 'Is the data up-to-date with 2025 realignment?',
      a: 'Yes! We include USC, UCLA, Oregon, Washington in the Big Ten, and Texas & Oklahoma in the SEC, plus all other conference changes.',
    },
    {
      q: 'What are "Blue Bloods" and "Dark Horses"?',
      a: "Blue Bloods are historically elite programs (Alabama, Ohio State, Michigan, etc.). Dark Horses are teams that can compete but aren't traditional powers. We have 10+ categories to match your play style.",
    },
    {
      q: 'Can I filter by difficulty?',
      a: 'Absolutely! Teams are rated Easy, Medium, Hard, and Legendary based on how challenging the rebuild is.',
    },
    {
      q: 'Will you add more features?',
      a: "Yes! We're planning constraint builders, shareable picks, export cards, and crowd-sourced team updates. Check back for new features!",
    },
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-app text-white">
        <Header />

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 sm:pb-16">
          <motion.div
            className="text-center mb-12 sm:mb-14"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem} className="inline-flex items-center gap-2 mb-8 px-3 py-1 border border-highlight/40 text-highlight text-xs font-medium uppercase tracking-widest">
              ⚠️ Unofficial Fan Tool
            </motion.div>
            <motion.h2
              variants={staggerItem}
              className="font-display text-7xl sm:text-8xl md:text-[9rem] lg:text-[11rem] text-white leading-none tracking-wider"
            >
              PICK YOUR
            </motion.h2>
            <motion.h2
              variants={staggerItem}
              className="font-display text-7xl sm:text-8xl md:text-[9rem] lg:text-[11rem] text-accent leading-none tracking-wider mb-6"
            >
              DYNASTY
            </motion.h2>
            <motion.p variants={staggerItem} className="text-base sm:text-lg text-primary-300 max-w-lg mx-auto leading-relaxed">
              135 FBS teams. Smart filters. One perfect choice for your next dynasty run.
            </motion.p>
          </motion.div>

          {/* Tool Cards */}
          <motion.div
            className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={staggerItem}
              whileHover={{ y: -3, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
              className="bg-card border border-primary-900 border-l-4 border-l-accent p-6 sm:p-8 hover:bg-card-hover transition-colors"
            >
              <div className="font-display text-4xl sm:text-5xl text-accent tracking-wider mb-3">TEAM PICKER</div>
              <p className="text-primary-300 mb-6 text-sm leading-relaxed">
                Filter all 135 FBS teams by conference, difficulty, prestige, and ratings. Random pick included.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
                <Link
                  to="/picker"
                  className="inline-flex items-center gap-2 bg-accent text-black hover:bg-accent-400 px-5 py-2.5 font-display tracking-wider text-lg transition-colors"
                >
                  LAUNCH →
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              whileHover={{ y: -3, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
              className="bg-card border border-primary-900 border-l-4 border-l-highlight p-6 sm:p-8 hover:bg-card-hover transition-colors"
            >
              <div className="font-display text-4xl sm:text-5xl text-highlight tracking-wider mb-3">CONF BUILDER</div>
              <p className="text-primary-300 mb-6 text-sm leading-relaxed">
                Build custom conferences with any FBS teams. Add divisions, organize rosters, and export your setup.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
                <Link
                  to="/conference-builder"
                  className="inline-flex items-center gap-2 bg-highlight text-black hover:bg-highlight-400 px-5 py-2.5 font-display tracking-wider text-lg transition-colors"
                >
                  BUILD →
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scoreboard stats strip */}
          <motion.div
            className="max-w-2xl mx-auto border-y border-primary-900 py-5 grid grid-cols-4 divide-x divide-primary-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center px-3 sm:px-6">
                <div className="font-display text-3xl sm:text-4xl text-accent tracking-wider">{stat.value}</div>
                <div className="text-primary-400 text-xs uppercase tracking-widest mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.55 }}
          >
            <Link
              to="/changelog"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-accent transition-colors text-xs font-medium uppercase tracking-widest"
            >
              <span>📋</span>
              <span>View Changelog</span>
              <span>→</span>
            </Link>
          </motion.div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div
            className="flex items-center gap-4 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-px flex-1 bg-primary-900" />
            <h3 className="font-display text-3xl sm:text-4xl tracking-wider text-white whitespace-nowrap">WHY USE IT</h3>
            <div className="h-px flex-1 bg-primary-900" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : Math.min(i * 0.05, 0.2) }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="bg-card border border-primary-900 border-l-2 border-l-accent/50 p-5 sm:p-6 hover:bg-card-hover hover:border-l-accent transition-colors"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h4 className="font-display text-xl sm:text-2xl tracking-wider mb-2">{feature.title}</h4>
                <p className="text-sm text-primary-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mini Demo */}
        <section id="demo" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div
            className="bg-card border border-primary-900 p-6 sm:p-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-6 sm:mb-8">
              <div className="h-px flex-1 bg-primary-900" />
              <h3 className="font-display text-2xl sm:text-3xl tracking-wider whitespace-nowrap">TRY IT NOW</h3>
              <div className="h-px flex-1 bg-primary-900" />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-2 text-primary-400 uppercase tracking-widest">
                  Conference Filter
                </label>
                <select
                  value={selectedConference}
                  onChange={(e) => setSelectedConference(e.target.value)}
                  className="w-full bg-app border border-primary-900 px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-accent focus:outline-none text-sm text-white"
                  disabled={loading}
                >
                  <option value="all">All Conferences</option>
                  {conferences.map((conf) => (
                    <option key={conf} value={conf}>{conf}</option>
                  ))}
                </select>
              </div>

              <motion.button
                onClick={handleDemoPick}
                disabled={loading || teams.length === 0}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="w-full bg-accent hover:bg-accent-400 text-black px-4 sm:px-6 py-3 sm:py-4 font-display text-xl sm:text-2xl tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'LOADING...' : '🎲 RANDOM PICK'}
              </motion.button>

              <AnimatePresence mode="wait">
                {demoTeam && (
                  <motion.div
                    key={demoTeam.id}
                    initial={{ opacity: 0, scale: 0.97, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-4 bg-app border-2 border-accent p-4 sm:p-6 shadow-xl shadow-accent/10"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full border border-primary-800" style={{ backgroundColor: demoTeam.colors[0] }} />
                      <div className="w-3 h-3 rounded-full border border-primary-800" style={{ backgroundColor: demoTeam.colors[1] }} />
                      <span className="font-display text-2xl sm:text-3xl tracking-wider">{demoTeam.name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-primary-500 text-xs uppercase tracking-widest mb-0.5">Conference</p>
                        <p className="text-white">{demoTeam.conference}</p>
                      </div>
                      <div>
                        <p className="text-primary-500 text-xs uppercase tracking-widest mb-0.5">Location</p>
                        <p className="text-white">{demoTeam.location}</p>
                      </div>
                      <div>
                        <p className="text-primary-500 text-xs uppercase tracking-widest mb-0.5">Difficulty</p>
                        <p className="text-white">{demoTeam.difficulty}</p>
                      </div>
                      <div>
                        <p className="text-primary-500 text-xs uppercase tracking-widest mb-0.5">Prestige</p>
                        <p className="text-white">{demoTeam.prestige}/100</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {demoTeam.categories.map((cat, i) => (
                        <span key={i} className="bg-accent/10 border border-accent/30 px-2 py-0.5 text-xs text-accent uppercase tracking-widest">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="text-center text-xs text-primary-500 mt-6 uppercase tracking-widest">
              Try the{' '}
              <Link to="/picker" className="text-accent hover:underline">full picker</Link>
              {' '}for advanced filters
            </p>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div
            className="flex items-center gap-4 mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-px flex-1 bg-primary-900" />
            <h3 className="font-display text-3xl sm:text-4xl tracking-wider">FAQ</h3>
            <div className="h-px flex-1 bg-primary-900" />
          </motion.div>

          <div className="space-y-px">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : i * 0.04 }}
                className="border border-primary-900 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left text-sm sm:text-base font-semibold flex justify-between items-center hover:bg-card transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: faqOpen === i ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-accent flex-shrink-0 font-display text-xl"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-primary-300 bg-card border-t border-primary-900">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-primary-900 bg-card py-6 sm:py-8 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              <div className="text-center md:text-left">
                <div className="font-display text-2xl text-white tracking-wider mb-2">CFB DYNASTY TOOLS</div>
                <p className="text-sm text-primary-400 mb-3">
                  Find your perfect college football dynasty team
                </p>
                <p className="text-xs text-primary-500">
                  Community-sourced team ratings • 2025 conference data
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {[['/', 'Home'], ['/picker', 'Team Picker'], ['/about', 'About & FAQ'], ['/changelog', 'Changelog']].map(([to, label]) => (
                    <li key={to}>
                      <Link to={to} className="text-primary-400 hover:text-accent text-sm transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center md:text-right">
                <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Support</h3>
                <p className="text-primary-400 text-sm mb-3">Help keep this site running!</p>
                <Link
                  to="/about#support"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-black hover:bg-accent-400 transition-colors text-sm font-semibold"
                >
                  ☕ Donate
                </Link>
              </div>
            </div>
            <div className="border-t border-primary-900 pt-4 sm:pt-6">
              <p className="text-primary-500 text-xs text-center max-w-3xl mx-auto">
                <strong className="text-primary-400">Disclaimer:</strong> Unofficial, fan-made tool not affiliated with EA Sports, the NCAA, or any university. All team names and trademarks are property of their respective owners. Team ratings are community-contributed and for informational/entertainment purposes only.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
