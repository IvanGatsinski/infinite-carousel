import { httpClient } from '@/core/api/httpClient'
import type { CarouselImage } from '@/shared/types/image'

type PicsumImage = {
  id: string
  author: string
  width: number
  height: number
}

const imageLimit = 100

export const fetchImages = async (): Promise<CarouselImage[]> => {
  const images = await httpClient.get<PicsumImage[]>(
    `https://picsum.photos/v2/list?page=1&limit=${imageLimit}`,
  )

  return images.map((image, index) => {
    const width = 480
    const height = Math.round((image.height / image.width) * width)

    return {
      id: image.id,
      alt: `${index + 1} Photo by ${image.author}`,
      src: `https://picsum.photos/id/${image.id}/${width}/${height}`,
      width: image.width,
      height: image.height,
    }
  })
}
