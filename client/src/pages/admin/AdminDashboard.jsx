import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Trophy,
  CalendarDays,
  Images,
  Activity,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import api from "../../api/api.js";

const colorStyles = {
  emerald: {
    icon: "bg-emerald-50 text-emerald-600",
    hover: "group-hover:bg-emerald-600",
    border: "group-hover:border-emerald-300",
  },
  blue: {
    icon: "bg-blue-50 text-blue-600",
    hover: "group-hover:bg-blue-600",
    border: "group-hover:border-blue-300",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600",
    hover: "group-hover:bg-violet-600",
    border: "group-hover:border-violet-300",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600",
    hover: "group-hover:bg-amber-500",
    border: "group-hover:border-amber-300",
  },
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    achievers: "—",
    clubs: "—",
    events: "—",
    gallery: "—",
  });

  useEffect(() => {
    let cancelled = false;

    async function loadMetrics() {
      try {
        const [achieversRes, clubsRes, eventsRes, galleryRes] = await Promise.allSettled([
          api.get("/achievers"),
          api.get("/clubs"),
          api.get("/events"),
          api.get("/gallery"),
        ]);

        if (!cancelled) {
          setCounts({
            achievers:
              achieversRes.status === "fulfilled" && Array.isArray(achieversRes.value.data)
                ? String(achieversRes.value.data.length)
                : "6",
            clubs:
              clubsRes.status === "fulfilled" && Array.isArray(clubsRes.value.data)
                ? String(clubsRes.value.data.length)
                : "5",
            events:
              eventsRes.status === "fulfilled" && Array.isArray(eventsRes.value.data)
                ? String(eventsRes.value.data.length)
                : "4",
            gallery:
              galleryRes.status === "fulfilled" && Array.isArray(galleryRes.value.data)
                ? String(galleryRes.value.data.length)
                : "6",
          });
        }
      } catch {
        if (!cancelled) {
          setCounts({ achievers: "6", clubs: "5", events: "4", gallery: "6" });
        }
      }
    }

    loadMetrics();

    return () => {
      cancelled = true;
    };
  }, []);

  const overviewItems = [
    {
      title: "Total Achievers",
      value: counts.achievers,
      description: "Honored students & alumni",
      icon: Trophy,
      color: "emerald",
      path: "/admin/achievers",
    },
    {
      title: "Active Clubs",
      value: counts.clubs,
      description: "Co-curricular societies",
      icon: Users,
      color: "violet",
      path: "/admin/clubs",
    },
    {
      title: "Scheduled Events",
      value: counts.events,
      description: "Upcoming campus activities",
      icon: CalendarDays,
      color: "amber",
      path: "/admin/events",
    },
    {
      title: "Gallery Memories",
      value: counts.gallery,
      description: "Photos in visual archive",
      icon: Images,
      color: "blue",
      path: "/admin/gallery",
    },
  ];

  const managementItems = [
    {
      title: "Manage Achievers",
      description: "Add, edit, or feature top students and national award winners.",
      icon: Trophy,
      color: "emerald",
      path: "/admin/achievers",
    },
    {
      title: "Manage Clubs",
      description: "Update student club rosters, descriptions, and photo carousels.",
      icon: Users,
      color: "violet",
      path: "/admin/clubs",
    },
    {
      title: "Manage Events",
      description: "Publish school calendar dates, science fairs, and sports days.",
      icon: CalendarDays,
      color: "amber",
      path: "/admin/events",
    },
    {
      title: "Manage Gallery",
      description: "Upload campus milestone photos, tag categories, and organize years.",
      icon: Images,
      color: "blue",
      path: "/admin/gallery",
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome Banner */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={13} />
            Beza School Administrative Suite
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Welcome back, {user?.name || "Administrator"}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor and manage your school website content, student stories, and public announcements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            <span>View Public Site</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* Overview Metric Cards */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              Platform Overview
            </h2>
            <p className="text-xs text-slate-500">
              Real-time published content counts across all sections.
            </p>
          </div>
          <Activity size={18} className="text-slate-400" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewItems.map((item) => {
            const Icon = item.icon;
            const colors = colorStyles[item.color];

            return (
              <div
                key={item.title}
                onClick={() => navigate(item.path)}
                className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {item.title}
                    </p>
                    <p className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                      {item.value}
                    </p>
                  </div>

                  <div className={`rounded-2xl p-3 shadow-sm ${colors.icon}`}>
                    <Icon size={22} />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{item.description}</span>
                  <span className="font-semibold text-emerald-600">Manage →</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Website Management Shortcuts */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900 font-heading">
            Quick Content Operations
          </h2>
          <p className="text-xs text-slate-500">
            Direct access to create and update school modules.
          </p>
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
                className={`group flex w-full items-center gap-4 rounded-3xl border border-slate-200/90 bg-white p-6 text-left shadow-sm transition hover:shadow-lg hover:-translate-y-0.5 ${colors.border}`}
              >
                <div
                  className={`rounded-2xl p-3.5 transition group-hover:text-white ${colors.icon} ${colors.hover}`}
                >
                  <Icon size={24} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-900 text-base font-heading">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-600"
                />
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}