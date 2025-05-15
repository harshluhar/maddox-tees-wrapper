import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Orders: CollectionConfig<'orders'> = {
  slug: 'orders',
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => {
      // Users can only read their own orders
      // Admins can read any order
      if (user?.collection === 'users') return true
      if (user) {
        return {
          customer: {
            equals: user.id,
          },
        }
      }
      return false
    },
    update: authenticated, // Only admins can update orders
    delete: authenticated, // Only admins can delete orders
  },
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customer', 'status', 'total', 'createdAt'],
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique order number (auto-generated)',
      },
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'size',
          type: 'text',
        },
        {
          name: 'color',
          type: 'text',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          name: 'customization',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'None', value: 'none' },
                { label: 'DTF Printing', value: 'dtf' },
                { label: 'Custom Design', value: 'custom' },
              ],
              defaultValue: 'none',
            },
            {
              name: 'designFile',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (data, siblingData) => siblingData?.type !== 'none',
              },
            },
            {
              name: 'notes',
              type: 'textarea',
              admin: {
                condition: (data, siblingData) => siblingData?.type !== 'none',
              },
            },
            {
              name: 'additionalCost',
              type: 'number',
              min: 0,
              defaultValue: 0,
              admin: {
                condition: (data, siblingData) => siblingData?.type !== 'none',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'subtotal',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'tax',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'shipping',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'discount',
      type: 'number',
      min: 0,
      defaultValue: 0,
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Partially Paid', value: 'partially_paid' },
        { label: 'Paid', value: 'paid' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Refunded', value: 'refunded' },
      ],
      required: true,
      defaultValue: 'pending',
    },
    {
      name: 'paymentMethod',
      type: 'select',
      options: [
        { label: 'Razorpay', value: 'razorpay' },
        { label: 'Bank Transfer', value: 'bank_transfer' },
        { label: 'Cash on Delivery', value: 'cod' },
      ],
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Partially Paid', value: 'partially_paid' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
      ],
      required: true,
      defaultValue: 'pending',
    },
    {
      name: 'paymentTerms',
      type: 'select',
      options: [
        { label: '100% Upfront', value: 'full_upfront' },
        { label: '50% Advance, 50% on Delivery', value: 'split_payment' },
      ],
      required: true,
    },
    {
      name: 'transactions',
      type: 'array',
      fields: [
        {
          name: 'transactionId',
          type: 'text',
          required: true,
        },
        {
          name: 'amount',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          name: 'method',
          type: 'select',
          options: [
            { label: 'Razorpay', value: 'razorpay' },
            { label: 'Bank Transfer', value: 'bank_transfer' },
            { label: 'Cash on Delivery', value: 'cod' },
          ],
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Success', value: 'success' },
            { label: 'Failed', value: 'failed' },
            { label: 'Pending', value: 'pending' },
          ],
          required: true,
        },
        {
          name: 'date',
          type: 'date',
          required: true,
        },
      ],
    },
    {
      name: 'shippingDetails',
      type: 'group',
      fields: [
        {
          name: 'address',
          type: 'group',
          fields: [
            {
              name: 'line1',
              type: 'text',
              required: true,
            },
            {
              name: 'line2',
              type: 'text',
            },
            {
              name: 'city',
              type: 'text',
              required: true,
            },
            {
              name: 'state',
              type: 'text',
              required: true,
            },
            {
              name: 'postalCode',
              type: 'text',
              required: true,
            },
            {
              name: 'country',
              type: 'text',
              required: true,
              defaultValue: 'India',
            },
          ],
        },
        {
          name: 'trackingNumber',
          type: 'text',
        },
        {
          name: 'carrier',
          type: 'text',
        },
        {
          name: 'estimatedDelivery',
          type: 'date',
        },
        {
          name: 'shiprocketOrderId',
          type: 'text',
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this order (not visible to customer)',
      },
    },
    {
      name: 'customerNotes',
      type: 'textarea',
      admin: {
        description: 'Notes from the customer',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Generate order number if not provided
        if (!data.orderNumber) {
          const date = new Date()
          const timestamp = date.getTime().toString().slice(-6)
          data.orderNumber = `MT-${date.getFullYear()}${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${timestamp}`
        }
        return data
      },
    ],
  },
}
