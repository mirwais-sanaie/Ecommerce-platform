import { createContext, useContext, useState } from "react";

//create context
const AuthContext = createContext();

const TOKEN_KEY = "afromart_token";
const USER_KEY = "afromart_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const signup = async (name, email, password, confirmPassword) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/v1/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Save token + user
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.data.user));

      setUser(data.data.user);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.data.user));

      setUser(data.data.user);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signup,
        login,
        logout,
        getToken,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  if (useContext(AuthContext) === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return useContext(AuthContext);
}
