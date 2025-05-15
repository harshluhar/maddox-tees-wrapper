import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/utilities/payload'
import { createShiprocketOrder, generateShiprocketAWB } from '@/utilities/shiprocket'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Get the Payload client
    const payload = await getPayloadClient()

    // Get the order from Payload
    const order = await payload.findByID({
      collection: 'orders',
      id: orderId,
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Get the customer from Payload
    const customer = await payload.findByID({
      collection: 'customers',
      id: order.customer,
    })

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      )
    }

    // Prepare order items for Shiprocket
    const orderItems = order.items.map((item: any) => {
      return {
        name: item.product.title,
        sku: item.product.id,
        units: item.quantity,
        selling_price: item.price,
        discount: 0,
        tax: 0,
        hsn: 6109, // HSN code for t-shirts
      }
    })

    // Determine if shipping is the same as billing
    const shippingIsBilling = customer.shippingAddress?.sameAsBilling || false

    // Create Shiprocket order
    const shiprocketOrderData = {
      order_id: order.orderNumber,
      order_date: new Date(order.createdAt).toISOString().split('T')[0],
      pickup_location: 'Primary',
      channel_id: '',
      comment: order.customerNotes || '',
      billing_customer_name: customer.firstName,
      billing_last_name: customer.lastName,
      billing_address: customer.billingAddress.line1,
      billing_address_2: customer.billingAddress.line2 || '',
      billing_city: customer.billingAddress.city,
      billing_pincode: customer.billingAddress.postalCode,
      billing_state: customer.billingAddress.state,
      billing_country: customer.billingAddress.country,
      billing_email: customer.email,
      billing_phone: customer.phone,
      shipping_is_billing: shippingIsBilling,
      shipping_customer_name: shippingIsBilling ? undefined : customer.firstName,
      shipping_last_name: shippingIsBilling ? undefined : customer.lastName,
      shipping_address: shippingIsBilling ? undefined : customer.shippingAddress.line1,
      shipping_address_2: shippingIsBilling ? undefined : customer.shippingAddress.line2 || '',
      shipping_city: shippingIsBilling ? undefined : customer.shippingAddress.city,
      shipping_pincode: shippingIsBilling ? undefined : customer.shippingAddress.postalCode,
      shipping_state: shippingIsBilling ? undefined : customer.shippingAddress.state,
      shipping_country: shippingIsBilling ? undefined : customer.shippingAddress.country,
      shipping_email: shippingIsBilling ? undefined : customer.email,
      shipping_phone: shippingIsBilling ? undefined : customer.phone,
      order_items: orderItems,
      payment_method: 'prepaid', // Only prepaid orders as per requirements
      shipping_charges: order.shipping,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: order.discount,
      sub_total: order.subtotal,
      length: 10,
      breadth: 10,
      height: 5,
      weight: 0.5,
    }

    // Create Shiprocket order
    const shiprocketResponse = await createShiprocketOrder(shiprocketOrderData)

    // Generate AWB (tracking number)
    const awbResponse = await generateShiprocketAWB(
      shiprocketResponse.shipment_id,
      shiprocketResponse.courier_company_id
    )

    // Update order in Payload with Shiprocket details
    await payload.update({
      collection: 'orders',
      id: orderId,
      data: {
        status: 'shipped',
        shippingDetails: {
          ...order.shippingDetails,
          trackingNumber: awbResponse.awb_code,
          carrier: shiprocketResponse.courier_name,
          shiprocketOrderId: shiprocketResponse.order_id,
        },
      },
    })

    return NextResponse.json({
      success: true,
      shiprocketOrderId: shiprocketResponse.order_id,
      trackingNumber: awbResponse.awb_code,
      carrier: shiprocketResponse.courier_name,
    })
  } catch (error) {
    console.error('Shipping error:', error)
    return NextResponse.json(
      { error: 'Error creating shipment' },
      { status: 500 }
    )
  }
}
