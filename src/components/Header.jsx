import React, { useState } from "react";
import Logo from "../assets/logo.jpg";
import img1 from "../assets/image1.jpg";
import img2 from "../assets/image2.jpg";
import img3 from "../assets/image3.jpg";
import img4 from "../assets/image4.jpg";
import img5 from "../assets/image5.jpg";
import img6 from "../assets/image6.jpg";
import img7 from "../assets/image7.jpg";
import img9 from "../assets/image9.jpg";

export default function Timeline() {
  const [activeYear, setActiveYear] = useState(2000);
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  
  // Generate years from 2000 to 2005
  const years = Array.from({ length: 6 }, (_, i) => 2000 + i);

  const photos = [
    { id: "photo1", real: img1, disc: "Graduation ceremony 2001 batch", year: 2004, tags: ["grad", "ceremony"] },
    { id: "photo2", real: img2, disc: "Students celebrating after exams", year: 2004, tags: ["events", "celebration"] },
    { id: "photo3", real: img3, disc: "Class group photo on campus", year: 2001, tags: ["grad", "group"] },
    { id: "photo4", real: img4, disc: "Award distribution moment", year: 2005, tags: ["ceremony", "awards"] },
    { id: "photo5", real: img5, disc: "Friends during graduation day", year: 2005, tags: ["grad", "friends"] },
    { id: "photo6", real: img6, disc: "Teachers and students together", year: 2001, tags: ["events", "teachers"] },
    { id: "photo7", real: img7, disc: "Campus celebration event", year: 2001, tags: ["events", "celebration"] },
    { id: "photo9", real: img9, disc: "Final farewell group photo", year: 2004, tags: ["grad", "farewell"] },
  ];

  // Get unique tags from all photos
  const allTags = ["All", ...new Set(photos.flatMap(photo => photo.tags))];

  // Filter photos based on year, tag, and search
  const filteredPhotos = photos.filter(photo => {
    const yearMatch = activeYear === 2000 || photo.year === activeYear;
    const tagMatch = activeTag === "All" || photo.tags.includes(activeTag);
    const searchMatch = photo.disc.toLowerCase().includes(search.toLowerCase());
    return yearMatch && tagMatch && searchMatch;
  });

  // Check if there are any photos after filtering
  const hasPhotos = filteredPhotos.length > 0;

  // Handle year click
  const handleYearClick = (year) => {
    setActiveYear(year);
  };

  // Handle tag click
  const handleTagClick = (tag) => {
    setActiveTag(tag);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveYear(2000);
    setActiveTag("All");
    setSearch("");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* ================= SEARCH AND FILTERS ================= */}
      <div className="flex flex-col items-center pt-10 space-y-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search photos..."
          value={search}
          onChange={handleSearchChange}
          className="w-80 px-5 py-3 rounded-full border border-gray-300 shadow-md outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Tag Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTag === tag
                  ? "bg-emerald-500 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-full text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {["Graduation", "Admission", "Events", "Gallery"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="px-6 py-2 bg-emerald-500 text-white rounded-full shadow-md transition hover:scale-105 hover:bg-emerald-600"
          >
            {item}
          </a>
        ))}
      </div>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 mt-10">

        {/* LEFT: TIMELINE */}
        <div className="relative">
          <div className="absolute left-6 w-[2px] h-full bg-gray-300"></div>

          {years.map((year) => {
            const isActive = activeYear === year;
            // Check if there are photos for this year
            const hasPhotosForYear = photos.some(photo => photo.year === year);

            return (
              <div
                key={year}
                onClick={() => handleYearClick(year)}
                className={`relative z-10 flex items-center mb-10 cursor-pointer ${
                  !hasPhotosForYear ? "opacity-50" : ""
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-500 scale-110 shadow-lg"
                      : "bg-white border-2 border-gray-300 hover:border-emerald-500"
                  }`}
                >
                  {isActive ? (
                    <img src={Logo} alt="logo" className="w-14 h-14 rounded-full" />
                  ) : (
                    <span className="text-sm font-bold text-gray-600">
                      {year}
                    </span>
                  )}
                </div>
                {hasPhotosForYear && (
                  <div className="ml-4 text-sm text-gray-500">
                    ({photos.filter(p => p.year === year).length} photos)
                  </div>
                )}
              </div>
            );
          })}
        </div>

        
        <div className="md:col-span-3 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {hasPhotos ? (
              filteredPhotos.map((item) => (
                <div
                  key={item.id}
                  id={item.id}
                  className="relative group overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                >
                  <img
                    src={item.real}
                    alt={item.disc}
                    className="w-full h-64 object-cover transition duration-300 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition duration-300 flex flex-col items-center justify-center">
                    <p className="text-white opacity-0 group-hover:opacity-100 transition duration-300 text-center px-4 font-medium">
                      {item.disc}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2 opacity-0 group-hover:opacity-100 transition duration-300">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-emerald-500 text-white text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // No results message
              <div className="col-span-full flex flex-col items-center justify-center py-20">
          
              
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= STATISTICS ================= */}
      <div className="mt-10 px-6 pb-8">
       
      </div>
    </div>
  );
}