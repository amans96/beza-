import AboutHero from "../components/AboutHero.jsx";
import Navbar from "../components/navbar.jsx";
import PrincipalMessage from "../components/PrincipalMessage.jsx";
import Mission from "../components/mission.jsx";
import Goal from "../components/Goal.jsx";
import StaffPage from "../components/StaffPage.jsx";
import navbarLinks from "../data/navbar.js";
import Footer from "../components/Footer.jsx";
import Explore from "../components/Explore.jsx";
import aboutBg from "../assets/hero.jpg";
import Faq from "../components/Faq.jsx";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar links={navbarLinks} />
      
      <main className="flex-1">
        <AboutHero
          image={aboutBg}
          title="About Beza School"
          subtitle="Nurturing intellectual curiosity, moral leadership, and academic distinction for over 23 years."
          breadcrumb="About Us"
        />
        <PrincipalMessage />
        <Mission />
        <Goal />
        <StaffPage />
        <Explore />
        <Faq />
      </main>

      <Footer />
    </div>
  );
}