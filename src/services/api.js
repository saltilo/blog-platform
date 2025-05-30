import axios from "axios";

const API_URL = "https://blog-platform.kata.academy/api";

export const fetchArticles = async (offset = 0, limit = 10, token) => {
  const response = await axios.get(
    `${API_URL}/articles?offset=${offset}&limit=${limit}`,
    {
      headers: token ? { Authorization: `Token ${token}` } : {},
    }
  );
  return response.data;
};

export const fetchArticleBySlug = async (slug) => {
  const response = await axios.get(`${API_URL}/articles/${slug}`);
  return response.data;
};
