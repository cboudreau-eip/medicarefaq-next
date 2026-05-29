"use client";

import { useState } from "react";
import { Lock, Loader2, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-teal-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">MedicareFAQ CMS Editor</h1>
            <p className="text-sm text-gray-500 mt-1">Enter your admin password to continue</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter admin password..."
                className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                autoFocus
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={authLoading || !passwordInput.trim()}
              className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-teal-600 text-white rounded-lg px-4 py-2.5 hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">MedicareFAQ GitHub CMS Editor</p>
      </div>
    </div>
  );
}
