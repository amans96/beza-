import { useState } from "react";
import { GraduationCap, School, ShieldCheck, BookOpen, Trophy, Sparkles, Check } from "lucide-react";
import whyChooseData from "../data/whyChooseData";

const iconMap = {
  GraduationCap,
  School,
  ShieldCheck,
  BookOpen,
  Trophy,
  Sparkles,
};

export default function WhyChooseUs() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section className="relative py-24 sm:py-32 bg-slate-50 overflow-hidden" id="why">
      {/* Subtle Background Glow Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-teal-100/60 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Check size={14} className="text-emerald-700" />
            The Beza Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-heading">
            Why Choose Beza School?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            We provide an inspiring environment where every student thrives academically, socially, and emotionally.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseData.map((item) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            const isSelected = activeCard === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setActiveCard(isSelected ? null : item.id)}
                className={`group relative bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-9 border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "border-emerald-300 shadow-xl -translate-y-2 bg-white"
                    : "border-slate-200/80 shadow-sm hover:border-slate-300 hover:shadow-xl hover:-translate-y-2 hover:bg-white"
                }`}
              >
                <div>
                  {/* Icon Box */}
                  <div className="mb-6 inline-block">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md shadow-slate-900/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2`}
                    >
                      <IconComponent size={26} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-emerald-600 transition-colors font-heading">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle Hover Accent */}
                <div
                  className={`mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 transition-opacity ${
                    isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <span>Key Pillar</span>
                  <span>✓</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}