import { createContext, useContext, type ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  username: string
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
  isAuthenticated: boolean
  username: string
  logout: () => void
}

export const AuthProvider = ({ children, isAuthenticated, username, logout }: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={{ isAuthenticated, username, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
