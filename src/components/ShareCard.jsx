import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const DIFFICULTY_COLOR = {
  Easy: '#4ade80',
  Medium: '#facc15',
  Hard: '#fb923c',
  Legendary: '#f87171',
}

export default function ShareCard({ team, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const stars = Math.round(team.stars)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-sm"
        >
          {/* Instructions */}
          <div className="text-center mb-3">
            <p className="text-xs text-primary-400 uppercase tracking-widest">Screenshot to share</p>
          </div>

          {/* The shareable card */}
          <div
            id="share-card"
            className="bg-[#0a0a0a] border border-white/10 overflow-hidden select-none"
            style={{ fontFamily: "'Share Tech Mono', 'Courier New', monospace" }}
          >
            {/* Team color bar */}
            <div className="h-2 flex">
              <div className="flex-1" style={{ backgroundColor: team.colors[0] }} />
              <div className="flex-1" style={{ backgroundColor: team.colors[1] }} />
            </div>

            <div className="p-6 sm:p-8">
              {/* Site badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] text-white/30 uppercase tracking-widest">CFB Dynasty Tools</span>
                <span className="text-[10px] text-white/30 uppercase tracking-widest">liftoffgaming.com</span>
              </div>

              {/* Eyebrow */}
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-1">My CFB 27 Dynasty Pick</div>

              {/* Team name */}
              <div
                className="text-4xl sm:text-5xl font-bold uppercase leading-none mb-1 tracking-wider"
                style={{ color: team.colors[0] }}
              >
                {team.name}
              </div>

              {/* Conference + location */}
              <div className="text-xs text-white/50 mb-6 uppercase tracking-widest">
                {team.conference} · {team.location}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white/5 p-3 text-center">
                  <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1">OVR</div>
                  <div className="text-2xl font-bold text-white">{team.overallRating}</div>
                </div>
                <div className="bg-white/5 p-3 text-center">
                  <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Difficulty</div>
                  <div className="text-sm font-bold" style={{ color: DIFFICULTY_COLOR[team.difficulty] }}>
                    {team.difficulty}
                  </div>
                </div>
                <div className="bg-white/5 p-3 text-center">
                  <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Stars</div>
                  <div className="text-sm font-bold text-white">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</div>
                </div>
              </div>

              {/* Category badges */}
              <div className="flex flex-wrap gap-1.5">
                {team.categories.map(cat => (
                  <span
                    key={cat}
                    className="text-[9px] px-2 py-0.5 uppercase tracking-widest border border-white/10 text-white/40"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5 px-6 sm:px-8 py-3 flex items-center justify-between">
              <span className="text-[9px] text-white/20 uppercase tracking-widest">NCAA Football 27 Dynasty</span>
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: team.colors[0] }} />
            </div>
          </div>

          {/* Close */}
          <div className="text-center mt-4">
            <button
              onClick={onClose}
              className="text-xs text-primary-500 hover:text-white transition-colors uppercase tracking-widest"
            >
              Close ✕
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
