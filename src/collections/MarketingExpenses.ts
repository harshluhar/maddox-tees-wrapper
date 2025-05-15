import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const MarketingExpenses: CollectionConfig<'marketing-expenses'> = {
  slug: 'marketing-expenses',
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'campaign',
    defaultColumns: ['campaign', 'platform', 'amount', 'date'],
    group: 'Marketing',
  },
  fields: [
    {
      name: 'campaign',
      type: 'text',
      required: true,
    },
    {
      name: 'platform',
      type: 'select',
      options: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'Google', value: 'google' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'YouTube', value: 'youtube' },
        { label: 'TikTok', value: 'tiktok' },
        { label: 'Print', value: 'print' },
        { label: 'Outdoor', value: 'outdoor' },
        { label: 'Radio', value: 'radio' },
        { label: 'Television', value: 'television' },
        { label: 'Trade Show', value: 'trade_show' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        description: 'End date for campaigns that run over a period',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'targetAudience',
      type: 'select',
      options: [
        { label: 'Retail Customers', value: 'retail' },
        { label: 'Wholesale Customers', value: 'wholesale' },
        { label: 'Both', value: 'both' },
      ],
      required: true,
      defaultValue: 'both',
    },
    {
      name: 'metrics',
      type: 'group',
      fields: [
        {
          name: 'impressions',
          type: 'number',
          min: 0,
        },
        {
          name: 'clicks',
          type: 'number',
          min: 0,
        },
        {
          name: 'conversions',
          type: 'number',
          min: 0,
        },
        {
          name: 'revenue',
          type: 'number',
          min: 0,
        },
        {
          name: 'roi',
          label: 'ROI (%)',
          type: 'number',
        },
      ],
    },
    {
      name: 'attachments',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Planned', value: 'planned' },
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      required: true,
      defaultValue: 'planned',
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this marketing expense',
      },
    },
  ],
}
