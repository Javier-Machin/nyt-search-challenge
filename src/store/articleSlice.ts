import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { searchArticlesAPI } from '../api';

interface Payload {
  page: number;
}

interface SearchResult {
  uri: string;
  headline: { main: string };
}

interface Articles {
  [page: number]: SearchResult[];
}

const initialState = {
  articles: {} as Articles,
  articlesByURI: {},
  currentPage: 0,
  searchHits: 0,
};

const searchArticles = createAsyncThunk(
  'article/searchArticles',
  async (queryObject: { query: string; page: number }) => {
    const response = await searchArticlesAPI(
      queryObject.query,
      queryObject.page,
    );

    if (response) return { data: response, page: queryObject.page };

    return { data: { docs: [], meta: { hits: 0 } }, page: 0 };
  },
);

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    changePage: (state, { payload }: PayloadAction<Payload>) => {
      /*
        While it looks like we are mutating the state directly,
        redux toolkit will generate a new state object
      */
      state.currentPage = payload.page;
    },
    clearCache: (state) => {
      state.articles = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchArticles.fulfilled, (state, action) => {
      state.articles[action.payload.page] = action.payload.data.docs;
      state.searchHits = action.payload.data.meta.hits;
      state.currentPage = action.payload.page;
    });
  },
});

const articleReducer = articleSlice.reducer;
const { changePage, clearCache } = articleSlice.actions;

export { articleReducer, changePage, clearCache, searchArticles };
