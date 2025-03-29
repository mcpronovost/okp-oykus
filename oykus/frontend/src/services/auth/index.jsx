import { createContext, useContext, useEffect, useState } from "react";
import { okpApi, okpEncode, okpDecode } from "@/services/api";

const REFRESH_INTERVAL = 10 * 60 * 5; // 5 minutes = 1000 * 60 * 5
const KEY_USER = "okp-oykus-user";
const KEY_RAT = "okp-oykus-rat";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    const encodedUser = localStorage.getItem(KEY_USER);
    return encodedUser ? okpDecode(encodedUser) : null;
  });

  const setUser = (user) => {
    if (user) {
      const payload = {
        ...user,
        lastUpdate: Date.now(),
      }
      setUserState(payload);
      localStorage.setItem(KEY_USER, okpEncode(payload));
    } else {
      setUserState(null);
      localStorage.removeItem(KEY_USER);
    }
  };

  const setRat = (rat) => {
    if (rat) {
      localStorage.setItem(KEY_RAT, rat);
    } else {
      localStorage.removeItem(KEY_RAT);
    }
  };

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem(KEY_RAT);
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
      const now = Date.now();
      if (now - user?.lastUpdate > REFRESH_INTERVAL) {
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
