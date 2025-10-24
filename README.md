# NCAA Football 26 Dynasty Team Picker 🏈

A modern, interactive web app to help you find the perfect team for your NCAA Football 26 Dynasty Mode career.

## Features

- **Smart Categories**: Blue Bloods, Dark Horses, Sleeping Giants, Rebuild Projects & more
- **Difficulty Tiers**: Filter by Easy, Medium, Hard, or Legendary challenges
- **2025 Realignment Ready**: Includes USC/UCLA/Oregon/Washington in Big Ten, Texas/OU in SEC
- **Random Dynasty Mode**: Can't decide? Let fate choose your next adventure
- **Conference Filters**: Browse by Big Ten, SEC, Big 12, ACC, or Group of 5
- **Team Details**: View prestige ratings, locations, and historical context
- **40+ Teams**: Comprehensive coverage from Power 4 to Group of 5

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling (no extra dependencies!)
- **React Router** - Client-side routing

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Then open http://localhost:5173 in your browser!

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
ncaafbpicker/
├── src/
│   ├── data/
│   │   └── teams.js          # Team data with categories, conferences, etc.
│   ├── pages/
│   │   ├── LandingPage.jsx   # Hero, features, mini demo, FAQ
│   │   └── PickerPage.jsx    # Full picker with filters
│   ├── App.jsx               # Router setup
│   ├── main.jsx              # Entry point
│   └── index.css             # Tailwind imports
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Customization

### Adding Teams

Edit `src/data/teams.js` to add/update teams:

```javascript
{
  id: 41,
  name: 'Your Team',
  conference: CONFERENCES.BIG_TEN,
  categories: [CATEGORIES.DARK_HORSES],
  difficulty: DIFFICULTY.MEDIUM,
  prestige: 75,
  location: 'City, State',
  colors: ['#primaryColor', '#secondaryColor'],
}
```

### Adding Categories

Add new categories in `src/data/teams.js`:

```javascript
export const CATEGORIES = {
  // ... existing categories
  YOUR_NEW_CATEGORY: 'Your New Category',
}
```

## Future Roadmap

- [ ] Constraint builders (rival exclusions, distance radius, prestige banding)
- [ ] Shareable permalink format (URL encodes constraints + seed)
- [ ] Export card (PNG) for social sharing
- [ ] Public JSON API + GitHub PR flow for crowd-sourced updates
- [ ] "What's new" strip from changelog.json
- [ ] Waitlist integration (Formspree, ConvertKit, etc.)

## Deployment

### Deploy to Vercel/Netlify

1. Push to GitHub
2. Connect repo to Vercel/Netlify
3. Build command: `npm run build`
4. Output directory: `dist`

### Deploy to bolt.new

1. Open [bolt.new](https://bolt.new)
2. Choose React + Vite template
3. Copy files from this repo
4. Run `npm install` and `npm run dev`

## Contributing

Want to add teams or fix data? Contributions welcome!

## License

MIT - feel free to use this for your own projects!

---

Made for NCAA Football 26 Dynasty Mode enthusiasts 🏈
Not affiliated with EA Sports
