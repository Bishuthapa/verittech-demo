"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { AuthState, LoginCredentials } from "@/types";
import { loginUser } from "@/lib/services";

interface AuthContextValue {
  auth: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_STORAGE_KEY = "fakeshop_auth";

function loadAuthFromStorage(): AuthState {
  if (typeof window === "undefined") {
    return { token: null, isAuthenticated: false, username: null };
  }
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    }
  return { token: null, isAuthenticated: false, username: null };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(loadAuthFromStorage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await loginUser(credentials);
      const newAuth: AuthState = {
        token,
        isAuthenticated: true,
        username: credentials.username,
      };
      setAuth(newAuth);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newAuth));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    const empty: AuthState = {
      token: null,
      isAuthenticated: false,
      username: null,
    };
    setAuth(empty);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
