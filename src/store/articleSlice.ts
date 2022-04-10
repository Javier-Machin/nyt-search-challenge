import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getArticleByURIAPI, searchArticlesAPI } from '../api';

interface Payload {
  page: number;
}

interface SearchResult {
  uri: string;
  headline: { main: string };
}

interface ArticleSearchPages {
  [page: number]: SearchResult[];
}

interface MultimediaItem {
  height: number;
  width: number;
  url: string;
}

interface ArticleType {
  headline: { main: string };
  lead_paragraph: string;
  pub_date: string;
  multimedia: MultimediaItem[];
}

interface ArticlesByURI {
  [uri: string]: ArticleType;
}

const initialState = {
  articles: {} as ArticleSearchPages,
  articlesByURI: {} as ArticlesByURI,
  currentPage: 0,
  searchHits: 0,
  fetching: false,
  lastSearchQuery: '',
};

const noResults = { data: { docs: [], meta: { hits: 0 } }, page: 0, query: '' };

const searchArticles = createAsyncThunk(
  'article/searchArticles',
  async (queryObject: { query: string; page: number }) => {
    const { query, page } = queryObject;
    const response = await searchArticlesAPI(query, page);

    if (response) {
      return {
        data: response,
        page,
        query,
      };
    }

    return noResults;
  },
);

const getArticleByURI = createAsyncThunk(
  'article/getArticleByURI',
  async (queryObject: { uri: string }, thunkAPI) => {
    const response = await getArticleByURIAPI(queryObject.uri);

    if (response) return { data: response, uri: queryObject.uri };
    return thunkAPI.rejectWithValue(null);
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
    builder.addCase(searchArticles.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(searchArticles.fulfilled, (state, action) => {
      state.articles[action.payload.page] = action.payload.data.docs;
      state.searchHits = action.payload.data.meta.hits;
      state.currentPage = action.payload.page;
      state.lastSearchQuery = action.payload.query;
      state.fetching = false;
    });
    builder.addCase(getArticleByURI.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(getArticleByURI.fulfilled, (state, action) => {
      const article = action.payload.data.docs[0];
      state.articlesByURI[action.payload.uri] = article;
      state.fetching = false;
    });
  },
});

const articleReducer = articleSlice.reducer;
const { changePage, clearCache } = articleSlice.actions;

export {
  articleReducer,
  changePage,
  clearCache,
  searchArticles,
  getArticleByURI,
};

export type { ArticleType };
