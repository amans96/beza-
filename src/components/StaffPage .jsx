import React, { useState } from "react";
import staff1 from "../assets/pricipal-1.jpg";
import staff2 from "../assets/principal-2.jpg";
import staff3 from "../assets/teach-3.jpg";

const staff = [
  {
    name: "Amanule Sisay",
    role: "School Principal",
    desc: "Amanule has over 10 years of experience managing restaurant operations and ensuring excellent customer satisfaction.",
    img: staff1,
  },
  {
    name: "Samuel Bekele",
    role: "Head of student affairs",
    desc: "Samuel creates delicious dishes using fresh ingredients and leads our kitchen team with creativity.",
    img: staff2,
  },
  {
    name: "Hana Alemu",
    role: "Staff Coordinator",
    desc: "Hana welcomes every guest with a smile and ensures every customer enjoys a memorable experience.",
    img: staff3,
  },
  {
    name: "Natnael Tadesse",
    role: "Head of Teaching Staff",
    desc: "Natnael coordinates the service team and guarantees smooth dining experiences every day.",
    img: staff1,
  },
];

export default function StaffPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    // Toggle: if clicked the same item, close it; otherwise open the clicked one
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-5xl mx-auto my-10 md:my-20 px-4">
   <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#0B2B44] text-center mx-auto mb-8 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
  Meet Our Staff
</h1>
      {staff.map((person, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className="flex flex-col md:flex-row items-start md:items-center justify-between py-6 md:py-8 border-b border-gray-200 cursor-pointer transition-all duration-300 relative overflow-hidden select-none"
        >
          {/* TEXT - Full width on mobile, 2/3 on desktop */}
          <div className="w-full md:w-2/3 z-10">
            <h2
              className={`text-xl sm:text-2xl md:text-3xl font-semibold transition-all duration-300 ${
                activeIndex === index
                  ? "text-green-600 md:translate-x-2"
                  : "text-gray-800"
              }`}
            >
              {person.name}
            </h2>

            <p className="text-gray-500 mt-1 text-sm sm:text-base">{person.role}</p>

            {/* DESCRIPTION */}
            <p
              className={`text-gray-600 mt-3 md:mt-4 leading-relaxed text-sm sm:text-base transition-all duration-500 ${
                activeIndex === index
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {person.desc}
            </p>
          </div>

          {/* IMAGE - Under text on mobile, right side on desktop */}
          <div className="flex items-center justify-center w-full md:w-auto mt-4 md:mt-0 overflow-hidden">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-green-500 transition-all duration-700 ease-out ${
                activeIndex === index
                  ? "opacity-100 scale-100 translate-y-0 md:translate-x-0"
                  : "opacity-0 scale-75 translate-y-8 md:translate-y-0 md:translate-x-16"
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