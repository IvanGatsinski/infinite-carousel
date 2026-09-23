import { useEffect, useState } from 'react'

import { fetchImages } from '@/features/image-feed/api/fetchImages'
import type { CarouselImage } from '@/shared/types/image'

export const useImages = () => {
  const [images, setImages] = useState<CarouselImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    const loadImages = async () => {
      try {
        const result = await fetchImages()

        if (active) {
          setImages(result)
        }
      } catch {
        if (active) {
          setError(true)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadImages()

    return () => {
      active = false
    }
  }, [])

  return { images, loading, error }
}
