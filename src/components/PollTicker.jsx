import { Link } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import { useAPPoll } from '../hooks/useAPPoll'

function TrendBadge({ trend }) {
  const n = parseInt(trend, 10)
  if (trend === 'NEW') return <span className="text-highlight text-[9px] font-bold">NEW</span>
  if (n > 0) return <span className="text-green-400 text-[9px]">▲{n}</span>
  if (n < 0) return <span className="text-red-400 text-[9px]">▼{Math.abs(n)}</span>
  return null
}

export default function PollTicker() {
  const { poll, loading, error } = useAPPoll()
  const reduce = useReducedMotion()

  if (loading || error || !poll) return null

  const teams = poll.teams

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-8 flex items-stretch bg-[#030803] border-t border-primary-900/80 shadow-lg shadow-black/40">

      {/* Label */}
      <Link
        to="/rankings"
        className="flex-shrink-0 flex items-center gap-1.5 px-3 bg-accent hover:bg-accent-400 transition-colors border-r border-black/30"
      >
        <span className="font-display text-black text-[11px] tracking-widest whitespace-nowrap select-none">AP TOP 25</span>
      </Link>

      {/* Scrolling strip */}
      <div className="overflow-hidden flex-1 flex items-center">
        <div
          className={reduce ? 'flex' : 'ticker-scroll flex'}
          style={{ width: 'max-content' }}
        >
          {/* Render twice for seamless loop */}
          {[...teams, ...teams].map((team, i) => (
            <div
              key={`${i < teams.length ? 'a' : 'b'}-${team.rank}`}
              className="flex items-center gap-1.5 px-3.5 select-none"
            >
              <span className={`font-display text-[13px] tracking-wider tabular-nums ${team.rank <= 5 ? 'text-accent' : 'text-primary-500'}`}>
                {team.rank}
              </span>
              <span className="text-[12px] font-semibold text-white whitespace-nowrap">{team.name}</span>
              {team.record && (
                <span className="text-[10px] text-primary-500 whitespace-nowrap">{team.record}</span>
              )}
              <TrendBadge trend={team.trend} />
              <span className="text-primary-800 text-[10px] ml-2">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right edge: season label */}
      {poll.season && (
        <div className="flex-shrink-0 flex items-center px-3 border-l border-primary-900/80">
          <span className="text-[10px] text-primary-600 whitespace-nowrap">{poll.season}</span>
        </div>
      )}
    </div>
  )
}
