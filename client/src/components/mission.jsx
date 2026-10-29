import { useState } from "react";
import { GraduationCap, Users, BookOpen, HeartHandshake, Sparkles } from "lucide-react";
import playing from "../assets/playing2.jpg";
import studying from "../assets/stdying.jpg";
import playing2 from "../assets/playing.jpg";

export default function Mission() {
  const [activeCard, setActiveCard] = useState(null);

  const missions = [
    {
      icon: GraduationCap,
      title: "World-Class Education",
      text: "To provide accessible, high-caliber education that equips every student with knowledge, character, and practical competence for higher learning and life.",
    },
    {
      icon: Users,
      title: "Inclusive & Safe Community",
      text: "To foster an emotionally supportive, physically secure, and intellectually diverse environment where all students feel respected and empowered.",
    },
    {
      icon: BookOpen,
      title: "Curiosity & Lifelong Learning",
      text: "To ignite intellectual curiosity, critical problem solving, and an enduring passion for discovery through modern learning methodologies.",
    },
    {
      icon: HeartHandshake,
      title: "Community & Ethical Impact",
      text: "To partner with parents, educational leaders, and community mentors to guide young individuals toward responsible, impactful societal contribution.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-y border-slate-100" id="mission">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200 mb-3">
            <Sparkles size={14} className="text-emerald-600" />
            Purpose & Values
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-heading">
            Our Guiding Mission
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Building a brighter tomorrow by cultivating leadership, empathy, and intellectual rigor in every child who joins our campus.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Mission Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {missions.map((mission, index) => {
              const Icon = mission.icon;
              const isSelected = activeCard === index;

              return (
                <div
                  key={mission.title}
                  onClick={() => setActiveCard(isSelected ? null : index)}
                  className={`p-6 sm:p-7 rounded-3xl transition-all duration-300 border cursor-pointer ${
                    isSelected
                      ? "bg-emerald-50/80 border-emerald-300 shadow-lg -translate-y-1"
                      : "bg-slate-50 border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md hover:-translate-y-1"
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 mb-5">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {mission.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {mission.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Collage Images */}
          <div className="w-full lg:w-1/2 relative flex justify-center">
            <div className="relative w-full max-w-md h-[360px] sm:h-[420px]">
              <div className="absolute top-0 right-4 w-60 h-44 sm:w-72 sm:h-52 rounded-3xl overflow-hidden shadow-xl border-4 border-white transform rotate-3 hover:rotate-0 transition-all duration-300">
                <img
                  src={playing}
                  alt="Student campus recreation"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute top-16 left-0 w-60 h-44 sm:w-72 sm:h-52 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-4 hover:rotate-0 transition-all duration-300">
                <img
                  src={studying}
                  alt="Student focused study"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-2 right-10 w-60 h-44 sm:w-72 sm:h-52 rounded-3xl overflow-hidden shadow-xl border-4 border-white transform rotate-1 hover:rotate-0 transition-all duration-300">
                <img
                  src={playing2}
                  alt="Students collaborating"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}