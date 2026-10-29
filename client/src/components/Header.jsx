import { useState, useEffect, useMemo } from "react";
import { Search, ImageOff } from "lucide-react";
import api from "../api/api.js";

import imgGrad from "../assets/grad.jpg";
import imgScience from "../assets/high1.jpg";
import imgCampus from "../assets/image8.jpg";
import imgArt from "../assets/image1.jpg";
import imgPlay from "../assets/playing.jpg";
import imgStudy from "../assets/stdying.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

const fallbackPhotos = [
  {
    id: "f-1",
    real: imgGrad,
    disc: "Grade 12 Graduation & Academic Honors Ceremony",
    year: 2024,
    tags: ["Graduation", "Honors", "Ceremony"],
  },
  {
    id: "f-2",
    real: imgScience,
    disc: "Secondary Science & Robotics Innovation Exhibition",
    year: 2024,
    tags: ["Science", "STEM", "Exhibition"],
  },
  {
    id: "f-3",
    real: imgCampus,
    disc: "Campus Courtyard & Modern Academic Facilities",
    year: 2023,
    tags: ["Campus", "Facilities"],
  },
  {
    id: "f-4",
    real: imgPlay,
    disc: "Inter-School Sports Day & Track Athletics",
    year: 2023,
    tags: ["Sports", "Athletics", "Teamwork"],
  },
  {
    id: "f-5",
    real: imgStudy,
    disc: "Primary Years Collaborative Inquiry & Reading Circle",
    year: 2022,
    tags: ["Academics", "Primary", "Library"],
  },
  {
    id: "f-6",
    real: imgArt,
    disc: "Visual Arts, Painting & Traditional Culture Day",
    year: 2022,
    tags: ["Arts", "Culture", "Creativity"],
  },
];

function getImageUrl(image) {
  if (!image) return "";
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
}

function getYear(item) {
  const value = item.year ?? item.eventDate ?? item.date ?? item.createdAt;
  if (!value) return null;

  const parsedYear =
    typeof value === "number"
      ? value
      : /^\d{4}$/.test(String(value))
      ? Number(value)
      : new Date(value).getFullYear();

  return Number.isFinite(parsedYear) && parsedYear >= 1000 && parsedYear <= 9999
    ? parsedYear
    : null;
}

function getTags(item) {
  const value = item.tags ?? item.category ?? item.tag;

  if (Array.isArray(value)) {
    return value
      .filter(Boolean)
      .map(String)
      .flatMap((tag) => tag.split(","))
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

export default function Timeline() {
  const [activeYear, setActiveYear] = useState("All");
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function fetchGallery() {
      try {
        const response = await api.get("/gallery");
        const items = Array.isArray(response.data) && response.data.length > 0
          ? response.data
          : fallbackPhotos;

        const formattedPhotos = items.map((item, index) => ({
          id: item.id ?? `photo-${index}`,
          real: item.real || getImageUrl(item.image || item.photo || item.url),
          disc: item.disc || item.description || item.title || item.name || "Campus memory",
          year: getYear(item) || item.year || 2024,
          tags: getTags(item).length > 0 ? getTags(item) : (item.tags || ["Campus"]),
        }));

        if (!cancelled) {
          setPhotos(formattedPhotos);
        }
      } catch {
        if (!cancelled) {
          setPhotos(fallbackPhotos);
        }
      }
    }

    fetchGallery();

    return () => {
      cancelled = true;
    };
  }, []);

  const years = useMemo(() => {
    const availableYears = [
      ...new Set(photos.map((photo) => photo.year).filter((year) => year !== null)),
    ].sort((a, b) => b - a);

    return ["All", ...availableYears];
  }, [photos]);

  const allTags = useMemo(() => {
    const availableTags = [
      ...new Set(photos.flatMap((photo) => photo.tags)),
    ].sort((a, b) => a.localeCompare(b));

    return ["All", ...availableTags];
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const yearMatch =
        activeYear === "All" || String(photo.year) === String(activeYear);

      const tagMatch =
        activeTag === "All" ||
        photo.tags.some(
          (tag) => tag.toLowerCase() === activeTag.toLowerCase()
        );

      const searchMatch = photo.disc
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return yearMatch && tagMatch && searchMatch;
    });
  }, [photos, activeYear, activeTag, search]);

  const clearFilters = () => {
    setActiveYear("All");
    setActiveTag("All");
    setSearch("");
  };

  return (
    <section className="w-full bg-slate-50 font-sans pb-24" id="gallery">
      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Photo Archive & Milestone Timeline
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Browse through our campus history by academic year, topic, or keyword.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 transition-colors group-focus-within:text-emerald-600" />
            <input
              type="text"
              placeholder="Search memories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white shadow-sm text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
            Filter:
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTag === tag
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-105"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300"
              }`}
            >
              {tag === "All" ? "All Tags" : `#${tag}`}
            </button>
          ))}

          {(activeTag !== "All" || activeYear !== "All" || search !== "") && (
            <button
              onClick={clearFilters}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Layout: Year Rail + Photo Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Timeline Rail */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm sticky top-28">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-3">
              Timeline Years
            </h3>
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 no-scrollbar">
              {years.map((year) => {
                const isActive = String(activeYear) === String(year);

                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setActiveYear(year)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all w-full flex-shrink-0 ${
                      isActive
                        ? "bg-emerald-50 text-emerald-800 font-bold shadow-sm border border-emerald-200"
                        : "text-slate-600 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isActive
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {year === "All" ? "✦" : "'" + String(year).slice(-2)}
                    </div>
                    <span className="text-sm">
                      {year === "All" ? "All History" : `Year ${year}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="lg:col-span-9">
          {filteredPhotos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((item) => (
                <article
                  key={item.id}
                  className="group relative overflow-hidden rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 h-72 sm:h-80 border border-slate-200 bg-slate-900"
                >
                  {item.real ? (
                    <img
                      src={item.real}
                      alt={item.disc}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                      <ImageOff size={32} />
                    </div>
                  )}

                  {/* Gradient Overlay & Caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <p className="text-white font-bold text-base leading-snug mb-2.5">
                      {item.disc}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.year && (
                        <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-emerald-600 text-white">
                          {item.year}
                        </span>
                      )}

                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-white/20 text-white backdrop-blur-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-16 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ImageOff size={28} />
              </div>
              <h4 className="text-lg font-bold text-slate-800">No Memories Found</h4>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                No photos match the selected filters. Try searching for another term or clearing filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
