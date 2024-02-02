const MangaRow = ({ image, title, chapters, volumes }) => {
	// Test console.log("Title Manga: ", title);
	return (
		<tr>
			<td>
				<img src={image} alt={title} />
			</td>
			<td> {title} </td>
			<td> {chapters} </td>
			<td> {volumes} </td>
		</tr>
	);
};

export default MangaRow;
