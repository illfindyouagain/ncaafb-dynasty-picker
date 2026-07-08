import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'

const SUGGESTED_LINKS = [
  ['/picker', 'TEAM PICKER', 'Find your next dynasty team'],
  ['/teams', 'ALL TEAMS', 'Browse all 137 FBS programs'],
  ['/conference-builder', 'CONF BUILDER', 'Build custom conferences'],
  ['/toughest-places', 'TOUGHEST VENUES', "EA's top 25 hostile stadiums"],
]

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found - CFB Dynasty Tools'
  }, [])

  return (
    <PageTransition>
      <div className="min-h-screen bg-app text-white">
        <Header />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="font-display text-8xl sm:text-9xl text-primary-800 tracking-wider leading-none">404</div>
          <h1 className="font-display text-4xl sm:text-5xl tracking-wider text-accent mt-2">TURNOVER ON DOWNS</h1>
          <p className="text-primary-400 text-sm sm:text-base mt-4 max-w-md mx-auto leading-relaxed">
            This page fumbled out of bounds. It may have been moved, renamed, or never existed.
            Here's where the action is:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10 text-left">
            {SUGGESTED_LINKS.map(([to, title, desc]) => (
              <Link
                key={to}
                to={to}
                className="bg-card border border-primary-900 hover:border-accent hover:bg-card-hover p-4 transition-colors"
              >
                <div className="font-display text-xl tracking-wider text-white">{title}</div>
                <div className="text-xs text-primary-500 mt-1">{desc}</div>
              </Link>
            ))}
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-400 text-black px-6 py-3 font-display tracking-wider text-lg transition-colors mt-10"
          >
            ← BACK TO HOME
          </Link>
        </div>
      </div>
    </PageTransition>
  )
}
