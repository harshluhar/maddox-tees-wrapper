import React from 'react'

// Define a proper type for the component props
type ProductSelectionBlockProps = {
  blockType: 'product-selection-block'
  heading?: string
  subheading?: string
  products?: Array<{
    id: string
    title: string
    description?: string
    price?: number
    salePrice?: number
    image?: {
      id: string
      url: string
      alt: string
    }
    category?: string
    tags?: string[]
    link?: string
    featured?: boolean
    inStock?: boolean
  }>
  layout?: 'grid' | 'carousel' | 'list'
  displayCount?: number
  showFilters?: boolean
  filterCategories?: string[]
  showPrices?: boolean
  showAddToCart?: boolean
  backgroundColor?: string
  textColor?: string
  padding?: string
  disableInnerContainer?: boolean
}

export const ProductSelectionBlock: React.FC<ProductSelectionBlockProps> = ({
  heading,
  subheading,
  products = [],
  layout = 'grid',
  showPrices = true,
  showAddToCart = true,
}) => {
  return (
    <div className="product-selection-block">
      <h2>{heading || 'Featured Products'}</h2>
      {subheading && <p className="subheading">{subheading}</p>}

      <div className={`products-${layout}`}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="product-card">
              {product.image && (
                <div className="product-image">
                  <img src={product.image.url} alt={product.image.alt || product.title} />
                </div>
              )}
              <div className="product-details">
                <h3>{product.title}</h3>
                {product.description && <p className="description">{product.description}</p>}

                {showPrices && (
                  <div className="product-price">
                    {product.salePrice ? (
                      <>
                        <span className="sale-price">₹{product.salePrice}</span>
                        <span className="original-price">₹{product.price}</span>
                      </>
                    ) : (
                      <span className="price">₹{product.price}</span>
                    )}
                  </div>
                )}

                {showAddToCart && <button className="add-to-cart-btn">Add to Cart</button>}
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  )
}
