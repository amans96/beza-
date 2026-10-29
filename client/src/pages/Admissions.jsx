import AboutHero from "../components/AboutHero.jsx";
import Navbar from "../components/navbar.jsx";
import navbarLinks from "../data/navbar.js";
import Footer from "../components/Footer.jsx";
import admissionBg from "../assets/image8.jpg";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import AcademicPrograms from "../components/AcademicPrograms.jsx";
import AdmissionsTimeline from "../components/AdmissionsTimeline.jsx";

export default function Admissions() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar links={navbarLinks} />
      
      <main className="flex-1">
        <AboutHero
          image={admissionBg}
          title="Admissions & Enrollment"
          subtitle="Take the first step toward your child's transformative educational journey at Beza School."
          breadcrumb="Admissions"
        />
        <WhyChooseUs />
        <AcademicPrograms />
        <AdmissionsTimeline />
      </main>

      <Footer />
    </div>
  );
}
