import AboutHero from "../components/AboutHero.jsx";
import Navbar from "../components/navbar.jsx";
import navbarLinks from "../data/navbar.js";
import Footer from "../components/Footer.jsx";
import admissionBg from "../assets/image8.jpg";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import AcademicPrograms from "../components/AcademicPrograms.jsx";
import AdmissionsTimeline from "../components/AdmissionsTimeline.jsx";
 export default function Admissions() {
    return(
        <div>
            <Navbar links={navbarLinks} />
            <AboutHero image={admissionBg} />
            <WhyChooseUs />
            <AcademicPrograms/>
            <AdmissionsTimeline/>
            <Footer/>

            
           
        </div>
    )
 }
