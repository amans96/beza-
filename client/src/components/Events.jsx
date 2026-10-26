
import React, { useState, useEffect, useRef } from "react";
import api from "../api/api.js";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");
const DESCRIPTION_PREVIEW_LINES = 4;

function getImageUrl(image) {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
}

function EventDescription({ description, itemId }) {
  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const checkOverflow = () => {
      // Temporarily measure the text in its collapsed state.
      const previousDisplay = element.style.display;
      const previousClamp = element.style.webkitLineClamp;
      const previousOverflow = element.style.overflow;

      element.style.display = "-webkit-box";
      element.style.webkitBoxOrient = "vertical";
      element.style.webkitLineClamp = String(DESCRIPTION_PREVIEW_LINES);
      element.style.overflow = "hidden";

      const overflowing =
        element.scrollHeight > element.clientHeight + 1;

      element.style.display = previousDisplay;
      element.style.webkitLineClamp = previousClamp;
      element.style.overflow = previousOverflow;

      setHasOverflow(overflowing);
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(element);

    window.addEventListener("resize", checkOverflow);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkOverflow);
    };
  }, [description]);

  return (
    <>
      <p
        ref={textRef}
        className="text-white leading-7"
        style={
          expanded
            ? undefined
            : {
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: DESCRIPTION_PREVIEW_LINES,
                overflow: "hidden",
              }
        }
      >
        {description}
      </p>

      {hasOverflow && (
        <button
          onClick={() => setExpanded((previous) => !previous)}
          className="mt-5 font-semibold hover:translate-x-2 transition text-green-900"
          aria-expanded={expanded}
        >
          {expanded ? "See Less ←" : "See More →"}
        </button>
      )}
    </>
  );
}

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        const items = Array.isArray(response.data)
          ? response.data
          : [];

        const formattedEvents = items.map((item) => ({
          ...item,
          photo: getImageUrl(item.image || item.photo),
          description:
            item.description || item.small || item.big || "",
        }));

        if (!cancelled) {
          setEvents(formattedEvents);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to fetch events:", error);
        }
      }
    };

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <h1 className="mt-10 text-4xl font-extrabold tracking-tight text-green-400 text-center sm:text-5xl md:text-6xl">
        EVENTS
      </h1>

      <section className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {events.map((item) => (
            <div
              key={item.id}
              className="relative h-[500px] rounded-3xl overflow-hidden group shadow-xl"
              style={{
                backgroundImage: item.photo
                  ? `url("${item.photo}")`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 duration-300" />

              {/* Description */}
              <div className="absolute bottom-8 left-6 right-6">
                <div className="backdrop-blur-sm rounded-2xl p-5 shadow-xl">
                  <EventDescription
                    key={item.id}
                    itemId={item.id}
                    description={item.description}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
