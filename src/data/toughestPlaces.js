// EA Sports College Football 27 — Official Top 25 Toughest Places to Play
// Source: EA "College Football 27 — Toughest Places To Play" (Stadium Pulse rankings)
// Team names must exactly match `name` in src/data/teams.js
export const TOUGHEST_PLACES = [
  { rank: 1, team: 'LSU', stadium: 'Tiger Stadium' },
  { rank: 2, team: 'Ohio State', stadium: 'Ohio Stadium' },
  { rank: 3, team: 'Penn State', stadium: 'Beaver Stadium' },
  { rank: 4, team: 'Georgia', stadium: 'Sanford Stadium' },
  { rank: 5, team: 'Alabama', stadium: 'Bryant-Denny Stadium' },
  { rank: 6, team: 'Oregon', stadium: 'Autzen Stadium' },
  { rank: 7, team: 'Florida', stadium: 'Ben Hill Griffin Stadium' },
  { rank: 8, team: 'Tennessee', stadium: 'Neyland Stadium' },
  { rank: 9, team: 'Clemson', stadium: 'Memorial Stadium' },
  { rank: 10, team: 'Texas A&M', stadium: 'Kyle Field' },
  { rank: 11, team: 'Oklahoma', stadium: 'Gaylord Family Oklahoma Memorial Stadium' },
  { rank: 12, team: 'Michigan', stadium: 'Michigan Stadium' },
  { rank: 13, team: 'Texas', stadium: 'Darrell K Royal-Texas Memorial Stadium' },
  { rank: 14, team: 'Auburn', stadium: 'Jordan-Hare Stadium' },
  { rank: 15, team: 'Washington', stadium: 'Husky Stadium' },
  { rank: 16, team: 'South Carolina', stadium: 'Williams-Brice Stadium' },
  { rank: 17, team: 'Indiana', stadium: 'Memorial Stadium' },
  { rank: 18, team: 'Utah', stadium: 'Rice-Eccles Stadium' },
  { rank: 19, team: 'Iowa', stadium: 'Kinnick Stadium' },
  { rank: 20, team: 'Notre Dame', stadium: 'Notre Dame Stadium' },
  { rank: 21, team: 'Florida State', stadium: 'Doak S. Campbell Stadium' },
  { rank: 22, team: 'Virginia Tech', stadium: 'Lane Stadium' },
  { rank: 23, team: 'NC State', stadium: 'Carter-Finley Stadium' },
  { rank: 24, team: 'BYU', stadium: 'LaVell Edwards Stadium' },
  { rank: 25, team: 'Mississippi State', stadium: 'Davis Wade Stadium' },
]

// Year-over-year movement vs. CFB 26
export const NEW_ENTRIES = ['Indiana', 'Virginia Tech', 'BYU']

export const DROPPED_OUT = [
  { team: 'Michigan State', stadium: 'Spartan Stadium' },
  { team: 'Wisconsin', stadium: 'Camp Randall Stadium' },
  { team: 'Oklahoma State', stadium: 'Boone Pickens Stadium' },
]

const RANK_BY_TEAM = new Map(TOUGHEST_PLACES.map(p => [p.team, p.rank]))

export function getToughestPlaceRank(teamName) {
  return RANK_BY_TEAM.get(teamName) ?? null
}

export function isNewEntry(teamName) {
  return NEW_ENTRIES.includes(teamName)
}
