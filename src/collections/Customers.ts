import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Customers: CollectionConfig<'customers'> = {
  slug: 'customers',
  auth: {
    tokenExpiration: 7 * 24 * 60 * 60, // 7 days
    verify: true,
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 minutes
  },
  access: {
    create: () => true, // Anyone can create a customer account
    read: ({ req: { user } }) => {
      // Users can only read their own customer document
      // Admins can read any customer document
      if (user?.collection === 'users') return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    update: ({ req: { user } }) => {
      // Users can only update their own customer document
      // Admins can update any customer document
      if (user?.collection === 'users') return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    delete: authenticated, // Only admins can delete customer accounts
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'companyName', 'createdAt'],
    group: 'Users',
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'gstin',
      label: 'GSTIN',
      type: 'text',
      admin: {
        description: 'Goods and Services Tax Identification Number',
      },
    },
    {
      name: 'billingAddress',
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
      name: 'shippingAddress',
      type: 'group',
      fields: [
        {
          name: 'sameAsBilling',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'line1',
          type: 'text',
          admin: {
            condition: (data, siblingData) => !siblingData.sameAsBilling,
          },
        },
        {
          name: 'line2',
          type: 'text',
          admin: {
            condition: (data, siblingData) => !siblingData.sameAsBilling,
          },
        },
        {
          name: 'city',
          type: 'text',
          admin: {
            condition: (data, siblingData) => !siblingData.sameAsBilling,
          },
        },
        {
          name: 'state',
          type: 'text',
          admin: {
            condition: (data, siblingData) => !siblingData.sameAsBilling,
          },
        },
        {
          name: 'postalCode',
          type: 'text',
          admin: {
            condition: (data, siblingData) => !siblingData.sameAsBilling,
          },
        },
        {
          name: 'country',
          type: 'text',
          defaultValue: 'India',
          admin: {
            condition: (data, siblingData) => !siblingData.sameAsBilling,
          },
        },
      ],
    },
    {
      name: 'customerType',
      type: 'select',
      options: [
        { label: 'Retail', value: 'retail' },
        { label: 'Wholesale', value: 'wholesale' },
      ],
      defaultValue: 'retail',
      required: true,
    },
    {
      name: 'creditLimit',
      type: 'number',
      min: 0,
      admin: {
        description: 'Credit limit for wholesale customers (in INR)',
        condition: (data, siblingData) => siblingData?.customerType === 'wholesale',
      },
    },
    {
      name: 'documents',
      type: 'array',
      label: 'Business Documents',
      admin: {
        description: 'Upload business documents (GST certificate, PAN card, etc.)',
        condition: (data, siblingData) => siblingData?.customerType === 'wholesale',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'document',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Internal notes about this customer (not visible to customer)',
      },
    },
  ],
}
