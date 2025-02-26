import Navbar, {
	Search,
	SearchResult,
	Favorites,
} from './components/Navbar'
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
	const [favorites, setFavorites] = useState([])

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

	const handleSelectCharacter = id => {
		setSelectedId(prevId => (prevId === id ? null : id))
	}

	const handleAddFavorite = char => {
		setFavorites(prevFav => [...prevFav, char])
	}

	const isAddToFavorite = favorites
		.map(fav => fav.id)
		.includes(selectedId)

	return (
		<div className="app">
			<Toaster />
			<Navbar>
				<Search query={query} setQuery={setQuery} />
				<SearchResult numOfResult={characters.length} />
				<Favorites numOfFavorites={favorites.length} />
			</Navbar>
			<Main>
				<CharacterList
					characters={characters}
					isLoading={isLoading}
					onSelectCharacter={handleSelectCharacter}
					selectedId={selectedId}
				/>
				<CharacterDetail
					selectedId={selectedId}
					onAddFavorite={handleAddFavorite}
					isAddToFavorite={isAddToFavorite}
				/>
			</Main>
		</div>
	)
}

function Main({ children }) {
	return <div className="main">{children}</div>
}
