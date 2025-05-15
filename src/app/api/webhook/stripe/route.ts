import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayloadClient } from '@/utilities/payload'

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

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text()
    const signature = req.headers.get('stripe-signature') || ''

    let event: Stripe.Event

    // Get Stripe instance
    const stripeInstance = getStripe()

    if (!stripeInstance) {
      return NextResponse.json({ error: 'Stripe is not initialized' }, { status: 500 })
    }

    try {
      event = stripeInstance.webhooks.constructEvent(payload, signature, webhookSecret)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      console.error(`Webhook signature verification failed: ${errorMessage}`)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Get the Payload client
        const payload = await getPayloadClient()

        // Create a new order in Payload
        const order = await payload.create({
          collection: 'orders',
          data: {
            orderNumber: '', // Will be auto-generated in the beforeChange hook
            customer: session.metadata?.customerId || '',
            items: [], // This would need to be populated from your cart data
            subtotal: session.amount_subtotal ? session.amount_subtotal / 100 : 0,
            tax: session.total_details?.amount_tax ? session.total_details.amount_tax / 100 : 0,
            shipping: session.total_details?.amount_shipping
              ? session.total_details.amount_shipping / 100
              : 0,
            discount: session.total_details?.amount_discount
              ? session.total_details.amount_discount / 100
              : 0,
            total: session.amount_total ? session.amount_total / 100 : 0,
            status: 'processing',
            paymentMethod: 'razorpay', // Using razorpay as it's one of the allowed values
            paymentStatus: 'paid',
            paymentTerms: 'full_upfront',
            transactions: [
              {
                transactionId: session.payment_intent as string,
                amount: session.amount_total ? session.amount_total / 100 : 0,
                method: 'razorpay', // Using razorpay as it's one of the allowed values
                status: 'success',
                date: new Date().toISOString(),
              },
            ],
            shippingDetails: {
              address: {
                line1: '',
                city: '',
                state: '',
                postalCode: '',
                country: 'India',
              },
            },
          },
        })

        console.log('Created order:', order.id)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`Payment failed: ${paymentIntent.id}`)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
