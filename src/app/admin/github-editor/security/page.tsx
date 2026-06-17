"use client";

import "../sketch-theme.css";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Loader2,
  ShieldCheck,
  ShieldAlert,
  Copy,
  Check,
  AlertCircle,
  KeyRound,
  Smartphone,
} from "lucide-react";
import { useCMSAuth } from "../components/use-cms-auth";
import LoginScreen from "../components/login-screen";
import SketchLayout from "../components/sketch-layout";

const sketchBorder = "255px 15px 225px 15px / 15px 225px 15px 255px";

interface EnrollData {
  enabled: boolean;
  issuer?: string;
  label?: string;
  manualKey?: string;
  otpauthUri?: string;
  qrDataUrl?: string;
  error?: string;
}

export default function SecurityPage() {
  const { authenticated, authLoading, login, logout, authFetch } = useCMSAuth();

  const [data, setData] = useState<EnrollData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Verify-pairing step
  const [verifyCode, setVerifyCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<"ok" | "fail" | null>(null);
  const [verifyMsg, setVerifyMsg] = useState("");

  const fetchEnroll = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await authFetch("/api/cms/auth/enroll");
      const d = (await res.json()) as EnrollData;
      setData(d);
      if (!res.ok && d?.error) setLoadError(d.error);
    } catch (err: unknown) {
      setLoadError(err instanceof Error ? err.message : "Failed to load enrollment data");
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    if (authenticated) fetchEnroll();
  }, [authenticated, fetchEnroll]);

  const copyKey = async () => {
    if (!data?.manualKey) return;
    try {
      await navigator.clipboard.writeText(data.manualKey.replace(/\s+/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be blocked; ignore */
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    setVerifyResult(null);
    setVerifyMsg("");
    try {
      const res = await authFetch("/api/cms/auth/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: verifyCode.trim() }),
      });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d?.verified) {
        setVerifyResult("ok");
        setVerifyMsg("Success! This device is paired. You can now use it to sign in.");
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

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fdfbf3" }}>
        <Loader2 className="w-6 h-6 animate-spin text-[#2b2b2b]" />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen onLogin={login} />;
  }

  const notEnabled = data && data.enabled === false;

  return (
    <SketchLayout onLogout={logout}>
      {/* Toolbar */}
      <div
        className="sticky top-0 z-10 px-8 py-4"
        style={{ borderBottom: "3px dashed #2b2b2b", backgroundColor: "#fdfbf3" }}
      >
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-[#2b2b2b]" style={{ fontFamily: "'Caveat', cursive" }}>
            <span style={{ background: "linear-gradient(180deg, transparent 55%, rgba(255,221,87,0.75) 55%)", padding: "0 4px" }}>
              Security · Two-Factor Setup
            </span>
          </h1>
        </div>
      </div>

      <div className="px-8 py-8 max-w-3xl w-full">
        {loading ? (
          <div className="flex items-center gap-3 text-[#555]">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading enrollment details…
          </div>
        ) : notEnabled ? (
          <div
            className="flex items-start gap-3 p-5 bg-[#fff7e6] border-[2.5px] border-[#2b2b2b]"
            style={{ borderRadius: sketchBorder }}
          >
            <ShieldAlert className="w-6 h-6 text-[#b8860b] shrink-0 mt-0.5" />
            <div>
              <p className="text-lg text-[#2b2b2b] font-bold">Two-factor authentication is not enabled</p>
              <p className="text-base text-[#555] mt-1">
                {data?.error ||
                  "Set the environment variables TOTP_ENABLED=true and TOTP_SECRET on the server, then redeploy. Once enabled, the enrollment QR code will appear here."}
              </p>
            </div>
          </div>
        ) : loadError ? (
          <div
            className="flex items-center gap-2 text-[#c0392b] bg-[#fef2f2] border-[2px] border-[#c0392b] px-4 py-3"
            style={{ borderRadius: sketchBorder }}
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-base">{loadError}</span>
          </div>
        ) : data && data.qrDataUrl ? (
          <div className="space-y-8">
            {/* Intro */}
            <p className="text-base text-[#555] leading-relaxed">
              Pair an authenticator app (Google Authenticator, Authy, 1Password, etc.) with the CMS.
              Scan the QR code <strong>once</strong>. After that, the app generates a fresh 6-digit
              code every 30 seconds that you enter after your password — no need to scan again.
            </p>

            {/* Steps + QR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Steps */}
              <ol className="space-y-4">
                {[
                  { icon: Smartphone, text: "Open your authenticator app and choose “Scan a QR code”." },
                  { icon: ShieldCheck, text: "Scan the code on the right (or enter the key manually below)." },
                  { icon: KeyRound, text: "Enter the 6-digit code it shows to confirm pairing." },
                ].map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="shrink-0 w-7 h-7 flex items-center justify-center bg-[#ffdd57] border-[2px] border-[#2b2b2b] text-sm font-bold"
                      style={{ borderRadius: "120px 8px 120px 8px / 8px 120px 8px 120px" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-base text-[#2b2b2b] flex items-center gap-2">
                      <s.icon className="w-4 h-4 text-[#555]" style={{ strokeWidth: 2.2 }} />
                      {s.text}
                    </span>
                  </li>
                ))}
              </ol>

              {/* QR */}
              <div className="flex flex-col items-center">
                <div
                  className="bg-white border-[3px] border-[#2b2b2b] p-3 shadow-[5px_5px_0_#2b2b2b]"
                  style={{ borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px" }}
                >
                  <Image
                    src={data.qrDataUrl}
                    alt="Authenticator QR code"
                    width={216}
                    height={216}
                    unoptimized
                    className="block"
                  />
                </div>
                <p className="text-sm text-[#888] mt-2" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                  {data.issuer} · {data.label}
                </p>
              </div>
            </div>

            {/* Manual key */}
            <div>
              <p className="text-sm text-[#555] mb-1.5">Can’t scan? Enter this key manually:</p>
              <div className="flex items-center gap-2">
                <code
                  className="flex-1 px-4 py-3 bg-white border-[2.5px] border-[#2b2b2b] text-base tracking-wider break-all"
                  style={{ borderRadius: sketchBorder }}
                >
                  {data.manualKey}
                </code>
                <button
                  onClick={copyKey}
                  className="flex items-center gap-2 px-4 py-3 bg-white border-[2.5px] border-[#2b2b2b] hover:shadow-[3px_3px_0_#2b2b2b] hover:-translate-y-0.5 transition-all"
                  style={{ borderRadius: sketchBorder }}
                  title="Copy key"
                >
                  {copied ? <Check className="w-4 h-4 text-[#2e7d32]" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Verify pairing */}
            <div
              className="p-5 bg-white border-[2.5px] border-[#2b2b2b]"
              style={{ borderRadius: sketchBorder }}
            >
              <p className="text-lg font-bold text-[#2b2b2b] mb-1">Confirm it works</p>
              <p className="text-sm text-[#555] mb-3">
                Enter the current 6-digit code from your app to verify the pairing before relying on it.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && verifyCode.trim() && handleVerify()}
                  placeholder="123456"
                  className="w-40 text-center text-xl tracking-[0.3em] px-4 py-3 bg-white border-[2.5px] border-[#2b2b2b] focus:shadow-[3px_3px_0_#2b2b2b] focus:outline-none transition-all placeholder:text-[#9a9a9a] placeholder:tracking-normal placeholder:text-base"
                  style={{ borderRadius: sketchBorder, fontFamily: "'Patrick Hand', cursive" }}
                />
                <button
                  onClick={handleVerify}
                  disabled={verifying || !verifyCode.trim()}
                  className="flex items-center gap-2 text-base font-bold bg-[#7ed957] text-[#2b2b2b] px-5 py-3 border-[2.5px] border-[#2b2b2b] hover:shadow-[3px_3px_0_#2b2b2b] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0"
                  style={{ borderRadius: sketchBorder }}
                >
                  {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                  Verify
                </button>
              </div>
              {verifyResult && (
                <div
                  className={`flex items-center gap-2 mt-3 px-3 py-2 border-[2px] text-sm ${
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

            <p className="text-sm text-[#888] leading-relaxed">
              Note: this CMS uses a single shared authenticator secret, so every authorized device
              pairs to the same code. Keep the QR code and manual key private — anyone who scans it
              can generate valid login codes.
            </p>
          </div>
        ) : null}
      </div>
    </SketchLayout>
  );
}
