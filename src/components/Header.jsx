import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="border-b border-primary-900 bg-black sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <div className="text-2xl sm:text-3xl">🏈</div>
            <h1 className="text-lg sm:text-2xl font-bold text-white">
              CFB Dynasty Tools
            </h1>
          </Link>
          <div className="flex gap-2 sm:gap-3">
            <Link
              to="/conference-builder"
              className="bg-accent hover:bg-accent-600 px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all text-sm sm:text-base"
            >
              Builder
            </Link>
            <Link
              to="/picker"
              className="bg-accent hover:bg-accent-600 px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all text-sm sm:text-base"
            >
              Start Picking
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
