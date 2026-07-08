// Google Analytics 4 — inert unless VITE_GA_MEASUREMENT_ID is set
// (e.g. as an environment variable in Vercel). GA4's enhanced measurement
// tracks SPA route changes automatically via the History API, so a single
// init on load is sufficient.
export function initAnalytics() {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID
  if (!gaId) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', gaId)
}
