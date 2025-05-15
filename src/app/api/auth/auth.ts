import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getServerSideURL } from '@/utilities/getURL'

// Extend the User type to include our custom fields
declare module 'next-auth' {
  interface User {
    companyName?: string
    customerType?: string
    token?: string
  }

  interface Session {
    user: {
      id: string
      email: string
      name: string
      companyName?: string
      customerType?: string
    }
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    companyName?: string
    customerType?: string
    accessToken?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Call Payload API to authenticate
          const res = await fetch(`${getServerSideURL()}/api/customers/login`, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })

          const data = await res.json()

          if (res.ok && data.user) {
            return {
              id: data.user.id,
              email: data.user.email,
              name: `${data.user.firstName} ${data.user.lastName}`,
              companyName: data.user.companyName,
              customerType: data.user.customerType,
              token: data.token,
            }
          }

          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.companyName = user.companyName
        token.customerType = user.customerType
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.companyName = token.companyName
        session.user.customerType = token.customerType
        session.accessToken = token.accessToken
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}
