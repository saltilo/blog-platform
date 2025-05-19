import axios from "axios";

const API_URL = "https://blog-platform.kata.academy/api";

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/users`, { user: userData });
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_URL}/users/login`, { user: credentials });
  return res.data;
};

export const getCurrentUser = async (token) => {
  const res = await axios.get(`${API_URL}/user`, {
    headers: { Authorization: `Token ${token}` },
  });
  return res.data;
};

export const updateUser = async (userData, token) => {
  const res = await axios.put(
    `${API_URL}/user`,
    { user: userData },
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
  return res.data;
};
