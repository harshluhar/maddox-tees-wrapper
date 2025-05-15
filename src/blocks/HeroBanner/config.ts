import type { Block } from 'payload'

export const HeroBanner: Block = {
  slug: 'hero-banner',
  labels: {
    singular: 'Hero Banner',
    plural: 'Hero Banners',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'backgroundOverlay',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Add a dark overlay to the background image for better text visibility',
      },
    },
    {
      name: 'overlayOpacity',
      type: 'select',
      options: [
        { label: '10%', value: '0.1' },
        { label: '20%', value: '0.2' },
        { label: '30%', value: '0.3' },
        { label: '40%', value: '0.4' },
        { label: '50%', value: '0.5' },
        { label: '60%', value: '0.6' },
        { label: '70%', value: '0.7' },
        { label: '80%', value: '0.8' },
        { label: '90%', value: '0.9' },
      ],
      defaultValue: '0.5',
      admin: {
        condition: (data, siblingData) => siblingData?.backgroundOverlay,
      },
    },
    {
      name: 'textColor',
      type: 'select',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
      defaultValue: 'light',
    },
    {
      name: 'textAlignment',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'center',
    },
    {
      name: 'height',
      type: 'select',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Full Screen', value: 'full' },
      ],
      defaultValue: 'large',
    },
    {
      name: 'primaryCTA',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Shop Now',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        {
          name: 'style',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
          defaultValue: 'primary',
        },
        {
          name: 'size',
          type: 'select',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
          defaultValue: 'lg',
        },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Request Quote',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        {
          name: 'style',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
          defaultValue: 'outline',
        },
        {
          name: 'size',
          type: 'select',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
          defaultValue: 'lg',
        },
      ],
    },
  ],
}
