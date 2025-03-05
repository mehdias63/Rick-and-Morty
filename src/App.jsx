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
import Modal from './components/Modal'
import useCharacters from './hooks/useCharacters'
import useLocalStorage from './hooks/useLocalStorage'

export default function App() {
	const [query, setQuery] = useState('')
	const { isLoading, characters } = useCharacters(query)
	const [selectedId, setSelectedId] = useState(null)
	const [favorites, setFavorites] = useLocalStorage('FAVORITES', [])

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

	const handleSelectCharacter = id => {
		setSelectedId(prevId => (prevId === id ? null : id))
	}

	const handleAddFavorite = char => {
		setFavorites(prevFav => [...prevFav, char])
	}
	const handleDeleteFavorite = id => {
		setFavorites(prevFav => prevFav.filter(fav => fav.id !== id))
	}

	const isAddToFavorite = favorites
		.map(fav => fav.id)
		.includes(selectedId)

	return (
		<div className="app">
			<Toaster />
			<Modal>This is test</Modal>
			<Navbar>
				<Search query={query} setQuery={setQuery} />
				<SearchResult numOfResult={characters.length} />
				<Favorites
					favorites={favorites}
					onDeleteFavorite={handleDeleteFavorite}
				/>
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
