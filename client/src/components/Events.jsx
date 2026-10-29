import { useState, useEffect } from "react";
import { CalendarDays, ArrowRight } from "lucide-react";
import api from "../api/api.js";
import { event as fallbackEvents } from "../data/events.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

function getImageUrl(image) {
  if (!image) return "";
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        const items = Array.isArray(response.data) && response.data.length > 0
          ? response.data
          : fallbackEvents;

        const formattedEvents = items.map((item) => ({
          ...item,
          photo: getImageUrl(item.image || item.photo),
          title: item.title || item.name || "School Event",
          description: item.description || item.big || item.small || "",
          shortDesc: item.small || item.description || "",
        }));

        if (!cancelled) {
          setEvents(formattedEvents);
        }
      } catch {
        if (!cancelled) {
          setEvents(
            fallbackEvents.map((item) => ({
              ...item,
              title: item.name,
              description: item.big || item.small,
              shortDesc: item.small,
            }))
          );
        }
      }
    };

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, []);

  const displayEvents = events.length > 0 ? events : fallbackEvents;

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-slate-100" id="events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200 mb-3">
            <CalendarDays size={14} className="text-emerald-600" />
            Campus Happenings
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-heading">
            School Calendar & Key Events
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Stay connected with annual festivals, science fairs, sports tournaments, and parent-teacher assemblies at Beza School.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayEvents.map((item, index) => {
            const isExpanded = expandedId === item.id;

            return (
              <article
                key={item.id || index}
                className="group relative h-[480px] rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-end"
              >
                {/* Background Image */}
                {item.photo && (
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                )}

                {/* Dark Gradient Overlay for Maximum Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/25" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-400 text-xs font-bold border border-white/10 shadow-sm">
                    <CalendarDays size={13} />
                    Upcoming Event
                  </span>
                </div>

                {/* Bottom Content Card */}
                <div className="relative z-10 p-6 sm:p-7 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading leading-snug">
                    {item.title}
                  </h3>

                  <p
                    className={`text-slate-300 text-sm leading-relaxed transition-all ${
                      isExpanded ? "line-clamp-none" : "line-clamp-3"
                    }`}
                  >
                    {item.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                    >
                      <span>{isExpanded ? "Show Less" : "Read Details"}</span>
                      <ArrowRight size={14} className={isExpanded ? "-rotate-90" : ""} />
                    </button>

                    <span className="text-[11px] text-slate-400 font-medium">
                      Beza School Campus
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
