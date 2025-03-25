import { createContext, useContext, useEffect, useState } from "react";
import { okpApi } from "@/services/api";
import { okpEncode, okpDecode } from "./utils";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    const encodedUser = localStorage.getItem("okp-oykus-user");
    return encodedUser ? okpDecode(encodedUser) : null;
  });

  const setUser = (user) => {
    if (user) {
      setUserState(user);
      localStorage.setItem("okp-oykus-user", okpEncode(user));
    } else {
      setUserState(null);
      localStorage.removeItem("okp-oykus-user");
    }
  };

  const setRat = (rat) => {
    if (rat) {
      localStorage.setItem("okp-oykus-rat", rat);
    } else {
      localStorage.removeItem("okp-oykus-rat");
    }
  };
  
  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("okp-oykus-rat");
      if (token) {
        try {
          // Validate token with backend
          const response = await okpApi.getCurrentUser();
          if (response.success) {
            setUser(response.user);
          } else {
            throw new Error("Invalid token");
          }
        } catch {
          setRat(null);
          setUser(null);
        }
      }
    };
    
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, setRat }}>
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
