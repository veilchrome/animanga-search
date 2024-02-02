import MangaRow from "./MangaRow";

const MangaTable = ({ manga }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Manga Images</th>
					<th>Manga Title</th>
					<th>Total Chapters</th>
					<th>Total Volumes</th>
				</tr>
			</thead>
			<tbody>
				{manga.slice(0, 5).map((mangaItem) => (
					<MangaRow
						key={mangaItem.mal_id}
						image={mangaItem.images.jpg.image_url}
						title={mangaItem.title}
						chapters={mangaItem.chapters}
						volumes={mangaItem.volumes}
					/>
				))}
			</tbody>
		</table>
	);
};

export default MangaTable;
