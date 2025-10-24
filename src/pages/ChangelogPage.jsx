import { Link } from 'react-router-dom'

export default function ChangelogPage() {
  const changes = [
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
        'Launched CFB Dynasty Picker with all 136 FBS teams',
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
            Track all updates and improvements to CFB Dynasty Picker
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
