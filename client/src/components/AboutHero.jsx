import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function AboutHero({
  image,
  title = "About Beza School",
  subtitle = "Inspiring lifelong learners through academic excellence, character, and global vision.",
  badge = "Excellence in Education",
  breadcrumb = "About",
}) {
  return (
    <section className="relative min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image with Depth & Overlay */}
      {image && (
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover scale-105 opacity-40 blur-[1px]"
          />
        </div>
      )}

      {/* Modern Gradient Overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/60" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.18),transparent_65%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-center space-y-4 sm:space-y-5">
        {/* Badge & Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
          {badge && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider">
              {badge}
            </span>
          )}
          <nav
            aria-label="Breadcrumbs"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-slate-300"
          >
            <Link
              to="/"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <Home size={13} />
              <span>Home</span>
            </Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-emerald-400 font-semibold">{breadcrumb || title}</span>
          </nav>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom subtle edge divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}