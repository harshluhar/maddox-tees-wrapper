import type { Block } from 'payload'

export const PartnerLogosBlock: Block = {
  slug: 'partner-logos-block',
  labels: {
    singular: 'Partner Logos Block',
    plural: 'Partner Logos Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Partners',
    },
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'partners',
      type: 'relationship',
      relationTo: 'partners',
      hasMany: true,
      required: true,
      admin: {
        description: 'Select partners to display',
      },
    },
    {
      name: 'layout',
      type: 'select',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
      defaultValue: 'grid',
    },
    {
      name: 'columns',
      type: 'select',
      options: [
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
        { label: '5 Columns', value: '5' },
        { label: '6 Columns', value: '6' },
      ],
      defaultValue: '5',
      admin: {
        condition: (data, siblingData) => siblingData?.layout === 'grid',
      },
    },
    {
      name: 'displayCount',
      type: 'number',
      defaultValue: 10,
      min: 1,
      max: 20,
      admin: {
        description: 'Number of partners to display',
      },
    },
    {
      name: 'enableHoverAnimation',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable hover animation (subtle scale transform)',
      },
    },
    {
      name: 'grayscale',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Display logos in grayscale',
      },
    },
    {
      name: 'colorOnHover',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show color on hover',
        condition: (data, siblingData) => siblingData?.grayscale,
      },
    },
    {
      name: 'linkToPartnerWebsite',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Link logos to partner websites',
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
    {
      name: 'autoRotate',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Auto-rotate carousel items',
        condition: (data, siblingData) => siblingData?.layout === 'carousel',
      },
    },
    {
      name: 'rotationInterval',
      type: 'number',
      defaultValue: 3000,
      admin: {
        description: 'Rotation interval in milliseconds',
        condition: (data, siblingData) =>
          siblingData?.layout === 'carousel' && siblingData?.autoRotate,
      },
    },
    {
      name: 'pauseOnHover',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Pause rotation on hover',
        condition: (data, siblingData) =>
          siblingData?.layout === 'carousel' && siblingData?.autoRotate,
      },
    },
    {
      name: 'showDots',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show navigation dots',
        condition: (data, siblingData) => siblingData?.layout === 'carousel',
      },
    },
    {
      name: 'showArrows',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show navigation arrows',
        condition: (data, siblingData) => siblingData?.layout === 'carousel',
      },
    },
  ],
}
