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

  const years = Array.from({ length: 5 }, (_, i) => 2000 + i);

  const Photo = [
    { id: "photo1", real: img1, disc: "Graduation ceremony 2001 batch" },
    { id: "photo2", real: img2, disc: "Students celebrating after exams" },
    { id: "photo3", real: img3, disc: "Class group photo on campus" },
    { id: "photo4", real: img4, disc: "Award distribution moment" },
    { id: "photo5", real: img5, disc: "Friends during graduation day" },
    { id: "photo6", real: img6, disc: "Teachers and students together" },
    { id: "photo7", real: img7, disc: "Campus celebration event" },
    { id: "photo9", real: img9, disc: "Final farewell group photo" },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* ================= SEARCH BAR ================= */}
      <div className="flex justify-center pt-10">
        <input
          type="text"
          placeholder="Search..."
          className="w-80 px-5 py-3 rounded-full border border-gray-300 shadow-md outline-none focus:ring-2 focus:ring-emerald-500"
        />
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

            return (
              <div
                key={year}
                onClick={() => setActiveYear(year)}
                className="relative z-10 flex items-center mb-10 cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-500 scale-110 shadow-lg"
                      : "bg-white border-2 border-gray-300"
                  }`}
                >
                  {isActive ? (
                    <img src={Logo} alt="logo" className="w-14 h-14" />
                  ) : (
                    <span className="text-sm font-bold text-gray-600">
                      {year}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CENTER: IMAGES */}
        <div className="md:col-span-3 flex justify-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {Photo.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="relative group overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={item.real}
                alt={item.disc}
                className="w-full h-72 object-cover transition duration-300 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition flex items-center justify-center">
                <p className="text-white opacity-0 group-hover:opacity-100 transition text-center px-4">
                  {item.disc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
      </div>
  );
}