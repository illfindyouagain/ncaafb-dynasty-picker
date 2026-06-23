import { useEffect } from 'react'
import { motion } from 'motion/react'
import { useAPPoll } from '../hooks/useAPPoll'
import { CFB27_PRESEASON_POLL } from '../data/cfb27Poll'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'
import { staggerContainer, staggerItem } from '../lib/motionTokens'

const TREND_COLOR = (trend) => {
  const n = parseInt(trend, 10)
  if (n > 0) return 'text-green-400'
  if (n < 0) return 'text-red-400'
  return 'text-primary-500'
}

const TREND_ARROW = (trend) => {
  const n = parseInt(trend, 10)
  if (n > 0) return `▲${n}`
  if (n < 0) return `▼${Math.abs(n)}`
  return '—'
}

function PollRow({ rank, prev, trend, name, conference, record, points, firstPlaceVotes, index }) {
  return (
    <motion.div
      variants={staggerItem}
      className={`flex items-center gap-3 px-3 sm:px-4 py-3 border-b border-primary-900/60 hover:bg-card-hover transition-colors ${
        rank <= 5 ? 'bg-card/40' : ''
      }`}
    >
      <div className="w-6 text-right">
        <span className={`font-display text-lg tracking-wider ${rank <= 5 ? 'text-accent' : 'text-primary-400'}`}>
          {rank}
        </span>
      </div>
      <div className="w-10 text-center">
        <span className={`text-[10px] font-mono ${TREND_COLOR(trend)}`}>
          {TREND_ARROW(trend)}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-white truncate">{name}</div>
        <div className="text-[10px] text-primary-500 truncate">{conference}{record ? ` · ${record}` : ''}</div>
      </div>
      {points !== undefined && (
        <div className="text-right flex-shrink-0">
          <div className="text-xs text-primary-400 font-mono">{points} pts</div>
          {firstPlaceVotes > 0 && (
            <div className="text-[10px] text-accent">{firstPlaceVotes} #1</div>
          )}
        </div>
      )}
    </motion.div>
  )
}

function PollSkeleton() {
  return (
    <div className="space-y-0">
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-primary-900/60">
          <div className="w-6 h-5 bg-primary-900 animate-pulse rounded" />
          <div className="w-10 h-3 bg-primary-900 animate-pulse rounded" />
          <div className="flex-1 space-y-1.5">
            <div className="h-4 bg-primary-900 animate-pulse rounded w-3/4" />
            <div className="h-2.5 bg-primary-900 animate-pulse rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function RankingsPage() {
  const { poll, loading, error } = useAPPoll()

  useEffect(() => {
    document.title = 'Poll Rankings - CFB Dynasty Tools'
  }, [])

  // Find teams that appear in AP but not CFB27 and vice versa
  const divergence = poll && CFB27_PRESEASON_POLL
    ? {
        apOnly: poll.teams.filter(t => !CFB27_PRESEASON_POLL.find(c => c.name === t.name)),
        cfb27Only: CFB27_PRESEASON_POLL.filter(t => !poll.teams.find(a => a.name === t.name)),
        bigDiffs: poll.teams.filter(t => {
          const match = CFB27_PRESEASON_POLL.find(c => c.name === t.name)
          return match && Math.abs(t.rank - match.rank) >= 5
        }),
      }
    : null

  return (
    <PageTransition>
      <div className="min-h-screen bg-app text-white">
        <Header />

        {/* Page header */}
        <div className="border-b border-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <h1 className="font-display text-5xl sm:text-7xl tracking-wider">THE POLLS</h1>
            <p className="text-primary-400 text-sm mt-1">
              AP Poll vs. CFB 27 In-Game Preseason Rankings — spot the differences
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">

            {/* AP POLL */}
            <div className="bg-card border border-primary-900">
              <div className="px-4 py-4 border-b border-primary-900 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl tracking-wider">AP POLL</h2>
                  {poll?.headline && (
                    <p className="text-xs text-primary-500 mt-0.5">{poll.headline}</p>
                  )}
                </div>
                <div className="text-xs text-primary-500 text-right">
                  <div>Live</div>
                  <div className="text-primary-600">via ESPN</div>
                </div>
              </div>

              {loading && <PollSkeleton />}

              {error && (
                <div className="p-8 text-center">
                  <p className="text-primary-500 text-sm">Couldn't load the AP Poll right now.</p>
                  <p className="text-primary-600 text-xs mt-1">{error}</p>
                </div>
              )}

              {poll && !loading && (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {poll.teams.map((team, i) => (
                    <PollRow key={team.rank} index={i} {...team} />
                  ))}
                  {poll.others?.length > 0 && (
                    <div className="px-4 py-3 border-t border-primary-900">
                      <p className="text-xs text-primary-500 font-medium uppercase tracking-widest mb-2">Others Receiving Votes</p>
                      <p className="text-xs text-primary-400 leading-relaxed">
                        {poll.others.map(t => `${t.name} (${t.points})`).join(' · ')}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* CFB 27 IN-GAME POLL */}
            <div className="bg-card border border-primary-900">
              <div className="px-4 py-4 border-b border-primary-900 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl tracking-wider">CFB 27 POLL</h2>
                  <p className="text-xs text-primary-500 mt-0.5">In-game preseason rankings</p>
                </div>
                <div className="text-xs text-right">
                  <div className="text-highlight font-bold">July 9</div>
                  <div className="text-primary-600">launch day</div>
                </div>
              </div>

              {CFB27_PRESEASON_POLL ? (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {CFB27_PRESEASON_POLL.map((team, i) => (
                    <PollRow key={team.rank} index={i} {...team} />
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                  <div className="font-display text-6xl text-primary-800 tracking-wider mb-4">7.9</div>
                  <div className="text-highlight font-bold text-sm uppercase tracking-widest mb-3">Coming July 9</div>
                  <p className="text-primary-400 text-sm max-w-xs leading-relaxed">
                    EA Sports College Football 27 releases July 9. We'll update the in-game preseason poll here as soon as rankings are available.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-2 w-full max-w-xs">
                    <div className="bg-app border border-primary-900 p-3 text-center">
                      <div className="text-primary-500 text-[10px] uppercase tracking-widest">Likely #1</div>
                      <div className="font-display text-lg tracking-wider text-accent mt-0.5">TBD</div>
                    </div>
                    <div className="bg-app border border-primary-900 p-3 text-center">
                      <div className="text-primary-500 text-[10px] uppercase tracking-widest">Defending</div>
                      <div className="font-display text-lg tracking-wider text-accent mt-0.5">Indiana</div>
                    </div>
                  </div>
                  {/* Placeholder skeleton to match AP column height */}
                  <div className="w-full mt-6 space-y-0 opacity-20">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3 px-0 py-3 border-b border-primary-900/40">
                        <div className="w-6 h-4 bg-primary-800 rounded" />
                        <div className="flex-1 h-4 bg-primary-800 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Divergence section — only shows when both polls are available */}
          {divergence && (
            <div className="mt-8 bg-card border border-primary-900 p-5 sm:p-6">
              <h3 className="font-display text-2xl tracking-wider mb-5">WHERE THEY DISAGREE</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {divergence.bigDiffs.length > 0 && (
                  <div>
                    <div className="text-xs text-primary-500 uppercase tracking-widest mb-3 font-medium">Big rank gaps (5+)</div>
                    <div className="space-y-2">
                      {divergence.bigDiffs.map(t => {
                        const cfb = CFB27_PRESEASON_POLL.find(c => c.name === t.name)
                        return (
                          <div key={t.name} className="flex items-center justify-between text-sm">
                            <span className="text-white">{t.name}</span>
                            <span className="text-primary-400">AP #{t.rank} → CFB #{cfb?.rank}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
                {divergence.apOnly.length > 0 && (
                  <div>
                    <div className="text-xs text-primary-500 uppercase tracking-widest mb-3 font-medium">In AP, not CFB 27</div>
                    <div className="space-y-1.5">
                      {divergence.apOnly.map(t => (
                        <div key={t.name} className="text-sm text-primary-300">#{t.rank} {t.name}</div>
                      ))}
                    </div>
                  </div>
                )}
                {divergence.cfb27Only.length > 0 && (
                  <div>
                    <div className="text-xs text-primary-500 uppercase tracking-widest mb-3 font-medium">In CFB 27, not AP</div>
                    <div className="space-y-1.5">
                      {divergence.cfb27Only.map(t => (
                        <div key={t.name} className="text-sm text-primary-300">#{t.rank} {t.name}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Attribution */}
          <p className="text-center text-xs text-primary-600 mt-8">
            AP Poll data via ESPN. In-game poll reflects EA Sports College Football 27 preseason rankings.
            This site is unofficial and not affiliated with EA Sports or the AP.
          </p>
        </div>
      </div>
    </PageTransition>
  )
}
