import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FeaturedServicesBlock } from '@/blocks/FeaturedServices/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HeroBannerBlock } from '@/blocks/HeroBanner/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PartnerLogosBlock } from '@/blocks/PartnerLogosBlock/Component'
import { PricingCalculatorBlock } from '@/blocks/PricingCalculatorBlock/Component'
import { ProductSelectionBlock } from '@/blocks/ProductSelectionBlock/Component'
import { RecentWorkBlock } from '@/blocks/RecentWorkBlock/Component'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  'hero-banner': HeroBannerBlock,
  'featured-services': FeaturedServicesBlock,
  'testimonials-block': TestimonialsBlock,
  'recent-work-block': RecentWorkBlock,
  'partner-logos-block': PartnerLogosBlock,
  'product-selection-block': ProductSelectionBlock,
  'pricing-calculator-block': PricingCalculatorBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
