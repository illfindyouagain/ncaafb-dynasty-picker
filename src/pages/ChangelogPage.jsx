import { Link } from 'react-router-dom'
import { useEffect } from 'react'

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
            Track all updates and improvements to CFB Dynasty Tools
          </p>
        </div>

        {/* Changelog Entries */}
        <div className="space-y-8 sm:space-y-12">
          {changes.map((change, idx) => (
            <div key={idx} className="bg-card border border-primary-900 rounded-xl p-6 sm:p-8">
              {/* Version & Date */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-accent mb-2 sm:mb-0">
                  {change.version}
                </h2>
                <span className="text-sm sm:text-base text-primary-400">
                  {change.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                {change.title}
              </h3>

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
            Have suggestions for future updates?{' '}
            <a 
              href="mailto:user@liftoffgaming.com" 
              className="text-accent hover:text-accent-400 transition-colors"
            >
              Let us know!
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
