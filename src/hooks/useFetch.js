import { useState, useEffect } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      setIsPending(true)
      try {
        const res = await fetch(url, {
          signal: controller.signal,
        })
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        const response = await res.json()
        setIsPending(false)
        setData(response)
        setError(null)
      } catch (err) {
        if (err.name === 'AbortError') {
          // eslint-disable-next-line
          console.log('The fetch was aborted')
        } else {
          setIsPending(false)
          // eslint-disable-next-line
          setError('Could not fetch the data')
        }
      }
    }
    fetchData()
    return () => {
      controller.abort()
    }
  }, [url])
  return {
    data,
    isPending,
    error,
  }
}

export default useFetch
