import Navbar from "../components/navbar.jsx";
import navbarLinks from "../data/navbar.js";
import Footer from "../components/Footer.jsx";
import AboutHero from "../components/AboutHero.jsx";
import teaches from "../assets/teaches.jpg";
import Reasons from "../components/Reasons.jsx";
import WhyWorkWithUs from "../components/WhyWorkWithUs.jsx";

export default function Careers() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar links={navbarLinks} />
      
      <main className="flex-1">
        <AboutHero
          image={teaches}
          title="Join Our Faculty & Staff"
          subtitle="Discover fulfilling teaching, counseling, and school administrative careers in a supportive academic community."
          breadcrumb="Careers"
        />
        <Reasons />
        <WhyWorkWithUs />
      </main>

      <Footer />
    </div>
  );
}