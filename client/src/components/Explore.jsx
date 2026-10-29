import { useState } from "react";
import { Compass, ArrowRight } from "lucide-react";
import image1 from "../assets/image8.jpg";
import image2 from "../assets/contact.jpg";
import image3 from "../assets/imges3.jpg";

export default function Explore() {
  const [activeTab, setActiveTab] = useState("learning");

  const data = {
    learning: {
      id: "learning",
      title: "Academic & STEM Excellence",
      subtitle: "Comprehensive Curriculum & Inquiry-Based Pedagogy",
      description:
        "Beza School delivers an enriching curriculum designed to develop analytical rigor and creative problem solving. From foundational literacy and numeracy in primary years to advanced secondary sciences and mathematics, our students learn with personalized mentorship and state-of-the-art interactive tools.",
      img: image1,
      badge: "Curriculum & Labs",
    },
    activities: {
      id: "activities",
      title: "Vibrant Campus & Co-Curriculars",
      subtitle: "Sports, Arts, Robotics & Leadership",
      description:
        "Our green and spacious campus provides dedicated sports facilities, science laboratories, arts studios, and student-led clubs. Whether competing in inter-school basketball, coding in robotics lab, or debating in the Model UN, every student discovers their unique passion.",
      img: image3,
      badge: "Campus Life",
    },
    alumni: {
      id: "alumni",
      title: "Proud Alumni Community",
      subtitle: "23+ Years of Global Achievers",
      description:
        "With more than 23 years of educational history, our alumni network spans across higher education institutions, medical practices, technological innovation, and civil service. We cherish lifelong ties with former students who frequently return to mentor the next generation.",
      img: image2,
      badge: "Alumni Network",
    },
  };

  return (
    <section className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden" id="explore">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200 mb-3">
            <Compass size={14} className="text-emerald-600" />
            Discover Beza
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-heading">
            Explore Campus Life & Learning
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Take a closer look at what makes our daily learning community vibrant, inspiring, and transformative.
          </p>
        </div>

        {/* Main Interactive Showcase */}
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] shadow-xl border border-slate-200/90 overflow-hidden flex flex-col lg:flex-row">
          {/* Left Column: Interactive Tab Accordion */}
          <div className="w-full lg:w-[52%] p-6 sm:p-10 md:p-12 flex flex-col justify-center bg-white z-10">
            <div className="space-y-4">
              {Object.entries(data).map(([key, item]) => {
                const isActive = activeTab === key;

                return (
                  <div
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? "bg-emerald-50/60 border-emerald-300 shadow-sm"
                        : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          isActive
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {item.badge}
                      </span>
                      <ArrowRight
                        size={16}
                        className={`transition-transform duration-300 ${
                          isActive
                            ? "translate-x-1 text-emerald-600"
                            : "text-slate-300"
                        }`}
                      />
                    </div>

                    <h3
                      className={`text-xl sm:text-2xl font-bold font-heading transition-colors ${
                        isActive ? "text-emerald-950" : "text-slate-800"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs font-medium text-emerald-700 mt-1">
                      {item.subtitle}
                    </p>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isActive
                          ? "grid-rows-[1fr] opacity-100 mt-4 pt-3 border-t border-emerald-200/50"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="w-full lg:w-[48%] min-h-[300px] sm:min-h-[400px] lg:min-h-full relative bg-slate-900 overflow-hidden">
            {Object.entries(data).map(([key, item]) => {
              const isActive = activeTab === key;
              return (
                <div
                  key={key}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
                    isActive
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-105 z-0 pointer-events-none"
                  }`}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/60 backdrop-blur-md border border-white/10 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      {item.badge}
                    </p>
                    <p className="text-sm font-semibold text-white mt-0.5">
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}