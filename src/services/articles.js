import axios from "axios";

const API_URL = "https://blog-platform.kata.academy/api";

const authHeader = (token) => ({
  headers: { Authorization: `Token ${token}` },
});

export const createArticle = async (article, token) => {
  const res = await axios.post(
    `${API_URL}/articles`,
    { article },
    authHeader(token)
  );
  return res.data;
};

export const getArticle = async (slug, token) => {
  const res = await axios.get(`${API_URL}/articles/${slug}`, {
    headers: token ? { Authorization: `Token ${token}` } : {},
  });
  return res.data;
};

export const updateArticle = async (slug, article, token) => {
  const res = await axios.put(
    `${API_URL}/articles/${slug}`,
    { article },
    authHeader(token)
  );
  return res.data;
};

export const deleteArticle = async (slug, token) => {
  const res = await axios.delete(
    `${API_URL}/articles/${slug}`,
    authHeader(token)
  );
  return res;
};

export const likeArticle = async (slug, token) => {
  const res = await axios.post(
    `${API_URL}/articles/${slug}/favorite`,
    null,
    authHeader(token)
  );
  return res.data.article;
};

export const unlikeArticle = async (slug, token) => {
  const res = await axios.delete(
    `${API_URL}/articles/${slug}/favorite`,
    authHeader(token)
  );
  return res.data.article;
};
