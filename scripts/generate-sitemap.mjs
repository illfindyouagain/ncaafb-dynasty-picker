// Regenerates public/sitemap.xml from the static routes plus every team
// detail page in src/data/teams.js. Run after adding/renaming teams or pages:
//   npm run generate:sitemap
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { teams } from '../src/data/teams.js'
import { teamSlug } from '../src/lib/teamSlug.js'

const BASE_URL = 'https://liftoffgaming.com'

const STATIC_ROUTES = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: 'picker', priority: '0.9', changefreq: 'weekly' },
  { path: 'conference-builder', priority: '0.9', changefreq: 'weekly' },
  { path: 'teams', priority: '0.8', changefreq: 'weekly' },
  { path: 'rankings', priority: '0.8', changefreq: 'weekly' },
  { path: 'toughest-places', priority: '0.8', changefreq: 'weekly' },
  { path: 'challenge', priority: '0.7', changefreq: 'weekly' },
  { path: 'changelog', priority: '0.6', changefreq: 'weekly' },
  { path: 'about', priority: '0.5', changefreq: 'monthly' },
  { path: 'privacy', priority: '0.3', changefreq: 'yearly' },
]

const lastmod = new Date().toISOString().slice(0, 10)

const teamRoutes = teams.map(team => ({
  path: `teams/${teamSlug(team.name)}`,
  priority: '0.6',
  changefreq: 'weekly',
}))

const urlEntry = ({ path, priority, changefreq }) => `  <url>
    <loc>${BASE_URL}/${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...STATIC_ROUTES, ...teamRoutes].map(urlEntry).join('\n')}
</urlset>
`

const outPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sitemap.xml')
writeFileSync(outPath, xml)
console.log(`sitemap.xml written: ${STATIC_ROUTES.length} static + ${teamRoutes.length} team pages`)
