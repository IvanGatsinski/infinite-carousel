import { useImages } from '@/features/image-feed/hooks/useImages'
import { InfiniteImageCarousel } from '@/features/image-carousel/components/InfiniteImageCarousel/InfiniteImageCarousel'

import styles from '@/features/image-feed/components/ImageFeed/ImageFeed.module.scss'

export const ImageFeed = () => {
  const { images, loading, error } = useImages()

  if (loading) {
    return <p className={styles.message}>Loading images…</p>
  }

  if (error) {
    return <div className={styles.message}>Could not load the images. Please reload the page.</div>
  }

  return <InfiniteImageCarousel images={images} />
}
