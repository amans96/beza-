import React from "react";
import { Baby, BookOpen, GraduationCap, School, ArrowRight } from "lucide-react";
import academicProgramsData from "../data/academicProgramsData";

// Map string names from data.js to Lucide icon components
const iconMap = {
  Baby: Baby,
  BookOpen: BookOpen,
  GraduationCap: GraduationCap,
  School: School,
};

// Subtle accent color variations for visual variety
const badgeStyles = [
  "bg-amber-100 text-amber-800 border-amber-200",
  "bg-blue-100 text-blue-800 border-blue-200",
  "bg-emerald-100 text-emerald-800 border-emerald-200",
  "bg-purple-100 text-purple-800 border-purple-200",
];

const iconBoxStyles = [
  "bg-amber-500 text-white",
  "bg-blue-500 text-white",
  "bg-emerald-500 text-white",
  "bg-purple-500 text-white",
];

const AcademicPrograms = () => {
  return (
    <section className="py-24 bg-slate-50">
      {/* Inline style for the entrance keyframe animation */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(28px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-card-enter {
            animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-[#00b876] uppercase mb-2 block">
            Academic Pathways
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Programs Designed for Every Stage
          </h2>
          <p className="text-slate-600 text-lg">
            From early childhood exploration to university preparation, we support your child's growth every step of the way.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {academicProgramsData.map((program, index) => {
            const IconComponent = iconMap[program.icon] || School;
            const badgeClass = badgeStyles[index % badgeStyles.length];
            const iconBoxClass = iconBoxStyles[index % iconBoxStyles.length];

            return (
              <div
                key={program.id}
                style={{ animationDelay: `${index * 150}ms` }}
                className="
                  group
                  opacity-0 animate-card-enter
                  bg-white
                  rounded-3xl
                  p-8
                  border border-slate-200/80
                  shadow-sm
                  flex flex-col
                  justify-between
                  transition-all duration-300 ease-in-out
                  hover:-translate-y-2 hover:shadow-xl hover:border-slate-300
                "
              >
                {/* Top Section: Age Badge & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    {/* Age Pill Badge */}
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${badgeClass}`}
                    >
                      {program.age}
                    </span>

                    {/* Icon Box */}
                    <div
                      className={`
                        w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm 
                        transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3
                        ${iconBoxClass}
                      `}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#00b876] transition-colors duration-300">
                    {program.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8">
                    {program.description}
                  </p>
                </div>

                {/* Bottom Section: CTA Button */}
                <div className="pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    className="
                      w-full
                      py-3 px-4
                      rounded-xl
                      bg-slate-900
                      text-white
                      text-sm
                      font-medium
                      flex
                      items-center
                      justify-center
                      gap-2
                      transition-all duration-300
                      hover:bg-[#00b876] hover:gap-3 hover:shadow-md
                    "
                  >
                    <span>{program.buttonText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AcademicPrograms;