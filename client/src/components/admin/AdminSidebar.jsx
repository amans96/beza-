import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Trophy,
  Users,
  CalendarDays,
  Images,
  LogOut,
  GraduationCap,
  X,
  ExternalLink,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Achievers",
    path: "/admin/achievers",
    icon: Trophy,
  },
  {
    label: "Clubs",
    path: "/admin/clubs",
    icon: Users,
  },
  {
    label: "Events",
    path: "/admin/events",
    icon: CalendarDays,
  },
  {
    label: "Gallery",
    path: "/admin/gallery",
    icon: Images,
  },
];

export default function AdminSidebar({ onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="flex h-full w-full md:w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Brand Header */}
      <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/25">
            <GraduationCap size={24} />
          </div>

          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-900 font-heading">
              Beza School
            </h1>
            <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
              Administration
            </p>
          </div>
        </div>

        {/* Close Button for Mobile Drawer */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 space-y-6">
        <div>
          <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        className={
                          isActive
                            ? "text-emerald-600"
                            : "text-slate-400 group-hover:text-slate-700"
                        }
                      />
                      <span className="flex-1">{item.label}</span>

                      {isActive && (
                        <span className="h-5 w-1 rounded-full bg-emerald-600" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Public Website Shortcut */}
        <div className="pt-2">
          <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Quick Links
          </p>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
          >
            <ExternalLink size={15} />
            <span>Open Public Website</span>
          </a>
        </div>
      </div>

      {/* Bottom user section */}
      <div className="mt-auto border-t border-slate-100 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-2xl bg-slate-50 p-3 border border-slate-100">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-700">
            {(user?.name || "Admin").charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-slate-800">
              {user?.name || "Administrator"}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {user?.email || "admin@bezaschool.edu.et"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-rose-600"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
