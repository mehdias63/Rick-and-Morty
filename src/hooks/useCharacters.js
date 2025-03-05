import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useCharacters(query) {
	const [characters, setCharacters] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal
		async function fetchData() {
			try {
				setIsLoading(true)
				const { data } = await axios.get(
					`https://rickandmortyapi.com/api/character/?name=${query}`,
					{ signal },
				)
				setCharacters(data.results.slice(0, 6))
			} catch (err) {
				if (!axios.isCancel()) {
					setCharacters([])
					toast.error(err.response.data.error)
				}
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
		return () => {
			controller.abort()
		}
	}, [query])

	return { isLoading, characters }
}
