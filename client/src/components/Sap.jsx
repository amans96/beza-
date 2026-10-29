import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, PhoneCall, Sparkles } from "lucide-react";
import gsap from "gsap";

export default function Sap() {
  const bezaRef = useRef(null);

  useEffect(() => {
    if (!bezaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bezaRef.current,
        {
          scale: 1.15,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 0.08,
          duration: 1.8,
          ease: "power3.out",
        }
      );

      gsap.to(bezaRef.current, {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-24 sm:py-32 flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Decorative Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          ref={bezaRef}
          className="text-[25vw] font-extrabold tracking-tighter text-white font-heading"
        >
          BEZA
        </span>
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs sm:text-sm font-semibold">
          <Sparkles size={15} />
          Join the Beza Community
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight font-heading">
          Let Your Educational Adventure Begin Here
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Schedule a personalized campus tour, explore our curriculum, or submit your child's application for the upcoming term today.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/admissions"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/25 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
          >
            <span>Apply for Admission</span>
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/faq"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/15 text-white font-semibold text-base backdrop-blur-md transition-all duration-200 hover:-translate-y-1"
          >
            <HelpCircle size={18} className="text-slate-300" />
            <span>Admissions FAQ</span>
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-slate-900 border border-white/10 hover:border-emerald-500/50 text-slate-200 hover:text-white font-semibold text-base transition-all duration-200 hover:-translate-y-1"
          >
            <PhoneCall size={18} className="text-emerald-400" />
            <span>Contact Office</span>
          </Link>
        </div>
      </div>
    </section>
  );
}