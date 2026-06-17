"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Lock,
  Loader2,
  AlertCircle,
  Pencil,
  ShieldCheck,
  ArrowLeft,
  User,
  QrCode,
  Copy,
  Check,
  Smartphone,
  KeyRound,
} from "lucide-react";
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

interface EnrollData {
  enabled: boolean;
  issuer?: string;
  label?: string;
  manualKey?: string;
  qrDataUrl?: string;
  error?: string;
}

const sketchBorder = "255px 15px 225px 15px / 15px 225px 15px 255px";

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [step, setStep] = useState<"password" | "code" | "enroll">("password");
  const [usernameInput, setUsernameInput] = useState("");
  const [usernameRequired, setUsernameRequired] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [useBackup, setUseBackup] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Enrollment state
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [enrollData, setEnrollData] = useState<EnrollData | null>(null);
  const [enrollError, setEnrollError] = useState("");
  const [copied, setCopied] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<"ok" | "fail" | null>(null);
  const [verifyMsg, setVerifyMsg] = useState("");

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

  const enrollHeaders = (): Record<string, string> => {
    const h: Record<string, string> = {};
    if (usernameRequired && usernameInput.trim()) h["x-enroll-username"] = usernameInput.trim();
    h["x-enroll-password"] = passwordInput;
    return h;
  };

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

  // Fetch the enrollment QR using the entered admin password (no session needed).
  const handleStartEnroll = async () => {
    setEnrollError("");
    setEnrollData(null);
    setVerifyResult(null);
    setVerifyMsg("");
    setVerifyCode("");
    setEnrollLoading(true);
    try {
      const res = await fetch("/api/cms/auth/enroll", { headers: enrollHeaders() });
      const d = (await res.json()) as EnrollData;
      if (!res.ok) {
        setEnrollError(d?.error || "Could not start enrollment. Check your password.");
        setEnrollData(d?.enabled === false ? d : null);
      } else {
        setEnrollData(d);
      }
      setStep("enroll");
    } catch {
      setEnrollError("Connection error. Try again.");
      setStep("enroll");
    } finally {
      setEnrollLoading(false);
    }
  };

  const copyKey = async () => {
    if (!enrollData?.manualKey) return;
    try {
      await navigator.clipboard.writeText(enrollData.manualKey.replace(/\s+/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be blocked; ignore */
    }
  };

  const handleVerifyPairing = async () => {
    setVerifying(true);
    setVerifyResult(null);
    setVerifyMsg("");
    try {
      const res = await fetch("/api/cms/auth/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...enrollHeaders() },
        body: JSON.stringify({ code: verifyCode.trim() }),
      });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d?.verified) {
        setVerifyResult("ok");
        setVerifyMsg("Success! This device is paired. Go back and sign in with your code.");
      } else {
        setVerifyResult("fail");
        setVerifyMsg(d?.error || "That code did not match. Try the current code.");
      }
    } catch {
      setVerifyResult("fail");
      setVerifyMsg("Connection error. Try again.");
    } finally {
      setVerifying(false);
    }
  };

  const goBackToPassword = () => {
    setStep("password");
    setCodeInput("");
    setUseBackup(false);
    setAuthError("");
    setEnrollError("");
    setEnrollData(null);
    setVerifyResult(null);
    setVerifyMsg("");
    setVerifyCode("");
  };

  const passwordStepDisabled =
    authLoading || !passwordInput.trim() || (usernameRequired && !usernameInput.trim());
  const enrollStartDisabled =
    enrollLoading || !passwordInput.trim() || (usernameRequired && !usernameInput.trim());

  const headerSubtitle =
    step === "code"
      ? useBackup
        ? "Enter a backup recovery code"
        : "Enter the 6-digit code from your authenticator app"
      : step === "enroll"
      ? "Set up a new authenticator device"
      : usernameRequired
      ? "Sign in to continue"
      : "Enter your password to continue";

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
              ) : step === "enroll" ? (
                <QrCode className="w-6 h-6 text-[#2b2b2b]" style={{ strokeWidth: 2.6 }} />
              ) : (
                <Pencil className="w-6 h-6 text-[#2b2b2b]" style={{ strokeWidth: 2.6 }} />
              )}
            </div>
            <h1 className="text-2xl font-bold text-[#2b2b2b]" style={{ fontFamily: "'Caveat', cursive" }}>
              MediDoodle CMS
            </h1>
            <p className="text-base text-[#888888] mt-1 text-center">{headerSubtitle}</p>
          </div>

          {step === "password" && (
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

              {/* Self-service enrollment: reveals the QR after the password is verified. */}
              <button
                type="button"
                onClick={handleStartEnroll}
                disabled={enrollStartDisabled}
                className="w-full flex items-center justify-center gap-2 text-sm text-[#4a90d9] hover:underline disabled:opacity-50 disabled:no-underline"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
                title="Enter your password above first, then set up a new device"
              >
                {enrollLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <QrCode className="w-3.5 h-3.5" />
                )}
                Set up a new device (2FA)
              </button>
            </div>
          )}

          {step === "code" && (
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

          {step === "enroll" && (
            <div className="space-y-4">
              {enrollError && !enrollData?.qrDataUrl && (
                <div
                  className="flex items-start gap-2 text-sm text-[#c0392b] bg-[#fef2f2] border-[2px] border-[#c0392b] px-3 py-2"
                  style={{ borderRadius: sketchBorder }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{enrollError}</span>
                </div>
              )}

              {enrollData?.qrDataUrl ? (
                <>
                  <ol className="space-y-2.5 text-sm text-[#2b2b2b]">
                    <li className="flex items-start gap-2">
                      <Smartphone className="w-4 h-4 text-[#555] shrink-0 mt-0.5" style={{ strokeWidth: 2.2 }} />
                      Open your authenticator app and choose “Scan a QR code”.
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#555] shrink-0 mt-0.5" style={{ strokeWidth: 2.2 }} />
                      Scan the code below (or enter the key manually).
                    </li>
                    <li className="flex items-start gap-2">
                      <KeyRound className="w-4 h-4 text-[#555] shrink-0 mt-0.5" style={{ strokeWidth: 2.2 }} />
                      Enter the 6-digit code it shows to confirm.
                    </li>
                  </ol>

                  <div className="flex flex-col items-center">
                    <div
                      className="bg-white border-[3px] border-[#2b2b2b] p-2.5 shadow-[4px_4px_0_#2b2b2b]"
                      style={{ borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px" }}
                    >
                      <Image
                        src={enrollData.qrDataUrl}
                        alt="Authenticator QR code"
                        width={180}
                        height={180}
                        unoptimized
                        className="block"
                      />
                    </div>
                    {(enrollData.issuer || enrollData.label) && (
                      <p className="text-xs text-[#888] mt-1.5">
                        {enrollData.issuer} · {enrollData.label}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-[#555] mb-1">Can’t scan? Enter this key:</p>
                    <div className="flex items-center gap-2">
                      <code
                        className="flex-1 px-3 py-2 bg-white border-[2px] border-[#2b2b2b] text-xs tracking-wider break-all"
                        style={{ borderRadius: sketchBorder }}
                      >
                        {enrollData.manualKey}
                      </code>
                      <button
                        onClick={copyKey}
                        className="flex items-center gap-1 px-3 py-2 bg-white border-[2px] border-[#2b2b2b] text-xs hover:shadow-[2px_2px_0_#2b2b2b] transition-all"
                        style={{ borderRadius: sketchBorder }}
                        title="Copy key"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-[#2e7d32]" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>

                  {/* Verify pairing */}
                  <div>
                    <label className="block text-sm text-[#555555] mb-1.5">Confirm it works</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        value={verifyCode}
                        onChange={(e) => setVerifyCode(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && verifyCode.trim() && handleVerifyPairing()}
                        placeholder="123456"
                        className="flex-1 text-center text-lg tracking-[0.25em] px-3 py-2.5 bg-white border-[2.5px] border-[#2b2b2b] focus:shadow-[3px_3px_0_#2b2b2b] focus:outline-none transition-all placeholder:text-[#9a9a9a] placeholder:tracking-normal placeholder:text-base"
                        style={{ borderRadius: sketchBorder, fontFamily: "'Patrick Hand', cursive" }}
                      />
                      <button
                        onClick={handleVerifyPairing}
                        disabled={verifying || !verifyCode.trim()}
                        className="flex items-center gap-1.5 text-sm font-bold bg-[#7ed957] text-[#2b2b2b] px-4 py-2.5 border-[2.5px] border-[#2b2b2b] hover:shadow-[3px_3px_0_#2b2b2b] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0"
                        style={{ borderRadius: sketchBorder }}
                      >
                        {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                        Verify
                      </button>
                    </div>
                    {verifyResult && (
                      <div
                        className={`flex items-center gap-2 mt-2 px-3 py-2 border-[2px] text-sm ${
                          verifyResult === "ok"
                            ? "text-[#2e7d32] bg-[#f1f8f2] border-[#2e7d32]"
                            : "text-[#c0392b] bg-[#fef2f2] border-[#c0392b]"
                        }`}
                        style={{ borderRadius: sketchBorder }}
                      >
                        {verifyResult === "ok" ? (
                          <Check className="w-4 h-4 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 shrink-0" />
                        )}
                        <span>{verifyMsg}</span>
                      </div>
                    )}
                  </div>
                </>
              ) : null}

              <button
                type="button"
                onClick={goBackToPassword}
                className="flex items-center gap-1 text-sm text-[#888888] hover:text-[#2b2b2b] transition-colors"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to sign in
              </button>
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
