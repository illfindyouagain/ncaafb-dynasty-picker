import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import PageTransition from '../components/PageTransition'

export default function ChangelogPage() {
  // Set page-specific meta tags for SEO
  useEffect(() => {
    document.title = 'Changelog - CFB Dynasty Tools | Updates and Version History'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Track all updates, improvements, and new features added to CFB Dynasty Tools. See version history from v1.0.0 to current release with detailed changelogs.')
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Changelog - CFB Dynasty Tools')
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://liftoffgaming.com/changelog')
    }
  }, [])

  const changes = [
    {
      date: 'July 2026',
      version: 'v1.4.1',
      title: 'Launch Readiness — Mobile Nav, Social Cards & SEO',
      isLatest: true,
      items: [
        'NEW: Mobile navigation menu — every page is now reachable on phones via the ☰ menu (Team Picker, Teams, Polls, Builder, Toughest Venues, Challenge Generator, Changelog, About).',
        'NEW: Social share image — links shared on Reddit, X, and Discord now show a proper preview card instead of a blank thumbnail.',
        'NEW: 404 page — broken or mistyped links now land on a "Turnover on Downs" page with quick links back to the tools.',
        'UPDATE: Sitemap expanded from 6 to 147 URLs — every team detail page is now indexed for search engines.',
        'UPDATE: "Support the Site" link added to the footer.',
      ]
    },
    {
      date: 'July 2026',
      version: 'v1.4.0',
      title: 'CFB 27 Poll, Toughest Places to Play & Builder Revamp',
      isLatest: false,
      items: [
        "NEW: CFB 27 in-game preseason Top 25 is live on the Polls page — EA's official team rankings (Oregon #1 at 91 OVR) with overall ratings shown per team, compared side-by-side against the AP Poll with the divergence breakdown.",
        "NEW: Toughest Places to Play page (/toughest-places) — EA's official CFB 27 Top 25 Stadium Pulse rankings. Tiger Stadium holds #1. Includes new entries (Indiana, Virginia Tech, BYU), dropped teams, capacities, and venues-per-conference breakdown.",
        'NEW: Conference Builder revamp — redesigned to match the Dynasty Turf look, with team OVR ratings on every card, a sort control (name, OVR, stars, stadium size, toughest venues), and a live conference strength panel showing average OVR, prestige, total capacity, and tough venue count.',
        'NEW: 🔥 Toughest badge — teams from the EA Top 25 are flagged across the Conference Builder and on team detail stadium cards, each linking to the full rankings.',
        'UPDATE: Conference Builder exports now include overall rating and toughest place rank for each team.',
        'UPDATE: "Venues" added to site navigation; sitemap now covers all tool pages.',
      ]
    },
    {
      date: 'June 2026',
      version: 'v1.3.0',
      title: 'Pac-12 Rebuild & New Categories',
      isLatest: false,
      items: [
        'MOVED: Boise State, Colorado State, Fresno State, San Diego State, Utah State — Mountain West → Pac-12 (Pac-12 rebuild fully confirmed for CFB 27)',
        'NEW: Quarterback Factory category — 20 programs historically known for producing elite NFL quarterbacks (Alabama, Ohio State, USC, Oklahoma, Purdue, LSU, Tennessee, Notre Dame, and more)',
        'NEW: Defensive Elites category — 9 teams with in-game defense ratings of 88+ (Alabama, Georgia, Notre Dame, Ohio State, Clemson, Oregon, Michigan, Penn State, Texas)',
        'NEW: Option Offense category — Army, Navy, Air Force (the triple-option faithful)',
        'FIX: AP Poll ticker now uses Framer Motion for animation — no longer stops when OS reduce-motion accessibility setting is enabled',
      ]
    },
    {
      date: 'June 2026',
      version: 'v1.2.0',
      title: 'Challenge Generator, Shareable Cards & Countdown',
      isLatest: false,
      items: [
        'NEW: Dynasty Challenge Generator (/challenge) — generate randomized dynasty constraint sets at three difficulty tiers: Casual (3 constraints), Hardcore (4), Legendary (5). Challenges are shareable via URL.',
        'NEW: Shareable Team Cards — every team detail page has a "Share This Pick" button that opens a screenshot-ready card with your team\'s name, colors, ratings, and categories.',
        'NEW: CFB 27 Countdown Banner — live day/hour/minute/second countdown to the July 9 launch. Auto-switches to a "CFB 27 IS LIVE" message after launch and disappears two weeks later.',
      ]
    },
    {
      date: 'June 2026',
      version: 'v1.1.0',
      title: 'Team Detail Pages',
      isLatest: false,
      items: [
        'NEW: Every team now has its own page (e.g. /teams/ohio-state) with a full profile — OVR, offense, defense, and prestige stat bars, difficulty explanation, categories, recruiting stars, stadium info, and a list of other teams in the same conference.',
        'NEW: The Team Picker CTA on each detail page lets you jump straight into the picker with that team pre-selected.',
        'UPDATE: The Teams browser expanded panel now includes a "Full Profile →" link to the team\'s detail page.',
      ]
    },
    {
      date: 'June 2026',
      version: 'v1.0.9',
      title: 'CFB 27 Updates & Layout Fix',
      isLatest: false,
      items: [
        'FIX: Reduced hero heading size so the Team Picker and Conference Builder buttons are visible without scrolling on most screens.',
        'UPDATE: Team count updated to 137 across the site — NDSU and Sacramento State are fully included, no longer marked as previews.',
        'UPDATE: "2025 Realignment" feature card renamed to "CFB 27 Realignment" with updated description covering Big 12 expansion and the Pac-12 rebuild.',
        'UPDATE: FAQ and meta copy now reference both NCAA Football 26 and CFB 27.',
      ]
    },
    {
      date: 'June 2026',
      version: 'v1.0.8',
      title: 'Code Quality & Privacy',
      isLatest: false,
      items: [
        'NEW: Added Privacy Policy page — covers what data is and isn\'t collected, Vercel Analytics disclosure, and how localStorage is used by the Conference Builder.',
        'FIX: AP Poll data is now fetched once and shared across the page — previously the ticker and the Poll Rankings page each fired their own request to the ESPN API simultaneously.',
        'FIX: Fetch requests in the AP Poll hook now clean up properly on unmount, preventing stale responses from updating state after a page change.',
        'FIX: Conference Builder no longer logs parse errors to the console in production — corrupted localStorage is silently cleared instead.',
        'SECURITY: Added Strict-Transport-Security, Referrer-Policy, and Permissions-Policy HTTP headers to all responses.',
        'CLEANUP: Removed a non-functional Google Analytics placeholder that was making network requests with no configured measurement ID.',
        'CLEANUP: Removed personal contact email from source. The "Reach out" link on this page now goes to the About page instead.',
      ]
    },
    {
      date: 'June 2026',
      version: 'v1.0.7',
      title: 'Security Cleanup',
      isLatest: false,
      items: [
        'SECURITY: Removed migrate-teams.js — a leftover one-time migration script from the Supabase era that had credentials hardcoded in the source file. The script was already obsolete (Supabase was removed in v1.0.5), but it should have been cleaned up sooner.',
      ]
    },
    {
      date: 'June 2026',
      version: 'v1.0.6',
      title: 'CFB 27 Conference Updates & New Team Previews',
      isLatest: false,
      note: "CFB 27 drops July 9 so I'm getting ahead of the conference changes now. I'm updating what's confirmed — but some of this is still in flux (looking at you, Louisiana Tech). If a team's conference looks wrong, that's probably why. I'll do a full cleanup once the game is actually out and ratings are official.",
      items: [
        'NEW: North Dakota State added — joining Mountain West for CFB 27 (ratings TBD)',
        'NEW: Sacramento State added — joining MAC for CFB 27 (ratings TBD)',
        'MOVED: Texas State — Sun Belt → Pac-12',
        'MOVED: Northern Illinois — MAC → Mountain West',
        'MOVED: UTEP — C-USA → Mountain West',
        'MOVED: Louisiana Tech — C-USA → Sun Belt (pending legal dispute with CUSA, may shift to 2027)',
        'NEW: Site banner added noting that conference assignments are being updated for CFB 27',
        'CFB 27 preview teams show an estimated rating badge — official numbers update July 9',
      ]
    },
    {
      date: 'June 2026',
      version: 'v1.0.5',
      title: 'Animated UI, Static Data Migration & Survival Story',
      isLatest: false,
      note: "Real talk: I'm one guy, working a full-time job, building this on nights and weekends. Supabase deleted my project out from under me, which wiped the database entirely. Rather than scramble to rebuild it, I baked all 135 teams directly into the app — it actually loads faster now. I also took the opportunity to polish the UI with page transitions and motion throughout. The site isn't going anywhere.",
      items: [
        'NEW: Smooth page transitions — every route change fades and slides in cleanly',
        'NEW: Team cards animate in with a stagger effect when you filter or load the picker',
        'NEW: Selected team panel now has an entrance animation with scale + fade',
        'NEW: FAQ accordion on the landing page animates open and closed',
        'NEW: Nav active underline slides between links using a shared layout animation',
        'NEW: Hero headline on the landing page staggers in line by line',
        'NEW: Feature cards animate in on scroll as you reach them',
        'NEW: All buttons have hover lift and tap press micro-interactions',
        'CHANGED: Removed Supabase — all 135 team data is now bundled statically (faster loads, no DB dependency)',
        'FIXED: Difficulty scale corrected to Easy / Medium / Hard / Legendary (was incorrectly labeled)',
        'FIXED: Stadium name and capacity fields now display correctly across all pages',
        'FIXED: Removed duplicate Vanderbilt entry (was appearing twice)',
        'IMPROVED: Reduced motion respected — animations are skipped for users who prefer it',
      ]
    },
    {
      date: 'October 31, 2025',
      version: 'v1.0.4',
      title: 'Auto-Save & UX Polish',
      items: [
        'NEW: Auto-save for Conference Builder - work survives page refresh!',
        'NEW: Uniform header navigation across all pages',
        'NEW: "Clear All Filters" button in Team Picker with team count display',
        'NEW: "Clear Selection" button when a team is selected',
        'FIXED: Division export validation - prevents exporting with empty divisions',
        'FIXED: Search query now clears when switching conferences',
        'FIXED: Empty conferences no longer export in "Export All"',
        'IMPROVED: Team count prominently displayed in Picker sorting controls',
        'IMPROVED: Better UX consistency across all tools',
        'IMPROVED: localStorage integration preserves Conference Builder work',
      ]
    },
    {
      date: 'October 30, 2025',
      version: 'v1.0.3',
      title: 'Multi-Conference Builder & UX Improvements',
      items: [
        'NEW: Build multiple conferences simultaneously with tab-based switching',
        'Select from real FBS conference names (SEC, Big 12, Big Ten, ACC, etc.)',
        'Switch between conferences without losing progress - all work saved automatically',
        'Replaced drag-and-drop with simple click-to-add team selection',
        'Added EA Sports CFB minimum requirement (4 teams per conference)',
        'Export validation prevents incomplete conferences (<4 teams) from being exported',
        'Visual warning indicators (⚠️) on conferences with less than 4 teams',
        'NEW: "Clear All" button to quickly delete all conferences and start fresh',
        'Active conference tabs show team counts and allow quick switching',
        'Teams used in one conference are automatically removed from available pool',
        'Export individual conferences or use "Export All" for bulk download',
        'Improved tips section with updated workflow guidance',
      ]
    },
    {
      date: 'October 29, 2025',
      version: 'v1.0.2',
      title: 'Conference Builder & Major Updates',
      items: [
        'NEW: Custom Conference Builder with drag-and-drop interface',
        'Create custom conferences with up to 16 teams from any FBS conference',
        'Add divisions (8+ teams) - name them East/West, North/South, or custom names',
        'Export conferences as JSON files with full team data',
        'Search and filter teams while building your conference',
        'Rebranded to "CFB Dynasty Tools" to reflect growing toolkit',
        'Redesigned homepage hero to showcase both Team Picker and Conference Builder',
        'Added comprehensive SEO meta tags and Open Graph support',
        'Integrated Vercel Analytics and Speed Insights for performance tracking',
        'Added sitemap.xml and robots.txt for better search engine indexing',
        'Bug fixes: Division toggle now clears assignments, duplicate team prevention, random pick validation',
        'Updated footer to highlight new Conference Builder feature',
      ]
    },
    {
      date: 'October 24, 2025',
      version: 'v1.0.1',
      title: 'Stadium Data & Difficulty Update',
      items: [
        'Added stadium names and capacities for all 136 FBS teams',
        'Redesigned difficulty system - better teams are now easier (Beginner), weaker teams are harder (Advanced)',
        'Difficulty now factors in both team stars and conference tier',
        'Fixed UMass conference assignment (moved from Independent to MAC)',
      ]
    },
    {
      date: 'October 24, 2025',
      version: 'v1.0.0',
      title: 'Initial Release',
      items: [
        'Launched CFB Dynasty Tools with all 136 FBS teams',
        'Team search and advanced filtering (star range, rating range, conference, difficulty, categories)',
        'Sorting options (name, rating, stars, prestige, difficulty)',
        'Exclude teams feature for personalized picking',
        'Mobile-responsive design with Minimalist Monochrome theme',
        'About/FAQ page with donation options',
        'Team data includes: stars, overall/offense/defense ratings, prestige, difficulty, categories, colors, location',
      ]
    }
  ]

  return (
    <PageTransition>
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <Link 
            to="/"
            className="inline-flex items-center text-accent hover:text-accent-400 transition-colors mb-4 sm:mb-6"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4">
            Changelog
          </h1>
          <p className="text-base sm:text-lg text-primary-300">
            What changed, why it changed, and the occasional honest explanation of what went wrong
          </p>
        </div>

        {/* Solo dev callout */}
        <div className="mb-8 bg-card border border-accent/30 border-l-4 border-l-accent p-4 sm:p-5">
          <p className="text-sm text-primary-300 leading-relaxed">
            <span className="text-accent font-semibold">Built by one person.</span> This is a side project — made nights and weekends around a full-time job. If something breaks or data is off, that's on me. If you find it useful, that means a lot.
          </p>
        </div>

        {/* Changelog Entries */}
        <div className="space-y-8 sm:space-y-12">
          {changes.map((change) => (
            <div key={change.version} className={`bg-card border rounded-xl p-6 sm:p-8 ${change.isLatest ? 'border-accent/60' : 'border-primary-900'}`}>
              {/* Version & Date */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <h2 className="text-2xl sm:text-3xl font-bold text-accent">
                    {change.version}
                  </h2>
                  {change.isLatest && (
                    <span className="px-2 py-0.5 bg-accent text-black text-xs font-bold uppercase tracking-widest">
                      Latest
                    </span>
                  )}
                </div>
                <span className="text-sm sm:text-base text-primary-400">
                  {change.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                {change.title}
              </h3>

              {/* Developer note */}
              {change.note && (
                <div className="mb-5 p-4 bg-app border border-primary-800 text-sm text-primary-300 leading-relaxed italic">
                  {change.note}
                </div>
              )}

              {/* Changes List */}
              <ul className="space-y-3 sm:space-y-4">
                {change.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3">
                    <span className="text-highlight text-lg sm:text-xl mt-0.5">•</span>
                    <span className="text-sm sm:text-base text-primary-200 flex-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-sm sm:text-base text-primary-500">
            Have a suggestion or find a bug?{' '}
            <Link
              to="/about"
              className="text-accent hover:text-accent-400 transition-colors"
            >
              Reach out
            </Link>
          </p>
        </div>
      </div>
    </div>
    </PageTransition>
  )
}
