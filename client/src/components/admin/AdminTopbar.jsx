
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  ChevronRight,
  Command,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const pageTitles = {
  "/admin": "Dashboard",
  "/admin/achievers": "Achievers",
  "/admin/clubs": "Clubs",
  "/admin/events": "Events",
  "/admin/gallery": "Gallery",
  "/admin/settings": "Settings",
  "/admin/notifications": "Notifications",
};

export default function AdminTopbar() {
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
      { keywords: ["achiever", "achievement", "student"], path: "/admin/achievers" },
      { keywords: ["club", "clubs"], path: "/admin/clubs" },
      { keywords: ["event", "events"], path: "/admin/events" },
      { keywords: ["gallery", "photo", "photos", "image"], path: "/admin/gallery" },
      { keywords: ["setting", "settings"], path: "/admin/settings" },
      { keywords: ["notification", "notifications"], path: "/admin/notifications" },
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
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      {/* Current page */}
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Workspace</span>
          <ChevronRight size={13} />
          <span className="truncate text-slate-600">{title}</span>
        </div>

        <h2 className="mt-1 truncate text-lg font-bold text-slate-900">
          {title}
        </h2>
      </div>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="hidden w-full max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 md:flex"
      >
        <Search size={18} className="shrink-0 text-slate-400" />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search admin pages..."
          aria-label="Search admin pages"
          className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />

        <span className="flex shrink-0 items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-1 text-xs text-slate-400">
          <Command size={12} />
          <span>K</span>
        </span>
      </form>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => navigate("/admin/notifications")}
          aria-label="Open notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
        >
          <Bell size={19} />
        </button>

        <div className="hidden h-9 w-px bg-slate-200 sm:block" />

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="max-w-32 truncate text-sm font-semibold text-slate-800">
              {user?.name || "Administrator"}
            </p>
            <p className="text-xs text-slate-500">Admin account</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 ring-2 ring-white">
            {(user?.name || "Admin").charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
