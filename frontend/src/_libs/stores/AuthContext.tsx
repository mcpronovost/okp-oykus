import type { User } from "@/_libs/types/auth.types";
import { createContext, useState } from "react";
import { fetchApi } from "@/_libs/utils/api";
import { getStore, setStore } from "./utils";

interface AuthContextType {
  user: User | null;
  doSetUser: (user: User | null) => void;
  isAuthenticated: boolean;
  doUpdateUser: () => Promise<User | null>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => 
    JSON.parse(getStore("auth-user", null) || "null")
  );

  const doSetUser = (value: User | null) => {
    const updatedValue = value ? {
      ...value,
      fetched_at: new Date().getTime()
    } : null;
    setUser(updatedValue);
    setStore("auth-user", value ? JSON.stringify(updatedValue) : null);
  };

  const doUpdateUser = async() => {
    if (user && user.fetched_at && (user.fetched_at + (1000 * 60 * 5)) > Date.now()) {
      return Promise.resolve(user);
    }
    return fetchApi<User>("/auth/me/").then((r) => {
      doSetUser(r);
      return r;
    });
  };

  const logout = () => {
    doSetUser(null);
    // Additional logout logic (clear tokens, etc.)
  };

  return (
    <AuthContext.Provider value={{
      user,
      doSetUser,
      isAuthenticated: !!user,
      doUpdateUser,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};