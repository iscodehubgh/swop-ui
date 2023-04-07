import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createArticle, getArticles } from './articlesAPI';
import { RootState } from '../../app/store';
import { Article, ArticleInput } from '../../types/article';

export interface AuthState {
  articles: {
    value: Array<Article>,
    status: 'idle' | 'loading' | 'failed';
  },
  newArticle: {
    value: Article | undefined,
    status: 'idle' | 'loading' | 'failed';
  }
}

const initialState: AuthState = {
  articles: {
    value: [],
    status: 'idle',
  },
  newArticle: {
    value: undefined,
    status: 'idle',
  }
};

export const fetchArticles = createAsyncThunk(
  'articles/get',
  async () => {
    const response = await getArticles();
    return response;
  }
);

export const createNewArticle = createAsyncThunk(
  'articles/post',
  async (body: ArticleInput) => {
    const response = await createArticle(body);
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
      .addCase(createNewArticle.pending, (state) => {
        state.newArticle.status = 'loading';
      })
      .addCase(createNewArticle.fulfilled, (state, action) => {
        state.newArticle.status = 'idle';
        state.newArticle.value = action.payload;
      })
      .addCase(createNewArticle.rejected, (state) => {
        state.newArticle.status = 'failed';
      })
  },
});


export const articlesFetchStatus = (state: RootState) => state.articles.articles.status
export const articlesListFetched = (state: RootState) => state.articles.articles.value;


export default authSlice.reducer;
