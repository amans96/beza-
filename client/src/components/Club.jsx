
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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

export default function Club() {
  const [clubs, setClubs] = useState([]);
  const [currentImage, setCurrentImage] = useState({});

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await api.get("/clubs");

        const items = Array.isArray(response.data)
          ? response.data
          : [];

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

        setClubs(formattedClubs);
      } catch (error) {
        console.error("Failed to fetch clubs:", error);
      }
    };

    fetchClubs();
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center p-6 gap-10">
      {clubs.map((club) => {
        const photos = club.photo || [];
        const imageIndex = currentImage[club.id] ?? 0;

        return (
          <div
            key={club.id}
            className="relative w-80 h-[430px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <h2 className="text-xl text-center font-bold text-gray-800 mb-2">
              {club.name}
            </h2>

            {photos.length > 0 && (
              <img
                src={photos[imageIndex]}
                alt={club.name}
                className="w-full h-52 object-cover"
              />
            )}

            {photos.length > 1 && (
              <>
                <button
                  onClick={() => previousImage(club.id, photos.length)}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg"
                  aria-label={`Previous ${club.name} image`}
                >
                  <FaChevronLeft />
                </button>

                <button
                  onClick={() => nextImage(club.id, photos.length)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg"
                  aria-label={`Next ${club.name} image`}
                >
                  <FaChevronRight />
                </button>
              </>
            )}

            <div className="p-5">
              <p className="text-gray-600 text-sm leading-6">
                {club.disc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
