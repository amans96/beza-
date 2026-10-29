import { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import faqData from "../data/faqsData.js";

export default function Faq() {
  const [activeId, setActiveId] = useState(1);

  const handleToggle = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden" id="faq">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30 mb-3">
            <HelpCircle size={14} />
            Got Questions?
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-heading">
            Frequently Asked <span className="text-emerald-400">Questions</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Find answers to common questions about admissions, academic curriculum, school hours, and student life at Beza School.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((faq) => {
            const isActive = activeId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                  isActive
                    ? "bg-slate-800/90 border-emerald-500/40 shadow-xl shadow-emerald-950/20"
                    : "bg-slate-950/60 border-white/10 hover:border-white/20 hover:bg-slate-800/50"
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleToggle(faq.id)}
                  aria-expanded={isActive}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span
                    className={`font-semibold text-base sm:text-lg transition-colors pr-4 ${
                      isActive ? "text-emerald-400" : "text-white"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <div
                    className={`p-2 rounded-xl transition-all duration-300 flex-shrink-0 ${
                      isActive
                        ? "bg-emerald-500 text-slate-950 rotate-180"
                        : "bg-white/10 text-slate-300"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* Animated Answer Wrapper */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-6 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-950/70 border border-white/10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <MessageSquare size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Have more questions?</h3>
              <p className="text-sm text-slate-400">Our admissions officers are here to assist you.</p>
            </div>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold transition-all shadow-md flex-shrink-0"
          >
            Contact Admissions
          </Link>
        </div>
      </div>
    </section>
  );
}