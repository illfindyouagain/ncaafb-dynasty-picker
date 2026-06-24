import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { APPollProvider } from './contexts/APPollContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <APPollProvider>
        <App />
        <Analytics />
        <SpeedInsights />
      </APPollProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
