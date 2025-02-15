import { character } from '../../data/data'
import { episodes } from '../../data/data'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'

function CharacterDetail() {
	return (
		<div style={{ flex: 1 }}>
			<div className="character-detail">
				<img
					src={character.image}
					alt={character.name}
					className="character-detail__img"
				/>
				<div className="character-detail__info">
					<h3 className="name">
						<span>{character.gender === 'Male' ? '👱🏻‍♂️' : '👩🏻‍🦳'} </span>
						<span>{character.name}</span>
					</h3>
					<div className="info">
						<span
							className={`status ${
								character.status === 'Dead' ? 'red' : ''
							}`}
						></span>
						<span> {character.status}</span>
						<span> - {character.species}</span>
					</div>
					<div className="location">
						<p>Last known location:</p>
						<p>{character.location.name}</p>
					</div>
					<div className="actions">
						<button className="btn btn--primary">
							Add To Favorite
						</button>
					</div>
				</div>
			</div>
			<div className="character-episodes">
				<div className="title">
					<h2>List of Episodes:</h2>
					<button>
						<ArrowUpCircleIcon className="icon" />
					</button>
				</div>
				<ul>
					{episodes.map((item, index) => (
						<li key={item.id}>
							<div>
								{String(index + 1).padStart(2, '0')} {item.episode}
								<strong>{item.name}</strong>
							</div>
							<div className="badge badge--secondary">
								{item.air_date}
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default CharacterDetail
