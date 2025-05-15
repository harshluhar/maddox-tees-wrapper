'use client'

import React, { useState } from 'react'

// Define a proper type for the component props
type PricingCalculatorBlockProps = {
  blockType: 'pricing-calculator-block'
  heading?: string
  subheading?: string
  description?: string
  basePrice?: number
  quantityBreakpoints?: Array<{
    quantity: number
    discount: number // percentage
  }>
  printOptions?: Array<{
    id: string
    name: string
    priceModifier: number
  }>
  sizeOptions?: Array<{
    id: string
    name: string
    priceModifier: number
  }>
  colorOptions?: Array<{
    id: string
    name: string
    priceModifier: number
  }>
  materialOptions?: Array<{
    id: string
    name: string
    priceModifier: number
  }>
  additionalOptions?: Array<{
    id: string
    name: string
    priceModifier: number
    type: 'checkbox' | 'radio'
  }>
  showAddToCart?: boolean
  backgroundColor?: string
  textColor?: string
  padding?: string
  disableInnerContainer?: boolean
}

export const PricingCalculatorBlock: React.FC<PricingCalculatorBlockProps> = ({
  heading,
  subheading,
  description,
  basePrice = 100,
  quantityBreakpoints = [],
  printOptions = [],
  sizeOptions = [],
  colorOptions = [],
  materialOptions = [],
  additionalOptions = [],
  showAddToCart = true,
}) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedPrintOption] = useState('')
  const [selectedSizeOption] = useState('')
  const [selectedColorOption] = useState('')
  const [selectedMaterialOption] = useState('')
  const [selectedAdditionalOptions] = useState<string[]>([])

  // Calculate discount based on quantity
  const getQuantityDiscount = () => {
    if (quantityBreakpoints.length === 0) return 0

    // Sort breakpoints by quantity in descending order
    const sortedBreakpoints = [...quantityBreakpoints].sort((a, b) => b.quantity - a.quantity)

    // Find the first breakpoint that applies
    const applicableBreakpoint = sortedBreakpoints.find((bp) => quantity >= bp.quantity)

    return applicableBreakpoint ? applicableBreakpoint.discount : 0
  }

  // Calculate total price
  const calculatePrice = () => {
    let price = basePrice * quantity

    // Apply print option modifier
    if (selectedPrintOption) {
      const printOption = printOptions.find((option) => option.id === selectedPrintOption)
      if (printOption) {
        price += printOption.priceModifier * quantity
      }
    }

    // Apply size option modifier
    if (selectedSizeOption) {
      const sizeOption = sizeOptions.find((option) => option.id === selectedSizeOption)
      if (sizeOption) {
        price += sizeOption.priceModifier * quantity
      }
    }

    // Apply color option modifier
    if (selectedColorOption) {
      const colorOption = colorOptions.find((option) => option.id === selectedColorOption)
      if (colorOption) {
        price += colorOption.priceModifier * quantity
      }
    }

    // Apply material option modifier
    if (selectedMaterialOption) {
      const materialOption = materialOptions.find((option) => option.id === selectedMaterialOption)
      if (materialOption) {
        price += materialOption.priceModifier * quantity
      }
    }

    // Apply additional options modifiers
    selectedAdditionalOptions.forEach((optionId) => {
      const option = additionalOptions.find((opt) => opt.id === optionId)
      if (option) {
        price += option.priceModifier * quantity
      }
    })

    // Apply quantity discount
    const discount = getQuantityDiscount()
    if (discount > 0) {
      price = price * (1 - discount / 100)
    }

    return price.toFixed(2)
  }

  return (
    <div className="pricing-calculator-block">
      <h2>{heading || 'Pricing Calculator'}</h2>
      {subheading && <p className="subheading">{subheading}</p>}
      {description && <p className="description">{description}</p>}

      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          />
        </div>

        {/* Simplified UI for placeholder - would be expanded in real implementation */}
        <div className="price-display">
          <h3>Estimated Price: ₹{calculatePrice()}</h3>
          {showAddToCart && <button className="add-to-cart-btn">Add to Cart</button>}
        </div>
      </div>
    </div>
  )
}
