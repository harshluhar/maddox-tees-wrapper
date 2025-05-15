import type { Block } from 'payload/types'

export const TestimonialsBlock: Block = {
  slug: 'testimonials-block',
  labels: {
    singular: 'Testimonials Block',
    plural: 'Testimonials Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'What Our Customers Say',
    },
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      required: true,
      admin: {
        description: 'Select testimonials to display',
      },
    },
    {
      name: 'layout',
      type: 'select',
      options: [
        { label: 'Carousel', value: 'carousel' },
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
      ],
      defaultValue: 'carousel',
    },
    {
      name: 'displayCount',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 10,
      admin: {
        description: 'Number of testimonials to display',
      },
    },
    {
      name: 'showRating',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show star ratings',
      },
    },
    {
      name: 'showCompanyLogo',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show company logos',
      },
    },
    {
      name: 'showCustomerPhoto',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show customer photos',
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
      defaultValue: 5000,
      admin: {
        description: 'Rotation interval in milliseconds',
        condition: (data, siblingData) => siblingData?.layout === 'carousel' && siblingData?.autoRotate,
      },
    },
    {
      name: 'pauseOnHover',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Pause rotation on hover',
        condition: (data, siblingData) => siblingData?.layout === 'carousel' && siblingData?.autoRotate,
      },
    },
    {
      name: 'showDots',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show navigation dots',
        condition: (data, siblingData) => siblingData?.layout === 'carousel',
      },
    },
    {
      name: 'showArrows',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show navigation arrows',
        condition: (data, siblingData) => siblingData?.layout === 'carousel',
      },
    },
  ],
}
