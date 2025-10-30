import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTeams } from '../hooks/useTeams'

export default function ConferenceBuilderPage() {
  const { teams, loading, error } = useTeams()
  const [selectedConferenceName, setSelectedConferenceName] = useState('') // Which conference currently viewing
  const [activeConferences, setActiveConferences] = useState({}) // Object storing all conferences being built
  const [searchQuery, setSearchQuery] = useState('')
  const [conferenceFilter, setConferenceFilter] = useState('all')

  // Real FBS conference names
  const realConferences = [...new Set(teams.map(t => t.conference))].sort()
  const conferences = [...new Set(teams.map(t => t.conference))].sort()

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

  // Get all teams used across ALL conferences being built
  const usedTeams = Object.values(activeConferences).flatMap(conf => conf.teams.map(t => t.id))

  const availableTeams = teams.filter(team => {
    if (usedTeams.includes(team.id)) return false // Filter out teams used in any conference
    if (searchQuery && !team.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (conferenceFilter !== 'all' && team.conference !== conferenceFilter) return false
    return true
  })

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
    }
  }

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
      const unassignedTeams = conferenceTeams.filter(t => !t.division)
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
      teams: conferenceTeams.map(t => ({
        id: t.id,
        name: t.name,
        conference: t.conference,
        location: t.location,
        stars: t.stars,
        stadium: t.stadium_name,
        capacity: t.stadium_capacity,
        division: useDivisions ? t.division : null
      }))
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
    const conferenceList = Object.keys(activeConferences)
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
        teams: conf.teams.map(t => ({
          id: t.id,
          name: t.name,
          conference: t.conference,
          location: t.location,
          stars: t.stars,
          stadium: t.stadium_name,
          capacity: t.stadium_capacity,
          division: conf.useDivisions ? t.division : null
        }))
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
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error Loading Teams</h2>
          <p className="text-primary-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-accent hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <Link to="/" className="text-accent hover:text-accent-400 transition-colors mb-4 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">🏗️ Conference Builder</h1>
            <p className="text-primary-400">Build multiple conferences - switch between them without losing progress</p>
          </div>
          {Object.keys(activeConferences).length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={clearAllConferences}
                className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                🗑️ Clear All
              </button>
              <button
                onClick={exportAllConferences}
                className="bg-highlight hover:bg-highlight-600 text-black px-6 py-3 rounded-lg font-bold transition-colors"
              >
                📥 Export All ({Object.keys(activeConferences).length})
              </button>
            </div>
          )}
        </div>

        {/* Active Conferences Tabs */}
        {Object.keys(activeConferences).length > 0 && (
          <div className="bg-gradient-to-r from-highlight/10 to-accent/10 border border-highlight/30 rounded-lg p-4 mb-6">
            <div>
              <h3 className="font-bold text-lg mb-3">📋 Active Conferences ({Object.keys(activeConferences).length})</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {Object.keys(activeConferences).map(confName => {
                  const conf = activeConferences[confName]
                  const isActive = selectedConferenceName === confName
                  const needsMoreTeams = conf.teams.length < 4
                  return (
                    <div key={confName} className={`border rounded-lg px-4 py-2 flex items-center gap-3 transition-all ${
                      isActive 
                        ? 'bg-accent text-black border-accent font-bold' 
                        : 'bg-black/50 border-gray-700 hover:border-accent cursor-pointer'
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
              <div className="text-sm text-primary-400">
                {usedTeams.length} teams used • {136 - usedTeams.length} remaining
              </div>
            </div>
          </div>
        )}

        <div className="bg-card rounded-lg p-4 mb-6">
          <label className="block text-sm text-primary-400 mb-2 font-semibold">Select Conference to Build:</label>
          <select
            value={selectedConferenceName}
            onChange={(e) => {
              const confName = e.target.value
              setSelectedConferenceName(confName)
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
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white text-2xl font-bold focus:border-accent focus:outline-none"
          >
            <option value="">-- Choose a Conference --</option>
            {realConferences.map(conf => (
              <option key={conf} value={conf}>{conf}</option>
            ))}
          </select>
          {!selectedConferenceName && (
            <p className="text-sm text-primary-500 mt-2">Select a conference name to start building your custom roster</p>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4">Available Teams ({availableTeams.length})</h2>
            <div className="space-y-3 mb-4">
              <input
                type="text"
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none"
              />
              <select
                value={conferenceFilter}
                onChange={(e) => setConferenceFilter(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none"
              >
                <option value="all">All Conferences</option>
                {conferences.map(conf => (
                  <option key={conf} value={conf}>{conf}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {availableTeams.map(team => (
                <div
                  key={team.id}
                  onClick={() => addTeamToConference(team)}
                  className="bg-black border border-gray-800 rounded-lg p-4 cursor-pointer hover:border-accent hover:bg-gray-900 transition-colors"
                >
                  <div className="font-bold text-lg mb-1">{team.name}</div>
                  <div className="text-sm text-gray-400 space-y-1">
                    <div>⭐ {team.stars} Stars • 🏟️ {team.conference}</div>
                    <div>📍 {team.location}</div>
                    {team.stadium_name && (
                      <div>🏟️ {team.stadium_name} ({team.stadium_capacity?.toLocaleString()})</div>
                    )}
                  </div>
                </div>
              ))}
              {availableTeams.length === 0 && (
                <p className="text-gray-400 text-center py-8">No teams found</p>
              )}
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedConferenceName || 'Select Conference'} ({conferenceTeams.length}/16)
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
                      className="bg-accent hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm"
                    >
                      📥 Export
                    </button>
                    <button
                      onClick={clearAll}
                      className="bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm"
                    >
                      🗑️ Clear
                    </button>
                  </>
                )}
              </div>
            </div>

            {conferenceTeams.length >= 8 && (
              <div className="mb-4 bg-primary-900/50 border border-accent/30 rounded-lg p-4">
                <label className="flex items-center gap-3 mb-3 cursor-pointer">
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
                  <span className="font-bold text-accent">Enable Divisions</span>
                </label>
                {useDivisions && (
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <input
                      type="text"
                      value={division1Name}
                      onChange={(e) => updateCurrentConference({ division1Name: e.target.value })}
                      className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-accent focus:outline-none"
                      placeholder="Division 1 Name"
                    />
                    <input
                      type="text"
                      value={division2Name}
                      onChange={(e) => updateCurrentConference({ division2Name: e.target.value })}
                      className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-accent focus:outline-none"
                      placeholder="Division 2 Name"
                    />
                  </div>
                )}
              </div>
            )}

            <div
              className={`min-h-[600px] border-2 border-dashed rounded-lg p-4 transition-colors ${
                conferenceTeams.length === 0 ? 'border-gray-700 bg-black/50' : 'border-gray-800 bg-black'
              }`}
            >
              {conferenceTeams.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-400">
                    <div className="text-6xl mb-4">👈</div>
                    <p className="text-lg">Click teams on the left to add them to your conference</p>
                    <p className="text-sm mt-2">4-16 teams per conference (EA Sports CFB requirement)</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {conferenceTeams.map((team, index) => (
                    <div
                      key={team.id}
                      className="bg-primary-900/50 border border-gray-800 rounded-lg p-4 relative"
                    >
                      <div className="absolute top-2 left-2 bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <button
                        onClick={() => removeTeam(team.id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-400 transition-colors font-bold text-xl"
                      >
                        
                      </button>
                      <div className="ml-8 mr-8">
                        <div className="font-bold text-lg mb-1">{team.name}</div>
                        <div className="text-sm text-gray-400 space-y-1">
                          <div> {team.stars} Stars  {team.conference}</div>
                          <div> {team.location}</div>
                          {team.stadium_name && (
                            <div> {team.stadium_name} ({team.stadium_capacity?.toLocaleString()})</div>
                          )}
                        </div>
                        {useDivisions && (
                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={() => moveTeamToDivision(team.id, 1)}
                              className={`flex-1 px-3 py-2 rounded-lg font-bold text-sm transition-colors ${
                                team.division === 1 
                                  ? 'bg-accent text-white' 
                                  : 'bg-black border border-gray-700 text-gray-400 hover:border-accent'
                              }`}
                            >
                              {division1Name}
                            </button>
                            <button
                              onClick={() => moveTeamToDivision(team.id, 2)}
                              className={`flex-1 px-3 py-2 rounded-lg font-bold text-sm transition-colors ${
                                team.division === 2 
                                  ? 'bg-accent text-white' 
                                  : 'bg-black border border-gray-700 text-gray-400 hover:border-accent'
                              }`}
                            >
                              {division2Name}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {conferenceTeams.length >= 16 && (
              <div className="mt-4 bg-yellow-900/20 border border-yellow-600 rounded-lg p-3 text-yellow-400 text-sm text-center">
                 Maximum 16 teams reached
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-card rounded-lg p-6">
          <h3 className="font-bold mb-2">💡 Tips:</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>📋 Select a conference from the dropdown to start building</li>
            <li>👆 Click teams on the left to add them to your conference</li>
            <li>🔄 Switch between conferences using the dropdown or tabs - your work is saved automatically</li>
            <li>❌ Click × on a team to remove it, or × on a conference tab to delete the whole conference</li>
            <li>📊 Each conference needs 4-16 teams (EA Sports CFB requirement)</li>
            <li>➗ With 8+ teams, you can enable divisions (East/West, North/South, etc.)</li>
            <li>📥 Export individual conferences or use "Export All" to download all at once</li>
            <li>⚠️ Your work is lost on page refresh - export when finished!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
