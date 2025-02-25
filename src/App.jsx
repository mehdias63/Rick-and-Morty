import Navbar, { SearchResult } from './components/Navbar'
import CharacterList from './components/CharacterList'
import CharacterDetail from './components/CharacterDetail'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
	const [characters, setCharacters] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	// useEffect(() => {
	// async function fetchData() {
	// try {
	// setIsLoading(true)
	// const res = await fetch(
	// 'https://rickandmortyapi.com/api/character',
	// )
	// if (!res.ok) throw new Error('Something is Wrong')
	// for Real project => err.response.data.message

	// const data = await res.json()
	// setCharacters(data.results.slice(0, 6))
	// } catch (err) {
	// console.log(err.message)
	// toast.error(err.message)
	// } finally {
	// setIsLoading(false)
	// }
	// }
	// fetchData()
	// }, [])

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true)
				const { data } = await axios.get(
					'https://rickandmortyapi.com/api/character',
				)
				setCharacters(data.results.slice(0, 6))
			} catch (err) {
				toast.error(err.response.data.error)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])

	return (
		<div className="app">
			<Toaster />
			<Navbar>
				<SearchResult numOfResult={characters.length} />
			</Navbar>
			<Main>
				<CharacterList
					characters={characters}
					isLoading={isLoading}
				/>
				<CharacterDetail />
			</Main>
		</div>
	)
}

function Main({ children }) {
	return <div className="main">{children}</div>
}
