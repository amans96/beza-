import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  ChevronRight,
  Command,
  Menu,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const pageTitles = {
  "/admin": "Dashboard Overview",
  "/admin/achievers": "Student Achievers",
  "/admin/clubs": "Clubs & Activities",
  "/admin/events": "School Events",
  "/admin/gallery": "Campus Gallery",
};

export default function AdminTopbar({ onMenuToggle }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const title = pageTitles[location.pathname] || "Administration";

  function handleSearch(event) {
    event.preventDefault();
    const query = search.trim().toLowerCase();
    if (!query) return;

    const pages = [
      { keywords: ["dashboard", "home", "overview"], path: "/admin" },
      { keywords: ["achiever", "achievement", "student", "trophy"], path: "/admin/achievers" },
      { keywords: ["club", "clubs", "activity"], path: "/admin/clubs" },
      { keywords: ["event", "events", "calendar"], path: "/admin/events" },
      { keywords: ["gallery", "photo", "photos", "image"], path: "/admin/gallery" },
    ];

    const match = pages.find((page) =>
      page.keywords.some((keyword) => keyword.includes(query) || query.includes(keyword))
    );

    if (match) {
      navigate(match.path);
      setSearch("");
    }
  }

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between gap-4 border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      {/* Current page & Mobile hamburger */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuToggle}
          className="p-2 -ml-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 md:hidden"
          aria-label="Open navigation sidebar"
        >
          <Menu size={22} />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span>Workspace</span>
            <ChevronRight size={13} />
            <span className="truncate text-slate-600 font-semibold">{title}</span>
          </div>

          <h2 className="mt-0.5 truncate text-lg sm:text-xl font-bold text-slate-900 font-heading">
            {title}
          </h2>
        </div>
      </div>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="hidden w-full max-w-sm items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition focus-within:border-emerald-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10 md:flex"
      >
        <Search size={18} className="shrink-0 text-slate-400" />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Jump to page (e.g. clubs, events)..."
          aria-label="Search admin workspace"
          className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
        <span className="flex shrink-0 items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-400">
          <Command size={11} />
          <span>K</span>
        </span>
      </form>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-3">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink size={13} />
        </a>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        <div className="flex items-center gap-3">
          <div className="hidden text-right lg:block">
            <p className="max-w-32 truncate text-sm font-bold text-slate-800">
              {user?.name || "Administrator"}
            </p>
            <p className="text-xs text-emerald-600 font-semibold">Admin Account</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-sm font-bold text-emerald-700 ring-2 ring-emerald-500/20 shadow-sm">
            {(user?.name || "A").charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
