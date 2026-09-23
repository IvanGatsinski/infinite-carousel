import { useCarousel } from '@/features/image-carousel/hooks/useCarousel'
import type { InfiniteImageCarouselProps } from '@/features/image-carousel/types'
import { CarouselImageCard } from '@/features/image-carousel/components/CarouselImageCard/CarouselImageCard'

import styles from '@/features/image-carousel/components/InfiniteImageCarousel/InfiniteImageCarousel.module.scss'

export const InfiniteImageCarousel = ({ images }: InfiniteImageCarouselProps) => {
  const { viewportRef, cards } = useCarousel(images)

  if (images.length === 0) {
    return <div className={styles.empty}>No images to display.</div>
  }

  return (
    <div className={styles.carousel}>
      <div ref={viewportRef} className={styles.viewport}>
        <div className={styles.track}>
          {cards.map(({ position, image }) => (
            <CarouselImageCard key={`${position}:${image.id}`} image={image} />
          ))}
        </div>
      </div>
    </div>
  )
}
