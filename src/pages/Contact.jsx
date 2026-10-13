import ContactForm from '../components/ContactForm.jsx';
import  Navbar from '../components/navbar.jsx'
import navbarLinks from '../data/navbar.js';
import AboutHero from "../components/AboutHero.jsx";
import contact from "../assets/image1.jpg"
import Map from '../components/Map.jsx';
import ContactInfo from '../components/ContactInfo.jsx';
import Footer from '../components/Footer.jsx';
export default function Contact() {
    return (
        <div>
            <Navbar links={navbarLinks} />
            <AboutHero image={contact}  />
            <ContactForm />
            <Map/>
            <ContactInfo/>
            <Footer/>

            
        </div>
    );
}