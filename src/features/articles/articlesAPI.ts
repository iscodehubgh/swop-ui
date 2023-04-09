import { api } from "../../api";
import { Article, ArticleInput } from "../../types/article";

export const getArticles = async () => {
  const url = '/articles';
  const response = await api.get(url);

  return await response.json();
}

export const createArticle = async (body: FormData) => {
  const url = '/articles';
  const response = await api.postFormData(url, body);

  return await response.json();
}

export const updateArticle = async (articleId: string, body: Article) => {
  const url = `/articles/${articleId}`;
  const response = await api.put(url, body);

  return await response.json();
}