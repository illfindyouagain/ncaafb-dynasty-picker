import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useTeams } from '../hooks/useTeams'
import { useAPPoll } from '../hooks/useAPPoll'
import { teamSlug } from '../lib/teamSlug'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'
import { staggerContainer, staggerItem } from '../lib/motionTokens'

const DIFFICULTY_COLOR = {
  Easy: 'text-green-400',
  Medium: 'text-yellow-400',
  Hard: 'text-orange-400',
  Legendary: 'text-red-400',
}

const features = [
  {
    title: 'Smart Categories',
    description: 'Ten dynasty archetypes — Blue Bloods, Dark Horses, Sleeping Giants, Rebuild Projects, and more. Find the story you want to tell.',
    tags: ['Blue Bloods', 'Dark Horses', 'Sleeping Giants', 'Rebuild Projects'],
    large: true,
  },
  {
    title: 'Difficulty Tiers',
    description: 'Every team is rated for dynasty difficulty. Easy wins out of the gate or a Legendary rebuild — your call.',
    tiers: [
      { label: 'Easy', color: 'text-green-400 bg-green-400/10' },
      { label: 'Medium', color: 'text-yellow-400 bg-yellow-400/10' },
      { label: 'Hard', color: 'text-orange-400 bg-orange-400/10' },
      { label: 'Legendary', color: 'text-red-400 bg-red-400/10' },
    ],
    large: true,
  },
  { title: 'CFB 27 Realignment', description: 'Big 12 expansion, Pac-12 rebuild, all confirmed conference changes. Fully updated.' },
  { title: 'Advanced Filters', description: 'Sort by OVR, prestige, stars, conference, and difficulty simultaneously.' },
  { title: 'Team Detail Pages', description: 'Full stat breakdown, stadium info, and dynasty context for every FBS program.' },
  { title: 'Conference Builder', description: 'Build custom conferences with any FBS teams, add divisions, and export as JSON.' },
  { title: 'Dynasty Challenge Generator', description: 'Get random constraints — recruiting limits, playstyle rules, win goals — for your next CFB dynasty. Share your challenge with a link.', link: '/challenge' },
]

const faqs = [
  {
    q: 'What is a Dynasty Team Picker?',
    a: "It helps you choose the perfect team for your CFB Dynasty Mode career. Whether you want a powerhouse or a rebuild challenge, we've got you covered.",
  },
  {
    q: 'Is the data up-to-date for CFB 27?',
    a: 'Yes — all 137 FBS teams are included with CFB 27 conference changes. Big 12 expansion, the Pac-12 rebuild, and all other confirmed realignment moves.',
  },
  {
    q: 'What are "Blue Bloods" and "Dark Horses"?',
    a: 'Blue Bloods are historically elite programs. Dark Horses can compete but aren\'t traditional powers. Ten categories in total to match your play style.',
  },
  {
    q: 'Can I filter by difficulty?',
    a: 'Yes. Teams are rated Easy, Medium, Hard, and Legendary based on how challenging the rebuild is — recruiting pull, prestige, and conference strength all factor in.',
  },
  {
    q: 'Will you add more features?',
    a: "Yes. Shareable dynasty cards, challenge generators, and more are planned. Check the changelog for what's new.",
  },
]

export default function LandingPage() {
  const { teams, loading } = useTeams()
  const { poll } = useAPPoll()
  const [randomTeam, setRandomTeam] = useState(null)
  const [faqOpen, setFaqOpen] = useState(null)
  const reduce = useReducedMotion()

  const handleRandomPick = () => {
    if (!teams.length) return
    setRandomTeam(teams[Math.floor(Math.random() * teams.length)])
  }

  const top = poll?.teams?.[0] ?? null

  return (
    <PageTransition>
      <div className="min-h-screen bg-app text-white">
        <Header />

        {/* ── HERO ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12 sm:pb-16">

          {/* Editorial heading */}
          <motion.div
            className="mb-8 sm:mb-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={staggerItem}
              className="inline-flex items-center gap-2 mb-5 px-2.5 py-1 border border-highlight/40 text-highlight text-[10px] font-medium uppercase tracking-widest"
            >
              ⚠️ Unofficial Fan Tool
            </motion.div>
            <motion.h1 variants={staggerItem} className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-none tracking-wider">
              PICK YOUR
            </motion.h1>
            <motion.h1 variants={staggerItem} className="font-display text-5xl sm:text-6xl lg:text-7xl text-accent leading-none tracking-wider mb-4">
              DYNASTY
            </motion.h1>
            <motion.p variants={staggerItem} className="text-sm sm:text-base text-primary-400 max-w-md">
              137 FBS teams. Smart filters. One perfect choice for your next dynasty run.
            </motion.p>
          </motion.div>

          {/* Bento grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >

            {/* ① TEAM PICKER — dominant cell */}
            <motion.div
              variants={staggerItem}
              whileHover={{ y: reduce ? 0 : -2, transition: { duration: 0.2 } }}
              className="md:col-span-2 lg:col-span-3 bg-card border border-primary-900 border-l-4 border-l-accent p-6 sm:p-8 flex flex-col hover:bg-card-hover transition-colors group"
            >
              <div className="flex-1">
                <div className="font-display text-4xl sm:text-5xl text-accent tracking-wider mb-2">TEAM PICKER</div>
                <p className="text-primary-400 text-sm mb-6 max-w-md leading-relaxed">
                  Filter all 137 FBS teams by conference, difficulty, prestige, and ratings. Use advanced filters or let the randomizer decide.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Conference', 'Difficulty', 'Overall Rating', 'Prestige', 'Stars', 'Category'].map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-primary-900/60 border border-primary-800 text-[10px] text-primary-400 uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to="/picker"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-400 text-black px-6 py-3 font-display tracking-wider text-lg transition-colors self-start"
              >
                LAUNCH →
              </Link>
            </motion.div>

            {/* ② STATS — compact */}
            <motion.div
              variants={staggerItem}
              className="lg:col-span-1 bg-card border border-primary-900 p-5 sm:p-6 flex flex-col justify-between"
            >
              <div className="text-[10px] text-primary-600 uppercase tracking-widest mb-4">By the numbers</div>
              <div className="space-y-4">
                <div>
                  <div className="font-display text-5xl text-accent tracking-wider leading-none">{teams.length || 137}</div>
                  <div className="text-xs text-primary-400 uppercase tracking-widest mt-0.5">FBS Teams</div>
                </div>
                <div className="h-px bg-primary-900" />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="font-display text-2xl text-white tracking-wider">10</div>
                    <div className="text-[10px] text-primary-500 uppercase tracking-widest">Conferences</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl text-white tracking-wider">10</div>
                    <div className="text-[10px] text-primary-500 uppercase tracking-widest">Categories</div>
                  </div>
                </div>
                <div className="h-px bg-primary-900" />
                <div className="text-xs text-accent font-medium">✓ Free, no login</div>
              </div>
            </motion.div>

            {/* ③ CONF BUILDER */}
            <motion.div
              variants={staggerItem}
              whileHover={{ y: reduce ? 0 : -2, transition: { duration: 0.2 } }}
              className="lg:col-span-2 bg-card border border-primary-900 border-l-4 border-l-highlight p-5 sm:p-6 flex flex-col hover:bg-card-hover transition-colors"
            >
              <div className="font-display text-2xl sm:text-3xl text-highlight tracking-wider mb-2">CONF BUILDER</div>
              <p className="text-primary-400 text-sm mb-4 leading-relaxed flex-1">
                Build custom conferences with any FBS teams. Add divisions, organize your realignment, and export as JSON.
              </p>
              <Link
                to="/conference-builder"
                className="inline-flex items-center gap-2 bg-highlight/10 hover:bg-highlight/20 border border-highlight/40 text-highlight px-4 py-2 font-display tracking-wider text-sm transition-colors self-start"
              >
                BUILD →
              </Link>
            </motion.div>

            {/* ④ RANDOM PICK */}
            <motion.div
              variants={staggerItem}
              className="lg:col-span-1 bg-card border border-primary-900 p-5 sm:p-6 flex flex-col"
            >
              <div className="text-[10px] text-primary-600 uppercase tracking-widest mb-3">Feeling lucky?</div>
              <div className="font-display text-xl tracking-wider mb-1">RANDOM PICK</div>

              <AnimatePresence mode="wait">
                {randomTeam ? (
                  <motion.div
                    key={randomTeam.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 flex-1"
                  >
                    <div className="h-1 flex mb-3 rounded-sm overflow-hidden">
                      <div className="flex-1" style={{ backgroundColor: randomTeam.colors[0] }} />
                      <div className="flex-1" style={{ backgroundColor: randomTeam.colors[1] }} />
                    </div>
                    <div className="font-display text-base tracking-wider leading-tight mb-1">{randomTeam.name}</div>
                    <div className="flex items-center gap-2 text-xs text-primary-400 mb-3">
                      <span className={DIFFICULTY_COLOR[randomTeam.difficulty]}>{randomTeam.difficulty}</span>
                      <span>·</span>
                      <span>OVR {randomTeam.overallRating}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleRandomPick}
                        className="text-[10px] text-primary-500 hover:text-white transition-colors uppercase tracking-widest"
                      >
                        Again
                      </button>
                      <span className="text-primary-800">·</span>
                      <Link
                        to={`/teams/${teamSlug(randomTeam.name)}`}
                        className="text-[10px] text-accent hover:underline uppercase tracking-widest"
                      >
                        Profile →
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <p className="text-xs text-primary-500 mt-2 mb-4">Can't decide? Roll a random team from all 137 FBS programs.</p>
                    <button
                      onClick={handleRandomPick}
                      disabled={loading}
                      className="w-full bg-primary-900 hover:bg-primary-800 border border-primary-800 text-white px-4 py-2.5 font-display tracking-wider text-sm transition-colors disabled:opacity-40 mt-auto"
                    >
                      🎲 ROLL
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ⑤ AP POLL WIDGET */}
            <motion.div
              variants={staggerItem}
              className="lg:col-span-1 bg-card border border-primary-900 p-5 sm:p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] text-primary-600 uppercase tracking-widest">Live Rankings</div>
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              </div>
              <div className="font-display text-xl tracking-wider mb-3">AP TOP 25</div>
              {top ? (
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] text-primary-500 uppercase tracking-widest mb-1"># 1</div>
                    <div className="font-display text-lg tracking-wider text-accent leading-tight">{top.name}</div>
                    {top.record && <div className="text-xs text-primary-500 mt-1">{top.record}</div>}
                  </div>
                  <Link
                    to="/rankings"
                    className="text-[10px] text-primary-400 hover:text-accent transition-colors uppercase tracking-widest mt-4 self-start"
                  >
                    Full rankings →
                  </Link>
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-between">
                  <p className="text-xs text-primary-600">Loading poll data...</p>
                  <Link to="/rankings" className="text-[10px] text-primary-400 hover:text-accent transition-colors uppercase tracking-widest mt-4 self-start">
                    View rankings →
                  </Link>
                </div>
              )}
            </motion.div>

          </motion.div>
        </section>

        {/* ── FEATURES ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div
            className="flex items-center gap-4 mb-10"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-px flex-1 bg-primary-900" />
            <h2 className="font-display text-3xl sm:text-4xl tracking-wider whitespace-nowrap">WHY USE IT</h2>
            <div className="h-px flex-1 bg-primary-900" />
          </motion.div>

          {/* Two spotlight cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {features.filter(f => f.large).map((f) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-card border border-primary-900 border-l-2 border-l-accent/60 p-6 sm:p-8"
              >
                <h3 className="font-display text-2xl sm:text-3xl tracking-wider mb-2">{f.title}</h3>
                <p className="text-sm text-primary-400 leading-relaxed mb-5">{f.description}</p>
                {f.tags && (
                  <div className="flex flex-wrap gap-2">
                    {f.tags.map(t => (
                      <span key={t} className="px-2.5 py-1 bg-accent/10 border border-accent/20 text-accent text-[10px] uppercase tracking-widest">{t}</span>
                    ))}
                  </div>
                )}
                {f.tiers && (
                  <div className="flex flex-wrap gap-2">
                    {f.tiers.map(t => (
                      <span key={t.label} className={`px-2.5 py-1 text-xs font-medium border ${t.color} border-current/20`}>{t.label}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Smaller feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.filter(f => !f.large).map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : i * 0.06 }}
                className="bg-card border border-primary-900 p-5 hover:bg-card-hover transition-colors flex flex-col"
              >
                <h4 className="font-display text-lg tracking-wider mb-2">{f.title}</h4>
                <p className="text-xs text-primary-400 leading-relaxed flex-1">{f.description}</p>
                {f.link && (
                  <Link to={f.link} className="text-[10px] text-accent hover:underline uppercase tracking-widest mt-3 self-start">
                    Try it →
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-px flex-1 bg-primary-900" />
            <h2 className="font-display text-3xl sm:text-4xl tracking-wider">FAQ</h2>
            <div className="h-px flex-1 bg-primary-900" />
          </motion.div>

          <div className="space-y-px">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3, delay: reduce ? 0 : i * 0.04 }}
                className="border border-primary-900 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left text-sm font-semibold flex justify-between items-center hover:bg-card transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: faqOpen === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
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

        {/* ── FOOTER ── */}
        <footer className="border-t border-primary-900 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

              <div>
                <div className="font-display text-2xl text-white tracking-wider mb-2">CFB DYNASTY TOOLS</div>
                <p className="text-sm text-primary-500 mb-4 leading-relaxed max-w-xs">
                  Free tools for planning your next college football dynasty. No account required.
                </p>
                <Link
                  to="/about#support"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent transition-colors text-xs font-semibold tracking-wider"
                >
                  ☕ SUPPORT THE SITE
                </Link>
              </div>

              <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-[10px] text-primary-600 uppercase tracking-widest mb-3">Tools</div>
                  <ul className="space-y-2">
                    {[['/picker', 'Team Picker'], ['/conference-builder', 'Conf Builder'], ['/teams', 'All Teams'], ['/rankings', 'Poll Rankings'], ['/challenge', 'Challenge Gen']].map(([to, label]) => (
                      <li key={to}><Link to={to} className="text-primary-400 hover:text-accent text-sm transition-colors">{label}</Link></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] text-primary-600 uppercase tracking-widest mb-3">Info</div>
                  <ul className="space-y-2">
                    {[['/about', 'About & FAQ'], ['/changelog', 'Changelog'], ['/privacy', 'Privacy Policy']].map(([to, label]) => (
                      <li key={to}><Link to={to} className="text-primary-400 hover:text-accent text-sm transition-colors">{label}</Link></li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-primary-600 uppercase tracking-widest mb-3">Updates</div>
                  <Link to="/changelog" className="text-primary-400 hover:text-accent text-sm transition-colors block">v1.2.0 — Challenge generator + shareable cards</Link>
                  <Link to="/changelog" className="text-primary-500 hover:text-accent text-xs transition-colors block mt-1">View all changes →</Link>
                </div>
              </div>

            </div>

            <div className="border-t border-primary-900 pt-6">
              <p className="text-primary-600 text-xs text-center max-w-3xl mx-auto leading-relaxed">
                Unofficial fan-made tool. Not affiliated with EA Sports, the NCAA, or any university.
                All team names and trademarks are property of their respective owners.
                Team ratings are for entertainment purposes only.
              </p>
            </div>
          </div>
        </footer>

      </div>
    </PageTransition>
  )
}
