import React from 'react'

// Define a proper type for the component props
type HeroBannerProps = {
  blockType: 'hero-banner'
  title?: string
  subtitle?: string
  content?: Record<string, unknown>
  backgroundImage?: {
    id: string
    url: string
    alt: string
  }
  primaryCTA?: {
    label: string
    link: string
    style: string
    size: string
  }
  secondaryCTA?: {
    label: string
    link: string
    style: string
    size: string
  }
  disableInnerContainer?: boolean
}

export const HeroBannerBlock: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
}) => {
  return (
    <div className="hero-banner">
      <h2>{title || 'Hero Banner (Placeholder)'}</h2>
      {subtitle && <p>{subtitle}</p>}
      {(primaryCTA || secondaryCTA) && (
        <div className="cta-buttons">
          {primaryCTA && (
            <button className={`btn btn-${primaryCTA.style} btn-${primaryCTA.size}`}>
              {primaryCTA.label}
            </button>
          )}
          {secondaryCTA && (
            <button className={`btn btn-${secondaryCTA.style} btn-${secondaryCTA.size}`}>
              {secondaryCTA.label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
