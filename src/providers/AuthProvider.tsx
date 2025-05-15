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
      setUser({
        id: session.user.id as string,
        email: session.user.email as string,
        firstName: (session.user.name as string).split(' ')[0],
        lastName: (session.user.name as string).split(' ').slice(1).join(' '),
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
