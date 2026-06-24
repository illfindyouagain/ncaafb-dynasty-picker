import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-app flex items-center justify-center text-white">
          <div className="text-center px-4">
            <div className="font-display text-6xl text-accent tracking-wider mb-4">404</div>
            <h1 className="font-display text-2xl tracking-wider mb-2">Something went wrong</h1>
            <p className="text-primary-400 text-sm mb-6">An unexpected error occurred. Try reloading the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-accent hover:bg-accent-400 text-black px-6 py-3 font-display tracking-wider transition-colors"
            >
              RELOAD
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
