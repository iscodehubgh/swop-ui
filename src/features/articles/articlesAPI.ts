import { api } from "../../api";
import { ArticleInput } from "../../types/article";

export const getArticles = async () => {
  const url = '/api/articles';
  const response = await api.get(url);

  return await response.json();
}

export const createArticle = async (body: ArticleInput) => {
  const url = '/api/articles';
  const response = await api.post(url, body);

  return await response.json();
}