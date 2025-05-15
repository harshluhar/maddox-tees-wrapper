import React from 'react'

// Define a proper type for the component props
type PartnerLogosBlockProps = {
  blockType: 'partner-logos-block'
  heading?: string
  subheading?: string
  partners?: Array<{
    id: string
    name: string
    logo: {
      id: string
      url: string
      alt: string
    }
    website?: string
  }>
  layout?: 'grid' | 'carousel' | 'list'
  logoSize?: 'small' | 'medium' | 'large'
  grayscale?: boolean
  colorOnHover?: boolean
  backgroundColor?: string
  padding?: string
  autoRotate?: boolean
  rotationInterval?: number
  pauseOnHover?: boolean
  showDots?: boolean
  showArrows?: boolean
  disableInnerContainer?: boolean
}

export const PartnerLogosBlock: React.FC<PartnerLogosBlockProps> = ({
  heading,
  subheading,
  partners = [],
  logoSize = 'medium',
  grayscale = false,
}) => {
  return (
    <div className="partner-logos-block">
      {heading && <h2>{heading}</h2>}
      {subheading && <p className="subheading">{subheading}</p>}

      <div className={`partners-grid logo-size-${logoSize} ${grayscale ? 'grayscale' : ''}`}>
        {partners.length > 0 ? (
          partners.map((partner, index) => (
            <div key={index} className="partner-logo">
              {partner.website ? (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={partner.name}
                >
                  <img src={partner.logo.url} alt={partner.logo.alt || partner.name} />
                </a>
              ) : (
                <img src={partner.logo.url} alt={partner.logo.alt || partner.name} />
              )}
            </div>
          ))
        ) : (
          <p>No partner logos available</p>
        )}
      </div>
    </div>
  )
}
