import axios from "axios";

const API_URL = "https://blog-platform.kata.academy/api";

export const createArticle = async (article, token) => {
  const res = await axios.post(
    `${API_URL}/articles`,
    { article },
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
  return res.data;
};
export const getArticle = async (slug) => {
  const res = await axios.get(`${API_URL}/articles/${slug}`);
  return res.data;
};

export const updateArticle = async (slug, article, token) => {
  const res = await axios.put(
    `${API_URL}/articles/${slug}`,
    { article },
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
  return res.data;
};

export const deleteArticle = async (slug, token) => {
  console.log("Deleting article:", slug);
  console.log("Token:", token);
  const res = await axios.delete(`${API_URL}/articles/${slug}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  console.log("Delete response:", res.status);
  return res;
};
