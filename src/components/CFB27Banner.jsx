import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// July 9 2026, midnight Eastern (04:00 UTC)
const LAUNCH = new Date('2026-07-09T04:00:00Z')
const EXPIRE = new Date('2026-07-23T04:00:00Z')

function getTimeLeft() {
  const diff = LAUNCH - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function CFB27Banner() {
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem('cfb27-banner-v2') === '1'
  )
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (dismissed) return null
  if (Date.now() > EXPIRE) return null

  const dismiss = () => {
    sessionStorage.setItem('cfb27-banner-v2', '1')
    setDismissed(true)
  }

  // Post-launch banner
  if (!timeLeft) {
    return (
      <div className="bg-accent flex items-center justify-center gap-3 py-1.5 px-4 text-black">
        <span className="text-[11px] font-bold uppercase tracking-widest">
          🏈 CFB 27 IS LIVE — Ratings &amp; rosters updated
        </span>
        <button onClick={dismiss} className="ml-2 opacity-50 hover:opacity-100 transition-opacity text-xs" aria-label="Dismiss">
          ✕
        </button>
      </div>
    )
  }

  return (
    <div className="bg-highlight/10 border-b border-highlight/20 flex items-center justify-center gap-3 sm:gap-5 py-1.5 px-4">
      {/* Label */}
      <span className="text-highlight text-[10px] font-bold uppercase tracking-widest hidden sm:inline flex-shrink-0">
        CFB 27 DROPS IN
      </span>
      <span className="text-highlight text-[10px] font-bold uppercase tracking-widest sm:hidden flex-shrink-0">
        CFB 27
      </span>

      {/* Countdown */}
      <div className="flex items-center gap-1 font-display text-highlight tracking-wider text-sm">
        <span className="tabular-nums">{timeLeft.days}<span className="text-[9px] text-highlight/50 ml-0.5">D</span></span>
        <span className="text-highlight/30 text-xs">·</span>
        <span className="tabular-nums">{pad(timeLeft.hours)}<span className="text-[9px] text-highlight/50 ml-0.5">H</span></span>
        <span className="text-highlight/30 text-xs">·</span>
        <span className="tabular-nums">{pad(timeLeft.mins)}<span className="text-[9px] text-highlight/50 ml-0.5">M</span></span>
        <span className="text-highlight/30 text-xs">·</span>
        <span className="tabular-nums">{pad(timeLeft.secs)}<span className="text-[9px] text-highlight/50 ml-0.5">S</span></span>
      </div>

      {/* Subtle context link */}
      <Link
        to="/changelog"
        className="text-[10px] text-highlight/50 hover:text-highlight transition-colors uppercase tracking-widest hidden md:inline"
      >
        What's changing →
      </Link>

      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="text-highlight/30 hover:text-highlight/70 transition-colors text-xs ml-1"
      >
        ✕
      </button>
    </div>
  )
}
