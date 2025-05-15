import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const RecentWork: CollectionConfig<'recent-work'> = {
  slug: 'recent-work',
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'category', 'featured'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'client',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'DTF Printing', value: 'dtf' },
        { label: 'Custom T-shirts', value: 'custom_tshirts' },
        { label: 'Corporate Uniforms', value: 'corporate_uniforms' },
        { label: 'Event Merchandise', value: 'event_merchandise' },
        { label: 'Promotional Products', value: 'promotional_products' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      label: 'Project Images',
      minRows: 1,
      maxRows: 10,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature this work on the home page',
      },
    },
    {
      name: 'completionDate',
      type: 'date',
      admin: {
        description: 'When was this project completed?',
      },
    },
    {
      name: 'testimonial',
      type: 'relationship',
      relationTo: 'testimonials',
      admin: {
        description: 'Related testimonial (if available)',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Display order (lower numbers appear first)',
      },
    },
    ...slugField(),
  ],
}
