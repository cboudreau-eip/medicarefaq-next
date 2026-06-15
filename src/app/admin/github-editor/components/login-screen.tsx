"use client";

import { useState, useEffect } from "react";
import { Lock, Loader2, AlertCircle, Pencil, ShieldCheck, ArrowLeft, User } from "lucide-react";
import "../sketch-theme.css";

interface LoginResult {
  success: boolean;
  error: string;
  totpRequired?: boolean;
}

interface LoginCredentials {
  username?: string;
  password: string;
  code?: string;
}

interface LoginScreenProps {
  // Backward compatible: accepts either a credentials object or a plain password.
  onLogin: (
    credentialsOrPassword: LoginCredentials | string,
    code?: string
  ) => Promise<LoginResult>;
}

const sketchBorder = "255px 15px 225px 15px / 15px 225px 15px 255px";

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [step, setStep] = useState<"password" | "code">("password");
  const [usernameInput, setUsernameInput] = useState("");
  const [usernameRequired, setUsernameRequired] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [useBackup, setUseBackup] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Ask the server whether a username field should be shown.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/cms/auth")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setUsernameRequired(!!d?.usernameRequired);
      })
      .catch(() => {
        /* leave username hidden on error */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handlePasswordSubmit = async () => {
    setAuthError("");
    setAuthLoading(true);
    try {
      const result = await onLogin({
        username: usernameRequired ? usernameInput.trim() : undefined,
        password: passwordInput,
      });
      if (result.success) return;
      if (result.totpRequired) {
        // Credentials accepted; advance to the 2FA code step.
        setStep("code");
        setAuthError("");
      } else {
        setAuthError(result.error);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleCodeSubmit = async () => {
    setAuthError("");
    setAuthLoading(true);
    try {
      const result = await onLogin({
        username: usernameRequired ? usernameInput.trim() : undefined,
        password: passwordInput,
        code: codeInput.trim(),
      });
      if (!result.success) {
        setAuthError(result.error || "Invalid 2FA code. Try again.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const goBackToPassword = () => {
    setStep("password");
    setCodeInput("");
    setUseBackup(false);
    setAuthError("");
  };

  const passwordStepDisabled =
    authLoading || !passwordInput.trim() || (usernameRequired && !usernameInput.trim());

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
          style={{ borderRadius: sketchBorder }}
        >
          <div className="flex flex-col items-center mb-6">
            <div
              className="w-14 h-14 bg-[#ffdd57] border-[2.5px] border-[#2b2b2b] flex items-center justify-center mb-4 shadow-[3px_3px_0_#2b2b2b]"
              style={{ borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px" }}
            >
              {step === "code" ? (
                <ShieldCheck className="w-6 h-6 text-[#2b2b2b]" style={{ strokeWidth: 2.6 }} />
              ) : (
                <Pencil className="w-6 h-6 text-[#2b2b2b]" style={{ strokeWidth: 2.6 }} />
              )}
            </div>
            <h1 className="text-2xl font-bold text-[#2b2b2b]" style={{ fontFamily: "'Caveat', cursive" }}>
              MediDoodle CMS
            </h1>
            <p className="text-base text-[#888888] mt-1">
              {step === "code"
                ? useBackup
                  ? "Enter a backup recovery code"
                  : "Enter the 6-digit code from your authenticator app"
                : usernameRequired
                ? "Sign in to continue"
                : "Enter your password to continue"}
            </p>
          </div>

          {step === "password" ? (
            <div className="space-y-4">
              {usernameRequired && (
                <div>
                  <label
                    className="block text-sm text-[#555555] mb-1.5"
                    style={{ fontFamily: "'Patrick Hand', cursive" }}
                  >
                    Username
                  </label>
                  <div className="relative">
                    <User
                      className="w-4 h-4 text-[#9a9a9a] absolute left-3.5 top-1/2 -translate-y-1/2"
                      style={{ strokeWidth: 2.4 }}
                    />
                    <input
                      type="text"
                      autoComplete="username"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                      placeholder="Enter username..."
                      className="w-full text-base pl-10 pr-4 py-3 bg-white border-[2.5px] border-[#2b2b2b] focus:shadow-[3px_3px_0_#2b2b2b] focus:outline-none transition-all placeholder:text-[#9a9a9a]"
                      style={{ borderRadius: sketchBorder, fontFamily: "'Patrick Hand', cursive" }}
                      autoFocus
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  className="block text-sm text-[#555555] mb-1.5"
                  style={{ fontFamily: "'Patrick Hand', cursive" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                  placeholder="Enter admin password..."
                  className="w-full text-base px-4 py-3 bg-white border-[2.5px] border-[#2b2b2b] focus:shadow-[3px_3px_0_#2b2b2b] focus:outline-none transition-all placeholder:text-[#9a9a9a]"
                  style={{ borderRadius: sketchBorder, fontFamily: "'Patrick Hand', cursive" }}
                  autoFocus={!usernameRequired}
                />
              </div>

              {authError && (
                <div
                  className="flex items-center gap-2 text-sm text-[#c0392b] bg-[#fef2f2] border-[2px] border-[#c0392b] px-3 py-2"
                  style={{ borderRadius: sketchBorder }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                onClick={handlePasswordSubmit}
                disabled={passwordStepDisabled}
                className="w-full flex items-center justify-center gap-2 text-base font-bold bg-[#7ed957] text-[#2b2b2b] px-4 py-3 border-[2.5px] border-[#2b2b2b] hover:shadow-[3px_3px_0_#2b2b2b] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0"
                style={{ borderRadius: sketchBorder, fontFamily: "'Patrick Hand', cursive" }}
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
          ) : (
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm text-[#555555] mb-1.5"
                  style={{ fontFamily: "'Patrick Hand', cursive" }}
                >
                  {useBackup ? "Backup recovery code" : "Authentication code"}
                </label>
                <input
                  type="text"
                  inputMode={useBackup ? "text" : "numeric"}
                  autoComplete="one-time-code"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCodeSubmit()}
                  placeholder={useBackup ? "e.g. 461cb-99937" : "123456"}
                  className="w-full text-center text-xl tracking-[0.3em] px-4 py-3 bg-white border-[2.5px] border-[#2b2b2b] focus:shadow-[3px_3px_0_#2b2b2b] focus:outline-none transition-all placeholder:text-[#9a9a9a] placeholder:tracking-normal placeholder:text-base"
                  style={{ borderRadius: sketchBorder, fontFamily: "'Patrick Hand', cursive" }}
                  autoFocus
                />
              </div>

              {authError && (
                <div
                  className="flex items-center gap-2 text-sm text-[#c0392b] bg-[#fef2f2] border-[2px] border-[#c0392b] px-3 py-2"
                  style={{ borderRadius: sketchBorder }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                onClick={handleCodeSubmit}
                disabled={authLoading || !codeInput.trim()}
                className="w-full flex items-center justify-center gap-2 text-base font-bold bg-[#7ed957] text-[#2b2b2b] px-4 py-3 border-[2.5px] border-[#2b2b2b] hover:shadow-[3px_3px_0_#2b2b2b] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0"
                style={{ borderRadius: sketchBorder, fontFamily: "'Patrick Hand', cursive" }}
              >
                {authLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" style={{ strokeWidth: 2.4 }} />
                    Verify Code
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={goBackToPassword}
                  className="flex items-center gap-1 text-[#888888] hover:text-[#2b2b2b] transition-colors"
                  style={{ fontFamily: "'Patrick Hand', cursive" }}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUseBackup((v) => !v);
                    setCodeInput("");
                    setAuthError("");
                  }}
                  className="text-[#4a90d9] hover:underline"
                  style={{ fontFamily: "'Patrick Hand', cursive" }}
                >
                  {useBackup ? "Use authenticator app instead" : "Use a backup code instead"}
                </button>
              </div>
            </div>
          )}
        </div>
        <p
          className="text-center text-sm text-[#9a9a9a] mt-6"
          style={{ fontFamily: "'Patrick Hand', cursive" }}
        >
          MediDoodle CMS Editor
        </p>
      </div>
    </div>
  );
}
