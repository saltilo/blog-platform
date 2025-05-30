import { createContext, useContext, useEffect, useState } from "react";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
} from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await getCurrentUser(token);
          setUser(res.user);
        } catch (err) {
          console.error("Ошибка загрузки пользователя:", err);
          logout();
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const register = async (data) => {
    const res = await registerUser(data);
    setToken(res.user.token);
    setUser(res.user);
    localStorage.setItem("token", res.user.token);
  };

  const login = async (data) => {
    const res = await loginUser(data);
    setToken(res.user.token);
    setUser(res.user);
    localStorage.setItem("token", res.user.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const updateProfile = async (data) => {
    const res = await updateUser(data, token);
    setUser(res.user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
