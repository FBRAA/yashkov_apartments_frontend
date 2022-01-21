/* eslint-disable arrow-body-style */
import { useRef } from 'react'

const useTimeout = () => {
  const timeoutId = useRef()

  const timeout = (callback, delay) => {
    clearTimeout(timeoutId.current)

    timeoutId.current = setTimeout(() => {
      callback()
    }, delay);
  }

  const clear = () => {
    clearTimeout(timeoutId.current)
  }

  return { timeout, clear }
}

export default useTimeout
