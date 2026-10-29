import { useEffect, useRef, useState } from "react";
import { ShieldCheck, TrendingUp, Rocket, Award, Sparkles, ArrowRight } from "lucide-react";

const iconMap = {
  ShieldCheck,
  TrendingUp,
  Rocket,
  Award,
  Sparkles,
};

export default function Card({
  icon,
  badge,
  title,
  description,
  color = "from-emerald-500 to-teal-500",
  delay = 0,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  const IconComponent = iconMap[icon] || Sparkles;

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "30px",
      }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [delay]);

  return (
    <article
      ref={cardRef}
      className={`group relative overflow-hidden rounded-3xl bg-white p-8 sm:p-9 border border-slate-200/90 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-slate-300 flex flex-col justify-between ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Decorative gradient corner glow */}
      <div
        className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${color} opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-20 pointer-events-none`}
      />

      <div>
        {/* Top bar: Badge & Icon */}
        <div className="flex items-center justify-between mb-6">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md shadow-emerald-500/15 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
          >
            <IconComponent size={26} strokeWidth={2} />
          </div>

          {badge && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-200 transition-colors">
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-emerald-700 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Action / Learn More link */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">
        <span>Discover More</span>
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1.5"
        />
      </div>

      {/* Bottom accent line on hover */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
      />
    </article>
  );
}