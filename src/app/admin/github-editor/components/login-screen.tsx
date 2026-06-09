"use client";

import { useState } from "react";
import { Lock, Loader2, AlertCircle, Pencil } from "lucide-react";
import "../sketch-theme.css";

interface LoginScreenProps {
  onLogin: (password: string) => Promise<{ success: boolean; error: string }>;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const handleLogin = async () => {
    setAuthError("");
    setAuthLoading(true);
    try {
      const result = await onLogin(passwordInput);
      if (!result.success) {
        setAuthError(result.error);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
        backgroundColor: "#fdfbf3",
        backgroundImage: "radial-gradient(rgba(60,60,60,0.13) 1.2px, transparent 1.2px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="w-full max-w-sm">
        <div
          className="bg-white border-[3px] border-[#2b2b2b] p-8 shadow-[5px_5px_0_#2b2b2b]"
          style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
        >
          <div className="flex flex-col items-center mb-6">
            <div
              className="w-14 h-14 bg-[#ffdd57] border-[2.5px] border-[#2b2b2b] flex items-center justify-center mb-4 shadow-[3px_3px_0_#2b2b2b]"
              style={{ borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px" }}
            >
              <Pencil className="w-6 h-6 text-[#2b2b2b]" style={{ strokeWidth: 2.6 }} />
            </div>
            <h1
              className="text-2xl font-bold text-[#2b2b2b]"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              MediDoodle CMS
            </h1>
            <p className="text-base text-[#888888] mt-1">Enter your password to continue</p>
          </div>

          <div className="space-y-4">
            <div>
              <label
                className="block text-sm text-[#555555] mb-1.5"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter admin password..."
                className="w-full text-base px-4 py-3 bg-white border-[2.5px] border-[#2b2b2b] focus:shadow-[3px_3px_0_#2b2b2b] focus:outline-none transition-all placeholder:text-[#9a9a9a]"
                style={{
                  borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                  fontFamily: "'Patrick Hand', cursive",
                }}
                autoFocus
              />
            </div>

            {authError && (
              <div
                className="flex items-center gap-2 text-sm text-[#c0392b] bg-[#fef2f2] border-[2px] border-[#c0392b] px-3 py-2"
                style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={authLoading || !passwordInput.trim()}
              className="w-full flex items-center justify-center gap-2 text-base font-bold bg-[#7ed957] text-[#2b2b2b] px-4 py-3 border-[2.5px] border-[#2b2b2b] hover:shadow-[3px_3px_0_#2b2b2b] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0"
              style={{
                borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                fontFamily: "'Patrick Hand', cursive",
              }}
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" style={{ strokeWidth: 2.4 }} />
                  Sign In
                </>
              )}
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-[#9a9a9a] mt-6" style={{ fontFamily: "'Patrick Hand', cursive" }}>
          MediDoodle CMS Editor
        </p>
      </div>
    </div>
  );
}
