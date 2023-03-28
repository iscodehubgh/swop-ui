import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getArticles } from './articlesAPI';
import { RootState } from '../../app/store';

export interface AuthState {
  articles: {
    value: Array<unknown>,
    status: 'idle' | 'loading' | 'failed';
  },
}

const initialState: AuthState = {
  articles: {
    value: [],
    status: 'idle',
  },
};

export const fetchArticles = createAsyncThunk(
  'articles/get',
  async () => {
    const response = await getArticles();
    return response;
  }
);

export const authSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.articles.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles.status = 'idle';
        state.articles.value = action.payload;
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.articles.status = 'failed';
      })
  },
});


export const articlesFetchStatus = (state: RootState) => state.articles.articles.status

export default authSlice.reducer;
