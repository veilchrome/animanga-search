import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { animeReducer } from "./animeSlicer";
import { mangaReducer } from "./animeSlicer";

// Import Combine Reducer untuk menggabungkan 2 reducer yakni AnimeReducer dan MangaReducer
const animeMangaReducer = combineReducers({
	anime: animeReducer,
	manga: mangaReducer,
});

const store = configureStore({
	reducer: animeMangaReducer,
});

export default store;
