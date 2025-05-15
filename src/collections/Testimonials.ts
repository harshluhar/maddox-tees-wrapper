import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Testimonials: CollectionConfig<'testimonials'> = {
  slug: 'testimonials',
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'companyName', 'rating', 'approved'],
  },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      required: true,
    },
    {
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      admin: {
        description: 'Position/title of the person giving the testimonial',
      },
    },
    {
      name: 'testimonial',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Company logo (optional)',
      },
    },
    {
      name: 'customerPhoto',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Customer photo (optional)',
      },
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Approve this testimonial for display on the website',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature this testimonial on the home page',
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
    {
      name: 'customerType',
      type: 'select',
      options: [
        { label: 'Retail', value: 'retail' },
        { label: 'Wholesale', value: 'wholesale' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'projectType',
      type: 'select',
      options: [
        { label: 'DTF Printing', value: 'dtf' },
        { label: 'Custom T-shirts', value: 'custom_tshirts' },
        { label: 'Solid Color T-shirts', value: 'solid_tshirts' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
