import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import api from "../api/api.js";
import { Clubs as fallbackClubs } from "../data/clubs.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

function getImageUrl(image) {
  if (!image) return "";
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
}

export default function Club() {
  const [clubs, setClubs] = useState(fallbackClubs);
  const [currentImage, setCurrentImage] = useState({});

  useEffect(() => {
    let cancelled = false;

    const fetchClubs = async () => {
      try {
        const response = await api.get("/clubs");
        const items = Array.isArray(response.data) && response.data.length > 0
          ? response.data
          : fallbackClubs;

        const formattedClubs = items.map((club) => {
          const images = Array.isArray(club.photos)
            ? club.photos
            : Array.isArray(club.photo)
              ? club.photo
              : club.image || club.photo
                ? [club.image || club.photo]
                : [];

          return {
            ...club,
            photo: images.map(getImageUrl),
            disc: club.description || club.disc || "",
          };
        });

        if (!cancelled) {
          setClubs(formattedClubs);
        }
      } catch {
        if (!cancelled) {
          setClubs(fallbackClubs);
        }
      }
    };

    fetchClubs();

    return () => {
      cancelled = true;
    };
  }, []);

  const nextImage = (id, length) => {
    if (length <= 1) return;
    setCurrentImage((prev) => ({
      ...prev,
      [id]: ((prev[id] ?? 0) + 1) % length,
    }));
  };

  const previousImage = (id, length) => {
    if (length <= 1) return;
    setCurrentImage((prev) => ({
      ...prev,
      [id]: ((prev[id] ?? 0) - 1 + length) % length,
    }));
  };

  const displayClubs = clubs.length > 0 ? clubs : fallbackClubs;

  return (
    <section className="py-20 sm:py-28 bg-slate-50 relative" id="clubs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Users size={14} className="text-emerald-700" />
            Extracurricular Life
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-heading">
            Student Clubs & Societies
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From science labs to charity outreach and varsity sports, our clubs inspire leadership, collaboration, and community impact.
          </p>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayClubs.map((club) => {
            const photos = club.photo || [];
            const imageIndex = currentImage[club.id] ?? 0;
            const currentImg = photos[imageIndex] || "";

            return (
              <div
                key={club.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Frame with Carousel Controls */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                    {currentImg ? (
                      <img
                        src={currentImg}
                        alt={club.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-emerald-950 text-emerald-400 font-bold">
                        {club.name}
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                    {/* Image indicator badge */}
                    {photos.length > 1 && (
                      <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                        {imageIndex + 1} / {photos.length}
                      </div>
                    )}

                    {/* Prev / Next controls */}
                    {photos.length > 1 && (
                      <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            previousImage(club.id, photos.length);
                          }}
                          className="pointer-events-auto w-8 h-8 rounded-full bg-slate-950/70 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                          aria-label={`Previous photo of ${club.name}`}
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage(club.id, photos.length);
                          }}
                          className="pointer-events-auto w-8 h-8 rounded-full bg-slate-950/70 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                          aria-label={`Next photo of ${club.name}`}
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Club Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors font-heading mb-3">
                      {club.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                      {club.disc}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>Student Activity</span>
                  <span>Join Club →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
