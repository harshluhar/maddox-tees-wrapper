type ShiprocketAuthResponse = {
  token: string
  expires_in: number
}

type ShiprocketOrderItem = {
  name: string
  sku: string
  units: number
  selling_price: number
  discount: number | undefined
  tax: number | undefined
  hsn: number | undefined
}

type ShiprocketOrderRequest = {
  order_id: string
  order_date: string | undefined
  pickup_location: string
  channel_id: string
  comment: string | undefined
  billing_customer_name: string | undefined
  billing_last_name: string | undefined
  billing_address: string | undefined
  billing_address_2: string | undefined
  billing_city: string | undefined
  billing_pincode: string | undefined
  billing_state: string | undefined
  billing_country: string | undefined
  billing_email: string | undefined
  billing_phone: string | undefined
  shipping_is_billing: boolean
  shipping_customer_name?: string | null | undefined
  shipping_last_name?: string | null | undefined
  shipping_address?: string | null | undefined
  shipping_address_2?: string | null | undefined
  shipping_city?: string | null | undefined
  shipping_pincode?: string | null | undefined
  shipping_state?: string | null | undefined
  shipping_country?: string | null | undefined
  shipping_email?: string | null | undefined
  shipping_phone?: string | null | undefined
  order_items: ShiprocketOrderItem[]
  payment_method: 'prepaid' | 'COD' | string
  shipping_charges: number | undefined
  giftwrap_charges: number | undefined
  transaction_charges: number | undefined
  total_discount: number | null | undefined
  sub_total: number | undefined
  length: number | undefined
  breadth: number | undefined
  height: number | undefined
  weight: number | undefined
}

// Get Shiprocket auth token
export async function getShiprocketToken(): Promise<string> {
  try {
    const response = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }),
    })

    if (!response.ok) {
      throw new Error(`Shiprocket auth failed: ${response.statusText}`)
    }

    const data: ShiprocketAuthResponse = await response.json()
    return data.token
  } catch (error) {
    console.error('Error getting Shiprocket token:', error)
    throw error
  }
}

// Create a Shiprocket order
export async function createShiprocketOrder(
  orderData: ShiprocketOrderRequest,
): Promise<Record<string, unknown>> {
  try {
    const token = await getShiprocketToken()

    const response = await fetch('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      throw new Error(`Shiprocket order creation failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating Shiprocket order:', error)
    throw error
  }
}

// Track a Shiprocket order
export async function trackShiprocketOrder(orderId: string): Promise<Record<string, unknown>> {
  try {
    const token = await getShiprocketToken()

    const response = await fetch(
      `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${orderId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Shiprocket order tracking failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error tracking Shiprocket order:', error)
    throw error
  }
}

// Generate Shiprocket AWB (tracking number)
export async function generateShiprocketAWB(
  shipmentId: string,
  courierId: string,
): Promise<Record<string, unknown>> {
  try {
    const token = await getShiprocketToken()

    const response = await fetch('https://apiv2.shiprocket.in/v1/external/courier/assign/awb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        shipment_id: shipmentId,
        courier_id: courierId,
      }),
    })

    if (!response.ok) {
      throw new Error(`Shiprocket AWB generation failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error generating Shiprocket AWB:', error)
    throw error
  }
}

// Generate Shiprocket label
export async function generateShiprocketLabel(
  shipmentId: string,
): Promise<Record<string, unknown>> {
  try {
    const token = await getShiprocketToken()

    const response = await fetch('https://apiv2.shiprocket.in/v1/external/courier/generate/label', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        shipment_id: [shipmentId],
      }),
    })

    if (!response.ok) {
      throw new Error(`Shiprocket label generation failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error generating Shiprocket label:', error)
    throw error
  }
}
