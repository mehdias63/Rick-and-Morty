import Navbar, { Search, SearchResult } from './components/Navbar'
import CharacterList from './components/CharacterList'
import CharacterDetail from './components/CharacterDetail'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
	const [characters, setCharacters] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [query, setQuery] = useState('')
	const [selectedId, setSelectedId] = useState(null)

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
					`https://rickandmortyapi.com/api/character/?name=${query}`,
				)
				setCharacters(data.results.slice(0, 6))
			} catch (err) {
				setCharacters([])
				toast.error(err.response.data.error)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [query])

	const handleSelectCharacter = id => {
		setSelectedId(id)
	}

	return (
		<div className="app">
			<Toaster />
			<Navbar>
				<Search query={query} setQuery={setQuery} />
				<SearchResult numOfResult={characters.length} />
			</Navbar>
			<Main>
				<CharacterList
					characters={characters}
					isLoading={isLoading}
					onSelectCharacter={handleSelectCharacter}
				/>
				<CharacterDetail selectedId={selectedId} />
			</Main>
		</div>
	)
}

function Main({ children }) {
	return <div className="main">{children}</div>
}
