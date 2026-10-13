import React, { useState } from "react";
import { Search, ImageOff, Calendar } from "lucide-react";

// Assuming these remain the same in your file structure
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
  // Changed default year state to "All" to prevent conflicts with the actual year 2000
  const [activeYear, setActiveYear] = useState("All");
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  
  // Generate years from 2000 to 2005, and prepend "All"
  const years = ["All", ...Array.from({ length: 6 }, (_, i) => 2000 + i)];

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
    const yearMatch = activeYear === "All" || photo.year === activeYear;
    const tagMatch = activeTag === "All" || photo.tags.includes(activeTag);
    const searchMatch = photo.disc.toLowerCase().includes(search.toLowerCase());
    return yearMatch && tagMatch && searchMatch;
  });

  const hasPhotos = filteredPhotos.length > 0;

  const clearFilters = () => {
    setActiveYear("All");
    setActiveTag("All");
    setSearch("");
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans pb-20" id="gallery">
      {/* Custom Keyframes for staggered entrance */}
      <style>
        {`
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.95) translateY(10px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-pop-in {
            animation: popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
      </style>

      {/* ================= HEADER, SEARCH AND FILTERS ================= */}
      <div className="flex flex-col items-center pt-16 pb-10 space-y-8 px-4">
        
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Campus Memories</h1>
          <p className="text-slate-500">Explore our rich history through the years</p>
        </div>

        {/* Modern Search Bar */}
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-[#00b876]" />
          <input
            type="text"
            placeholder="Search photos by description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none transition-all duration-300 focus:border-[#00b876] focus:ring-4 focus:ring-[#00b876]/10"
          />
        </div>

        {/* Modern Tag Filters */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTag === tag
                  ? "bg-[#00b876] text-white shadow-md shadow-[#00b876]/30 scale-105"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300"
              }`}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
          
          {(activeTag !== "All" || activeYear !== "All" || search !== "") && (
            <button
              onClick={clearFilters}
              className="px-5 py-2 rounded-full text-sm font-semibold bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all ml-2"
            >
              Reset All
            </button>
          )}
        </div>
      </div>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto">
        
        {/* LEFT: TIMELINE */}
        <div className="relative flex justify-center lg:justify-start lg:col-span-1">
          {/* Vertical Timeline line for Desktop */}
          <div className="hidden lg:block absolute left-[31px] top-4 bottom-4 w-0.5 bg-slate-200 rounded-full"></div>

          {/* Horizontal scroll for mobile, Vertical for Desktop */}
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-4 lg:gap-8 pb-4 lg:pb-0 w-full no-scrollbar">
            {years.map((year) => {
              const isActive = activeYear === year;

              return (
                <div
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className="relative z-10 flex items-center cursor-pointer group flex-shrink-0"
                >
                  {/* Timeline Node */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border-[3px] ${
                      isActive
                        ? "bg-[#00b876] border-[#00b876] shadow-lg shadow-[#00b876]/30 scale-110"
                        : "bg-white border-slate-200 group-hover:border-[#00b876] group-hover:shadow-md"
                    }`}
                  >
                    {isActive && year === "All" ? (
                      <Calendar className="w-7 h-7 text-white" />
                    ) : isActive ? (
                      <img
                        src={Logo}
                        alt="logo"
                        className="w-full h-full object-cover rounded-full p-0.5 bg-white"
                      />
                    ) : (
                      <span className="text-sm font-bold text-slate-500 group-hover:text-[#00b876] transition-colors">
                        {year}
                      </span>
                    )}
                  </div>
                  
                  {/* Optional Desktop Label next to node */}
                  <span className={`hidden lg:block ml-6 font-bold text-lg transition-colors duration-300 ${isActive ? 'text-[#00b876]' : 'text-slate-400 group-hover:text-slate-600'}`}>
                    {year === "All" ? "All Years" : year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* RIGHT: PHOTO GRID */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasPhotos ? (
              filteredPhotos.map((item, index) => (
                <div
                  key={item.id}
                  id={item.id}
                  style={{ animationDelay: `${index * 75}ms` }}
                  className="
                    opacity-0 animate-pop-in
                    relative group overflow-hidden rounded-2xl shadow-sm
                    h-[300px] cursor-pointer
                    border border-slate-200/60 bg-white
                  "
                >
                  <img
                    src={item.real}
                    alt={item.disc}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Modern Sleek Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white font-semibold text-lg leading-snug mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {item.disc}
                    </p>
                    
                    {/* Render specific tags nicely */}
                    <div className="flex flex-wrap gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-[#00b876] text-white">
                        {item.year}
                      </span>
                      {item.tags.map(tag => (
                         <span key={tag} className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/20 text-white backdrop-blur-sm">
                           #{tag}
                         </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Enhanced Empty State
              <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <ImageOff className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">No photos found</h3>
                <p className="text-slate-500 mb-6 max-w-md">
                  We couldn't find any memories matching your current filters. Try searching for something else or clearing your selection.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-[#00b876] text-white font-semibold rounded-xl hover:bg-[#009c63] transition-colors shadow-lg shadow-[#00b876]/20"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}