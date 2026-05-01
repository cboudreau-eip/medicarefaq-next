"use client";

import { useState, useEffect, useCallback } from "react";
import HeatmapLogin from "./login";
import HeatmapDashboard from "./dashboard";

export default function HeatmapAdminPage() {
  const [secret, setSecret] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated via cookie
    const stored = document.cookie
      .split("; ")
      .find((row) => row.startsWith("heatmap_auth="))
      ?.split("=")[1];
    if (stored) {
      setSecret(stored);
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = useCallback(async (inputSecret: string) => {
    // Verify secret by making a test request
    try {
      const res = await fetch("/api/heatmap/data?type=stats", {
        headers: { "x-heatmap-secret": inputSecret },
      });
      if (res.ok) {
        // Set cookie for session persistence
        document.cookie = `heatmap_auth=${inputSecret}; path=/admin; max-age=86400; SameSite=Strict`;
        setSecret(inputSecret);
        setAuthenticated(true);
      } else {
        alert("Invalid secret. Please try again.");
      }
    } catch {
      alert("Connection error. Please try again.");
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00d97e] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated || !secret) {
    return <HeatmapLogin onLogin={handleLogin} />;
  }

  return <HeatmapDashboard secret={secret} />;
}
