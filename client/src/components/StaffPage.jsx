import { useState } from "react";
import { GraduationCap, ChevronDown } from "lucide-react";
import staff1 from "../assets/pricipal-1.jpg";
import staff2 from "../assets/principal-2.jpg";
import staff3 from "../assets/teach-3.jpg";

const staff = [
  {
    name: "Amanule Sisay",
    role: "School Principal & Head of Academics",
    desc: "Amanule brings over 15 years of distinguished leadership in educational management, curriculum innovation, and student achievement standards across international school systems.",
    img: staff1,
    qualification: "M.Ed. Educational Leadership, B.Sc. Mathematics",
  },
  {
    name: "Samuel Bekele",
    role: "Head of Student Affairs & Pastoral Care",
    desc: "Samuel specializes in student development, mental wellness, and holistic extracurricular programs, ensuring an empowering and safe environment for all learners.",
    img: staff2,
    qualification: "M.A. Counseling Psychology",
  },
  {
    name: "Hana Alemu",
    role: "Academic Coordinator & Early Years Lead",
    desc: "Hana coordinates early childhood learning pathways, foundational literacy, and parent-teacher collaboration with dedication and innovative inquiry-based methodologies.",
    img: staff3,
    qualification: "B.Ed. Early Childhood Education",
  },
  {
    name: "Natnael Tadesse",
    role: "Head of Secondary STEM Faculty",
    desc: "Natnael oversees high school sciences, robotics, and advanced placement preparation, guiding our students toward top university admissions and Olympiad honors.",
    img: staff1,
    qualification: "M.Sc. Physics, Cambridge Certified Educator",
  },
];

export default function StaffPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 bg-white border-y border-slate-100" id="faculty">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200 mb-3">
            <GraduationCap size={14} className="text-emerald-600" />
            Dedicated Educators
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-heading">
            Meet Our Leadership & Faculty
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Our certified teachers and administrators combine global pedagogy with genuine care for every student's intellectual and emotional growth.
          </p>
        </div>

        {/* Staff Accordion / Grid */}
        <div className="space-y-4">
          {staff.map((person, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={person.name}
                onClick={() => handleClick(index)}
                className={`p-6 sm:p-7 rounded-3xl transition-all duration-300 border cursor-pointer ${
                  isOpen
                    ? "bg-slate-50/90 border-emerald-300 shadow-md"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 sm:gap-5">
                    {/* Staff Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 ring-2 ring-emerald-500/20 shadow-sm flex-shrink-0">
                      <img
                        src={person.img}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                        {person.name}
                      </h3>
                      <p className="text-sm font-semibold text-emerald-600 mt-0.5">
                        {person.role}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
                        {person.qualification}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                    <span className="sm:hidden text-xs text-slate-400">
                      {person.qualification}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isOpen
                          ? "bg-emerald-500 text-white rotate-180"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-5 pt-5 border-t border-slate-200/70"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed pl-1 sm:pl-24">
                      {person.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
