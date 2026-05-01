"use client";

import { useState } from "react";

interface LoginProps {
  onLogin: (secret: string) => void;
}

export default function HeatmapLogin({ onLogin }: LoginProps) {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secret.trim()) {
      setError("Please enter the admin secret");
      return;
    }
    onLogin(secret.trim());
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
      <div className="bg-[#1a1d27] border border-[#2a2d37] rounded-xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#00d97e]/10 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-[#00d97e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h1 className="text-white text-xl font-semibold">Heatmap Admin</h1>
            <p className="text-gray-400 text-sm">Enter your admin secret to continue</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={secret}
            onChange={(e) => { setSecret(e.target.value); setError(""); }}
            placeholder="Admin secret..."
            className="w-full bg-[#0f1117] border border-[#2a2d37] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d97e] transition-colors"
          />
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full mt-4 bg-[#00d97e] hover:bg-[#00c06e] text-black font-semibold py-3 rounded-lg transition-colors"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
