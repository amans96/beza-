import React, { useState } from "react";
import Logo from '../assets/logo.jpg'
export default function Timeline() {
  const [activeYear, setActiveYear] = useState(2000);

  const startYear = 2000;
  const yearsToShow = 5;

  const years = Array.from(
    { length: yearsToShow },
    (_, i) => startYear + i
  );

  return (
   
<div className="w-full max-w-md ml-10 py-10">

  <div className="relative flex flex-col items-start">

    {/* vertical line */}
    <div className="absolute w-[2px] h-full bg-gray-300 left-6 z-0"></div>

    {years.map((year) => {
      const isActive = activeYear === year;

      return (
        <div
          key={year}
          onClick={() => setActiveYear(year)}
          className="relative z-10 flex flex-col items-start mb-10 cursor-pointer"
        >

          {/* circle */}
          <div
            className={`
              w-14 h-14 rounded-full flex items-center justify-center
              transition-all duration-300
              ${isActive
                ? "bg-emerald-500 scale-125 shadow-lg"
                : "bg-white border-2 border-gray-300"}
            `}
          >
            {isActive ? (
              <img src={Logo} className="w-14 h-14 object-contain" />
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
</div>
  );
}