import { teams } from '../data/teams'

export function useTeams() {
  return { teams, loading: false, error: null }
}
