import { useState, useEffect } from 'react'

const useFetch = (url, method = 'GET') => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)

  const postData = (postedData) => {
    setOptions({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postedData),
    })
  }

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async (fetchOptions) => {
      setIsPending(true)
      try {
        const res = await fetch(url, {
          ...fetchOptions,
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

    if (method === 'GET') {
      fetchData()
    }

    if (method === 'POST' && options) {
      fetchData(options)
    }

    return () => {
      controller.abort()
    }
  }, [url, options])
  return {
    data,
    isPending,
    error,
    postData,
  }
}

export default useFetch
