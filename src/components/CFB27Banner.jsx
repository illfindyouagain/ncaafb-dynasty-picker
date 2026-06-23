import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CFB27Banner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="bg-highlight/10 border-b border-highlight/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-3">
        <span className="text-highlight text-xs font-bold uppercase tracking-widest flex-shrink-0">CFB 27</span>
        <div className="flex-1 overflow-hidden">
          <p className="text-xs text-primary-300 truncate sm:whitespace-normal">
            We're updating conferences ahead of CFB 27 (July 9). Some assignments may still shift — if something looks wrong, that's why.{' '}
            <Link to="/changelog" className="text-highlight underline hover:no-underline">
              See what's changed →
            </Link>
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="flex-shrink-0 text-primary-500 hover:text-white transition-colors text-sm leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
