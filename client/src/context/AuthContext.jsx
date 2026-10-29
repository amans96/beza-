import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem("token")));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    api
      .get("/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const data = await api.post("/auth/signin", {
      email,
      password,
    });

    localStorage.setItem("token", data.token);
    setUser(data.user);

    return data.user;
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}