import { useEffect, useState } from 'react'
import useTimeout from './useTimeout'

const useResizeObserver = (observeRef, throttle = 0) => {
  const [dimensions, setDimensions] = useState({ width: null, height: null })

  const { timeout } = useTimeout()

  const handleResize = (entry) => {
    timeout(() => {
      // Как выяснилось, сафари не поддерживает contentBoxSize
      // и карта в нем просто не открывается, поэтому проверки :)
      const contentBox = entry[0]?.contentBoxSize?.[0]

      if (contentBox && contentBox?.inlineSize && contentBox?.blockSize) {
        const { inlineSize: width, blockSize: height } = contentBox
        setDimensions({ width, height })
        return
      }

      const { width, height } = entry[0].contentRect
      setDimensions({ width, height })
    }, throttle)
  }

  const observer = new ResizeObserver(handleResize)

  useEffect(() => {
    if (observeRef.current) {
      observer.observe(observeRef.current)
    }

    return () => {
      if (observeRef.current) {
        observer.unobserve(observeRef.current)
      }
    }
  }, [observeRef.current])

  return dimensions
}

export default useResizeObserver
