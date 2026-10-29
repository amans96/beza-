import { Info, GraduationCap, ArrowRight, ShieldCheck, Sparkles, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import herovideo from "../assets/hero.mp4";
import heroimg from "../assets/hero.jpg";

export default function HeroPage() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Background Video with Rich Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover scale-105"
        >
          <source src={herovideo} type="video/mp4" />
        </video>
        {/* Layered Gradient & Blur Backdrop for maximum contrast and legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/65 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent_60%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-16 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Admissions Open for 2026/2027 Academic Year
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-heading">
              Shape Your Future <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                With Modern Education
              </span>
            </h1>

            {/* Subheading */}
            <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal">
              Empowering students from Early Years through Secondary education with world-class curriculum, passionate educators, and vibrant campus life.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-base font-bold shadow-xl shadow-emerald-500/25 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
              >
                <span>Apply for Admission</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/15 text-white text-base font-semibold backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <Info size={18} className="text-slate-300" />
                <span>Explore Campus</span>
              </Link>

              <Link
                to="/student"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-slate-300 hover:text-white hover:bg-white/5 text-base font-medium transition-colors"
              >
                <BookOpen size={18} className="text-emerald-400" />
                <span>Student Life</span>
              </Link>
            </div>

            {/* Key Trust Stats */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">23+</p>
                <p className="text-xs text-slate-400 font-medium">Years of Legacy</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">100%</p>
                <p className="text-xs text-slate-400 font-medium">Exam Pass Rate</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">1:15</p>
                <p className="text-xs text-slate-400 font-medium">Teacher-Student Ratio</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative max-w-md w-full">
              {/* Ambient Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-teal-500/20 to-blue-500/20 blur-2xl pointer-events-none" />

              {/* Main Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/15 bg-slate-900">
                <img
                  src={heroimg}
                  alt="Beza School Students in classroom"
                  className="w-full h-auto object-cover aspect-[4/3] sm:aspect-[1/1] hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/70 backdrop-blur-md border border-white/10 text-white">
                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Sparkles size={16} className="text-emerald-400" />
                    Inspiring Tomorrow's Leaders
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Holistic learning environment with state-of-the-art labs & arts facilities.
                  </p>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -top-4 -right-4 sm:-right-6 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-3 shadow-xl border border-white/40 animate-float-slow">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Accredited</p>
                    <p className="text-[10px] text-slate-500">Excellence Standards</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 rounded-2xl bg-slate-900/95 backdrop-blur-md px-4 py-3 shadow-xl border border-white/15 text-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Safe & Inspiring</p>
                    <p className="text-[10px] text-slate-400">Addis / Bishoftu Campus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}