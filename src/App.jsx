import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import LandingPage from './pages/LandingPage'
import PickerPage from './pages/PickerPage'
import TeamsPage from './pages/TeamsPage'
import RankingsPage from './pages/RankingsPage'
import AboutPage from './pages/AboutPage'
import ChangelogPage from './pages/ChangelogPage'
import ConferenceBuilderPage from './pages/ConferenceBuilderPage'
import TeamDetailPage from './pages/TeamDetailPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ChallengeGeneratorPage from './pages/ChallengeGeneratorPage'
import ToughestPlacesPage from './pages/ToughestPlacesPage'
import NotFoundPage from './pages/NotFoundPage'
import PollTicker from './components/PollTicker'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const location = useLocation()

  return (
    <ErrorBoundary>
      <div className="pb-8">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/picker" element={<PickerPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:slug" element={<TeamDetailPage />} />
            <Route path="/rankings" element={<RankingsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
            <Route path="/conference-builder" element={<ConferenceBuilderPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/challenge" element={<ChallengeGeneratorPage />} />
            <Route path="/toughest-places" element={<ToughestPlacesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </div>
      <PollTicker />
    </ErrorBoundary>
  )
}

export default App
