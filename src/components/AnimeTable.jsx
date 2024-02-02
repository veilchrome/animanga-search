import AnimeRow from "./AnimeRow";

const AnimeTable = ({ anime }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Anime Images</th>
					<th>Anime Title</th>
					<th>Rating</th>
					<th>Score</th>
				</tr>
			</thead>
			<tbody>
				{anime.slice(0, 5).map((animeItem) => (
					<AnimeRow
						key={animeItem.mal_id}
						image={animeItem.images.jpg.image_url} // Corrected image URL access
						title={animeItem.title}
						rating={animeItem.rating} // Corrected rating access
						score={animeItem.score} // Corrected score access
					/>
				))}
			</tbody>
		</table>
	);
};

export default AnimeTable;
