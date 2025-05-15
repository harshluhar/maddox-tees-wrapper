import type { Block } from 'payload'

export const PricingCalculatorBlock: Block = {
  slug: 'pricing-calculator-block',
  labels: {
    singular: 'Pricing Calculator Block',
    plural: 'Pricing Calculator Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Calculate Your Price',
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
      name: 'calculatorType',
      type: 'select',
      options: [
        { label: 'DTF Printing', value: 'dtf' },
        { label: 'Custom T-shirts', value: 'custom_tshirts' },
      ],
      required: true,
      defaultValue: 'dtf',
    },
    {
      name: 'dtfPricingTiers',
      type: 'array',
      label: 'DTF Pricing Tiers',
      minRows: 1,
      admin: {
        condition: (data, siblingData) => siblingData?.calculatorType === 'dtf',
      },
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
      name: 'tshirtPricingFactors',
      type: 'group',
      admin: {
        condition: (data, siblingData) => siblingData?.calculatorType === 'custom_tshirts',
      },
      fields: [
        {
          name: 'basePrice',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            description: 'Base price per t-shirt',
          },
        },
        {
          name: 'quantityDiscounts',
          type: 'array',
          fields: [
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
              required: true,
              min: 0,
              max: 100,
            },
          ],
        },
        {
          name: 'printingMethods',
          type: 'array',
          fields: [
            {
              name: 'method',
              type: 'text',
              required: true,
            },
            {
              name: 'additionalCost',
              type: 'number',
              required: true,
              min: 0,
            },
          ],
        },
        {
          name: 'colorOptions',
          type: 'array',
          fields: [
            {
              name: 'option',
              type: 'text',
              required: true,
            },
            {
              name: 'additionalCost',
              type: 'number',
              required: true,
              min: 0,
            },
          ],
        },
        {
          name: 'sizeOptions',
          type: 'array',
          fields: [
            {
              name: 'size',
              type: 'text',
              required: true,
            },
            {
              name: 'additionalCost',
              type: 'number',
              required: true,
              min: 0,
            },
          ],
        },
      ],
    },
    {
      name: 'showRequestQuoteButton',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'requestQuoteButtonLabel',
      type: 'text',
      defaultValue: 'Request Quote',
      admin: {
        condition: (data, siblingData) => siblingData?.showRequestQuoteButton,
      },
    },
    {
      name: 'requestQuoteButtonLink',
      type: 'text',
      defaultValue: '/contact',
      admin: {
        condition: (data, siblingData) => siblingData?.showRequestQuoteButton,
      },
    },
    {
      name: 'showAddToCartButton',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'addToCartButtonLabel',
      type: 'text',
      defaultValue: 'Add to Cart',
      admin: {
        condition: (data, siblingData) => siblingData?.showAddToCartButton,
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
