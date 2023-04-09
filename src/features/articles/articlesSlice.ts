import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createArticle, getArticles, updateArticle } from './articlesAPI';
import { RootState } from '../../app/store';
import { Article, ArticleInput } from '../../types/article';

export interface AuthState {
  articles: {
    value: Array<Article>,
    status: 'idle' | 'loading' | 'failed';
  },
  newArticle: {
    value: Article | undefined,
    status: 'idle' | 'loading' | 'failed' | 'success';
  },
  addArticleModal: {
    value: boolean,
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
  },
  addArticleModal: {
    value: false,
  },
};

export const fetchArticles = createAsyncThunk(
  'articles/get',
  async () => {
    const response = await getArticles();
    return response.data;
  }
);

export const createNewArticle = createAsyncThunk(
  'articles/post',
  async (body: ArticleInput) => {
    const response = await createArticle(body);
    return response.data;
  }
);

export const updateOneArticle = createAsyncThunk(
  'articles/put',
  async (body: Article) => {
    const { id: articleId } = body;
    const response = await updateArticle(articleId, body);
    return response.data;
  }
);

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    showAddArticleModal: (state, action: PayloadAction<boolean>) => {
      state.addArticleModal.value = action.payload;
    },
  },
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
        state.newArticle.status = 'success';
        state.newArticle.value = action.payload;
      })
      .addCase(createNewArticle.rejected, (state) => {
        state.newArticle.status = 'failed';
      })
      .addCase(updateOneArticle.pending, (state) => {
        state.newArticle.status = 'loading';
      })
      .addCase(updateOneArticle.fulfilled, (state, action) => {
        state.newArticle.status = 'success';
        state.newArticle.value = action.payload;
      })
      .addCase(updateOneArticle.rejected, (state) => {
        state.newArticle.status = 'failed';
      })
  },
});


export const { showAddArticleModal } = articlesSlice.actions;

export const isAddArticleModalOpened = (state: RootState) => state.articles.addArticleModal.value;

export const fetchArticlesStatus = (state: RootState) => state.articles.articles.status
export const fetchedArticleList = (state: RootState) => state.articles.articles.value;

export const createArticleStatus = (state: RootState) => state.articles.newArticle.status;


export default articlesSlice.reducer;
