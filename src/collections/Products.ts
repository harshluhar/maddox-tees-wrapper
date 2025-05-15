import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../hooks/populatePublishedAt'
import { generatePreviewPath } from '../utilities/generatePreviewPath'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Products: CollectionConfig<'products'> = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    price: true,
    categories: true,
  },
  admin: {
    defaultColumns: ['title', 'price', 'categories', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'products',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'products',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'salePrice',
      type: 'number',
      min: 0,
      admin: {
        description: 'Sale price (if applicable)',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'product-categories',
      hasMany: true,
      admin: {
        description: 'Select the categories this product belongs to',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Product Images',
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
      ],
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'sizes',
      type: 'array',
      label: 'Available Sizes',
      minRows: 1,
      fields: [
        {
          name: 'size',
          type: 'select',
          options: [
            { label: 'XS', value: 'XS' },
            { label: 'S', value: 'S' },
            { label: 'M', value: 'M' },
            { label: 'L', value: 'L' },
            { label: 'XL', value: 'XL' },
            { label: 'XXL', value: 'XXL' },
            { label: 'XXXL', value: 'XXXL' },
          ],
          required: true,
        },
        {
          name: 'inventory',
          type: 'number',
          min: 0,
          required: true,
        },
      ],
    },
    {
      name: 'colors',
      type: 'array',
      label: 'Available Colors',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'colorCode',
          type: 'text',
          required: true,
          admin: {
            description: 'Hex color code (e.g., #FF0000)',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Image showing the product in this color',
          },
        },
      ],
    },
    {
      name: 'material',
      type: 'select',
      options: [
        { label: 'Cotton', value: 'cotton' },
        { label: 'Polyester', value: 'polyester' },
        { label: 'Poly-Cotton Blend', value: 'poly-cotton' },
        { label: 'Organic', value: 'organic' },
      ],
      required: true,
    },
    {
      name: 'brand',
      type: 'text',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature this product on the home page',
      },
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
      admin: {
        position: 'sidebar',
      },
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
