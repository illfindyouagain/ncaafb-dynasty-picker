import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import CFB27Banner from './CFB27Banner'

const MOBILE_LINKS = [
  ['/picker', 'Team Picker'],
  ['/teams', 'All Teams'],
  ['/rankings', 'Polls'],
  ['/conference-builder', 'Conference Builder'],
  ['/toughest-places', 'Toughest Venues'],
  ['/challenge', 'Challenge Generator'],
  ['/changelog', 'Changelog'],
  ['/about', 'About'],
]

export default function Header() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

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

          <nav className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:flex items-center gap-6">
              {navLink('/teams', 'Teams')}
              {navLink('/rankings', 'Polls')}
              {navLink('/conference-builder', 'Builder')}
              {navLink('/toughest-places', 'Venues')}
              {navLink('/changelog', 'Changelog')}
            </div>
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
            <button
              type="button"
              onClick={() => setIsMenuOpen(open => !open)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="sm:hidden text-white text-2xl leading-none w-9 h-9 flex items-center justify-center border border-primary-800 hover:border-accent transition-colors"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="sm:hidden border-t border-primary-900/60 bg-app"
            aria-label="Mobile navigation"
          >
            {MOBILE_LINKS.map(([to, label]) => {
              const active = pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  className={`block px-6 py-3 font-display text-lg tracking-wider border-b border-primary-900/40 transition-colors ${
                    active ? 'text-accent' : 'text-primary-300 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </motion.nav>
        )}
      </AnimatePresence>
      </div>
    </header>
  )
}
