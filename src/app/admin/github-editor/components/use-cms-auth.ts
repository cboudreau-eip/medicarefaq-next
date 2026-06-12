"use client";

import { useState, useEffect, useCallback } from "react";

const TOKEN_KEY = "cms_password"; // kept for backward compatibility; now holds a session token

export interface LoginResult {
  success: boolean;
  error: string;
  /** When true, the password was accepted but a 6-digit 2FA code is required. */
  totpRequired?: boolean;
}

export function useCMSAuth() {
  // `token` holds the signed session token (or, on legacy installs, the raw
  // password). It is sent as the `x-cms-password` header on every request.
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true); // start true to check session

  // Check for a stored session on mount.
  useEffect(() => {
    const stored = sessionStorage.getItem(TOKEN_KEY);
    if (stored) {
      setToken(stored);
      setAuthenticated(true);
    }
    setAuthLoading(false);
  }, []);

  /**
   * Attempt to log in.
   * @param inputPassword The admin password (factor 1).
   * @param code Optional 6-digit TOTP code or backup recovery code (factor 2).
   *
   * Returns `{ success, error, totpRequired }`. When `totpRequired` is true the
   * password was accepted but the UI must collect a 2FA code and call again.
   */
  const login = useCallback(
    async (inputPassword: string, code?: string): Promise<LoginResult> => {
      try {
        const res = await fetch("/api/cms/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            code ? { password: inputPassword, code } : { password: inputPassword }
          ),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          if (data?.totpRequired) {
            return {
              success: false,
              totpRequired: true,
              error: data?.error || "2FA code required",
            };
          }
          if (res.status === 401) {
            return { success: false, error: data?.error || "Invalid password. Access denied." };
          }
          return { success: false, error: data?.error || "Server error. Try again." };
        }

        // Success: store the signed session token (fall back to the password
        // for legacy servers that don't return a token yet).
        const sessionToken: string = data?.token || inputPassword;
        setToken(sessionToken);
        sessionStorage.setItem(TOKEN_KEY, sessionToken);
        setAuthenticated(true);
        return { success: true, error: "" };
      } catch {
        return { success: false, error: "Connection error. Try again." };
      }
    },
    []
  );

  // Handle logout
  const logout = useCallback(() => {
    setAuthenticated(false);
    setToken("");
    sessionStorage.removeItem(TOKEN_KEY);
  }, []);

  // Authenticated fetch helper
  const authFetch = useCallback(
    async (url: string, options?: RequestInit) => {
      const existingHeaders = options?.headers
        ? options.headers instanceof Headers
          ? Object.fromEntries(options.headers.entries())
          : (options.headers as Record<string, string>)
        : {};
      const headers = {
        ...existingHeaders,
        "x-cms-password": token,
      };
      const res = await fetch(url, { ...options, headers });
      if (res.status === 401) {
        setAuthenticated(false);
        sessionStorage.removeItem(TOKEN_KEY);
        throw new Error("Session expired. Please log in again.");
      }
      return res;
    },
    [token]
  );

  // `password` is retained in the return shape for backward compatibility with
  // existing consumers; it now contains the session token.
  return { authenticated, authLoading, password: token, login, logout, authFetch };
}
