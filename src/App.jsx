import Navbar, { SearchResult } from './components/Navbar'
import CharacterList from './components/CharacterList'
import CharacterDetail from './components/CharacterDetail'
import { allCharacters } from '../data/data'
import { useState } from 'react'
import './App.css'

export default function App() {
	const [characters, setCharacters] = useState(allCharacters)
	return (
		<div className="app">
			<Navbar>
				<SearchResult numOfResult={characters.length} />
			</Navbar>
			<Main>
				<CharacterList allCharacters={allCharacters} />
				<CharacterDetail />
			</Main>
		</div>
	)
}

function Main({ children }) {
	return <div className="main">{children}</div>
}
