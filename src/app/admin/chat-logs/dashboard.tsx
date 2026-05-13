"use client";

import { useState, useEffect, useCallback } from "react";

interface Stats {
  total_conversations: number;
  total_messages: number;
  today_conversations: number;
  avg_messages_per_conversation: number;
  top_pages: { page_path: string; count: number }[];
}

interface Conversation {
  session_id: string;
  page_path: string;
  started_at: string;
  last_message_at: string;
  message_count: number;
  device_type: string;
}

interface ChatMessage {
  role: string;
  content: string;
  created_at: string;
}

export default function ChatLogsDashboard() {
  // Restore credentials from sessionStorage on mount
  const [authenticated, setAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("chatlog_auth") === "true";
  });
  const [email, setEmail] = useState(() => {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem("chatlog_email") || "";
  });
  const [password, setPassword] = useState(() => {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem("chatlog_password") || "";
  });
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [stats, setStats] = useState<Stats | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [selectedMessages, setSelectedMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [schemaInitialized, setSchemaInitialized] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("chatlog_auth") === "true";
  });

  const fetchData = useCallback(
    async (url: string) => {
      const res = await fetch(url, {
        headers: {
          "x-admin-email": email,
          "x-admin-password": password,
        },
      });
      if (res.status === 401) {
        setAuthenticated(false);
        sessionStorage.removeItem("chatlog_auth");
        sessionStorage.removeItem("chatlog_email");
        sessionStorage.removeItem("chatlog_password");
        throw new Error("Unauthorized");
      }
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    [email, password]
  );

  const handleLogin = async () => {
    setAuthError("");
    try {
      const res = await fetch("/api/chat-log/init", {
        method: "POST",
        headers: {
          "x-admin-email": emailInput,
          "x-admin-password": passwordInput,
        },
      });
      if (res.status === 401) {
        setAuthError("Invalid email or password. Access denied.");
        return;
      }
      if (!res.ok) {
        setAuthError("Server error. Try again.");
        return;
      }
      // Persist to sessionStorage
      sessionStorage.setItem("chatlog_auth", "true");
      sessionStorage.setItem("chatlog_email", emailInput);
      sessionStorage.setItem("chatlog_password", passwordInput);
      setEmail(emailInput);
      setPassword(passwordInput);
      setAuthenticated(true);
      setSchemaInitialized(true);
    } catch {
      setAuthError("Connection error. Try again.");
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("chatlog_auth");
    sessionStorage.removeItem("chatlog_email");
    sessionStorage.removeItem("chatlog_password");
    setAuthenticated(false);
    setEmail("");
    setPassword("");
    setStats(null);
    setConversations([]);
    setSelectedSession(null);
    setSelectedMessages([]);
  };

  const loadDashboard = useCallback(async () => {
    try {
      const [statsData, convsData] = await Promise.all([
        fetchData("/api/chat-log/data?type=stats"),
        fetchData("/api/chat-log/data?type=conversations"),
      ]);
      setStats(statsData);
      setConversations(convsData.conversations || []);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    }
  }, [fetchData]);

  useEffect(() => {
    if (!authenticated || !schemaInitialized) return;
    setLoading(true);
    loadDashboard().finally(() => setLoading(false));
  }, [authenticated, schemaInitialized, loadDashboard]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboard();
    // If a conversation is selected, reload its messages too
    if (selectedSession) {
      try {
        const data = await fetchData(
          `/api/chat-log/data?type=messages&session=${selectedSession}`
        );
        setSelectedMessages(data.messages || []);
      } catch (error) {
        console.error("Failed to refresh messages:", error);
      }
    }
    setRefreshing(false);
  };

  const loadMessages = async (sessionId: string) => {
    setSelectedSession(sessionId);
    try {
      const data = await fetchData(
        `/api/chat-log/data?type=messages&session=${sessionId}`
      );
      setSelectedMessages(data.messages || []);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      const data = await fetchData("/api/chat-log/data?type=conversations");
      setConversations(data.conversations || []);
      return;
    }
    try {
      const data = await fetchData(
        `/api/chat-log/data?type=conversations&search=${encodeURIComponent(searchQuery)}`
      );
      setConversations(data.conversations || []);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString("en-US", {
      timeZone: "America/New_York",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatTimeAgo = (dateStr: string) => {
    const now = new Date();
    const d = new Date(dateStr);
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDays = Math.floor(diffHr / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateStr);
  };

  // ── Login Gate ──────────────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-md shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#1B3A4B]/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#1B3A4B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-gray-900 font-bold text-lg">Chat Logs</h1>
              <p className="text-gray-500 text-sm">
                Sign in to view conversations
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-gray-600 text-sm block mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  document.getElementById("chatlog-password-input")?.focus()
                }
                placeholder="admin@example.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#1B3A4B] focus:ring-1 focus:ring-[#1B3A4B]/20 placeholder-gray-400"
                autoFocus
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm block mb-1.5">
                Password
              </label>
              <input
                id="chatlog-password-input"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter your password"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#1B3A4B] focus:ring-1 focus:ring-[#1B3A4B]/20 placeholder-gray-400"
              />
            </div>
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <button
              onClick={handleLogin}
              disabled={!emailInput.trim() || !passwordInput.trim()}
              className="w-full bg-[#1B3A4B] hover:bg-[#264653] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors text-sm"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Authenticated Dashboard ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1B3A4B]/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#1B3A4B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Chat Conversations
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-[#1B3A4B] bg-[#1B3A4B]/5 hover:bg-[#1B3A4B]/10 rounded-lg transition-colors disabled:opacity-50"
            >
              <svg
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-3 border-[#1B3A4B] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                  label="Total Conversations"
                  value={stats.total_conversations}
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                  }
                />
                <StatCard
                  label="Total Messages"
                  value={stats.total_messages}
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  }
                />
                <StatCard
                  label="Today"
                  value={stats.today_conversations}
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                />
                <StatCard
                  label="Avg Messages/Chat"
                  value={stats.avg_messages_per_conversation}
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  }
                />
              </div>
            )}

            {/* Top Pages */}
            {stats && stats.top_pages && stats.top_pages.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-3">
                  Most Active Pages
                </h2>
                <div className="space-y-2">
                  {stats.top_pages.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-600 truncate max-w-[80%]">
                        {p.page_path}
                      </span>
                      <span className="text-gray-900 font-medium">
                        {p.count} chats
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search + Conversation List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Conversation list */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {/* Search bar */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Search conversations..."
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B3A4B] focus:ring-1 focus:ring-[#1B3A4B]/20"
                      />
                      <button
                        onClick={handleSearch}
                        className="px-3 py-2 bg-[#1B3A4B] text-white text-sm rounded-lg hover:bg-[#264653] transition-colors"
                      >
                        Search
                      </button>
                    </div>
                  </div>

                  {/* Conversation items */}
                  <div className="max-h-[600px] overflow-y-auto divide-y divide-gray-100">
                    {conversations.length === 0 ? (
                      <div className="p-8 text-center text-gray-400 text-sm">
                        No conversations yet
                      </div>
                    ) : (
                      conversations.map((conv) => (
                        <button
                          key={conv.session_id}
                          onClick={() => loadMessages(conv.session_id)}
                          className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                            selectedSession === conv.session_id
                              ? "bg-[#1B3A4B]/5 border-l-3 border-l-[#1B3A4B]"
                              : ""
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-gray-500 uppercase">
                              {conv.device_type}
                            </span>
                            <span className="text-xs text-gray-400">
                              {formatTimeAgo(conv.last_message_at)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 truncate">
                            {conv.page_path}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {conv.message_count} messages
                          </p>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Conversation detail */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {selectedSession ? (
                    <>
                      <div className="px-5 py-4 border-b border-gray-100">
                        <h2 className="text-sm font-semibold text-gray-700">
                          Conversation Detail
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Session: {selectedSession}
                        </p>
                      </div>
                      <div className="p-5 max-h-[550px] overflow-y-auto space-y-4">
                        {selectedMessages.map((msg, i) => (
                          <div
                            key={i}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                                msg.role === "user"
                                  ? "bg-[#1B3A4B] text-white"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              <p className="whitespace-pre-wrap">
                                {msg.content}
                              </p>
                              <p
                                className={`text-xs mt-2 ${msg.role === "user" ? "text-white/60" : "text-gray-400"}`}
                              >
                                {formatDate(msg.created_at)}
                              </p>
                            </div>
                          </div>
                        ))}
                        {selectedMessages.length === 0 && (
                          <p className="text-center text-gray-400 text-sm py-8">
                            No messages found for this session
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center py-20 text-gray-400">
                      <div className="text-center">
                        <svg
                          className="w-12 h-12 mx-auto mb-3 text-gray-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <p className="text-sm">
                          Select a conversation to view details
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#1B3A4B]/10 rounded-lg flex items-center justify-center text-[#1B3A4B]">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}
