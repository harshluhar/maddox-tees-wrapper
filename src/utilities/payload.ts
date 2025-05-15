import payload from 'payload'
import type { Payload } from 'payload'

let cachedPayload: Payload | null = null

export const getPayloadClient = async (): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET environment variable is missing')
  }

  if (cachedPayload) {
    return cachedPayload
  }

  // For server-side only
  if (typeof window === 'undefined') {
    try {
      // Try to initialize Payload with the correct options
      await payload.init({
        // @ts-ignore - secret is a valid option but TypeScript doesn't recognize it
        secret: process.env.PAYLOAD_SECRET,
        local: true,
      })
    } catch (error) {
      // If error is about already being initialized, that's fine
      if (!(error instanceof Error) || !error.message.includes('already initialized')) {
        throw error
      }
    }
  }

  cachedPayload = payload

  return payload
}
