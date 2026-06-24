import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'
import { staggerContainer, staggerItem } from '../lib/motionTokens'

const CATEGORIES = {
  program: {
    label: 'Program',
    icon: '🏟',
    constraints: [
      'Start at a program with an overall rating below 75',
      'Start at a Group of 5 program',
      'Start at a program that has never won a national championship',
      'Start at a team that finished last in their conference last season',
      'Start at a Rebuild Project category team',
      'Start at a program in the Mountain West, Sun Belt, MAC, or C-USA',
      'Start at a program with fewer than 3 recruiting stars',
    ],
  },
  recruiting: {
    label: 'Recruiting',
    icon: '📋',
    constraints: [
      'No 5-star recruits — ever',
      'Recruit only 3-star players or below',
      'No transfer portal players allowed',
      'Recruit only from your home state for the first 3 seasons',
      'No off-campus visits in Year 1 — rely on walk-ons and local talent',
      'Maximum 1 five-star recruit per class for the entire dynasty',
      'Never recruit from a Power 4 rival conference',
    ],
  },
  goals: {
    label: 'Goals',
    icon: '🏆',
    constraints: [
      'Win a national championship within 5 seasons',
      'Reach the CFP in your first 3 seasons',
      'Win 10 or more games in your very first season',
      'Win your conference 3 consecutive years',
      'Finish undefeated in the regular season at least once',
      'Beat your top-ranked rival every season for 4 years straight',
      'Win a bowl game in Year 1',
    ],
  },
  playstyle: {
    label: 'Playstyle',
    icon: '🎮',
    constraints: [
      'Run-heavy offense — pass less than 40% of plays',
      'Air raid attack — throw 60% or more of every game',
      'Defensive dynasty — hold every opponent under 21 points per game',
      'No-huddle, tempo offense all season',
      'Option offense only — no pocket passing allowed',
      'True freshman at QB for the first two full seasons',
      'Never score more than 35 points in a game (bleed the clock)',
    ],
  },
  handicap: {
    label: 'Handicap',
    icon: '⚠️',
    constraints: [
      'Restart the dynasty if you lose 3 games in a row',
      'Play every game on Heisman — no slider adjustments',
      'If you lose a rivalry game, your coach must retire for 1 season',
      'No redshirting — every scholarship player must play',
      'Sim all special teams plays — do not control kicks or returns',
      'Auto-accept every transfer request that comes in',
      'Never fire or replace a coordinator for the first 3 years',
    ],
  },
}

const DIFFICULTY_CONFIG = {
  Casual: { categories: ['program', 'goals', 'playstyle'], label: 'Casual', color: 'text-green-400 bg-green-400/10 border-green-400/30' },
  Hardcore: { categories: ['program', 'recruiting', 'goals', 'playstyle'], label: 'Hardcore', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  Legendary: { categories: ['program', 'recruiting', 'goals', 'playstyle', 'handicap'], label: 'Legendary', color: 'text-red-400 bg-red-400/10 border-red-400/30' },
}

const CHALLENGE_NAMES = [
  'The Grind', 'The Gauntlet', 'Dynasty From Dust', 'The Long Road',
  'The Dark Horse Run', 'The Underdog Story', "The Rebuilder's Curse",
  'The Cinderella Run', 'Blood, Sweat & Yards', 'Zero to Hero',
  'The Sleeping Giant', 'Patience & Pain', 'The Long Game',
  'Against All Odds', 'From the Ashes', 'No Shortcuts',
]

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateChallenge(difficulty) {
  const { categories } = DIFFICULTY_CONFIG[difficulty]
  const constraints = categories.map(cat => ({
    category: CATEGORIES[cat].label,
    icon: CATEGORIES[cat].icon,
    text: pickRandom(CATEGORIES[cat].constraints),
    key: cat,
  }))
  return {
    name: pickRandom(CHALLENGE_NAMES),
    difficulty,
    constraints,
  }
}

function encodeChallenge(challenge) {
  return btoa(JSON.stringify(challenge))
}

function decodeChallenge(encoded) {
  try {
    return JSON.parse(atob(encoded))
  } catch {
    return null
  }
}

export default function ChallengeGeneratorPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [difficulty, setDifficulty] = useState('Hardcore')
  const [challenge, setChallenge] = useState(null)
  const [copied, setCopied] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    document.title = 'Dynasty Challenge Generator | CFB Dynasty Tools'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', 'Generate random dynasty challenge constraints for CFB 27. Choose a difficulty, get a unique set of rules, and share your challenge with other players.')
  }, [])

  // Load challenge from URL on mount
  useEffect(() => {
    const encoded = searchParams.get('c')
    if (encoded) {
      const decoded = decodeChallenge(encoded)
      if (decoded) {
        setChallenge(decoded)
        setDifficulty(decoded.difficulty)
      }
    }
  }, [])

  const generate = useCallback(() => {
    const next = generateChallenge(difficulty)
    setChallenge(next)
    setSearchParams({ c: encodeChallenge(next) }, { replace: true })
    setCopied(false)
  }, [difficulty, setSearchParams])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // clipboard unavailable — silent fail
    }
  }

  const diffConfig = challenge ? DIFFICULTY_CONFIG[challenge.difficulty] : DIFFICULTY_CONFIG[difficulty]

  return (
    <PageTransition>
      <div className="min-h-screen bg-app text-white">
        <Header />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16">

          {/* Header */}
          <motion.div
            initial="hidden" animate="visible" variants={staggerContainer}
            className="mb-10 sm:mb-12"
          >
            <motion.div variants={staggerItem}>
              <Link to="/" className="text-xs text-primary-500 hover:text-white transition-colors uppercase tracking-widest">
                ← Back
              </Link>
            </motion.div>
            <motion.h1 variants={staggerItem} className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-wider mt-4 leading-none">
              DYNASTY
            </motion.h1>
            <motion.h1 variants={staggerItem} className="font-display text-5xl sm:text-6xl lg:text-7xl text-accent tracking-wider leading-none mb-4">
              CHALLENGE
            </motion.h1>
            <motion.p variants={staggerItem} className="text-sm text-primary-400 max-w-md leading-relaxed">
              Generate a random set of constraints for your next CFB dynasty. Pick a difficulty, get your rules, and share the link.
            </motion.p>
          </motion.div>

          {/* Difficulty selector */}
          <div className="flex gap-2 mb-6">
            {Object.entries(DIFFICULTY_CONFIG).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => { setDifficulty(key); setChallenge(null); setSearchParams({}) }}
                className={`flex-1 px-3 py-2.5 text-xs font-bold uppercase tracking-widest border transition-colors ${
                  difficulty === key
                    ? cfg.color
                    : 'border-primary-800 text-primary-500 hover:border-primary-600 hover:text-white'
                }`}
              >
                {cfg.label}
                <div className="text-[9px] font-normal mt-0.5 opacity-60">
                  {DIFFICULTY_CONFIG[key].categories.length} constraints
                </div>
              </button>
            ))}
          </div>

          {/* Generate button */}
          <motion.button
            onClick={generate}
            whileHover={{ y: reduce ? 0 : -2, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-accent hover:bg-accent-400 text-black font-display tracking-wider text-xl py-4 mb-8 transition-colors"
          >
            {challenge ? 'REGENERATE' : 'GENERATE CHALLENGE'}
          </motion.button>

          {/* Challenge result */}
          <AnimatePresence mode="wait">
            {challenge && (
              <motion.div
                key={challenge.name + challenge.constraints.map(c => c.text).join()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Challenge card */}
                <div className="bg-card border border-primary-900 border-l-4 border-l-accent mb-6">
                  {/* Card header */}
                  <div className="border-b border-primary-900 px-6 py-4 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-primary-600 uppercase tracking-widest mb-1">Challenge Name</div>
                      <div className="font-display text-2xl sm:text-3xl tracking-wider">{challenge.name}</div>
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-bold border ${diffConfig.color}`}>
                      {challenge.difficulty}
                    </span>
                  </div>

                  {/* Constraints */}
                  <div className="divide-y divide-primary-900">
                    {challenge.constraints.map((c, i) => (
                      <motion.div
                        key={c.key}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: reduce ? 0 : i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        className="px-6 py-4 flex items-start gap-4"
                      >
                        <span className="text-xl flex-shrink-0 mt-0.5">{c.icon}</span>
                        <div>
                          <div className="text-[10px] text-primary-600 uppercase tracking-widest mb-0.5">{c.category}</div>
                          <div className="text-sm text-white leading-relaxed">{c.text}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={copyLink}
                    className={`flex-1 flex items-center justify-center gap-2 border py-3 font-display tracking-wider text-sm transition-colors ${
                      copied
                        ? 'border-accent text-accent bg-accent/10'
                        : 'border-primary-800 text-primary-300 hover:border-white hover:text-white'
                    }`}
                  >
                    {copied ? '✓ LINK COPIED' : '🔗 SHARE CHALLENGE'}
                  </button>
                  <Link
                    to="/picker"
                    className="flex-1 flex items-center justify-center gap-2 bg-primary-900 hover:bg-primary-800 border border-primary-800 py-3 font-display tracking-wider text-sm transition-colors"
                  >
                    FIND YOUR TEAM →
                  </Link>
                </div>

                {/* Suggestion note */}
                <p className="text-xs text-primary-600 text-center mt-4">
                  Use the Team Picker to find a program that fits your challenge constraints.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {!challenge && (
            <div className="border border-dashed border-primary-800 py-16 text-center">
              <div className="text-4xl mb-3">🎲</div>
              <p className="text-primary-500 text-sm">Select a difficulty and generate your challenge</p>
            </div>
          )}

          {/* Constraint preview */}
          <div className="mt-12 sm:mt-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-primary-900" />
              <h2 className="font-display text-xl tracking-wider text-primary-400">CONSTRAINT POOL</h2>
              <div className="h-px flex-1 bg-primary-900" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <div key={key} className="bg-card border border-primary-900 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span>{cat.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary-400">{cat.label}</span>
                    <span className="text-[10px] text-primary-700 ml-auto">{cat.constraints.length} rules</span>
                  </div>
                  <ul className="space-y-1.5">
                    {cat.constraints.slice(0, 3).map((c, i) => (
                      <li key={i} className="text-[11px] text-primary-500 leading-relaxed">· {c}</li>
                    ))}
                    {cat.constraints.length > 3 && (
                      <li className="text-[10px] text-primary-700">+ {cat.constraints.length - 3} more...</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  )
}
