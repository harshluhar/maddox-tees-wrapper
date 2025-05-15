import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../hooks/populatePublishedAt'
// Commented out as it's not used
// import { generatePreviewPath } from '../utilities/generatePreviewPath'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const DTFPrinting: CollectionConfig<'dtf-printing'> = {
  slug: 'dtf-printing',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'pricingTiers',
      type: 'array',
      label: 'Pricing Tiers',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'minLength',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            description: 'Minimum length in meters',
          },
        },
        {
          name: 'maxLength',
          type: 'number',
          min: 0,
          admin: {
            description: 'Maximum length in meters (leave empty for unlimited)',
          },
        },
        {
          name: 'pricePerUnit',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            description: 'Price per unit in INR',
          },
        },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Sample Images Gallery',
      minRows: 1,
      maxRows: 20,
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
      name: 'faqs',
      type: 'array',
      label: 'Frequently Asked Questions',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
        },
      ],
    },
    {
      name: 'technicalSpecs',
      type: 'array',
      label: 'Technical Specifications',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'paymentTerms',
      type: 'select',
      options: [
        { label: '100% Upfront', value: 'full_upfront' },
        { label: '50% Advance, 50% on Delivery', value: 'split_payment' },
      ],
      defaultValue: 'full_upfront',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
