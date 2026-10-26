import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";

import {
  FaAngleLeft,
  FaAngleRight,
  FaTimes,
} from "react-icons/fa";

import api from "../api/api.js";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

function getImageUrl(image) {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
}

export default function Achievers() {
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);

  // Fetch achievers from the backend.
  useEffect(() => {
    let cancelled = false;

    async function fetchAchievers() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/achievers");

        if (cancelled) return;

        const items = Array.isArray(response.data)
          ? response.data
          : [];

        // Map backend fields to the existing UI fields.
        const formattedAchievers = items.map((item, index) => ({
          ...item,
          id: item.id ?? index + 1,
          badge: "🏆",
          year: item.achievementClass || "Achiever",
          logo: "",
          photo: getImageUrl(item.photo),
          achievement: item.description || "",
        }));

        setAchievers(formattedAchievers);
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to fetch achievers:", err);
          setError("Unable to load achievers. Please try again later.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchAchievers();

    return () => {
      cancelled = true;
    };
  }, []);

  // Duplicate the data to preserve the infinite scrolling effect.
  const infiniteAchievers = useMemo(
    () =>
      achievers.length > 0
        ? [...achievers, ...achievers, ...achievers]
        : [],
    [achievers]
  );

  // Automatic horizontal scrolling.
useEffect(() => {
  const container = scrollContainerRef.current;

  if (!container || achievers.length === 0) return;

  let animationId;
  let previousTime = 0;
  let paused = false;

  const speed = 35; // pixels per second

  const animate = (time) => {
    if (paused) return;

    if (previousTime !== 0) {
      const delta = (time - previousTime) / 1000;
      container.scrollLeft += speed * delta;
    }

    previousTime = time;

    // Width of one complete set of cards.
    const firstSetWidth = container.scrollWidth / 3;

    if (
      firstSetWidth > 0 &&
      container.scrollLeft >= firstSetWidth
    ) {
      container.scrollLeft -= firstSetWidth;
    }

    animationId = requestAnimationFrame(animate);
  };

  const pause = () => {
    paused = true;
    cancelAnimationFrame(animationId);
  };

  const resume = () => {
    if (!paused) return;

    paused = false;
    previousTime = 0;
    animationId = requestAnimationFrame(animate);
  };

  animationId = requestAnimationFrame(animate);

  container.addEventListener("mouseenter", pause);
  container.addEventListener("mouseleave", resume);

  return () => {
    cancelAnimationFrame(animationId);
    container.removeEventListener("mouseenter", pause);
    container.removeEventListener("mouseleave", resume);
  };
}, [achievers]);

  // Open the selected achiever.
  const handleCardClick = (index) => {
    if (achievers.length === 0) return;

    const actualIndex = index % achievers.length;

    setSelectedIndex(actualIndex);
    setCurrentIndex(actualIndex);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? achievers.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === achievers.length - 1 ? 0 : prev + 1
    );
  };

  // Keyboard navigation for the modal.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedIndex === null || achievers.length === 0) return;

      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, achievers.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#10b981] font-semibold uppercase tracking-wider text-sm bg-emerald-100 px-4 py-2 rounded-full inline-block">
            Our Achievers
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mt-4 text-gray-800">
            Success Stories
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Meet our amazing students who transformed their careers through CodeHub
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12 text-gray-600">
            Loading achievers...
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && achievers.length === 0 && (
          <div className="text-center py-12 text-gray-600">
            No achievers have been added yet.
          </div>
        )}

        {/* Horizontal scrolling cards */}
        {!loading && !error && achievers.length > 0 && (
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar cursor-grab"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              overflowX: "auto",
              scrollBehavior: "auto",
            }}
          >
            {infiniteAchievers.map((achiever, index) => (
              <div
                key={`${achiever.id}-${index}`}
                onClick={() => handleCardClick(index)}
                className="flex-shrink-0 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-emerald-200 cursor-pointer hover:scale-105 hover:border-emerald-400"
                style={{
                  width: "246px",
                  height: "353px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Badge */}
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-3 py-1.5 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-lg">{achiever.badge}</span>

                    <span className="text-white font-semibold text-xs">
                      {achiever.year}
                    </span>
                  </div>

                  <span className="text-white/70 text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                    #{index % achievers.length + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Logo and photo */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 min-w-0">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-emerald-50">
                        <span className="text-xl">🏆</span>
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm truncate">
                          {achiever.name}
                        </h3>
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden bg-gray-100">
                      {achiever.photo ? (
                        <img
                          src={achiever.photo}
                          alt={achiever.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No photo
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Achievement */}
                  <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100 flex-1">
                    <p className="text-gray-700 text-[11px] leading-relaxed line-clamp-4">
                      {achiever.achievement}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="mt-3 flex items-center justify-between text-[10px] text-gray-500 border-t border-emerald-100 pt-2 flex-shrink-0">
                    <div className="flex items-center space-x-1">
                      <span>⭐</span>
                      <span>Top Achiever</span>
                    </div>

                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                      Class of {achiever.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedIndex !== null && achievers[currentIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 text-xl transition-colors"
              aria-label="Close"
            >
              <FaTimes />
            </button>

            {/* Previous button */}
            <button
              onClick={(event) => {
                event.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg text-xl transition-all"
              aria-label="Previous achiever"
            >
              <FaAngleLeft />
            </button>

            {/* Next button */}
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg text-xl transition-all"
              aria-label="Next achiever"
            >
              <FaAngleRight />
            </button>

            {/* Modal content */}
            <div className="p-6 md:p-8">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  {achievers[currentIndex].photo ? (
                    <img
                      src={achievers[currentIndex].photo}
                      alt={achievers[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      🏆
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl">
                      {achievers[currentIndex].badge}
                    </span>

                    <h2 className="text-2xl font-bold text-gray-800">
                      {achievers[currentIndex].name}
                    </h2>
                  </div>

                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <span>🏅 {achievers[currentIndex].year}</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                <h3 className="font-semibold text-gray-800 mb-2">
                  🏆 Achievement
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  {achievers[currentIndex].achievement}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between text-sm text-gray-400 border-t border-emerald-100 pt-4">
                <span>
                  {currentIndex + 1} of {achievers.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}