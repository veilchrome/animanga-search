import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchAnimeByQuery, setEmptyAnimeData } from "./animeSlicer";
import { getMangaByQuery, setEmptyMangaData } from "./animeSlicer";
import AnimeTable from "./components/AnimeTable";
import MangaTable from "./components/MangaTable";

const Container = styled.div`
	padding: 20px;
	margin: 100px;
	display: grid;
	align-items: center;
	justify-content: center;
`;

const Title = styled.h1`
	font-weight: 600;
	margin: 20px;
	transition: text-shadow 0.3s ease;
	&:hover {
		text-shadow: 0 0 10px #fff, 0 0 20px #00bcd4;
	}
`;

const SearchInput = styled.input`
	padding: 10px;
	width: 300px;
	font-size: 16px;
	border-radius: 5px;
`;

const TablesWrapper = styled.div`
	padding: 20px;
	display: flex;
	justify-content: space-around;
`;

const PaginationInfo = styled.div`
	margin-top: 20px;
	font-weight: bold;
`;

const Button = styled.button`
	padding: 10px;
	border-radius: 20px;
	background-color: #3652ad;
	color: #fff;
	margin-top: 10px;
	margin-right: 10px;
	width: 100px;
	heigth: 20px;
	border: 1px solid #1a1a1a;
	font-family: "Poppins", sans-serif;
	font-weight: 600;
	transition: background-color 0.4s ease;

	&:hover {
		background-color: #280274;
	}
`;

const App = () => {
	const [query, setQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage] = useState(5);
	const dispatch = useDispatch();
	const animeState = useSelector((state) => state.anime);
	const mangaState = useSelector((state) => state.manga);

	useEffect(() => {
		const delayDebounce = setTimeout(() => {
			if (query) {
				dispatch(fetchAnimeByQuery({ query, page: currentPage, perPage }));
				dispatch(getMangaByQuery({ query, page: currentPage, perPage }));
			} else {
				dispatch(setEmptyAnimeData());
				dispatch(setEmptyMangaData());
			}
		}, 2000);

		return () => clearTimeout(delayDebounce);
	}, [query, currentPage, dispatch, perPage]);

	const handleNextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<Container>
			<Title>Anime & Manga Search</Title>
			<SearchInput
				type="text"
				placeholder="Enter Anime or Manga Name"
				value={query}
				onChange={(event) => setQuery(event.target.value)}
			/>
			<TablesWrapper>
				<div>
					{animeState.status === "loading" && <p>Loading Anime...</p>}
					{animeState.status === "succeeded" && query.length > 0 && (
						<>
							<AnimeTable anime={animeState.data} />
							<PaginationInfo>Page: {currentPage}</PaginationInfo>
							<Button onClick={handlePrevPage} disabled={currentPage === 1}>
								Previous
							</Button>
							<Button onClick={handleNextPage}>Next</Button>
						</>
					)}
					{animeState.status === "failed" && <p>Error: {animeState.error}</p>}
				</div>
				<div>
					{mangaState.status === "loading" && <p>Loading Manga...</p>}
					{mangaState.status === "succeeded" && query.length > 0 && (
						<>
							<MangaTable manga={mangaState.data} />
							<PaginationInfo>Page: {currentPage}</PaginationInfo>
							<Button onClick={handlePrevPage} disabled={currentPage === 1}>
								Previous
							</Button>
							<Button onClick={handleNextPage}>Next</Button>
						</>
					)}
					{mangaState.status === "failed" && <p>Error: {mangaState.error}</p>}
				</div>
			</TablesWrapper>
		</Container>
	);
};

export default App;
