import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import CFB27Banner from './CFB27Banner'

export default function Header() {
  const { pathname } = useLocation()

  const navLink = (to, label) => {
    const active = pathname === to
    return (
      <Link
        to={to}
        className={`relative text-sm font-medium transition-colors ${active ? 'text-white' : 'text-primary-300 hover:text-white'}`}
      >
        {label}
        {active && (
          <motion.span
            layoutId="nav-underline"
            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent"
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-app/95 backdrop-blur-sm">
      <CFB27Banner />
      <div className="border-b border-primary-900/60">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <span className="text-xl sm:text-2xl">🏈</span>
            <span className="font-display text-2xl sm:text-3xl text-white tracking-wider">
              CFB DYNASTY
            </span>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6">
            {navLink('/teams', 'Teams')}
            {navLink('/rankings', 'Polls')}
            {navLink('/conference-builder', 'Builder')}
            <span className="hidden sm:block">{navLink('/toughest-places', 'Venues')}</span>
            <span className="hidden sm:block">{navLink('/changelog', 'Changelog')}</span>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            >
              <Link
                to="/picker"
                className={`bg-accent text-black hover:bg-accent-400 px-3 sm:px-6 py-2 font-display tracking-wider text-sm sm:text-lg transition-colors block ${pathname === '/picker' ? 'bg-accent-400' : ''}`}
              >
                PICK NOW →
              </Link>
            </motion.div>
          </nav>
        </div>
      </div>
      </div>
    </header>
  )
}
