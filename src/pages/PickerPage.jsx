import { useState, useMemo, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTeams } from '../hooks/useTeams'
import Header from '../components/Header'

export default function PickerPage() {
  const { teams, loading, error } = useTeams()
  const [filters, setFilters] = useState({
    conference: 'all',
    category: 'all',
    difficulty: 'all',
  })
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [showFilters, setShowFilters] = useState(true)
  const selectedTeamRef = useRef(null)
  
  // NEW: Search state
  const [searchQuery, setSearchQuery] = useState('')
  
  // NEW: Sorting state
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  
  // NEW: Enhanced filter states
  const [starRange, setStarRange] = useState({ min: 0, max: 5 })
  const [ratingRange, setRatingRange] = useState({ min: 0, max: 99 })
  const [excludedTeams, setExcludedTeams] = useState([])

  // Set page-specific meta tags for SEO
  useEffect(() => {
    document.title = 'Team Picker - CFB Dynasty Tools | Find Your Perfect Dynasty Team'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Pick your perfect EA Sports College Football 25 dynasty team from 136 FBS teams. Filter by conference, difficulty, prestige, stars, and more. Export your picks and exclude teams you\'ve already played.')
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Team Picker - CFB Dynasty Tools')
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://liftoffgaming.com/picker')
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Pick your perfect EA Sports College Football 25 dynasty team from 136 FBS teams. Advanced filters, sorting, and random pick features.')
    }
  }, [])

  const filteredTeams = useMemo(() => {
    return teams.filter(team => {
      // Search filter
      if (searchQuery && !team.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      
      // Regular conference filter
      if (filters.conference !== 'all' && team.conference !== filters.conference) return false
      
      // Single category filter
      if (filters.category !== 'all' && !team.categories.includes(filters.category)) return false
      
      // Difficulty filter
      if (filters.difficulty !== 'all' && team.difficulty !== filters.difficulty) return false
      
      // Star range filter
      if (team.stars < starRange.min || team.stars > starRange.max) {
        return false
      }
      
      // Rating range filter
      if (team.overallRating < ratingRange.min || team.overallRating > ratingRange.max) {
        return false
      }
      
      // Excluded teams filter
      if (excludedTeams.includes(team.id)) {
        return false
      }
      
      return true
    })
  }, [filters, teams, searchQuery, starRange, ratingRange, excludedTeams])

  // Get unique values for filters
  const conferences = useMemo(() => 
    [...new Set(teams.map(t => t.conference))].sort()
  , [teams])

  const categories = useMemo(() => 
    [...new Set(teams.flatMap(t => t.categories))].sort()
  , [teams])

  const difficulties = useMemo(() => 
    [...new Set(teams.map(t => t.difficulty))]
      .sort((a, b) => {
        const order = ['Elite', 'Hard', 'Medium', 'Easy', 'Beginner']
        return order.indexOf(a) - order.indexOf(b)
      })
  , [teams])

  // NEW: Sorted teams
  const sortedTeams = useMemo(() => {
    const sorted = [...filteredTeams].sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'rating':
          comparison = a.overallRating - b.overallRating
          break
        case 'stars':
          comparison = a.stars - b.stars
          break
        case 'prestige':
          comparison = a.prestige - b.prestige
          break
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Easy': 2, 'Medium': 3, 'Hard': 4, 'Elite': 5 }
          comparison = (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0)
          break
        default:
          comparison = 0
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })
    return sorted
  }, [filteredTeams, sortBy, sortOrder])

  const handleTeamSelect = (team) => {
    setSelectedTeam(team)
    setTimeout(() => {
      selectedTeamRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      })
    }, 100)
  }

  const handleRandomPick = () => {
    if (sortedTeams.length === 0) {
      alert('No teams match your current filters. Please adjust your filters to see teams.')
      return
    }
    const randomTeam = sortedTeams[Math.floor(Math.random() * sortedTeams.length)]
    handleTeamSelect(randomTeam)
  }

  const resetFilters = () => {
    setFilters({
      conference: 'all',
      category: 'all',
      difficulty: 'all',
    })
    setSearchQuery('')
    setStarRange({ min: 0, max: 5 })
    setRatingRange({ min: 0, max: 99 })
    setExcludedTeams([])
    setSortBy('name')
    setSortOrder('asc')
  }
  
  const toggleExcludeTeam = (teamId) => {
    setExcludedTeams(prev =>
      prev.includes(teamId)
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
          <p className="text-primary-400">Loading teams...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading teams: {error}</p>
          <Link to="/" className="text-accent hover:text-accent-400">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* NEW: Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search teams by name..."
              className="w-full px-4 py-3 pl-12 bg-card text-white rounded-lg border border-primary-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* NEW: Sorting Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <label className="text-sm text-primary-400">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-card text-white rounded-lg border border-primary-900 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            >
              <option value="name">Name</option>
              <option value="rating">Overall Rating</option>
              <option value="stars">Stars</option>
              <option value="prestige">Prestige</option>
              <option value="difficulty">Difficulty</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 bg-card text-white rounded-lg border border-primary-900 hover:border-accent transition-colors text-sm"
            >
              {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
            </button>
          </div>
          
          <div className="flex gap-2 items-center">
            <div className="text-sm text-primary-400">
              <span className="font-bold text-accent">{sortedTeams.length}</span> {sortedTeams.length === 1 ? 'team' : 'teams'} found
            </div>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors text-sm font-semibold"
            >
              🗑️ Clear All Filters
            </button>
          </div>
        </div>

        {/* Selected Team Display */}
        {selectedTeam && (
          <div ref={selectedTeamRef} className="mb-6 sm:mb-8 bg-card border-2 border-accent rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <div className="inline-block px-3 py-1 bg-highlight/20 border border-highlight rounded-full text-highlight text-xs sm:text-sm font-medium">
                    Your Dynasty Pick
                  </div>
                  <button
                    onClick={() => toggleExcludeTeam(selectedTeam.id)}
                    className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                      excludedTeams.includes(selectedTeam.id)
                        ? 'bg-red-500/20 border border-red-500 text-red-400'
                        : 'bg-primary-900 border border-primary-800 text-primary-300 hover:border-accent'
                    }`}
                  >
                    {excludedTeams.includes(selectedTeam.id) ? '✓ Excluded' : 'Exclude from Results'}
                  </button>
                  <button
                    onClick={() => setSelectedTeam(null)}
                    className="px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors bg-primary-900 border border-primary-800 text-primary-300 hover:border-accent hover:text-accent"
                  >
                    Clear Selection ✕
                  </button>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 mb-2">
                  <div className="flex gap-2">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                      style={{ backgroundColor: selectedTeam.colors[0] }}
                    />
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                      style={{ backgroundColor: selectedTeam.colors[1] }}
                    />
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">{selectedTeam.name}</h2>
                </div>
                <p className="text-sm sm:text-base text-primary-300">{selectedTeam.location}</p>
                {selectedTeam.stadium_name && (
                  <p className="text-xs sm:text-sm text-primary-500">
                    {selectedTeam.stadium_name}
                    {selectedTeam.stadium_capacity && ` (${selectedTeam.stadium_capacity.toLocaleString()})`}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-4 sm:mt-6">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-xs sm:text-sm text-primary-400">Stars</span>
                  <span className="font-semibold text-highlight text-sm sm:text-base">{selectedTeam.stars}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-xs sm:text-sm text-primary-400">Overall Rating</span>
                  <span className="font-semibold text-accent text-sm sm:text-base">{selectedTeam.overallRating}</span>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-xs sm:text-sm text-primary-400">Offense Rating</span>
                  <span className="font-semibold text-accent-400 text-sm sm:text-base">{selectedTeam.offenseRating}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-xs sm:text-sm text-primary-400">Defense Rating</span>
                  <span className="font-semibold text-highlight-600 text-sm sm:text-base">{selectedTeam.defenseRating}</span>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-xs sm:text-sm text-primary-400">Conference</span>
                  <span className="font-semibold text-sm sm:text-base">{selectedTeam.conference}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-xs sm:text-sm text-primary-400">Difficulty</span>
                  <span className={`font-semibold text-sm sm:text-base ${
                    selectedTeam.difficulty === 'Beginner' ? 'text-green-400' :
                    selectedTeam.difficulty === 'Intermediate' ? 'text-yellow-400' :
                    selectedTeam.difficulty === 'Advanced' ? 'text-orange-400' :
                    'text-red-400'
                  }`}>{selectedTeam.difficulty}</span>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-xs sm:text-sm text-primary-400">Prestige</span>
                  <span className="font-semibold text-sm sm:text-base">{selectedTeam.prestige}/6</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-6">
              <div>
                <p className="text-xs sm:text-sm text-primary-400 mb-2">Categories:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTeam.categories.map((cat, i) => (
                    <span
                      key={i}
                      className="bg-accent/20 border border-accent/30 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-accent"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters & Pick Section */}
        <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="lg:col-span-1">
            <div className="bg-card border border-primary-900 rounded-xl p-4 sm:p-6 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold">Filters</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-accent text-sm font-medium hover:text-accent-400 transition-colors"
                >
                  {showFilters ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className={`space-y-4 sm:space-y-6 max-h-[70vh] overflow-y-auto px-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Conference Filter */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2 text-primary-300">
                    Conference
                  </label>
                  <select
                    value={filters.conference}
                    onChange={(e) => setFilters({ ...filters, conference: e.target.value })}
                    className="w-full bg-primary-950 border border-primary-800 rounded-lg px-3 py-2 sm:py-2.5 focus:ring-2 focus:ring-accent focus:border-transparent text-xs sm:text-sm text-white"
                  >
                    <option value="all">All Conferences</option>
                    {conferences.map((conf) => (
                      <option key={conf} value={conf}>{conf}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2 text-primary-300">
                    Difficulty
                  </label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                    className="w-full bg-primary-950 border border-primary-800 rounded-lg px-3 py-2 sm:py-2.5 focus:ring-2 focus:ring-accent focus:border-transparent text-xs sm:text-sm text-white"
                  >
                    <option value="all">All Difficulties</option>
                    {difficulties.map((diff) => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>

                {/* Category Filter (Single Select for backwards compatibility) */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2 text-primary-300">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full bg-primary-950 border border-primary-800 rounded-lg px-3 py-2 sm:py-2.5 focus:ring-2 focus:ring-accent focus:border-transparent text-xs sm:text-sm text-white"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Star Range Filter */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2 text-primary-300">
                    Star Range: {starRange.min} - {starRange.max} ★
                  </label>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-primary-500">Min: {starRange.min}</label>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.5"
                        value={starRange.min}
                        onChange={(e) => setStarRange({ ...starRange, min: parseFloat(e.target.value) })}
                        className="w-full accent-accent"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-primary-500">Max: {starRange.max}</label>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.5"
                        value={starRange.max}
                        onChange={(e) => setStarRange({ ...starRange, max: parseFloat(e.target.value) })}
                        className="w-full accent-accent"
                      />
                    </div>
                  </div>
                </div>

                {/* NEW: Rating Range Filter */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2 text-primary-300">
                    Overall Rating: {ratingRange.min} - {ratingRange.max}
                  </label>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-primary-500">Min: {ratingRange.min}</label>
                      <input
                        type="range"
                        min="0"
                        max="99"
                        value={ratingRange.min}
                        onChange={(e) => setRatingRange({ ...ratingRange, min: parseInt(e.target.value) })}
                        className="w-full accent-accent"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-primary-500">Max: {ratingRange.max}</label>
                      <input
                        type="range"
                        min="0"
                        max="99"
                        value={ratingRange.max}
                        onChange={(e) => setRatingRange({ ...ratingRange, max: parseInt(e.target.value) })}
                        className="w-full accent-accent"
                      />
                    </div>
                  </div>
                </div>

                {/* Show excluded count if any */}
                {excludedTeams.length > 0 && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-sm text-red-400">
                      {excludedTeams.length} team{excludedTeams.length !== 1 ? 's' : ''} excluded from results
                    </p>
                  </div>
                )}
              </div>

              {/* Random Pick Button - Outside scrollable area */}
              <div className="pt-4 space-y-3 border-t border-primary-900 mt-4">
                <button
                  onClick={handleRandomPick}
                  disabled={sortedTeams.length === 0}
                  className="w-full bg-accent hover:bg-accent-600 disabled:bg-primary-800 disabled:cursor-not-allowed px-4 py-2.5 sm:py-3 rounded-lg font-bold transition-all text-sm sm:text-base"
                >
                  🎲 Random Pick
                </button>
                <div className="text-center text-xs sm:text-sm text-primary-400">
                  {sortedTeams.length} team{sortedTeams.length !== 1 ? 's' : ''} available
                </div>
              </div>
            </div>
          </div>

          {/* Teams Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">
                {searchQuery ? `Search Results` : 
                 filters.conference === 'all' && filters.category === 'all' && filters.difficulty === 'all'
                  ? 'All Teams'
                  : 'Filtered Teams'
                } ({sortedTeams.length})
              </h2>
              {excludedTeams.length > 0 && (
                <p className="text-sm text-primary-400 mt-2">
                  {excludedTeams.length} team{excludedTeams.length !== 1 ? 's' : ''} excluded from results
                </p>
              )}
            </div>

            {sortedTeams.length === 0 ? (
              <div className="bg-card border border-primary-900 rounded-xl p-8 sm:p-12 text-center">
                <div className="text-4xl sm:text-6xl mb-4">🤔</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">No teams found</h3>
                <p className="text-sm sm:text-base text-primary-400 mb-4">Try adjusting your filters</p>
                <button
                  onClick={resetFilters}
                  className="bg-accent hover:bg-accent-600 px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all text-sm sm:text-base"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {sortedTeams.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => handleTeamSelect(team)}
                    className={`bg-card border ${
                      selectedTeam?.id === team.id
                        ? 'border-accent ring-2 ring-accent'
                        : 'border-primary-900 hover:border-accent'
                    } rounded-xl p-4 sm:p-5 text-left transition-all hover:bg-card-hover`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-3">
                      <div className="flex gap-1.5">
                        <div
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-primary-800"
                          style={{ backgroundColor: team.colors[0] }}
                        />
                        <div
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-primary-800"
                          style={{ backgroundColor: team.colors[1] }}
                        />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold">{team.name}</h3>
                    </div>

                    <div className="space-y-1.5 text-xs sm:text-sm mb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-primary-400">{team.conference}</p>
                        <span className="text-highlight text-xs font-semibold">{team.stars} ★</span>
                      </div>
                      <p className="text-primary-500 text-xs">{team.location}</p>
                      {team.stadium_name && (
                        <p className="text-primary-500 text-xs">
                          {team.stadium_name}
                          {team.stadium_capacity && (
                            <span className="text-primary-600"> ({team.stadium_capacity.toLocaleString()})</span>
                          )}
                        </p>
                      )}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          team.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                          team.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                          team.difficulty === 'Advanced' ? 'bg-accent/20 text-accent-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {team.difficulty}
                        </span>
                        <span className="text-accent text-xs font-medium">
                          OVR: {team.overallRating}
                        </span>
                        <span className="text-primary-500 text-xs">
                          Prestige: {team.prestige}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {team.categories.slice(0, 2).map((cat, i) => (
                        <span
                          key={i}
                          className="bg-primary-900/50 px-2 py-0.5 rounded text-xs text-primary-300"
                        >
                          {cat}
                        </span>
                      ))}
                      {team.categories.length > 2 && (
                        <span className="bg-primary-900/50 px-2 py-0.5 rounded text-xs text-primary-400">
                          +{team.categories.length - 2}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
