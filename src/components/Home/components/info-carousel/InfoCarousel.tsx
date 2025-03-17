import type { FC } from 'react'

import Image from 'next/image'

import { carouselData } from '../../data'

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'

const InfoCarousel: FC = () => {
  const [emblaRef] = useEmblaCarousel({ breakpoints: {} }, [
    Autoplay({ stopOnMouseEnter: true, stopOnInteraction: false }),
  ])

  // TODO: analyze if can be refactored to a compound component (Carousel, Slide, etc)
  return (
    <div className="embla mb-11" ref={emblaRef}>
      <div className="embla__container">
        {carouselData.map((slide) => (
          <div
            key={slide.title}
            className="embla__slide bg-carousel-background grid min-h-72 w-full place-content-center place-items-center space-y-6 rounded-2xl bg-cover bg-center bg-no-repeat p-4"
          >
            <h3 className="text-center text-3xl">{slide.title}</h3>
            {slide.description && <p className="max-w-[800px] text-center">{slide.description}</p>}
            {slide.link && (
              <a
                href={slide.link}
                target="_blank"
                rel="noopener"
                className="flex w-fit items-center justify-center gap-2 text-[#C1EA60]"
              >
                Learn more
                <Image
                  src="/icons/external_arrow.svg"
                  alt="external link"
                  width={12}
                  height={12}
                  className="!fill-[#C1EA60] !stroke-[#C1EA60]"
                />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfoCarousel
