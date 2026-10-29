import Navbar from "../components/navbar.jsx";
import navbarLinks from "../data/navbar.js";
import AboutHero from "../components/AboutHero.jsx";
import Faq from "../components/Faq.jsx";
import Footer from "../components/Footer.jsx";
import faqBg from "../assets/hero.jpg";

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar links={navbarLinks} />
      <main className="flex-1">
        <AboutHero
          image={faqBg}
          title="Frequently Asked Questions"
          subtitle="Clear answers about admissions requirements, academic curricula, tuition, and student life at Beza School."
          breadcrumb="FAQs"
        />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
