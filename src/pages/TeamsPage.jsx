import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useTeams } from '../hooks/useTeams'
import { teamSlug } from '../lib/teamSlug'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'
import { panelVariants } from '../lib/motionTokens'

const CONFERENCE_ORDER = [
  'Big Ten', 'SEC', 'ACC', 'Big 12',
  'American', 'Mountain West', 'Sun Belt', 'MAC', 'C-USA',
  'Pac-12', 'Independent',
]

const DIFFICULTY_COLOR = {
  Easy: 'text-green-400 bg-green-400/10',
  Medium: 'text-yellow-400 bg-yellow-400/10',
  Hard: 'text-orange-400 bg-orange-400/10',
  Legendary: 'text-red-400 bg-red-400/10',
}

export default function TeamsPage() {
  const { teams } = useTeams()
  const [activeConference, setActiveConference] = useState('All')
  const [selectedTeam, setSelectedTeam] = useState(null)
  const reduce = useReducedMotion()

  const tabs = ['All', ...CONFERENCE_ORDER]

  const grouped = useMemo(() => {
    const source = activeConference === 'All'
      ? teams
      : teams.filter(t => t.conference === activeConference)

    if (activeConference !== 'All') {
      return { [activeConference]: source }
    }

    return CONFERENCE_ORDER.reduce((acc, conf) => {
      const confTeams = source.filter(t => t.conference === conf)
      if (confTeams.length) acc[conf] = confTeams
      return acc
    }, {})
  }, [teams, activeConference])

  const handleSelect = (team) => {
    setSelectedTeam(prev => prev?.id === team.id ? null : team)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-app text-white">
        <Header />

        {/* Page title */}
        <div className="border-b border-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <h1 className="font-display text-5xl sm:text-7xl tracking-wider">ALL TEAMS</h1>
            <p className="text-primary-400 text-sm mt-1">{teams.length} FBS programs — browse by conference or click any team for details</p>
          </div>
        </div>

        {/* Conference tabs */}
        <div className="border-b border-primary-900 bg-app sticky top-14 z-40 overflow-x-auto scrollbar-hide">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-max">
              {tabs.map(conf => {
                const count = conf === 'All' ? teams.length : teams.filter(t => t.conference === conf).length
                return (
                  <button
                    key={conf}
                    onClick={() => { setActiveConference(conf); setSelectedTeam(null) }}
                    className={`px-3 sm:px-4 py-3 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
                      activeConference === conf
                        ? 'border-accent text-accent'
                        : 'border-transparent text-primary-400 hover:text-white'
                    }`}
                  >
                    {conf === 'All' ? `All (${count})` : `${conf} (${count})`}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

          {/* Selected team panel */}
          <AnimatePresence mode="wait">
            {selectedTeam && (
              <motion.div
                key={selectedTeam.id}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mb-8 bg-card border-2 border-accent p-5 sm:p-6 shadow-xl shadow-accent/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="flex gap-2">
                        <div className="w-7 h-7 rounded-full border-2 border-white/20 shadow" style={{ backgroundColor: selectedTeam.colors[0] }} />
                        <div className="w-7 h-7 rounded-full border-2 border-white/20 shadow" style={{ backgroundColor: selectedTeam.colors[1] }} />
                      </div>
                      <h2 className="font-display text-3xl sm:text-4xl tracking-wider">{selectedTeam.name}</h2>
                      {selectedTeam.ratingsPlaceholder && (
                        <span className="px-2 py-0.5 bg-highlight/20 border border-highlight/40 text-highlight text-[10px] font-bold uppercase tracking-widest">CFB 27</span>
                      )}
                    </div>
                    <p className="text-sm text-primary-400">{selectedTeam.location} · {selectedTeam.conference}</p>
                    {selectedTeam.stadiumName && (
                      <p className="text-xs text-primary-500 mt-0.5">
                        {selectedTeam.stadiumName}{selectedTeam.stadiumCapacity ? ` · ${selectedTeam.stadiumCapacity.toLocaleString()} cap.` : ''}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedTeam(null)}
                    className="text-primary-500 hover:text-white transition-colors text-sm px-2"
                  >
                    ✕
                  </button>
                </div>

                {selectedTeam.ratingsPlaceholder && (
                  <div className="mb-4 px-3 py-2 bg-highlight/10 border border-highlight/30 text-highlight text-xs">
                    ⚡ <strong>CFB 27 New Addition</strong> — Ratings are estimated. Official numbers drop July 9.
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  {[
                    { label: 'Overall', value: selectedTeam.overallRating, color: 'text-accent' },
                    { label: 'Offense', value: selectedTeam.offenseRating, color: 'text-accent-400' },
                    { label: 'Defense', value: selectedTeam.defenseRating, color: 'text-highlight' },
                    { label: 'Prestige', value: `${selectedTeam.prestige}/100`, color: 'text-white' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-app p-3 border border-primary-900">
                      <div className="text-xs text-primary-500 uppercase tracking-widest mb-1">{stat.label}</div>
                      <div className={`font-display text-2xl tracking-wider ${stat.color}`}>{stat.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-2 py-1 text-xs font-medium ${DIFFICULTY_COLOR[selectedTeam.difficulty] || 'text-primary-400'}`}>
                    {selectedTeam.difficulty}
                  </span>
                  <span className="text-accent text-sm">{selectedTeam.stars} ★</span>
                  {selectedTeam.categories.map((cat, i) => (
                    <span key={i} className="px-2 py-0.5 bg-primary-900/60 text-xs text-primary-300">
                      {cat}
                    </span>
                  ))}
                  <div className="ml-auto flex items-center gap-4">
                    <Link
                      to={`/teams/${teamSlug(selectedTeam.name)}`}
                      className="text-xs text-primary-400 hover:text-white transition-colors"
                    >
                      Full Profile →
                    </Link>
                    <Link
                      to={`/picker?team=${selectedTeam.id}`}
                      className="text-xs text-accent hover:underline"
                    >
                      Open in Picker →
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Conference sections */}
          {Object.entries(grouped).map(([conf, confTeams]) => (
            <div key={conf} className="mb-10 sm:mb-14">
              {activeConference === 'All' && (
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="font-display text-2xl sm:text-3xl tracking-wider">{conf.toUpperCase()}</h2>
                  <span className="text-primary-600 text-xs">{confTeams.length} teams</span>
                  <div className="h-px flex-1 bg-primary-900" />
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
                {confTeams.map((team, i) => (
                  <motion.button
                    key={team.id}
                    initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: reduce ? 0 : Math.min(i * 0.02, 0.18), ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: reduce ? 0 : -2, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(team)}
                    className={`bg-card border text-left overflow-hidden transition-colors ${
                      selectedTeam?.id === team.id
                        ? 'border-accent shadow-lg shadow-accent/20'
                        : 'border-primary-900 hover:border-primary-700 hover:bg-card-hover'
                    }`}
                  >
                    {/* Color bar */}
                    <div className="h-1.5 flex">
                      <div className="flex-1" style={{ backgroundColor: team.colors[0] }} />
                      <div className="flex-1" style={{ backgroundColor: team.colors[1] }} />
                    </div>
                    <div className="p-2.5 sm:p-3">
                      <div className="flex items-start justify-between gap-1 mb-1.5">
                        <span className="font-display text-sm sm:text-base tracking-wider leading-tight">{team.name}</span>
                        {team.ratingsPlaceholder && (
                          <span className="text-highlight text-[9px] font-bold uppercase tracking-widest flex-shrink-0 mt-0.5">NEW</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] px-1.5 py-0.5 font-medium ${DIFFICULTY_COLOR[team.difficulty] || ''}`}>
                          {team.difficulty}
                        </span>
                        <span className="text-xs text-accent font-display tracking-wider">{team.overallRating}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
