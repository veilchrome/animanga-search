import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import animeAPI from "./api";

//https://stackoverflow.com/questions/47326101/reactjs-redux-and-pagination
//https://medium.com/spotlight-on-javascript/working-with-paginated-api-in-redux-be871818e444

export const fetchAnimeByQuery = createAsyncThunk(
	"anime/fetchAnimeByQuery",
	async ({ query, page, perPage }) => {
		const { data } = await animeAPI.get("/anime", {
			params: {
				q: query,
				page,
				per_page: perPage,
			},
		});
		return {
			data: data.data,
			currentPage: page,
			totalPage: Math.ceil(data.total / perPage),
		};
	}
);

const animeSlice = createSlice({
	name: "anime",
	initialState: {
		data: [],
		status: "idle",
		error: null,
		currentPage: 1,
		perPage: 5,
		totalPage: 0,
	},
	reducers: {
		setEmptyAnimeData: (state) => {
			state.data = [];
			state.status = "idle";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAnimeByQuery.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchAnimeByQuery.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload.data;
				state.currentPage = action.payload.currentPage;
				state.totalPage = action.payload.totalPage;
			})
			.addCase(fetchAnimeByQuery.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			});
	},
});

export const getMangaByQuery = createAsyncThunk(
	"manga/getMangaByQuery",
	async ({ query, page, perPage }) => {
		const { data } = await animeAPI.get("/manga", {
			params: {
				q: query,
				page,
				per_page: perPage,
			},
		});
		return {
			data: data.data,
			currentPage: page,
			totalPage: Math.ceil(data.total / perPage),
		};
	}
);

const mangaSlice = createSlice({
	name: "manga",
	initialState: {
		data: [],
		status: "idle",
		error: null,
		currentPage: 1,
		perPage: 5,
		totalPage: 0,
	},
	reducers: {
		setEmptyMangaData: (state) => {
			state.data = [];
			state.status = "idle";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMangaByQuery.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getMangaByQuery.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload.data;
				state.currentPage = action.payload.currentPage;
				state.totalPage = action.payload.totalPage;
			})
			.addCase(getMangaByQuery.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			});
	},
});

export const { setEmptyMangaData } = mangaSlice.actions;
export const { setEmptyAnimeData } = animeSlice.actions;

export const mangaReducer = mangaSlice.reducer;
export const animeReducer = animeSlice.reducer;
