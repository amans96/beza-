import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Trophy, Award, ChevronLeft, ChevronRight, X, Sparkles, Star } from "lucide-react";
import api from "../api/api.js";
import { achievers as fallbackAchievers } from "../data/achieversData.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

function getImageUrl(image) {
  if (!image) return "";
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
}

export default function Achievers() {
  const [achievers, setAchievers] = useState(fallbackAchievers);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollContainerRef = useRef(null);

  // Fetch achievers from backend, fall back to default academic achievers if offline/empty
  useEffect(() => {
    let cancelled = false;

    async function fetchAchievers() {
      try {
        const response = await api.get("/achievers");
        if (cancelled) return;

        const items = Array.isArray(response.data) && response.data.length > 0
          ? response.data
          : fallbackAchievers;

        const formatted = items.map((item, index) => ({
          ...item,
          id: item.id ?? index + 1,
          badge: item.badge || `Rank ${item.rank || index + 1}`,
          year: item.year || item.achievementClass || "Honors",
          photo: item.photo ? getImageUrl(item.photo) : "",
          achievement: item.achievement || item.description || "Outstanding academic and personal achievement.",
        }));

        setAchievers(formatted);
      } catch {
        if (!cancelled) {
          setAchievers(fallbackAchievers);
        }
      }
    }

    fetchAchievers();

    return () => {
      cancelled = true;
    };
  }, []);

  const displayList = useMemo(() => {
    return achievers.length > 0 ? achievers : fallbackAchievers;
  }, [achievers]);

  // Infinite ticker list
  const infiniteAchievers = useMemo(() => {
    return displayList.length > 0
      ? [...displayList, ...displayList, ...displayList]
      : [];
  }, [displayList]);

  // Smooth auto-scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || displayList.length === 0) return;

    let animationId;
    let previousTime = 0;
    let paused = false;
    const speed = 32; // px per sec

    const animate = (time) => {
      if (paused) return;

      if (previousTime !== 0) {
        const delta = (time - previousTime) / 1000;
        container.scrollLeft += speed * delta;
      }

      previousTime = time;

      const firstSetWidth = container.scrollWidth / 3;
      if (firstSetWidth > 0 && container.scrollLeft >= firstSetWidth) {
        container.scrollLeft -= firstSetWidth;
      }

      animationId = requestAnimationFrame(animate);
    };

    const pause = () => {
      paused = true;
    };

    const resume = () => {
      paused = false;
      previousTime = 0;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);
    container.addEventListener("touchstart", pause, { passive: true });
    container.addEventListener("touchend", resume, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
      container.removeEventListener("touchstart", pause);
      container.removeEventListener("touchend", resume);
    };
  }, [displayList]);

  const handleCardClick = (index) => {
    const actualIndex = index % displayList.length;
    setSelectedIndex(actualIndex);
    setCurrentIndex(actualIndex);
  };

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? displayList.length - 1 : prev - 1));
  }, [displayList.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === displayList.length - 1 ? 0 : prev + 1));
  }, [displayList.length]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedIndex === null) return;
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev, handleClose]);

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 via-emerald-50/25 to-slate-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy size={14} className="text-emerald-700" />
            Student Hall of Fame
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-heading">
            Celebrating Academic Excellence
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Meet our exceptional students who achieved outstanding examination scores, national competitions, and university placements through Beza School.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-6 pt-2 no-scrollbar cursor-grab active:cursor-grabbing select-none"
        >
          {infiniteAchievers.map((achiever, index) => (
            <div
              key={`${achiever.id}-${index}`}
              onClick={() => handleCardClick(index)}
              className="flex-shrink-0 w-72 sm:w-80 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-300 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Star size={12} className="fill-emerald-500 text-emerald-500" />
                    {achiever.badge}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    {achiever.year}
                  </span>
                </div>

                {/* Student Photo & Name */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 ring-2 ring-emerald-500/20 flex-shrink-0">
                    {achiever.photo ? (
                      <img
                        src={achiever.photo}
                        alt={achiever.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-600 font-bold text-xl">
                        {achiever.name?.charAt(0) || "B"}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-base truncate">
                      {achiever.name}
                    </h3>
                    <p className="text-xs text-emerald-600 font-semibold">
                      Beza School Achiever
                    </p>
                  </div>
                </div>

                {/* Achievement Blurb */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {achiever.achievement}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                <span>View story</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Dialog for Achiever Detail */}
      {selectedIndex !== null && displayList[currentIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="achiever-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            {/* Previous & Next Floating Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white shadow-lg border border-slate-200 text-slate-700 hover:text-emerald-600 hover:scale-105 transition-all"
              aria-label="Previous achiever"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white shadow-lg border border-slate-200 text-slate-700 hover:text-emerald-600 hover:scale-105 transition-all"
              aria-label="Next achiever"
            >
              <ChevronRight size={20} />
            </button>

            {/* Modal Body */}
            <div className="px-6 sm:px-8 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
                <div className="w-24 h-24 rounded-3xl overflow-hidden bg-slate-100 ring-4 ring-emerald-500/20 shadow-md flex-shrink-0">
                  {displayList[currentIndex].photo ? (
                    <img
                      src={displayList[currentIndex].photo}
                      alt={displayList[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-emerald-100 text-emerald-700 text-3xl font-bold">
                      {displayList[currentIndex].name?.charAt(0) || "A"}
                    </div>
                  )}
                </div>

                <div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-2">
                    <Award size={14} />
                    {displayList[currentIndex].badge}
                  </span>
                  <h3 id="achiever-modal-title" className="text-2xl font-bold text-slate-900 font-heading">
                    {displayList[currentIndex].name}
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    {displayList[currentIndex].year} • Beza School
                  </p>
                </div>
              </div>

              {/* Achievement Box */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 mb-6">
                <p className="text-xs uppercase font-bold tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-emerald-600" />
                  Key Achievement
                </p>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {displayList[currentIndex].achievement}
                </p>
              </div>

              {/* Pagination info */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                <span>
                  Profile {currentIndex + 1} of {displayList.length}
                </span>
                <span className="text-emerald-600 font-semibold">
                  Beza Alumni & Scholars
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}