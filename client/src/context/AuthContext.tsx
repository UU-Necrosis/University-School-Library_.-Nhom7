"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { UserProfile, getMeApi } from "@/services/auth";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextType {
  authStatus: AuthStatus;
  user: UserProfile | null;
  token: string | null;
  login: (user: UserProfile, token: string, remember: boolean) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  authStatus: "loading",
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  refreshUser: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const clearAuthData = useCallback(() => {
    localStorage.removeItem("unilibrary_token");
    sessionStorage.removeItem("unilibrary_token");
    localStorage.removeItem("unilibrary_user");
    sessionStorage.removeItem("unilibrary_user");
    // Clear user cached personal data to prevent data leak between accounts
    localStorage.removeItem("unilibrary_user_reservations");
    localStorage.removeItem("unilibrary_saved_books");
    setUser(null);
    setToken(null);
    setAuthStatus("unauthenticated");
  }, []);

  const verifySession = useCallback(async () => {
    try {
      const storedToken =
        localStorage.getItem("unilibrary_token") ||
        sessionStorage.getItem("unilibrary_token");

      if (!storedToken) {
        clearAuthData();
        return;
      }

      setToken(storedToken);

      // Verify token with backend /api/auth/me
      const res = await getMeApi(storedToken);
      if (res && res.data) {
        setUser(res.data);
        setAuthStatus("authenticated");
        // Keep user in storage updated
        if (localStorage.getItem("unilibrary_token")) {
          localStorage.setItem("unilibrary_user", JSON.stringify(res.data));
        } else {
          sessionStorage.setItem("unilibrary_user", JSON.stringify(res.data));
        }
      } else {
        clearAuthData();
      }
    } catch (err) {
      console.warn("Phiên đăng nhập không hợp lệ hoặc đã hết hạn:", err);
      clearAuthData();
    }
  }, [clearAuthData]);

  useEffect(() => {
    verifySession();

    const handleAuthEvent = () => {
      verifySession();
    };

    window.addEventListener("storage", handleAuthEvent);
    window.addEventListener("unilibrary_auth_changed", handleAuthEvent);

    return () => {
      window.removeEventListener("storage", handleAuthEvent);
      window.removeEventListener("unilibrary_auth_changed", handleAuthEvent);
    };
  }, [verifySession]);

  const login = (newUser: UserProfile, newToken: string, remember: boolean) => {
    // Clear old user caches
    localStorage.removeItem("unilibrary_user_reservations");
    localStorage.removeItem("unilibrary_saved_books");

    const storage = remember ? localStorage : sessionStorage;
    const otherStorage = remember ? sessionStorage : localStorage;

    otherStorage.removeItem("unilibrary_token");
    otherStorage.removeItem("unilibrary_user");

    storage.setItem("unilibrary_token", newToken);
    storage.setItem("unilibrary_user", JSON.stringify(newUser));

    setUser(newUser);
    setToken(newToken);
    setAuthStatus("authenticated");

    window.dispatchEvent(new Event("unilibrary_auth_changed"));
  };

  const logout = () => {
    clearAuthData();
    window.dispatchEvent(new Event("unilibrary_auth_changed"));
    window.dispatchEvent(new Event("unilibrary_saved_changed"));
  };

  const refreshUser = async () => {
    await verifySession();
  };

  return (
    <AuthContext.Provider value={{ authStatus, user, token, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
