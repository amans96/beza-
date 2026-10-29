import { useState } from "react";
import { Target } from "lucide-react";
import grad from "../assets/grad.jpg";
import image1 from "../assets/images.jpg";
import higher from "../assets/high1.jpg";

export default function Goal() {
  const [activeGoal, setActiveGoal] = useState(null);

  const goals = [
    {
      number: "01",
      title: "Academic Distinction",
      text: "Deliver exceptional academic outcomes and foundational mastery across all core disciplines, guiding students toward top university admissions.",
    },
    {
      number: "02",
      title: "Inquiry & STEM Innovation",
      text: "Cultivate critical thinking, scientific curiosity, and digital literacy through hands-on laboratory experiments and robotics projects.",
    },
    {
      number: "03",
      title: "Character & Ethical Leadership",
      text: "Nurture integrity, empathy, resilience, and global citizenship, ensuring our graduates lead with purpose and moral clarity.",
    },
    {
      number: "04",
      title: "Collaborative Community",
      text: "Foster strong parent, teacher, and community partnerships to support each child's individual cognitive and emotional development.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-50" id="goals">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200 mb-3">
            <Target size={14} className="text-emerald-600" />
            Strategic Horizons
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-heading">
            Our Core Institutional Goals
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Every program, classroom initiative, and mentorship relationship at Beza School is anchored in these four pillars.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Images Showcase */}
          <div className="w-full lg:w-1/2 relative flex justify-center">
            <div className="relative w-full max-w-md h-[360px] sm:h-[420px]">
              {/* Image 1 */}
              <div className="absolute top-0 left-0 w-64 h-48 sm:w-72 sm:h-56 rounded-3xl overflow-hidden shadow-xl border-4 border-white transform -rotate-3 hover:rotate-0 hover:z-20 transition-all duration-300">
                <img
                  src={grad}
                  alt="Beza School Graduation"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 2 */}
              <div className="absolute top-12 right-0 w-64 h-48 sm:w-72 sm:h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 hover:z-20 transition-all duration-300">
                <img
                  src={image1}
                  alt="Beza School Classroom"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 3 */}
              <div className="absolute bottom-0 left-12 w-64 h-44 sm:w-72 sm:h-52 rounded-3xl overflow-hidden shadow-xl border-4 border-white transform -rotate-1 hover:rotate-0 hover:z-20 transition-all duration-300">
                <img
                  src={higher}
                  alt="Beza School Campus Activity"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Goals Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {goals.map((goal, index) => {
              const isSelected = activeGoal === index;

              return (
                <div
                  key={goal.number}
                  onClick={() => setActiveGoal(isSelected ? null : index)}
                  className={`p-6 sm:p-7 rounded-3xl transition-all duration-300 border cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? "bg-emerald-50/70 border-emerald-300 shadow-lg -translate-y-1"
                      : "bg-white border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-md hover:-translate-y-1"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold text-emerald-600 font-heading">
                      {goal.number}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {goal.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {goal.text}
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