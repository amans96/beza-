import navbar from "../components/navbar.jsx";
import Navbar from '../components/navbar.jsx'
import navbarLinks from '../data/navbar.js';
import Footer from '../components/Footer.jsx';
import AboutHero from '../components/AboutHero.jsx';
import teaches from '../assets/teaches.jpg'
import Reasons from '../components/Reasons.jsx'
import WhyWorkWithUs from '../components/WhyWorkWithUs.jsx'
export default function Careers() {
  return (
    <div>
      <Navbar links={navbarLinks} />
      <AboutHero image={teaches} />
      <Reasons/>
      <WhyWorkWithUs/>
      <Footer/>

    </div>
  );
}