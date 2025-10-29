import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTeams } from '../hooks/useTeams'

export default function ConferenceBuilderPage() {
  const { teams, loading, error } = useTeams()
  const [conferenceName, setConferenceName] = useState('My Custom Conference')
  const [conferenceTeams, setConferenceTeams] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [conferenceFilter, setConferenceFilter] = useState('all')
  const [draggedTeam, setDraggedTeam] = useState(null)
  const [useDivisions, setUseDivisions] = useState(false)
  const [division1Name, setDivision1Name] = useState('East')
  const [division2Name, setDivision2Name] = useState('West')

  const conferences = [...new Set(teams.map(t => t.conference))].sort()

  const availableTeams = teams.filter(team => {
    if (conferenceTeams.find(t => t.id === team.id)) return false
    if (searchQuery && !team.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (conferenceFilter !== 'all' && team.conference !== conferenceFilter) return false
    return true
  })

  const handleDragStart = (team) => {
    setDraggedTeam(team)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = () => {
    if (draggedTeam && conferenceTeams.length < 16) {
      // Check if team already exists
      if (conferenceTeams.find(t => t.id === draggedTeam.id)) {
        return // Silently ignore duplicate
      }
      setConferenceTeams([...conferenceTeams, { ...draggedTeam, division: null }])
      setDraggedTeam(null)
    }
  }

  const moveTeamToDivision = (teamId, division) => {
    setConferenceTeams(conferenceTeams.map(t => 
      t.id === teamId ? { ...t, division } : t
    ))
  }

  const removeTeam = (teamId) => {
    setConferenceTeams(conferenceTeams.filter(t => t.id !== teamId))
  }

  const clearAll = () => {
    if (confirm('Clear all teams?')) {
      setConferenceTeams([])
      setUseDivisions(false)
    }
  }

  const exportConference = () => {
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
      name: conferenceName,
      divisions: useDivisions ? {
        division1: division1Name,
        division2: division2Name
      } : null,
      teams: conferenceTeams.map(t => ({
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
    a.download = `${conferenceName.replace(/\s+/g, '-').toLowerCase()}.json`
    a.click()
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
        <div className="mb-6">
          <Link to="/" className="text-accent hover:text-accent-400 transition-colors mb-4 inline-block">
             Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-2"> Conference Builder</h1>
          <p className="text-primary-400">Drag and drop teams to create your custom conference</p>
        </div>

        <div className="bg-card rounded-lg p-4 mb-6">
          <input
            type="text"
            value={conferenceName}
            onChange={(e) => setConferenceName(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white text-2xl font-bold focus:border-accent focus:outline-none"
            placeholder="Conference Name"
          />
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
                  draggable
                  onDragStart={() => handleDragStart(team)}
                  className="bg-black border border-gray-800 rounded-lg p-4 cursor-move hover:border-accent transition-colors"
                >
                  <div className="font-bold text-lg mb-1">{team.name}</div>
                  <div className="text-sm text-gray-400 space-y-1">
                    <div> {team.stars} Stars  {team.conference}</div>
                    <div> {team.location}</div>
                    {team.stadium_name && (
                      <div> {team.stadium_name} ({team.stadium_capacity?.toLocaleString()})</div>
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
              <h2 className="text-2xl font-bold">{conferenceName} ({conferenceTeams.length}/16)</h2>
              <div className="flex gap-2">
                {conferenceTeams.length > 0 && (
                  <>
                    <button
                      onClick={exportConference}
                      className="bg-accent hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm"
                    >
                       Export
                    </button>
                    <button
                      onClick={clearAll}
                      className="bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm"
                    >
                       Clear
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
                      setUseDivisions(enabled)
                      if (!enabled) {
                        // Clear all division assignments when disabling
                        setConferenceTeams(conferenceTeams.map(t => ({ ...t, division: null })))
                      }
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
                      onChange={(e) => setDivision1Name(e.target.value)}
                      className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-accent focus:outline-none"
                      placeholder="Division 1 Name"
                    />
                    <input
                      type="text"
                      value={division2Name}
                      onChange={(e) => setDivision2Name(e.target.value)}
                      className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-accent focus:outline-none"
                      placeholder="Division 2 Name"
                    />
                  </div>
                )}
              </div>
            )}

            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`min-h-[600px] border-2 border-dashed rounded-lg p-4 transition-colors ${
                conferenceTeams.length === 0 ? 'border-gray-700 bg-black/50' : 'border-gray-800 bg-black'
              }`}
            >
              {conferenceTeams.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-400">
                    <div className="text-6xl mb-4"></div>
                    <p className="text-lg">Drag teams here to build your conference</p>
                    <p className="text-sm mt-2">Maximum 16 teams</p>
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
          <h3 className="font-bold mb-2"> Tips:</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li> Drag teams from the left to the right to add them to your conference</li>
            <li> Click the  button to remove a team from your conference</li>
            <li> Maximum 16 teams per conference</li>
            <li> With 8+ teams, you can enable divisions (East/West, North/South, etc.)</li>
            <li> Export your conference as a JSON file to save it</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
