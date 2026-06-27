import React, { useState } from "react";
import staff1 from "../assets/pricipal-1.jpg";
import staff2 from "../assets/principal-2.jpg";
import staff3 from "../assets/teach-3.jpg";

const staff = [
  {
    name: "Amanule Sisay",
    role: "Restaurant Manager",
    desc: "Amanule has over 10 years of experience managing restaurant operations and ensuring excellent customer satisfaction.",
    img: staff1,
  },
  {
    name: "Samuel Bekele",
    role: "Executive Chef",
    desc: "Samuel creates delicious dishes using fresh ingredients and leads our kitchen team with creativity.",
    img: staff2,
  },
  {
    name: "Hana Alemu",
    role: "Customer Service",
    desc: "Hana welcomes every guest with a smile and ensures every customer enjoys a memorable experience.",
    img: staff3,
  },
  {
    name: "Natnael Tadesse",
    role: "Head Waiter",
    desc: "Natnael coordinates the service team and guarantees smooth dining experiences every day.",
    img: staff1,
  },
];

export default function StaffPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section
      className="w-full max-w-5xl mx-auto my-20 px-4"
      onMouseLeave={() => setActiveIndex(null)}
    >
      {staff.map((person, index) => (
        <div
          key={index}
          onMouseEnter={() => setActiveIndex(index)}
          className="flex items-center justify-between py-8 border-b border-gray-200 cursor-pointer transition-all duration-300"
        >
          {/* LEFT TEXT */}
          <div className="w-full md:w-2/3">
            <h2
              className={`text-2xl md:text-3xl font-semibold transition-all duration-300 ${
                activeIndex === index
                  ? "text-green-600 translate-x-2"
                  : "text-gray-800"
              }`}
            >
              {person.name}
            </h2>

            <p className="text-gray-500 mt-1">{person.role}</p>

            {/* DESCRIPTION (hidden until hover) */}
            <p
              className={`text-gray-600 mt-4 leading-relaxed overflow-hidden transition-all duration-500 ${
                activeIndex === index
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {person.desc}
            </p>
          </div>

          {/* RIGHT IMAGE (hidden until hover) */}
          <div className="hidden md:flex items-center justify-center">
            <div
              className={`w-24 h-24 rounded-full overflow-hidden border-4 border-green-500 transition-all duration-500 ${
                activeIndex === index
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-75"
              }`}
            >
              <img
                src={person.img}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}