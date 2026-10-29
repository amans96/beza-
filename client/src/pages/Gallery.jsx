import Navbar from "../components/navbar.jsx";
import navbarLinks from "../data/navbar.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import AboutHero from "../components/AboutHero.jsx";
import galleryBg from "../assets/grad.jpg";

export default function Gallery() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar links={navbarLinks} />

      <main className="flex-1">
        <AboutHero
          image={galleryBg}
          title="Campus Memories & Gallery"
          subtitle="A visual chronicle of milestones, achievements, cultural celebrations, and campus life through the years."
          breadcrumb="Gallery"
        />
        <Header />
      </main>

      <Footer />
    </div>
  );
}