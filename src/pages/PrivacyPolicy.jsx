import { Link } from 'react-router-dom'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'

export default function PrivacyPolicy() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-app text-white">
        <Header />

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <h1 className="font-display text-4xl sm:text-5xl tracking-wider mb-2">PRIVACY POLICY</h1>
          <p className="text-primary-500 text-sm mb-10">Last updated: June 2026</p>

          <div className="space-y-8 text-primary-300 text-sm leading-relaxed">

            <section>
              <h2 className="font-display text-xl tracking-wider text-white mb-3">What We Collect</h2>
              <p>
                Almost nothing. CFB Dynasty Tools does not require an account, does not collect your name or email,
                and does not run a database of user data. Specifically:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside text-primary-400">
                <li><strong className="text-primary-300">No personal information</strong> — no sign-up, no login, no forms that collect your data.</li>
                <li><strong className="text-primary-300">No cookies</strong> — we do not set any tracking or session cookies.</li>
                <li><strong className="text-primary-300">localStorage</strong> — the Conference Builder saves your in-progress conferences to your own browser's localStorage. This data never leaves your device.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-wider text-white mb-3">Analytics</h2>
              <p>
                We use <strong className="text-primary-300">Vercel Analytics</strong> and <strong className="text-primary-300">Vercel Speed Insights</strong>
                {' '}to understand aggregate page traffic and performance. These tools collect anonymised data such as
                page views, referrer, device type, and load times. No personally identifiable information is collected
                or stored. See{' '}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Vercel's privacy policy
                </a>
                {' '}for full details.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-wider text-white mb-3">Third-Party Data</h2>
              <p>
                The Poll Rankings page fetches live AP Poll data from ESPN's public API. No user data is sent
                in that request — it's a plain read with no authentication.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-wider text-white mb-3">External Links</h2>
              <p>
                The About page contains links to Venmo and PayPal for optional donations. Clicking those takes
                you to third-party sites with their own privacy policies. We have no control over their data
                practices.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-wider text-white mb-3">Questions</h2>
              <p>
                Reach out via{' '}
                <a
                  href="https://www.reddit.com/user/arcanefuse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  u/arcanefuse on Reddit
                </a>
                {' '}or{' '}
                <a
                  href="https://twitter.com/liftoffgaminghq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  @liftoffgaminghq on X
                </a>.
              </p>
            </section>

          </div>

          <div className="mt-12 pt-6 border-t border-primary-900">
            <Link to="/" className="text-accent hover:text-accent-400 text-sm transition-colors">
              ← Back to Home
            </Link>
          </div>
        </main>
      </div>
    </PageTransition>
  )
}
