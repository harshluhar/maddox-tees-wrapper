import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getServerSideURL } from '@/utilities/getURL'

// Initialize Stripe only on the server side
let stripe: Stripe | null = null

// Initialize Stripe on demand
const getStripe = () => {
  if (!stripe && typeof window === 'undefined') {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-04-30.basil',
    })
  }
  return stripe
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, customer, metadata } = body

    if (!items || !items.length) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    // Create line items for Stripe
    const lineItems = items.map((item: Record<string, unknown>) => {
      const price = typeof item.price === 'number' ? item.price : 0
      const quantity = typeof item.quantity === 'number' ? item.quantity : 1
      const title = typeof item.title === 'string' ? item.title : 'Product'
      const size = typeof item.size === 'string' ? item.size : ''
      const color = typeof item.color === 'string' ? item.color : ''
      const productId = typeof item.productId === 'string' ? item.productId : ''

      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: title,
            description: `${size} ${color}`.trim(),
            metadata: {
              productId: productId,
            },
          },
          unit_amount: Math.round(price * 100), // Convert to cents/paise
        },
        quantity: quantity,
      }
    })

    // Get Stripe instance
    const stripeInstance = getStripe()

    if (!stripeInstance) {
      return NextResponse.json({ error: 'Stripe is not initialized' }, { status: 500 })
    }

    // Create Stripe checkout session
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${getServerSideURL()}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getServerSideURL()}/checkout/cancel`,
      customer_email: customer?.email,
      metadata: {
        ...metadata,
        customerId: customer?.id,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json({ error: 'Error creating payment session' }, { status: 500 })
  }
}
