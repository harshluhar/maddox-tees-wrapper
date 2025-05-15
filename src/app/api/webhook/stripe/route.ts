import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayloadClient } from '@/utilities/payload'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text()
    const signature = req.headers.get('stripe-signature') || ''

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`)
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
            customer: session.metadata?.customerId,
            items: [], // This would need to be populated from your cart data
            subtotal: session.amount_subtotal ? session.amount_subtotal / 100 : 0,
            tax: session.total_details?.amount_tax ? session.total_details.amount_tax / 100 : 0,
            shipping: session.total_details?.amount_shipping ? session.total_details.amount_shipping / 100 : 0,
            discount: session.total_details?.amount_discount ? session.total_details.amount_discount / 100 : 0,
            total: session.amount_total ? session.amount_total / 100 : 0,
            status: 'processing',
            paymentMethod: 'stripe',
            paymentStatus: 'paid',
            paymentTerms: 'full_upfront',
            transactions: [
              {
                transactionId: session.payment_intent as string,
                amount: session.amount_total ? session.amount_total / 100 : 0,
                method: 'stripe',
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
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
