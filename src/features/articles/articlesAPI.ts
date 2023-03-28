import { api } from "../../api";

export const getArticles = async () => {
  const url = '/articles';
  const response = await api.get(url);

  return await response.json();
}