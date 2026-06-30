"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  BookOpen,
  CircleHelp,
  FilePen,
  Sparkles,
  Code2,
  Map,
  Brain,
  Settings,
  LogOut,
  Pencil,
  Wand2,
  Workflow,
  LayoutGrid,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";
import "../sketch-theme.css";

interface SketchLayoutProps {
  children: React.ReactNode;
  totalCount?: number;
  blogCount?: number;
  faqCount?: number;
  onLogout: () => void;
}

// Rotation values for nav items
const NAV_ROTATIONS = [-0.6, 0.9, -1.1, 1.3, -0.8, 1.1, -1.4, 0.7, -0.9, 0.6, -1.2];

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  count?: number;
  active: boolean;
  rotation: number;
  labelClassName?: string;
}

function NavItem({ href, icon: Icon, label, count, active, rotation, labelClassName }: NavItemProps) {
  return (
    <Link
      href={href}
      className="block w-full transition-all duration-200"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div
        className={`flex items-center justify-between px-4 py-3 transition-all duration-200 ${
          active
            ? "bg-[#ffdd57] border-[2.5px] border-[#2b2b2b] shadow-[3px_3px_0_#2b2b2b]"
            : "border-[2.5px] border-transparent hover:border-[#2b2b2b] hover:bg-white/60"
        }`}
        style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-[#2b2b2b]" style={{ strokeWidth: 2.4 }} />
          <span className={`text-base text-[#2b2b2b] ${labelClassName ?? ""}`}>{label}</span>
        </div>
        {count !== undefined && (
          <span
            className="text-sm px-2.5 py-0.5 border-[2px] border-[#2b2b2b] bg-white text-[#2b2b2b]"
            style={{ borderRadius: "120px 8px 120px 8px / 8px 120px 8px 120px" }}
          >
            {count}
          </span>
        )}
      </div>
    </Link>
  );
}

export default function SketchLayout({
  children,
  totalCount,
  blogCount,
  faqCount,
  onLogout,
}: SketchLayoutProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin/github-editor") {
      return pathname === "/admin/github-editor" || pathname === "/admin/github-editor/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen flex sketch-font-body" style={{ fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive" }}>
      {/* SVG Filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <filter id="rough-paper">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
        </filter>
      </svg>

      {/* ═══ SIDEBAR ═══ */}
      <aside
        className="w-[270px] shrink-0 sticky top-0 h-screen flex flex-col overflow-y-auto sketch-scrollbar"
        style={{
          borderRight: "3px dashed #2b2b2b",
          backgroundColor: "#fdfcf5",
          backgroundImage: `
            linear-gradient(to right, rgba(220,80,80,0.18) 0 1px, transparent 1px),
            repeating-linear-gradient(to bottom, transparent 0 31px, rgba(70,110,170,0.16) 31px 32px)
          `,
          backgroundPosition: "56px 0, 0 0",
          backgroundRepeat: "no-repeat, repeat",
        }}
      >
        {/* Logo */}
        <div className="px-5 py-5 flex items-center gap-2.5">
          <Pencil className="w-5 h-5 text-[#2b2b2b]" style={{ strokeWidth: 2.6 }} />
          <span
            className="text-xl font-bold text-[#2b2b2b]"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            MediDoodle CMS
          </span>
        </div>

        {/* Content Section */}
        <div className="px-4 mt-2">
          <p className="text-xs text-[#888888] italic px-2 mb-2" style={{ fontFamily: "'Patrick Hand', cursive" }}>
            — content —
          </p>
          <div className="space-y-2">
            <NavItem
              href="/admin/github-editor"
              icon={FileText}
              label="All Articles"
              count={totalCount}
              active={isActive("/admin/github-editor") && !pathname.includes("/blog") && !pathname.includes("/faq") && !pathname.includes("/create") && !pathname.includes("/edit") && !pathname.includes("/drafts") && !pathname.includes("/sitemap") && !pathname.includes("/content-intelligence") && !pathname.includes("/settings") && !pathname.includes("/theme-preview")}
              rotation={NAV_ROTATIONS[0]}
            />
            <NavItem
              href="/admin/github-editor/blog"
              icon={BookOpen}
              label="Blog"
              count={blogCount}
              active={isActive("/admin/github-editor/blog")}
              rotation={NAV_ROTATIONS[1]}
            />
            <NavItem
              href="/admin/github-editor/faq"
              icon={CircleHelp}
              label="FAQ"
              count={faqCount}
              active={isActive("/admin/github-editor/faq")}
              rotation={NAV_ROTATIONS[2]}
            />
            <NavItem
              href="/admin/github-editor/drafts"
              icon={FilePen}
              label="Drafts"
              active={isActive("/admin/github-editor/drafts")}
              rotation={NAV_ROTATIONS[3]}
            />
            <NavItem
              href="/admin/github-editor/pages"
              icon={LayoutGrid}
              label="Pages"
              active={isActive("/admin/github-editor/pages")}
              rotation={NAV_ROTATIONS[1]}
            />
          </div>
        </div>

        {/* Tools Section */}
        <div className="px-4 mt-6">
          <p className="text-xs text-[#888888] italic px-2 mb-2" style={{ fontFamily: "'Patrick Hand', cursive" }}>
            — tools & data —
          </p>
          <div className="space-y-2">
            <NavItem
              href="/admin/github-editor/create-from-keyword"
              icon={Wand2}
              label="From Keyword"
              active={isActive("/admin/github-editor/create-from-keyword")}
              rotation={NAV_ROTATIONS[4]}
            />
            <NavItem
              href="/admin/github-editor/create-smart"
              icon={Sparkles}
              label="Smart Create"
              active={isActive("/admin/github-editor/create-smart")}
              rotation={NAV_ROTATIONS[5]}
            />
            <NavItem
              href="/admin/github-editor/create"
              icon={Code2}
              label="HTML Create"
              active={isActive("/admin/github-editor/create")}
              rotation={NAV_ROTATIONS[6]}
            />
            <NavItem
              href="/admin/github-editor/sitemap"
              icon={Map}
              label="Sitemaps"
              active={isActive("/admin/github-editor/sitemap")}
              rotation={NAV_ROTATIONS[7]}
            />
            <NavItem
              href="/admin/github-editor/content-intelligence"
              icon={Brain}
              label="Intelligence"
              active={isActive("/admin/github-editor/content-intelligence")}
              rotation={NAV_ROTATIONS[8]}
            />
            <NavItem
              href="/admin/github-editor/pipeline"
              icon={Workflow}
              label="Pipeline"
              active={isActive("/admin/github-editor/pipeline") && !pathname.includes("/pipeline/calendar")}
              rotation={NAV_ROTATIONS[10]}
              labelClassName="font-bold text-green-600"
            />
            <NavItem
              href="/admin/github-editor/pipeline/calendar"
              icon={CalendarDays}
              label="Calendar"
              active={isActive("/admin/github-editor/pipeline/calendar")}
              rotation={NAV_ROTATIONS[3]}
            />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-auto px-4 pb-5 space-y-2">
          <NavItem
            href="/admin/github-editor/security"
            icon={ShieldCheck}
            label="Security (2FA)"
            active={isActive("/admin/github-editor/security")}
            rotation={NAV_ROTATIONS[8]}
          />
          <NavItem
            href="/admin/github-editor/settings"
            icon={Settings}
            label="Settings"
            active={isActive("/admin/github-editor/settings")}
            rotation={NAV_ROTATIONS[9]}
          />
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 text-[#c0392b] hover:bg-[#fef2f2] w-full transition-colors"
            style={{
              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
              transform: `rotate(${NAV_ROTATIONS[10]}deg)`,
            }}
          >
            <LogOut className="w-5 h-5" style={{ strokeWidth: 2.4 }} />
            <span className="text-base">Logout</span>
          </button>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <main
        className="flex-1 flex flex-col min-h-screen sketch-scrollbar"
        style={{
          backgroundColor: "#fdfbf3",
          backgroundImage: "radial-gradient(rgba(60,60,60,0.13) 1.2px, transparent 1.2px)",
          backgroundSize: "22px 22px",
        }}
      >
        {children}
      </main>
    </div>
  );
}
