import React from 'react'

// Define a proper type for the component props
type TestimonialsBlockProps = {
  blockType: 'testimonials-block'
  heading?: string
  subheading?: string
  testimonials?: Array<{
    id: string
    customerName?: string
    companyName?: string
    position?: string
    testimonial?: string
    rating?: number
    companyLogo?: {
      id: string
      url: string
      alt: string
    }
    customerPhoto?: {
      id: string
      url: string
      alt: string
    }
  }>
  layout?: 'carousel' | 'grid' | 'list'
  displayCount?: number
  showRating?: boolean
  showCompanyLogo?: boolean
  showCustomerPhoto?: boolean
  backgroundColor?: string
  textColor?: string
  padding?: string
  autoRotate?: boolean
  rotationInterval?: number
  pauseOnHover?: boolean
  showDots?: boolean
  showArrows?: boolean
  disableInnerContainer?: boolean
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  heading,
  subheading,
  testimonials = [],
  showRating = true,
}) => {
  return (
    <div className="testimonials-block">
      <h2>{heading || 'What Our Customers Say'}</h2>
      {subheading && <p className="subheading">{subheading}</p>}

      <div className="testimonials-grid">
        {testimonials.length > 0 ? (
          testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              {showRating && testimonial.rating && (
                <div className="rating">
                  {'★'.repeat(testimonial.rating)}
                  {'☆'.repeat(5 - testimonial.rating)}
                </div>
              )}
              <blockquote>{testimonial.testimonial}</blockquote>
              <div className="testimonial-author">
                <p className="name">{testimonial.customerName}</p>
                {testimonial.position && testimonial.companyName && (
                  <p className="position">
                    {testimonial.position}, {testimonial.companyName}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No testimonials available</p>
        )}
      </div>
    </div>
  )
}
