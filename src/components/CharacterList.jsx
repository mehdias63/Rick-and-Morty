import { EyeIcon } from '@heroicons/react/24/outline'

function CharacterList({ allCharacters }) {
	return (
		<div className="characters-list">
			{allCharacters.map(item => (
				<Character key={item.id} item={item} />
			))}
		</div>
	)
}

export default CharacterList

function Character({ item }) {
	return (
		<div className="list__item">
			<img src={item.image} alt={item.name} />
			<CharactersName item={item} />
			<CharactersInfo item={item} />
			<button className="icon red">
				<EyeIcon />
			</button>
		</div>
	)
}

function CharactersName({ item }) {
	return (
		<h3 className="name">
			<span>{item.gender === 'Male' ? '👱🏻‍♂️' : '👩🏻‍🦳'} </span>
			<span>{item.name}</span>
		</h3>
	)
}
function CharactersInfo({ item }) {
	return (
		<div className="list-item__info info">
			<span
				className={`status ${item.status === 'Dead' ? 'red' : ''}`}
			></span>
			<span> {item.status}</span>
			<span> - {item.species}</span>
		</div>
	)
}
