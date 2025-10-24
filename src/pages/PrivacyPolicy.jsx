import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="text-3xl">🏈</div>
            <h1 className="text-2xl font-bold text-orange-500">
              CFB Dynasty Picker
            </h1>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Information We Collect</h2>
            <p>
              We only collect your email address when you voluntarily sign up for our waitlist or newsletter. 
              We do not collect any other personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">How We Use Your Information</h2>
            <p className="mb-2">Your email address is used solely for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Sending product updates and new features</li>
              <li>Notifying you when requested features are available</li>
              <li>Communication related to this service only</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Data Sharing</h2>
            <p>
              We will <strong>never</strong> sell, rent, or share your email address with third parties. 
              Your data is stored securely in our database and is only accessible to site administrators.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Unsubscribe from emails at any time (link provided in every email)</li>
              <li>Request deletion of your data</li>
              <li>Request a copy of your data</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, please contact us through our contact form or social media.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Cookies and Tracking</h2>
            <p>
              This website does not use cookies or tracking technologies. We do not track your browsing behavior.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Third-Party Services</h2>
            <p>
              We use Supabase for database hosting. Your email is stored on their secure servers. 
              Supabase's privacy policy can be found at <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">supabase.com/privacy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify users via email of any significant changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Contact</h2>
            <p>
              If you have any questions about this privacy policy or your data, please reach out through our social media channels.
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-700 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        <div className="mt-12">
          <Link
            to="/"
            className="text-orange-400 hover:text-orange-300 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
