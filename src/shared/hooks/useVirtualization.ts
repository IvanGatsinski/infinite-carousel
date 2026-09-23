import { useCallback, useState } from 'react'

type VirtualizationOptions<T> = {
  items: readonly T[]
  itemSize: number
  overscan?: number
}

const getCount = (viewportSize: number, itemSize: number, overscan: number) => {
  let count = overscan * 2 + 1

  for (let size = itemSize; size < viewportSize; size += itemSize) {
    count += 1
  }

  return count
}

export const useVirtualization = <T>({
  items,
  itemSize,
  overscan = 8,
}: VirtualizationOptions<T>) => {
  const [window, setWindow] = useState({ start: -overscan, count: overscan * 2 + 1 })

  const reset = useCallback(
    (viewportSize: number) =>
      setWindow({ start: -overscan, count: getCount(viewportSize, itemSize, overscan) }),
    [itemSize, overscan],
  )

  const resize = useCallback(
    (viewportSize: number) => {
      const count = getCount(viewportSize, itemSize, overscan)

      setWindow((current) => (current.count === count ? current : { ...current, count }))
    },
    [itemSize, overscan],
  )

  const move = useCallback((steps: number) => {
    setWindow((current) => ({ ...current, start: current.start + steps }))
  }, [])

  const virtualItems = []
  const count = items.length > 1 ? window.count : items.length

  for (let slot = 0; slot < count; slot += 1) {
    const position = items.length > 1 ? window.start + slot : 0
    let index = position % items.length

    if (index < 0) {
      index += items.length
    }

    virtualItems.push({ position, index, item: items[index] })
  }

  return { virtualItems, count, origin: overscan * itemSize, reset, resize, move }
}
