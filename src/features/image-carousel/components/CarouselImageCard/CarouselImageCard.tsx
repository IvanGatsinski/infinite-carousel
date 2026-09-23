import { memo, useState } from 'react'

import type { CarouselImage } from '@/shared/types/image'
import { ImageSkeleton } from '@/shared/components/ImageSkeleton/ImageSkeleton'

import styles from '@/features/image-carousel/components/CarouselImageCard/CarouselImageCard.module.scss'

type Props = {
  image: CarouselImage
}

export const CarouselImageCard = memo(({ image }: Props) => {
  const [result, setResult] = useState({ source: '', failed: false })
  const loading = result.source !== image.src
  const failed = !loading && result.failed

  const handleLoad = () => setResult({ source: image.src, failed: false })
  const handleError = () => setResult({ source: image.src, failed: true })

  return (
    <div className={styles.card}>
      <div className={styles.media}>
        {loading && <ImageSkeleton />}
        {failed && <div className={styles.error}>Image unavailable</div>}

        <img
          className={loading || failed ? styles.imagePending : styles.image}
          src={image.src}
          alt={image.alt}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>

      <div className={styles.caption}>{image.alt}</div>
    </div>
  )
})
