import { createContext, useContext, useState, useEffect } from 'react'

const APPollContext = createContext(null)

export function APPollProvider({ children }) {
  const [poll, setPoll] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(
      'https://site.api.espn.com/apis/site/v2/sports/football/college-football/rankings',
      { signal: controller.signal }
    )
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch rankings')
        return r.json()
      })
      .then(data => {
        const apRanking = data.rankings?.find(r => r.type === 'ap')
        if (!apRanking) throw new Error('AP Poll not found')

        setPoll({
          name: apRanking.shortName || 'AP Top 25',
          headline: apRanking.headline || '',
          season: apRanking.season?.year ?? apRanking.season?.displayName ?? '',
          teams: apRanking.ranks.map(r => ({
            rank: r.current,
            prev: r.previous || null,
            trend: r.trend || '0',
            points: r.points,
            firstPlaceVotes: r.firstPlaceVotes || 0,
            name: r.team.location,
            mascot: r.team.nickname,
            conference: r.team.groups?.parent?.abbreviation || r.team.groups?.abbreviation || '',
            record: r.recordSummary || '',
          })),
          others: (apRanking.others || []).map(r => ({
            name: r.team.location,
            points: r.points,
          })),
        })
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

  return (
    <APPollContext.Provider value={{ poll, loading, error }}>
      {children}
    </APPollContext.Provider>
  )
}

export function useAPPoll() {
  return useContext(APPollContext)
}
