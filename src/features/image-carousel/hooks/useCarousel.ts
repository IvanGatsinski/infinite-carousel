import { useLayoutEffect, useRef } from 'react'
import { flushSync } from 'react-dom'

import type { CarouselImage } from '@/shared/types/image'
import { useVirtualization } from '@/shared/hooks/useVirtualization'

const cardStep = 260
const updateDistance = cardStep * 4

export const useCarousel = (images: readonly CarouselImage[]) => {
  const viewportRef = useRef<HTMLDivElement>(null)
  const { virtualItems, count, origin, reset, resize, move } = useVirtualization({
    items: images,
    itemSize: cardStep,
    overscan: 8,
  })
  const scrollPosition = useRef(origin)

  useLayoutEffect(() => {
    const viewport = viewportRef.current

    scrollPosition.current = images.length > 1 ? origin : 0

    if (!viewport || images.length < 2) {
      return
    }

    reset(viewport.clientWidth)

    const handleScroll = () => {
      let offset = viewport.scrollLeft - origin
      let steps = 0

      scrollPosition.current = viewport.scrollLeft

      if (offset > -updateDistance && offset < updateDistance) {
        return
      }

      while (offset >= cardStep) {
        offset -= cardStep
        steps += 1
      }

      while (offset < 0) {
        offset += cardStep
        steps -= 1
      }

      if (steps === 0) {
        return
      }

      flushSync(() => {
        move(steps)
      })
      viewport.scrollLeft = origin + offset
      scrollPosition.current = viewport.scrollLeft
    }

    const observer = new ResizeObserver(() => {
      resize(viewport.clientWidth)
    })

    observer.observe(viewport)
    viewport.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      viewport.removeEventListener('scroll', handleScroll)
    }
  }, [images, origin, reset, resize, move])

  useLayoutEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollLeft = scrollPosition.current
    }
  }, [images, count, origin])

  const cards = virtualItems.map(({ position, item }) => ({ position, image: item }))

  return { viewportRef, cards }
}
