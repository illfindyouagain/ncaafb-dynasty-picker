import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import PickerPage from './pages/PickerPage'
import AboutPage from './pages/AboutPage'
import ChangelogPage from './pages/ChangelogPage'
import ConferenceBuilderPage from './pages/ConferenceBuilderPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/picker" element={<PickerPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/changelog" element={<ChangelogPage />} />
      <Route path="/conference-builder" element={<ConferenceBuilderPage />} />
    </Routes>
  )
}

export default App
