'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useUserStore } from '@/store/userStore'

type AuthProviderProps = {
  children: ReactNode
}

// This component syncs the NextAuth session with our Zustand user store
const SessionSync = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession()
  const { setUser, setIsAuthenticated, setIsLoading } = useUserStore()

  useEffect(() => {
    setIsLoading(status === 'loading')

    if (status === 'authenticated' && session?.user) {
      const userName = session.user.name || ''
      const nameParts = userName.split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''

      setUser({
        id: session.user.id as string,
        email: session.user.email as string,
        firstName,
        lastName,
        companyName: session.user.companyName as string,
        customerType: (session.user.customerType as 'retail' | 'wholesale') || 'retail',
      })
      setIsAuthenticated(true)
    } else if (status === 'unauthenticated') {
      setUser(null)
      setIsAuthenticated(false)
    }
  }, [session, status, setUser, setIsAuthenticated, setIsLoading])

  return <>{children}</>
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      <SessionSync>{children}</SessionSync>
    </SessionProvider>
  )
}
