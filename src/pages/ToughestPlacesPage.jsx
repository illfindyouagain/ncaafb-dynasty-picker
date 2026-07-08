import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useTeams } from '../hooks/useTeams'
import { TOUGHEST_PLACES, NEW_ENTRIES, DROPPED_OUT, isNewEntry } from '../data/toughestPlaces'
import { teamSlug } from '../lib/teamSlug'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'
import { staggerContainer, staggerItem } from '../lib/motionTokens'

function VenueRow({ entry, team }) {
  const isTopFive = entry.rank <= 5
  const isNew = isNewEntry(entry.team)
  // Crowd-noise bar: #1 fills the row, tapering down through #25
  const noisePct = Math.round(100 - (entry.rank - 1) * 3.2)

  return (
    <motion.div variants={staggerItem}>
      <Link
        to={`/teams/${teamSlug(entry.team)}`}
        className={`relative block px-3 sm:px-4 py-3 border-b border-primary-900/60 hover:bg-card-hover transition-colors overflow-hidden group ${
          isTopFive ? 'bg-card/40' : ''
        }`}
      >
        {/* Team-color noise bar behind content */}
        {team && (
          <div
            className="absolute inset-y-0 left-0 opacity-[0.08] group-hover:opacity-[0.14] transition-opacity"
            style={{ width: `${noisePct}%`, backgroundColor: team.colors[0] }}
          />
        )}
        <div className="relative flex items-center gap-3">
          <div className="w-8 text-right flex-shrink-0">
            <span className={`font-display text-2xl tracking-wider ${isTopFive ? 'text-accent' : 'text-primary-400'}`}>
              {entry.rank}
            </span>
          </div>
          {team && (
            <div className="w-1 self-stretch flex-shrink-0 flex flex-col rounded-sm overflow-hidden">
              <div className="flex-1" style={{ backgroundColor: team.colors[0] }} />
              <div className="flex-1" style={{ backgroundColor: team.colors[1] }} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white truncate">{entry.team}</span>
              {isNew && (
                <span className="bg-highlight/15 border border-highlight/40 text-highlight text-[9px] px-1.5 py-0.5 uppercase tracking-widest flex-shrink-0">
                  New
                </span>
              )}
            </div>
            <div className="text-[11px] text-primary-500 truncate">
              {entry.stadium}
              {team ? ` · ${team.conference}` : ''}
            </div>
          </div>
          {team?.stadiumCapacity && (
            <div className="text-right flex-shrink-0 hidden sm:block">
              <div className="text-xs text-primary-400 font-mono">{team.stadiumCapacity.toLocaleString()}</div>
              <div className="text-[10px] text-primary-600 uppercase tracking-widest">capacity</div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default function ToughestPlacesPage() {
  const { teams } = useTeams()

  useEffect(() => {
    document.title = 'Toughest Places to Play - CFB 27 Stadium Rankings | CFB Dynasty Tools'

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', "EA Sports College Football 27's official Top 25 Toughest Places to Play. Tiger Stadium tops the Stadium Pulse rankings again — see every venue, capacity, and who's new this year.")
    }

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Toughest Places to Play - CFB 27 | CFB Dynasty Tools')
    }

    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://liftoffgaming.com/toughest-places')
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', "EA's official CFB 27 Top 25 Toughest Places to Play — every stadium ranked, with capacities and year-over-year changes.")
    }
  }, [])

  const teamByName = useMemo(() => new Map(teams.map(t => [t.name, t])), [teams])

  const loudestVenue = useMemo(() => {
    const ranked = TOUGHEST_PLACES
      .map(entry => teamByName.get(entry.team))
      .filter(t => t?.stadiumCapacity)
    if (ranked.length === 0) return null
    return ranked.reduce((max, t) => (t.stadiumCapacity > max.stadiumCapacity ? t : max))
  }, [teamByName])

  const conferenceCounts = useMemo(() => {
    const counts = {}
    TOUGHEST_PLACES.forEach(entry => {
      const conf = teamByName.get(entry.team)?.conference
      if (conf) counts[conf] = (counts[conf] || 0) + 1
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [teamByName])

  return (
    <PageTransition>
      <div className="min-h-screen bg-app text-white">
        <Header />

        {/* Page header */}
        <div className="border-b border-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <h1 className="font-display text-5xl sm:text-7xl tracking-wider">TOUGHEST PLACES TO PLAY</h1>
            <p className="text-primary-400 text-sm mt-1">
              EA's official CFB 27 Stadium Pulse rankings — the 25 venues where road games go to die
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">

            {/* THE TOP 25 */}
            <div className="lg:col-span-2 bg-card border border-primary-900">
              <div className="px-4 py-4 border-b border-primary-900 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl tracking-wider">THE TOP 25</h2>
                  <p className="text-xs text-primary-500 mt-0.5">Official EA Sports College Football 27 rankings</p>
                </div>
                <div className="text-xs text-primary-500 text-right">
                  <div className="text-accent font-bold">🔥 Stadium Pulse</div>
                  <div className="text-primary-600">via EA Sports</div>
                </div>
              </div>

              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                {TOUGHEST_PLACES.map(entry => (
                  <VenueRow key={entry.rank} entry={entry} team={teamByName.get(entry.team)} />
                ))}
              </motion.div>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-6">

              {/* What is Stadium Pulse */}
              <div className="bg-card border border-primary-900 border-l-4 border-l-accent p-5">
                <h3 className="font-display text-xl tracking-wider mb-2">WHAT IS STADIUM PULSE?</h3>
                <p className="text-sm text-primary-400 leading-relaxed">
                  Stadium Pulse is CFB 27's home-field advantage system. Every road environment affects
                  your players, but these 25 stadiums crank it up — screen shake, muffled play art,
                  botched hot routes, and confidence swings when the crowd gets rolling.
                </p>
              </div>

              {/* New this year */}
              <div className="bg-card border border-primary-900 p-5">
                <h3 className="font-display text-xl tracking-wider mb-3">NEW THIS YEAR</h3>
                <div className="space-y-2">
                  {NEW_ENTRIES.map(name => {
                    const entry = TOUGHEST_PLACES.find(p => p.team === name)
                    return (
                      <Link
                        key={name}
                        to={`/teams/${teamSlug(name)}`}
                        className="flex items-center justify-between text-sm hover:bg-card-hover px-2 py-1.5 -mx-2 transition-colors"
                      >
                        <span className="text-highlight font-medium">▲ {name}</span>
                        <span className="text-primary-500">#{entry?.rank}</span>
                      </Link>
                    )
                  })}
                </div>
                <div className="h-px bg-primary-900 my-4" />
                <div className="text-xs text-primary-500 uppercase tracking-widest mb-2 font-medium">Dropped out</div>
                <div className="space-y-1.5">
                  {DROPPED_OUT.map(({ team, stadium }) => (
                    <div key={team} className="flex items-center justify-between text-sm">
                      <span className="text-primary-300">▼ {team}</span>
                      <span className="text-primary-600 text-xs truncate ml-2">{stadium}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick stats */}
              <div className="bg-card border border-primary-900 p-5">
                <h3 className="font-display text-xl tracking-wider mb-3">BY THE NUMBERS</h3>
                {loudestVenue && (
                  <div className="mb-4">
                    <div className="text-[10px] text-primary-600 uppercase tracking-widest">Biggest ranked venue</div>
                    <div className="font-display text-lg tracking-wider text-accent mt-0.5">{loudestVenue.stadiumName}</div>
                    <div className="text-xs text-primary-400">{loudestVenue.stadiumCapacity.toLocaleString()} seats · {loudestVenue.name}</div>
                  </div>
                )}
                <div className="text-[10px] text-primary-600 uppercase tracking-widest mb-2">Venues per conference</div>
                <div className="space-y-1.5">
                  {conferenceCounts.map(([conf, count]) => (
                    <div key={conf} className="flex items-center gap-2 text-sm">
                      <span className="text-primary-300 w-28 flex-shrink-0 truncate">{conf}</span>
                      <div className="flex-1 h-1.5 bg-primary-900 rounded-sm overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: `${(count / conferenceCounts[0][1]) * 100}%` }} />
                      </div>
                      <span className="text-primary-400 font-mono text-xs w-4 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-card border border-primary-900 p-5">
                <h3 className="font-display text-xl tracking-wider mb-2">BUILD A GAUNTLET</h3>
                <p className="text-sm text-primary-400 leading-relaxed mb-4">
                  Stack these venues into one custom conference and make every road trip a nightmare.
                </p>
                <Link
                  to="/conference-builder"
                  className="inline-flex items-center gap-2 bg-highlight/10 hover:bg-highlight/20 border border-highlight/40 text-highlight px-4 py-2 font-display tracking-wider text-sm transition-colors"
                >
                  OPEN BUILDER →
                </Link>
              </div>
            </div>
          </div>

          {/* Attribution */}
          <p className="text-center text-xs text-primary-600 mt-8">
            Rankings from EA Sports College Football 27's official Toughest Places to Play list.
            This site is unofficial and not affiliated with EA Sports.
          </p>
        </div>
      </div>
    </PageTransition>
  )
}
