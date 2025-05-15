import type { Block } from 'payload/types'

export const RecentWorkBlock: Block = {
  slug: 'recent-work-block',
  labels: {
    singular: 'Recent Work Block',
    plural: 'Recent Work Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Recent Work',
    },
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'recent-work',
      hasMany: true,
      required: true,
      admin: {
        description: 'Select projects to display',
      },
    },
    {
      name: 'layout',
      type: 'select',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Masonry', value: 'masonry' },
        { label: 'Carousel', value: 'carousel' },
      ],
      defaultValue: 'grid',
    },
    {
      name: 'displayCount',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 12,
      admin: {
        description: 'Number of projects to display',
      },
    },
    {
      name: 'enableFiltering',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable category filtering',
      },
    },
    {
      name: 'categories',
      type: 'select',
      options: [
        { label: 'DTF Printing', value: 'dtf' },
        { label: 'Custom T-shirts', value: 'custom_tshirts' },
        { label: 'Corporate Uniforms', value: 'corporate_uniforms' },
        { label: 'Event Merchandise', value: 'event_merchandise' },
        { label: 'Promotional Products', value: 'promotional_products' },
        { label: 'Other', value: 'other' },
      ],
      hasMany: true,
      admin: {
        description: 'Categories to include in filters',
        condition: (data, siblingData) => siblingData?.enableFiltering,
      },
    },
    {
      name: 'showTitle',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show project title',
      },
    },
    {
      name: 'showClient',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show client name',
      },
    },
    {
      name: 'showCategory',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show project category',
      },
    },
    {
      name: 'enableLightbox',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable image lightbox on click',
      },
    },
    {
      name: 'linkToDetailPage',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Link to project detail page',
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
      name: 'viewAllButton',
      type: 'group',
      fields: [
        {
          name: 'show',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'label',
          type: 'text',
          defaultValue: 'View All Projects',
          admin: {
            condition: (data, siblingData) => siblingData?.show,
          },
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: '/projects',
          admin: {
            condition: (data, siblingData) => siblingData?.show,
          },
        },
      ],
    },
  ],
}
