
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Trophy,
  Users,
  CalendarDays,
  Images,
  Settings,
  LogOut,
  GraduationCap,
  ChevronLeft,
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
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Brand */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-200">
          <GraduationCap size={25} />
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900">
            Beza School
          </h1>
          <p className="text-xs font-medium text-slate-500">
            Administration
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 pt-7">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
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
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
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
                          ? "text-blue-600"
                          : "text-slate-400 group-hover:text-slate-700"
                      }
                    />
                    <span className="flex-1">{item.label}</span>

                    {isActive && (
                      <span className="h-5 w-1 rounded-full bg-blue-600" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom user section */}
      <div className="mt-auto border-t border-slate-100 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            {(user?.name || "Admin").charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">
              {user?.name || "Administrator"}
            </p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>

          <ChevronLeft size={16} className="text-slate-400" />
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={19} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
