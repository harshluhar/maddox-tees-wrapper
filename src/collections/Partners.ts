import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Partners: CollectionConfig<'partners'> = {
  slug: 'partners',
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'website', 'active'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'website',
      type: 'text',
      admin: {
        description: 'Partner website URL',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'partnerType',
      type: 'select',
      options: [
        { label: 'Supplier', value: 'supplier' },
        { label: 'Distributor', value: 'distributor' },
        { label: 'Manufacturer', value: 'manufacturer' },
        { label: 'Technology', value: 'technology' },
        { label: 'Logistics', value: 'logistics' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Is this an active partnership?',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature this partner on the home page',
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
  ],
}
