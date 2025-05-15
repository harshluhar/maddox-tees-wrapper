import type { Block } from 'payload/types'

export const ProductSelectionBlock: Block = {
  slug: 'product-selection-block',
  labels: {
    singular: 'Product Selection Block',
    plural: 'Product Selection Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Customize Your Order',
    },
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'productTypes',
      type: 'array',
      label: 'Product Types',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'products',
          type: 'relationship',
          relationTo: 'products',
          hasMany: true,
          required: true,
        },
      ],
    },
    {
      name: 'customizationOptions',
      type: 'array',
      label: 'Customization Options',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Printing Method', value: 'printing_method' },
            { label: 'Colors', value: 'colors' },
            { label: 'Sizes', value: 'sizes' },
            { label: 'Other', value: 'other' },
          ],
          required: true,
        },
        {
          name: 'options',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'additionalPrice',
              type: 'number',
              min: 0,
              defaultValue: 0,
            },
          ],
        },
      ],
    },
    {
      name: 'quantityAndDelivery',
      type: 'group',
      fields: [
        {
          name: 'quantityRanges',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'minQuantity',
              type: 'number',
              required: true,
              min: 1,
            },
            {
              name: 'maxQuantity',
              type: 'number',
              min: 1,
            },
            {
              name: 'discountPercentage',
              type: 'number',
              min: 0,
              max: 100,
              defaultValue: 0,
            },
          ],
        },
        {
          name: 'deliveryOptions',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
            },
            {
              name: 'estimatedDays',
              type: 'number',
              min: 1,
              required: true,
            },
            {
              name: 'price',
              type: 'number',
              min: 0,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'showProductPreview',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show fixed-position product preview box',
      },
    },
    {
      name: 'previewBoxPosition',
      type: 'select',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
      defaultValue: 'right',
      admin: {
        condition: (data, siblingData) => siblingData?.showProductPreview,
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Transparent', value: 'transparent' },
      ],
      defaultValue: 'light',
    },
    {
      name: 'textColor',
      type: 'select',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
      defaultValue: 'dark',
      admin: {
        condition: (data, siblingData) => siblingData?.backgroundColor !== 'transparent',
      },
    },
    {
      name: 'padding',
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
      defaultValue: 'medium',
    },
  ],
}
