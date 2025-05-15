type ShiprocketAuthResponse = {
  token: string
  expires_in: number
}

type ShiprocketOrderItem = {
  name: string
  sku: string
  units: number
  selling_price: number
  discount: number
  tax: number
  hsn: number
}

type ShiprocketOrderRequest = {
  order_id: string
  order_date: string
  pickup_location: string
  channel_id: string
  comment: string
  billing_customer_name: string
  billing_last_name: string
  billing_address: string
  billing_address_2: string
  billing_city: string
  billing_pincode: string
  billing_state: string
  billing_country: string
  billing_email: string
  billing_phone: string
  shipping_is_billing: boolean
  shipping_customer_name?: string
  shipping_last_name?: string
  shipping_address?: string
  shipping_address_2?: string
  shipping_city?: string
  shipping_pincode?: string
  shipping_state?: string
  shipping_country?: string
  shipping_email?: string
  shipping_phone?: string
  order_items: ShiprocketOrderItem[]
  payment_method: 'prepaid' | 'COD'
  shipping_charges: number
  giftwrap_charges: number
  transaction_charges: number
  total_discount: number
  sub_total: number
  length: number
  breadth: number
  height: number
  weight: number
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
export async function createShiprocketOrder(orderData: ShiprocketOrderRequest): Promise<any> {
  try {
    const token = await getShiprocketToken()

    const response = await fetch('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
export async function trackShiprocketOrder(orderId: string): Promise<any> {
  try {
    const token = await getShiprocketToken()

    const response = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

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
export async function generateShiprocketAWB(shipmentId: string, courierId: string): Promise<any> {
  try {
    const token = await getShiprocketToken()

    const response = await fetch('https://apiv2.shiprocket.in/v1/external/courier/assign/awb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
export async function generateShiprocketLabel(shipmentId: string): Promise<any> {
  try {
    const token = await getShiprocketToken()

    const response = await fetch('https://apiv2.shiprocket.in/v1/external/courier/generate/label', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
