import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function Navbar({ children }) {
	return (
		<nav className="navbar">
			<Logo />
			<Search />
			{children}
			<Favorites />
		</nav>
	)
}

function Logo() {
	return <div className="navbar__logo">LOGO 😍</div>
}

function Search() {
	return <input className="text-field" placeholder="search ..." />
}

export function SearchResult({ numOfResult }) {
	return (
		<div className="navbar__result">
			Found {numOfResult} characters
		</div>
	)
}

function Favorites() {
	return (
		<button className="heart">
			<HeartIcon className="icon" />
			<span className="badge">5</span>
		</button>
	)
}
