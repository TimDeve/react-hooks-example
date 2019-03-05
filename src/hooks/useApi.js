import React, { useState, useEffect } from 'react'

export default function useApi(url) {
	const [data, setData] = useState()
	const [isLoading, setIsLoading] = useState()
	const [error, setError] = useState()

	useEffect(() => {
		console.log('Fetching: ' + url)

		setIsLoading(true)
		setError(false)

		fetch(url)
			.then(res => {
				if (!res.ok) setError(true)
				return res.json()
			})
			.then(json => {
				setData(json)
				setIsLoading(false)
			})
			.catch(() => {
				setError(true)
				setIsLoading(false)
			})
	}, [url])

	return [data, isLoading, error]
}
