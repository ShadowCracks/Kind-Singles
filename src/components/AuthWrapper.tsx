import { useState, useEffect, type ReactNode } from 'react'
import { AuthProvider } from '../contexts/AuthContext'

interface AuthWrapperProps {
  children: ReactNode
}

/**
 * AuthWrapper Component - Authentication Gate
 * 
 * This component provides authentication protection for the entire application.
 * It acts as a gate that prevents access to the main app until the user is authenticated.
 * 
 * Features:
 * - Session-based authentication (persists during browser session)
 * - Beautiful login form with error handling
 * - Loading states
 * - Integration with AuthContext to provide authentication state to child components
 * - Automatic logout functionality
 * 
 * Security:
 * - Credentials are stored in sessionStorage (cleared when browser tab closes)
 * - Password is cleared from form on failed attempts
 * - Uses environment-compatible credentials (kindadmin/Ks!ngles_2025#dev)
 */
const AuthWrapper = ({ children }: AuthWrapperProps) => {
  // Authentication state management
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [authenticatedUsername, setAuthenticatedUsername] = useState('')

  // Check for existing authentication on component mount
  useEffect(() => {
    // Restore authentication state from sessionStorage if available
    const auth = sessionStorage.getItem('authenticated')
    const savedUsername = sessionStorage.getItem('username')
    if (auth === 'true' && savedUsername) {
      setIsAuthenticated(true)
      setAuthenticatedUsername(savedUsername)
    }
    setLoading(false)
  }, [])

  // Handle login form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Get credentials from environment variables (no fallbacks for security)
    const correctUsername = import.meta.env.VITE_BASIC_AUTH_USERNAME
    const correctPassword = import.meta.env.VITE_BASIC_AUTH_PASSWORD

    // Check if environment variables are properly configured
    if (!correctUsername || !correctPassword) {
      setError('Authentication not properly configured. Please contact admin.')
      return
    }

    // Validate credentials
    if (username === correctUsername && password === correctPassword) {
      // Successful authentication
      setIsAuthenticated(true)
      setAuthenticatedUsername(username)
      // Store authentication state in sessionStorage
      sessionStorage.setItem('authenticated', 'true')
      sessionStorage.setItem('username', username)
    } else {
      // Failed authentication
      setError('Invalid username or password')
      setPassword('') // Clear password field for security
    }
  }

  // Handle logout functionality
  const handleLogout = () => {
    // Clear all authentication state
    setIsAuthenticated(false)
    setAuthenticatedUsername('')
    // Remove from sessionStorage
    sessionStorage.removeItem('authenticated')
    sessionStorage.removeItem('username')
    // Reset form fields
    setUsername('')
    setPassword('')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#fff7f7' }}>
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Authentication Required</h2>
            <p className="text-gray-600">Please enter your credentials to access this application</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              This is a protected environment. Only authorized users can access this application.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Render the main application with auth context
  return (
    <AuthProvider 
      isAuthenticated={isAuthenticated} 
      username={authenticatedUsername} 
      logout={handleLogout}
    >
      {children}
    </AuthProvider>
  )
}

export default AuthWrapper
