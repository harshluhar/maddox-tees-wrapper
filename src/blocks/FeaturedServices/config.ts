import type { Block } from 'payload/types'

export const FeaturedServices: Block = {
  slug: 'featured-services',
  labels: {
    singular: 'Featured Services',
    plural: 'Featured Services',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Services',
    },
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'services',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        {
          name: 'linkLabel',
          type: 'text',
          defaultValue: 'Learn More',
        },
      ],
    },
    {
      name: 'autoRotate',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Auto-rotate carousel items',
      },
    },
    {
      name: 'rotationInterval',
      type: 'number',
      defaultValue: 5000,
      admin: {
        description: 'Rotation interval in milliseconds',
        condition: (data, siblingData) => siblingData?.autoRotate,
      },
    },
    {
      name: 'pauseOnHover',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Pause rotation on hover',
        condition: (data, siblingData) => siblingData?.autoRotate,
      },
    },
    {
      name: 'showDots',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show navigation dots',
      },
    },
    {
      name: 'showArrows',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show navigation arrows',
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
