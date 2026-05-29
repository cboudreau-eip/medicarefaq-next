"use client";

import { useState, useEffect, useCallback } from "react";

export function useCMSAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(true); // start true to check session

  // Check for stored session on mount
  useEffect(() => {
    const storedPw = sessionStorage.getItem("cms_password");
    if (storedPw) {
      setPassword(storedPw);
      setAuthenticated(true);
    }
    setAuthLoading(false);
  }, []);

  // Handle login
  const login = useCallback(async (inputPassword: string) => {
    try {
      const res = await fetch("/api/cms/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: inputPassword }),
      });
      if (res.status === 401) {
        return { success: false, error: "Invalid password. Access denied." };
      }
      if (!res.ok) {
        return { success: false, error: "Server error. Try again." };
      }
      setPassword(inputPassword);
      sessionStorage.setItem("cms_password", inputPassword);
      setAuthenticated(true);
      return { success: true, error: "" };
    } catch {
      return { success: false, error: "Connection error. Try again." };
    }
  }, []);

  // Handle logout
  const logout = useCallback(() => {
    setAuthenticated(false);
    setPassword("");
    sessionStorage.removeItem("cms_password");
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
        "x-cms-password": password,
      };
      const res = await fetch(url, { ...options, headers });
      if (res.status === 401) {
        setAuthenticated(false);
        sessionStorage.removeItem("cms_password");
        throw new Error("Session expired. Please log in again.");
      }
      return res;
    },
    [password]
  );

  return { authenticated, authLoading, password, login, logout, authFetch };
}
