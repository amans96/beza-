import Navbar from "../components/navbar.jsx";
import navbarLinks from "../data/navbar.js";
import Footer from "../components/Footer.jsx";
import AboutHero from "../components/AboutHero.jsx";
import Club from "../components/Club.jsx";
import Events from "../components/Events.jsx";
import studentBg from "../assets/high1.jpg";

export default function Student() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar links={navbarLinks} />

      <main className="flex-1">
        <AboutHero
          image={studentBg}
          title="Student Life & Co-Curriculars"
          subtitle="Discover a rich campus life encompassing academic clubs, competitive athletics, visual arts, and vibrant annual traditions."
          breadcrumb="Student Life"
        />
        <Club />
        <Events />
      </main>

      <Footer />
    </div>
  );
}