import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTeams } from '../hooks/useTeams'
import { getToughestPlaceRank } from '../data/toughestPlaces'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'
import ToughestBadge from '../components/ToughestBadge'

const SORT_OPTIONS = [
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'ovr', label: 'Overall Rating' },
  { value: 'stars', label: 'Stars' },
  { value: 'capacity', label: 'Stadium Size' },
  { value: 'toughest', label: 'Toughest Venues' },
]

const sortTeams = (list, sortBy) => {
  const sorted = [...list]
  switch (sortBy) {
    case 'ovr':
      return sorted.sort((a, b) => b.overallRating - a.overallRating)
    case 'stars':
      return sorted.sort((a, b) => b.stars - a.stars || b.overallRating - a.overallRating)
    case 'capacity':
      return sorted.sort((a, b) => (b.stadiumCapacity || 0) - (a.stadiumCapacity || 0))
    case 'toughest':
      return sorted.sort((a, b) => {
        const rankA = getToughestPlaceRank(a.name) || 99
        const rankB = getToughestPlaceRank(b.name) || 99
        return rankA - rankB || b.overallRating - a.overallRating
      })
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
  }
}

const formatCapacity = (n) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1000) return `${Math.round(n / 1000)}K`
  return `${n}`
}

function TeamColorBar({ colors }) {
  return (
    <div className="w-1 self-stretch flex-shrink-0 flex flex-col rounded-sm overflow-hidden">
      <div className="flex-1" style={{ backgroundColor: colors[0] }} />
      <div className="flex-1" style={{ backgroundColor: colors[1] }} />
    </div>
  )
}

function ConferenceStats({ teams }) {
  const stats = useMemo(() => {
    if (teams.length === 0) return null
    const avg = (key) => Math.round(teams.reduce((sum, t) => sum + t[key], 0) / teams.length)
    return {
      avgOvr: avg('overallRating'),
      avgPrestige: avg('prestige'),
      totalCapacity: teams.reduce((sum, t) => sum + (t.stadiumCapacity || 0), 0),
      toughVenues: teams.filter(t => getToughestPlaceRank(t.name)).length,
    }
  }, [teams])

  if (!stats) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-primary-900 border border-primary-900 mb-4">
      {[
        { label: 'Avg OVR', value: stats.avgOvr, accent: stats.avgOvr >= 85 },
        { label: 'Avg Prestige', value: stats.avgPrestige, accent: false },
        { label: 'Total Capacity', value: formatCapacity(stats.totalCapacity), accent: false },
        { label: '🔥 Tough Venues', value: `${stats.toughVenues}/${teams.length}`, accent: stats.toughVenues >= 3 },
      ].map(({ label, value, accent }) => (
        <div key={label} className="bg-card p-3 text-center">
          <div className={`font-display text-2xl tracking-wider ${accent ? 'text-accent' : 'text-white'}`}>{value}</div>
          <div className="text-[10px] text-primary-500 uppercase tracking-widest mt-0.5">{label}</div>
        </div>
      ))}
    </div>
  )
}

export default function ConferenceBuilderPage() {
  const { teams, loading, error } = useTeams()
  const [selectedConferenceName, setSelectedConferenceName] = useState('') // Which conference currently viewing
  const [activeConferences, setActiveConferences] = useState({}) // Object storing all conferences being built
  const [searchQuery, setSearchQuery] = useState('')
  const [conferenceFilter, setConferenceFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  // Set page-specific meta tags for SEO
  useEffect(() => {
    document.title = 'Conference Builder - CFB Dynasty Tools | Build Custom Conferences'

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Build custom conferences for EA Sports College Football 27. Create multiple conferences simultaneously, add 4-16 teams, organize divisions, export as JSON. Auto-save feature preserves your work.')
    }

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Conference Builder - CFB Dynasty Tools')
    }

    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://liftoffgaming.com/conference-builder')
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Build custom conferences for CFB 27. Click to add teams, create divisions, export your perfect conference setup.')
    }
  }, [])

  // Auto-save to localStorage
  useEffect(() => {
    if (Object.keys(activeConferences).length > 0) {
      localStorage.setItem('activeConferences', JSON.stringify(activeConferences))
    }
  }, [activeConferences])

  useEffect(() => {
    if (selectedConferenceName) {
      localStorage.setItem('selectedConference', selectedConferenceName)
    }
  }, [selectedConferenceName])

  // Load from localStorage on mount
  useEffect(() => {
    const savedConferences = localStorage.getItem('activeConferences')
    const savedSelection = localStorage.getItem('selectedConference')

    if (savedConferences) {
      try {
        const parsed = JSON.parse(savedConferences)
        if (Object.keys(parsed).length > 0) {
          setActiveConferences(parsed)
        }
      } catch {
        // Corrupted localStorage entry — start fresh
        localStorage.removeItem('activeConferences')
      }
    }

    if (savedSelection) {
      setSelectedConferenceName(savedSelection)
    }
  }, []) // Empty dependency array = only run once on mount

  const conferences = useMemo(() => [...new Set(teams.map(t => t.conference))].sort(), [teams])

  // Get current conference data
  const currentConference = selectedConferenceName ? activeConferences[selectedConferenceName] || {
    teams: [],
    useDivisions: false,
    division1Name: 'East',
    division2Name: 'West'
  } : { teams: [], useDivisions: false, division1Name: 'East', division2Name: 'West' }

  const conferenceTeams = currentConference.teams
  const useDivisions = currentConference.useDivisions
  const division1Name = currentConference.division1Name
  const division2Name = currentConference.division2Name

  const usedTeams = useMemo(
    () => Object.values(activeConferences).flatMap(conf => conf.teams.map(t => t.id)),
    [activeConferences]
  )

  const availableTeams = useMemo(() => {
    const filtered = teams.filter(team => {
      if (usedTeams.includes(team.id)) return false // Filter out teams used in any conference
      if (searchQuery && !team.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
      if (conferenceFilter !== 'all' && team.conference !== conferenceFilter) return false
      return true
    })
    return sortTeams(filtered, sortBy)
  }, [teams, usedTeams, searchQuery, conferenceFilter, sortBy])

  // Update current conference in activeConferences
  const updateCurrentConference = (updates) => {
    if (!selectedConferenceName) return
    setActiveConferences({
      ...activeConferences,
      [selectedConferenceName]: {
        ...currentConference,
        ...updates
      }
    })
  }

  const addTeamToConference = (team) => {
    if (!selectedConferenceName) {
      alert('Please select a conference first!')
      return
    }
    if (conferenceTeams.length >= 16) {
      alert('Maximum 16 teams per conference!')
      return
    }
    // Check if team already exists
    if (conferenceTeams.find(t => t.id === team.id)) {
      return // Silently ignore duplicate
    }
    updateCurrentConference({
      teams: [...conferenceTeams, { ...team, division: null }]
    })
  }

  const moveTeamToDivision = (teamId, division) => {
    updateCurrentConference({
      teams: conferenceTeams.map(t =>
        t.id === teamId ? { ...t, division } : t
      )
    })
  }

  const removeTeam = (teamId) => {
    updateCurrentConference({
      teams: conferenceTeams.filter(t => t.id !== teamId)
    })
  }

  const clearAll = () => {
    if (confirm('Clear all teams from this conference?')) {
      updateCurrentConference({
        teams: [],
        useDivisions: false
      })
    }
  }

  const deleteConference = (confName) => {
    if (confirm(`Delete ${confName} and all its teams?`)) {
      const newConfs = { ...activeConferences }
      delete newConfs[confName]
      setActiveConferences(newConfs)
      if (selectedConferenceName === confName) {
        setSelectedConferenceName('')
      }
    }
  }

  const clearAllConferences = () => {
    const conferenceCount = Object.keys(activeConferences).length
    const teamCount = Object.values(activeConferences).reduce((sum, conf) => sum + conf.teams.length, 0)

    if (confirm(`Are you sure you want to delete all ${conferenceCount} conference(s) and ${teamCount} team(s)?\n\nThis cannot be undone!`)) {
      setActiveConferences({})
      setSelectedConferenceName('')
      localStorage.removeItem('activeConferences')
      localStorage.removeItem('selectedConference')
    }
  }

  const serializeTeam = (t, division) => ({
    id: t.id,
    name: t.name,
    conference: t.conference,
    location: t.location,
    stars: t.stars,
    overall: t.overallRating,
    stadium: t.stadiumName,
    capacity: t.stadiumCapacity,
    toughestPlaceRank: getToughestPlaceRank(t.name),
    division,
  })

  const exportConference = () => {
    if (conferenceTeams.length === 0) {
      alert('Add some teams to your conference first!')
      return
    }

    if (!selectedConferenceName) {
      alert('Please select a conference name first!')
      return
    }

    // Check for minimum teams (EA Sports CFB requires minimum 4 teams)
    if (conferenceTeams.length < 4) {
      alert(`⚠️ EA Sports CFB requires at least 4 teams per conference.\n\nYou currently have ${conferenceTeams.length} team(s). Please add ${4 - conferenceTeams.length} more team(s) before exporting.`)
      return
    }

    // Check for unassigned teams when divisions are enabled
    if (useDivisions) {
      const div1Teams = conferenceTeams.filter(t => t.division === 1)
      const div2Teams = conferenceTeams.filter(t => t.division === 2)
      const unassignedTeams = conferenceTeams.filter(t => !t.division)

      // Check if both divisions have at least one team
      if (div1Teams.length === 0 || div2Teams.length === 0) {
        alert(`⚠️ Both divisions must have at least one team.\n\n${division1Name}: ${div1Teams.length} team(s)\n${division2Name}: ${div2Teams.length} team(s)\n\nPlease assign teams to both divisions before exporting.`)
        return
      }

      if (unassignedTeams.length > 0) {
        const teamNames = unassignedTeams.map(t => t.name).join(', ')
        if (!confirm(`Warning: ${unassignedTeams.length} team(s) not assigned to a division:\n${teamNames}\n\nExport anyway?`)) {
          return
        }
      }
    }

    const data = {
      name: selectedConferenceName,
      divisions: useDivisions ? {
        division1: division1Name,
        division2: division2Name
      } : null,
      teams: conferenceTeams.map(t => serializeTeam(t, useDivisions ? t.division : null))
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedConferenceName.replace(/\s+/g, '-').toLowerCase()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportAllConferences = () => {
    // Filter out empty conferences
    const conferenceList = Object.keys(activeConferences).filter(name =>
      activeConferences[name].teams && activeConferences[name].teams.length > 0
    )

    if (conferenceList.length === 0) {
      alert('Build some conferences first!')
      return
    }

    // Check if any conference has less than 4 teams
    const incompleteConferences = conferenceList.filter(name => activeConferences[name].teams.length < 4)
    if (incompleteConferences.length > 0) {
      const confDetails = incompleteConferences.map(name =>
        `${name} (${activeConferences[name].teams.length} teams)`
      ).join('\n')
      alert(`⚠️ EA Sports CFB requires at least 4 teams per conference.\n\nThe following conferences need more teams:\n${confDetails}\n\nPlease add more teams before exporting.`)
      return
    }

    const allData = conferenceList.map(confName => {
      const conf = activeConferences[confName]
      return {
        name: confName,
        divisions: conf.useDivisions ? {
          division1: conf.division1Name,
          division2: conf.division2Name
        } : null,
        teams: conf.teams.map(t => serializeTeam(t, conf.useDivisions ? t.division : null))
      }
    })

    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `all-conferences-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-app flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
          <p className="text-primary-400">Loading teams...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-app flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="font-display text-3xl tracking-wider text-red-500 mb-2">Error Loading Teams</h2>
          <p className="text-primary-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-accent hover:bg-accent-400 text-black px-6 py-3 font-display tracking-wider transition-colors"
          >
            RETRY
          </button>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
    <div className="min-h-screen bg-app text-white">
      <Header />

      {/* Page header */}
      <div className="border-b border-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-5xl sm:text-7xl tracking-wider">CONFERENCE BUILDER</h1>
            <p className="text-primary-400 text-sm mt-1">
              Build multiple conferences — switch between them without losing progress
            </p>
          </div>
          {Object.keys(activeConferences).length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={clearAllConferences}
                className="bg-red-950/60 hover:bg-red-900/60 border border-red-900 text-red-400 px-4 py-2 font-display tracking-wider text-sm transition-colors"
              >
                CLEAR ALL
              </button>
              <button
                onClick={exportAllConferences}
                className="bg-highlight/10 hover:bg-highlight/20 border border-highlight/40 text-highlight px-4 py-2 font-display tracking-wider text-sm transition-colors"
              >
                EXPORT ALL ({Object.keys(activeConferences).length})
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Active Conferences Tabs */}
        {Object.keys(activeConferences).length > 0 && (
          <div className="bg-card border border-primary-900 border-l-4 border-l-highlight p-4 mb-6">
            <div className="text-[10px] text-primary-500 uppercase tracking-widest mb-3 font-medium">
              Active Conferences ({Object.keys(activeConferences).length})
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {Object.keys(activeConferences).map(confName => {
                const conf = activeConferences[confName]
                const isActive = selectedConferenceName === confName
                const needsMoreTeams = conf.teams.length < 4
                return (
                  <div key={confName} className={`border px-4 py-2 flex items-center gap-3 transition-all ${
                    isActive
                      ? 'bg-accent text-black border-accent font-bold'
                      : 'bg-app border-primary-800 hover:border-accent cursor-pointer'
                  }`}
                  onClick={() => setSelectedConferenceName(confName)}
                  >
                    <span className="text-sm flex items-center gap-1">
                      {needsMoreTeams && <span className={isActive ? 'text-yellow-700' : 'text-yellow-500'}>⚠️</span>}
                      {confName} <span className="opacity-70">({conf.teams.length})</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteConference(confName)
                      }}
                      className={`font-bold transition-colors ${
                        isActive ? 'text-black hover:text-red-700' : 'text-red-500 hover:text-red-400'
                      }`}
                    >
                      ×
                    </button>
                  </div>
                )
              })}
            </div>
            <div className="text-xs text-primary-500">
              {usedTeams.length} teams used · {teams.length - usedTeams.length} remaining
            </div>
          </div>
        )}

        <div className="bg-card border border-primary-900 p-4 mb-6">
          <label className="block text-[10px] text-primary-500 uppercase tracking-widest mb-2 font-medium">Select Conference to Build</label>
          <select
            value={selectedConferenceName}
            onChange={(e) => {
              const confName = e.target.value
              setSelectedConferenceName(confName)
              setSearchQuery('') // Clear search when switching conferences
              // Initialize conference if it doesn't exist
              if (confName && !activeConferences[confName]) {
                setActiveConferences({
                  ...activeConferences,
                  [confName]: {
                    teams: [],
                    useDivisions: false,
                    division1Name: 'East',
                    division2Name: 'West'
                  }
                })
              }
            }}
            className="w-full bg-app border border-primary-800 px-4 py-3 text-white font-display text-2xl tracking-wider focus:border-accent focus:outline-none"
          >
            <option value="">— CHOOSE A CONFERENCE —</option>
            {conferences.map(conf => (
              <option key={conf} value={conf}>{conf}</option>
            ))}
          </select>
          {!selectedConferenceName && (
            <p className="text-sm text-primary-500 mt-2">Select a conference name to start building your custom roster</p>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-card border border-primary-900 p-5 lg:col-span-1">
            <h2 className="font-display text-2xl tracking-wider mb-4">AVAILABLE TEAMS ({availableTeams.length})</h2>
            <div className="space-y-3 mb-4">
              <input
                type="text"
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-app border border-primary-800 px-4 py-2 text-white focus:border-accent focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={conferenceFilter}
                  onChange={(e) => setConferenceFilter(e.target.value)}
                  className="w-full bg-app border border-primary-800 px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                >
                  <option value="all">All Conferences</option>
                  {conferences.map(conf => (
                    <option key={conf} value={conf}>{conf}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-app border border-primary-800 px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>Sort: {opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {availableTeams.map(team => (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => addTeamToConference(team)}
                  className="w-full text-left bg-app border border-primary-900 p-3 hover:border-accent hover:bg-card-hover transition-colors flex gap-3"
                >
                  <TeamColorBar colors={team.colors} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-semibold truncate">{team.name}</span>
                      <span className="font-display text-lg text-accent tracking-wider flex-shrink-0">{team.overallRating}</span>
                    </div>
                    <div className="text-xs text-primary-500 space-y-0.5">
                      <div>⭐ {team.stars} · {team.conference}</div>
                      {team.stadiumName && (
                        <div className="truncate">{team.stadiumName} ({team.stadiumCapacity?.toLocaleString()})</div>
                      )}
                    </div>
                    <div className="mt-1.5 empty:hidden">
                      <ToughestBadge teamName={team.name} />
                    </div>
                  </div>
                </button>
              ))}
              {availableTeams.length === 0 && (
                <p className="text-primary-500 text-center py-8">No teams found</p>
              )}
            </div>
          </div>

          <div className="bg-card border border-primary-900 p-5 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-display text-2xl tracking-wider">
                  {(selectedConferenceName || 'SELECT CONFERENCE').toUpperCase()} ({conferenceTeams.length}/16)
                </h2>
                {selectedConferenceName && conferenceTeams.length > 0 && conferenceTeams.length < 4 && (
                  <p className="text-yellow-500 text-sm mt-1">
                    ⚠️ Need {4 - conferenceTeams.length} more team(s) to meet EA Sports CFB minimum (4 teams)
                  </p>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {conferenceTeams.length > 0 && selectedConferenceName && (
                  <>
                    <button
                      onClick={exportConference}
                      className="bg-accent hover:bg-accent-400 text-black px-4 py-2 font-display tracking-wider transition-colors text-sm"
                    >
                      EXPORT
                    </button>
                    <button
                      onClick={clearAll}
                      className="bg-red-950/60 hover:bg-red-900/60 border border-red-900 text-red-400 px-4 py-2 font-display tracking-wider transition-colors text-sm"
                    >
                      CLEAR
                    </button>
                  </>
                )}
              </div>
            </div>

            <ConferenceStats teams={conferenceTeams} />

            {conferenceTeams.length >= 8 && (
              <div className="mb-4 bg-app border border-accent/30 p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useDivisions}
                    onChange={(e) => {
                      const enabled = e.target.checked
                      updateCurrentConference({
                        useDivisions: enabled,
                        teams: enabled ? conferenceTeams : conferenceTeams.map(t => ({ ...t, division: null }))
                      })
                    }}
                    className="w-5 h-5 accent-accent cursor-pointer"
                  />
                  <span className="font-display tracking-wider text-accent">ENABLE DIVISIONS</span>
                </label>
                {useDivisions && (
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <input
                      type="text"
                      value={division1Name}
                      onChange={(e) => updateCurrentConference({ division1Name: e.target.value })}
                      className="bg-app border border-primary-800 px-3 py-2 text-white focus:border-accent focus:outline-none"
                      placeholder="Division 1 Name"
                    />
                    <input
                      type="text"
                      value={division2Name}
                      onChange={(e) => updateCurrentConference({ division2Name: e.target.value })}
                      className="bg-app border border-primary-800 px-3 py-2 text-white focus:border-accent focus:outline-none"
                      placeholder="Division 2 Name"
                    />
                  </div>
                )}
              </div>
            )}

            <div
              className={`min-h-[500px] border-2 border-dashed p-4 transition-colors ${
                conferenceTeams.length === 0 ? 'border-primary-800 bg-app/50' : 'border-primary-900 bg-app'
              }`}
            >
              {conferenceTeams.length === 0 ? (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center text-primary-500">
                    <div className="font-display text-6xl text-primary-800 tracking-wider mb-4">EMPTY</div>
                    <p className="text-lg">Click teams on the left to add them to your conference</p>
                    <p className="text-sm mt-2">4–16 teams per conference (EA Sports CFB requirement)</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {conferenceTeams.map((team, index) => (
                    <div
                      key={team.id}
                      className="bg-card border border-primary-900 p-3 flex gap-3 items-start"
                    >
                      <div className="w-7 text-right flex-shrink-0 pt-0.5">
                        <span className="font-display text-xl text-primary-500 tracking-wider">{index + 1}</span>
                      </div>
                      <TeamColorBar colors={team.colors} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold">{team.name}</span>
                          <span className="font-display text-accent tracking-wider">{team.overallRating}</span>
                          <ToughestBadge teamName={team.name} />
                        </div>
                        <div className="text-xs text-primary-500 mt-0.5">
                          ⭐ {team.stars} · {team.conference}
                          {team.stadiumName && ` · ${team.stadiumName} (${team.stadiumCapacity?.toLocaleString()})`}
                        </div>
                        {useDivisions && (
                          <div className="mt-2 flex gap-2">
                            <button
                              onClick={() => moveTeamToDivision(team.id, 1)}
                              className={`flex-1 px-3 py-1.5 font-display tracking-wider text-sm transition-colors ${
                                team.division === 1
                                  ? 'bg-accent text-black'
                                  : 'bg-app border border-primary-800 text-primary-400 hover:border-accent'
                              }`}
                            >
                              {division1Name}
                            </button>
                            <button
                              onClick={() => moveTeamToDivision(team.id, 2)}
                              className={`flex-1 px-3 py-1.5 font-display tracking-wider text-sm transition-colors ${
                                team.division === 2
                                  ? 'bg-accent text-black'
                                  : 'bg-app border border-primary-800 text-primary-400 hover:border-accent'
                              }`}
                            >
                              {division2Name}
                            </button>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeTeam(team.id)}
                        className="text-red-500 hover:text-red-400 transition-colors font-bold text-xl flex-shrink-0"
                        aria-label={`Remove ${team.name}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {conferenceTeams.length >= 16 && (
              <div className="mt-4 bg-yellow-900/20 border border-yellow-600 p-3 text-yellow-400 text-sm text-center">
                Maximum 16 teams reached
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-primary-900 p-5">
            <h3 className="font-display text-xl tracking-wider mb-3">TIPS</h3>
            <ul className="text-sm text-primary-400 space-y-1.5">
              <li>· Select a conference from the dropdown to start building</li>
              <li>· Click teams on the left to add them — sort by OVR, stars, or toughest venues</li>
              <li>· Switch between conferences using the tabs — work is saved automatically</li>
              <li>· Each conference needs 4–16 teams (EA Sports CFB requirement)</li>
              <li>· With 8+ teams, you can enable divisions (East/West, North/South, etc.)</li>
              <li>· Export individual conferences or use Export All to download everything</li>
            </ul>
          </div>
          <div className="bg-card border border-primary-900 border-l-4 border-l-accent p-5">
            <h3 className="font-display text-xl tracking-wider mb-2">🔥 BUILD A GAUNTLET</h3>
            <p className="text-sm text-primary-400 leading-relaxed mb-4">
              Teams with the 🔥 badge made EA's official CFB 27 Top 25 Toughest Places to Play.
              Sort by "Toughest Venues" and stack them into one conference where every road game is hostile.
            </p>
            <Link
              to="/toughest-places"
              className="inline-flex items-center gap-2 bg-accent/10 hover:bg-accent/20 border border-accent/40 text-accent px-4 py-2 font-display tracking-wider text-sm transition-colors"
            >
              SEE THE FULL TOP 25 →
            </Link>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  )
}
