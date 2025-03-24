import { createContext, useContext, useEffect, useState } from "react";
import { useAuthApi } from "@/services/api";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const response = await useAuthApi.login(username, password);
    setUser(response.data);
  };

  const logout = async () => {
    await useAuthApi.logout();
    setUser(null);
  };
  
  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("okp-oykus-rat");
      if (token) {
        try {
          // Validate token with backend
          const response = await useAuthApi.validateRat();
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            throw new Error("Invalid token");
          }
        } catch (error) {
          console.error("Auth validation error:", error);
          localStorage.removeItem("okp-oykus-rat");
        }
      }
    };
    
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
