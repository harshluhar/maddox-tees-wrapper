import React from 'react'

// Define a proper type for the component props
type RecentWorkBlockProps = {
  blockType: 'recent-work-block'
  heading?: string
  subheading?: string
  projects?: Array<{
    id: string
    title: string
    description?: string
    client?: string
    category?: string
    date?: string
    image?: {
      id: string
      url: string
      alt: string
    }
    link?: string
    linkLabel?: string
  }>
  layout?: 'grid' | 'carousel' | 'masonry'
  displayCount?: number
  showFilters?: boolean
  filterCategories?: string[]
  backgroundColor?: string
  textColor?: string
  padding?: string
  disableInnerContainer?: boolean
}

export const RecentWorkBlock: React.FC<RecentWorkBlockProps> = ({
  heading,
  subheading,
  projects = [],
  layout = 'grid',
}) => {
  return (
    <div className="recent-work-block">
      <h2>{heading || 'Our Recent Work'}</h2>
      {subheading && <p className="subheading">{subheading}</p>}

      <div className={`projects-${layout}`}>
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={index} className="project-card">
              {project.image && (
                <div className="project-image">
                  <img src={project.image.url} alt={project.image.alt || project.title} />
                </div>
              )}
              <div className="project-details">
                <h3>{project.title}</h3>
                {project.client && <p className="client">Client: {project.client}</p>}
                {project.category && <p className="category">{project.category}</p>}
                {project.description && <p className="description">{project.description}</p>}
                {project.link && (
                  <a href={project.link} className="project-link">
                    {project.linkLabel || 'View Project'}
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No projects available</p>
        )}
      </div>
    </div>
  )
}
