import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useTeams } from '../hooks/useTeams'
import { teamSlug } from '../lib/teamSlug'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'

const DIFFICULTY_DESC = {
  Easy: 'Immediate contender with blue-chip recruiting and proven depth. Great for narrative-focused or sim-style playthroughs.',
  Medium: 'Solid foundation with room to grow. Competitive in Year 1, consistently challenging for titles by Year 3.',
  Hard: 'A genuine rebuild. Recruiting disadvantages and depth chart holes make the early grind real.',
  Legendary: 'Maximum difficulty. Near-zero recruiting pull, minimal prestige, and years of digging out before you can compete.',
}

const DIFFICULTY_COLOR = {
  Easy: 'text-green-400 border-green-400/40 bg-green-400/10',
  Medium: 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10',
  Hard: 'text-orange-400 border-orange-400/40 bg-orange-400/10',
  Legendary: 'text-red-400 border-red-400/40 bg-red-400/10',
}

function StatBar({ label, value, delay = 0 }) {
  const pct = Math.min(Math.round((value / 99) * 100), 100)
  const color = value >= 90 ? 'bg-accent' : value >= 80 ? 'bg-accent/70' : value >= 70 ? 'bg-yellow-500/70' : 'bg-primary-600'
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-xs text-primary-500 uppercase tracking-widest">{label}</span>
        <span className="font-display text-xl tracking-wider text-white">{value}</span>
      </div>
      <div className="h-1 bg-primary-900 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
        />
      </div>
    </div>
  )
}

function Stars({ count }) {
  const full = Math.floor(count)
  const half = count % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <span className="text-accent tracking-tight text-sm">
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(empty)}
      <span className="text-primary-500 ml-1.5 text-xs">{count}</span>
    </span>
  )
}

function RelatedTeamCard({ team }) {
  return (
    <Link
      to={`/teams/${teamSlug(team.name)}`}
      className="bg-card border border-primary-900 hover:border-primary-700 hover:bg-card-hover transition-colors overflow-hidden group"
    >
      <div className="h-1 flex">
        <div className="flex-1" style={{ backgroundColor: team.colors[0] }} />
        <div className="flex-1" style={{ backgroundColor: team.colors[1] }} />
      </div>
      <div className="p-3">
        <div className="font-display text-sm tracking-wider group-hover:text-accent transition-colors leading-tight mb-1">{team.name}</div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-primary-500">{team.difficulty}</span>
          <span className="font-display text-sm text-accent tracking-wider">{team.overallRating}</span>
        </div>
      </div>
    </Link>
  )
}

export default function TeamDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { teams } = useTeams()

  const team = teams.find(t => teamSlug(t.name) === slug)

  useEffect(() => {
    if (!team) return
    document.title = `${team.name} CFB Dynasty — ${team.overallRating} OVR, ${team.difficulty} | CFB Dynasty Tools`
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content',
      `${team.name} CFB 27 dynasty overview. ${team.difficulty} difficulty, ${team.overallRating} overall rating, ${team.prestige}/100 prestige. Conference: ${team.conference}. ${team.stadiumName ? `Home of ${team.stadiumName}.` : ''} Plan your next CFB dynasty.`
    )
  }, [team])

  if (!team) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-app text-white">
          <Header />
          <div className="max-w-2xl mx-auto px-4 py-24 text-center">
            <div className="font-display text-6xl text-accent tracking-wider mb-4">404</div>
            <h1 className="font-display text-2xl tracking-wider mb-2">Team not found</h1>
            <p className="text-primary-400 text-sm mb-8">No team matches that URL.</p>
            <Link to="/teams" className="text-accent hover:text-accent-400 text-sm transition-colors">← Back to all teams</Link>
          </div>
        </div>
      </PageTransition>
    )
  }

  const related = teams
    .filter(t => t.conference === team.conference && t.id !== team.id)
    .slice(0, 6)

  const [primary, secondary] = team.colors

  return (
    <PageTransition>
      <div className="min-h-screen bg-app text-white">
        <Header />

        {/* Team color bar */}
        <div className="h-1.5 flex sticky top-14 z-30">
          <div className="flex-1 transition-all" style={{ backgroundColor: primary }} />
          <div className="flex-1 transition-all" style={{ backgroundColor: secondary }} />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-primary-500 mb-6">
            <Link to="/teams" className="hover:text-white transition-colors">All Teams</Link>
            <span>/</span>
            <span className="text-primary-300">{team.conference}</span>
            <span>/</span>
            <span className="text-white">{team.name}</span>
          </div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 sm:mb-12"
          >
            <div className="flex items-start gap-4 mb-3">
              {/* Color swatches */}
              <div className="flex gap-1.5 mt-2 flex-shrink-0">
                <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: primary }} />
                <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: secondary }} />
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-wider leading-none">{team.name}</h1>
                  {team.ratingsPlaceholder && (
                    <span className="px-2 py-0.5 bg-highlight/20 border border-highlight/40 text-highlight text-[10px] font-bold uppercase tracking-widest self-start mt-2">CFB 27</span>
                  )}
                </div>
                <p className="text-primary-400 text-sm mt-2">{team.location} · {team.conference}</p>
              </div>
            </div>

            {team.ratingsPlaceholder && (
              <div className="mt-4 px-4 py-2.5 bg-highlight/10 border border-highlight/30 text-highlight text-xs max-w-xl">
                ⚡ <strong>CFB 27 New Addition</strong> — Ratings are estimated. Official numbers update July 9.
              </div>
            )}
          </motion.div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 mb-12">

            {/* Ratings — wider column */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3 bg-card border border-primary-900 p-6 sm:p-8"
            >
              {/* OVR hero number */}
              <div className="flex items-end gap-4 mb-8 pb-6 border-b border-primary-900">
                <div>
                  <div className="text-xs text-primary-500 uppercase tracking-widest mb-1">Overall</div>
                  <div className="font-display text-7xl sm:text-8xl text-accent tracking-wider leading-none">{team.overallRating}</div>
                </div>
                <div className="pb-2 text-primary-500">
                  <div className="text-xs mb-1">Prestige</div>
                  <div className="font-display text-2xl text-white tracking-wider">{team.prestige}<span className="text-primary-600 text-base">/100</span></div>
                </div>
                <div className="ml-auto pb-2 text-right">
                  <div className="text-xs text-primary-500 mb-1">Recruiting</div>
                  <Stars count={team.stars} />
                </div>
              </div>

              {/* Stat bars */}
              <div className="space-y-5">
                <StatBar label="Offense" value={team.offenseRating} delay={0.15} />
                <StatBar label="Defense" value={team.defenseRating} delay={0.25} />
                <StatBar label="Prestige" value={team.prestige} delay={0.35} />
              </div>
            </motion.div>

            {/* Right column */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              {/* Difficulty */}
              <div className="bg-card border border-primary-900 p-5">
                <div className="text-xs text-primary-500 uppercase tracking-widest mb-3">Dynasty Difficulty</div>
                <div className={`inline-flex px-2.5 py-1 text-sm font-medium border mb-3 ${DIFFICULTY_COLOR[team.difficulty]}`}>
                  {team.difficulty}
                </div>
                <p className="text-xs text-primary-400 leading-relaxed">{DIFFICULTY_DESC[team.difficulty]}</p>
              </div>

              {/* Categories */}
              <div className="bg-card border border-primary-900 p-5">
                <div className="text-xs text-primary-500 uppercase tracking-widest mb-3">Categories</div>
                <div className="flex flex-wrap gap-2">
                  {team.categories.map(cat => (
                    <span key={cat} className="px-2.5 py-1 bg-primary-900/60 border border-primary-800 text-xs text-primary-300">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stadium */}
              {team.stadiumName && (
                <div className="bg-card border border-primary-900 p-5">
                  <div className="text-xs text-primary-500 uppercase tracking-widest mb-3">Stadium</div>
                  <div className="font-display text-lg tracking-wider mb-1">{team.stadiumName}</div>
                  {team.stadiumCapacity && (
                    <div className="text-sm text-primary-400">
                      {team.stadiumCapacity.toLocaleString()} capacity
                    </div>
                  )}
                </div>
              )}

              {/* CTA */}
              <Link
                to={`/picker?team=${team.id}`}
                className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-400 text-black font-display tracking-wider px-6 py-4 transition-colors mt-auto"
              >
                PICK {team.name.toUpperCase()} →
              </Link>
            </motion.div>
          </div>

          {/* Related teams */}
          {related.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <h2 className="font-display text-xl tracking-wider text-primary-300">ALSO IN {team.conference.toUpperCase()}</h2>
                <div className="h-px flex-1 bg-primary-900" />
                <Link to="/teams" className="text-xs text-primary-500 hover:text-white transition-colors">View all →</Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
                {related.map(t => <RelatedTeamCard key={t.id} team={t} />)}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </PageTransition>
  )
}
