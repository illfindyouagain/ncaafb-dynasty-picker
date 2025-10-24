import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useTeams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchTeams() {
      try {
        const { data, error } = await supabase
          .from('teams')
          .select('*')
          .order('overall_rating', { ascending: false })

        if (error) throw error

        // Transform data to match the expected format
        const transformedTeams = data.map(team => ({
          id: team.id,
          name: team.name,
          conference: team.conference,
          categories: team.categories,
          difficulty: team.difficulty,
          prestige: team.prestige,
          overallRating: team.overall_rating,
          offenseRating: team.offense_rating,
          defenseRating: team.defense_rating,
          stars: team.stars,
          location: team.location,
          colors: [team.color_primary, team.color_secondary],
          stadium_name: team.stadium_name,
          stadium_capacity: team.stadium_capacity
        }))

        setTeams(transformedTeams)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching teams:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  return { teams, loading, error }
}
