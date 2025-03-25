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
      const payload = {
        ...user,
        lastUpdate: Date.now(),
      }
      setUserState(payload);
      localStorage.setItem("okp-oykus-user", okpEncode(payload));
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

    if (user?.lastUpdate) {
      const delta = 5 * 60 * 1000;  // 5 minutes
      const now = Date.now();
      if (now - user?.lastUpdate > delta) {
        checkAuth();
      }
    } else {
      checkAuth();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, setRat }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
