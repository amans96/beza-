import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Trophy,
  CalendarDays,
  Images,
  ArrowUpRight,
  Clock3,
  Plus,
  Activity,
  Settings,
  ChevronRight,
} from "lucide-react";

const overviewItems = [
  {
    title: "Total Achievers",
    value: "—",
    description: "Student achievements",
    icon: Trophy,
    color: "blue",
  },
  {
    title: "Active Clubs",
    value: "—",
    description: "School clubs",
    icon: Users,
    color: "violet",
  },
  {
    title: "Upcoming Events",
    value: "—",
    description: "Scheduled school events",
    icon: CalendarDays,
    color: "amber",
  },
  {
    title: "Gallery Items",
    value: "—",
    description: "Photos and memories",
    icon: Images,
    color: "emerald",
  },
];

const managementItems = [
  {
    title: "Achievers",
    description: "Manage student achievements and awards.",
    icon: Trophy,
    color: "blue",
    path: "/admin/achievers",
  },
  {
    title: "Clubs",
    description: "Manage school clubs and memberships.",
    icon: Users,
    color: "violet",
    path: "/admin/clubs",
  },
  {
    title: "Events",
    description: "Create and organize school events.",
    icon: CalendarDays,
    color: "amber",
    path: "/admin/events",
  },
  {
    title: "Gallery",
    description: "Manage school photos and media.",
    icon: Images,
    color: "emerald",
    path: "/admin/gallery",
  },
];

const recentActivities = [];

const colorStyles = {
  blue: {
    icon: "bg-blue-50 text-blue-600",
    hover: "group-hover:bg-blue-600",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600",
    hover: "group-hover:bg-violet-600",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600",
    hover: "group-hover:bg-amber-500",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600",
    hover: "group-hover:bg-emerald-600",
  },
};

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Welcome section */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold text-blue-600">
              BEZA SCHOOL · ADMINISTRATION
            </p>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back, {user?.name || "Administrator"}
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Here's what's happening with your school website.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            Sign out
            <ArrowUpRight size={16} />
          </button>
        </section>

        {/* Overview cards */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Website overview</h2>
              <p className="mt-1 text-sm text-slate-500">
                A quick look at your content.
              </p>
            </div>

            <Activity size={20} className="text-slate-400" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {overviewItems.map((item) => {
              const Icon = item.icon;
              const colors = colorStyles[item.color];

              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {item.title}
                      </p>
                      <p className="mt-3 text-3xl font-bold tracking-tight">
                        {item.value}
                      </p>
                    </div>

                    <div className={`rounded-xl p-3 ${colors.icon}`}>
                      <Icon size={21} />
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Management shortcuts */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Website management</h2>
              <p className="mt-1 text-sm text-slate-500">
                Quickly access the sections you manage.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {managementItems.map((item) => {
              const Icon = item.icon;
              const colors = colorStyles[item.color];

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >
                  <div
                    className={`rounded-xl p-3 transition group-hover:text-white ${colors.icon} ${colors.hover}`}
                  >
                    <Icon size={23} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </div>

                  <ChevronRight
                    size={20}
                    className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                  />
                </button>
              );
            })}
          </div>
        </section>

        {/* Recent activities */}
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
            <div>
              <h2 className="font-bold">Recent activity</h2>
              <p className="mt-1 text-sm text-slate-500">
                The latest 10 actions on your website.
              </p>
            </div>

            <div className="rounded-xl bg-slate-100 p-2.5">
              <Clock3 size={19} className="text-slate-600" />
            </div>
          </div>

          {recentActivities.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {recentActivities.slice(0, 10).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 px-5 py-4 sm:px-6"
                >
                  <div className="mt-0.5 rounded-full bg-blue-50 p-2 text-blue-600">
                    <Activity size={16} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">
                      {activity.description}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {activity.actor}
                    </p>
                  </div>

                  <time className="shrink-0 text-xs text-slate-400">
                    {activity.createdAt}
                  </time>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <Clock3 size={22} className="text-slate-500" />
              </div>

              <h3 className="mt-4 text-sm font-semibold">
                No recent activity yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                When an administrator creates, updates, or deletes website
                content, the latest activities will appear here.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-xs text-slate-500">
              Activity history will be connected to the backend.
            </p>

            <button
              type="button"
              onClick={() => navigate("/admin/achievers")}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              <Plus size={16} />
              Manage content
            </button>
          </div>
        </section>

        {/* Administration footer */}
        <footer className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Beza School Administration</p>
          <p className="inline-flex items-center gap-1.5">
            <Settings size={13} />
            Admin workspace
          </p>
        </footer>
      </div>
    </main>
  );
}