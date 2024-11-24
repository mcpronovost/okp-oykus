import type { ReactNode } from "react";
import { createContext, useContext, useState, useCallback } from "react";
import { api, authService } from "@/services/api";
import { API } from "@/services/utils/constants";

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(() => {
    const data = localStorage.getItem(API.STORAGE.USER);
    return data ? JSON.parse(data) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem(API.STORAGE.RAT) && !!localStorage.getItem(API.STORAGE.USER);
  });

  const doSetRat = (token: string) => {
    localStorage.setItem(API.STORAGE.RAT, token);
  };

  const doSetUser = (user: any) => {
    localStorage.setItem(API.STORAGE.USER, JSON.stringify(user));
    setUser(user);
  };

  const doClearUser = () => {
    localStorage.removeItem(API.STORAGE.RAT);
    localStorage.removeItem(API.STORAGE.USER);
    setUser(null);
    setIsAuthenticated(false);
  };

  const login = useCallback(async (username: string, password: string) => {
    try {
      const { token, user: userData } = await authService.login(username, password);

      doSetRat(token);
      doSetUser(userData || null);
      setIsAuthenticated(true);
    } catch (error) {
      doClearUser();
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("users/logout/");
      doClearUser();
    } catch (error) {
      doClearUser();
    }
  }, []);

  const logoutAll = useCallback(async () => {
    try {
      await api.post("users/logoutall/");
      doClearUser();
    } catch (error) {
      doClearUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        logoutAll,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
