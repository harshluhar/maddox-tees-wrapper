import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getServerURL } from '@/utilities/getURL'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, customer, metadata } = body

    if (!items || !items.length) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      )
    }

    // Create line items for Stripe
    const lineItems = items.map((item: any) => {
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.title,
            description: `${item.size || ''} ${item.color || ''}`.trim(),
            metadata: {
              productId: item.productId,
            },
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents/paise
        },
        quantity: item.quantity,
      }
    })

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${getServerURL()}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getServerURL()}/checkout/cancel`,
      customer_email: customer?.email,
      metadata: {
        ...metadata,
        customerId: customer?.id,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json(
      { error: 'Error creating payment session' },
      { status: 500 }
    )
  }
}
