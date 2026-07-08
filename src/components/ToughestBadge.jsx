import { getToughestPlaceRank } from '../data/toughestPlaces'

// Small chip shown next to any team whose stadium made EA's CFB 27
// Top 25 Toughest Places to Play. Renders nothing for unranked teams.
export default function ToughestBadge({ teamName }) {
  const rank = getToughestPlaceRank(teamName)
  if (!rank) return null

  return (
    <span className="inline-flex items-center gap-1 bg-accent/10 border border-accent/25 px-1.5 py-0.5 text-[10px] text-accent uppercase tracking-widest whitespace-nowrap">
      🔥 #{rank} Toughest
    </span>
  )
}
