import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import LandingPage from './pages/LandingPage'
import PickerPage from './pages/PickerPage'
import TeamsPage from './pages/TeamsPage'
import RankingsPage from './pages/RankingsPage'
import AboutPage from './pages/AboutPage'
import ChangelogPage from './pages/ChangelogPage'
import ConferenceBuilderPage from './pages/ConferenceBuilderPage'

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/picker" element={<PickerPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/rankings" element={<RankingsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/changelog" element={<ChangelogPage />} />
        <Route path="/conference-builder" element={<ConferenceBuilderPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
