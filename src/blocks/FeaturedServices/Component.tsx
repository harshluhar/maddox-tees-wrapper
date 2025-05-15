import React from 'react'

// Define a proper type for the component props
type FeaturedServicesProps = {
  blockType: 'featured-services'
  heading?: string
  subheading?: string
  services?: Array<{
    title: string
    description: string
    image?: {
      id: string
      url: string
      alt: string
    }
    link?: string
    linkLabel?: string
  }>
  autoRotate?: boolean
  rotationInterval?: number
  pauseOnHover?: boolean
  showDots?: boolean
  showArrows?: boolean
  backgroundColor?: string
  textColor?: string
  padding?: string
  disableInnerContainer?: boolean
}

export const FeaturedServicesBlock: React.FC<FeaturedServicesProps> = ({
  heading,
  subheading,
  services = [],
}) => {
  return (
    <div className="featured-services">
      <h2>{heading || 'Featured Services'}</h2>
      {subheading && <p className="subheading">{subheading}</p>}

      <div className="services-grid">
        {services.length > 0 ? (
          services.map((service, index) => (
            <div key={index} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {service.link && (
                <a href={service.link} className="service-link">
                  {service.linkLabel || 'Learn More'}
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No services available</p>
        )}
      </div>
    </div>
  )
}
