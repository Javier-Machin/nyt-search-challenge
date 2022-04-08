import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TPayload {
  currentPage: number;
}

const initialState = {
  articles: [],
  currentPage: 0,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    changePage: (state, { payload }: PayloadAction<TPayload>) => {
      /*
        While it looks like we are mutating the state directly,
        redux toolkit will generate a new state object
      */
      state.currentPage = payload.currentPage;
    },
  },
});

const articleReducer = articleSlice.reducer;
const { changePage } = articleSlice.actions; // Action creator

export { articleReducer, changePage };
