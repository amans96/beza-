import HeroPage from "../components/HeroPage.jsx";
import Card from "../components/Card.jsx";
import cardsData from "../data/cardsData.js";
import Achievers from "../components/Achivers.jsx";
import Footer from "../components/Footer.jsx";
import Sap from "../components/Sap.jsx";
import navbarLinks from "../data/navbar.js";
import Navbar from "../components/navbar.jsx";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar links={navbarLinks} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroPage />

        {/* Core Pillars / Value Proposition */}
        <section className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200 mb-3">
                <Sparkles size={14} className="text-emerald-600" />
                Why Beza School
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-heading">
                A Legacy of Academic Distinction
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                We combine rigorous curriculum, dedicated mentorship, and modern facilities to prepare students for lifelong accomplishment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cardsData.map((card, index) => (
                <Card
                  key={card.id || index}
                  {...card}
                  delay={index * 120}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Student Achievers Section */}
        <Achievers />

        {/* Adventure / Call to Action Section */}
        <Sap />
      </main>

      <Footer />
    </div>
  );
}