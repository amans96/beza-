import Navbar from "../components/navbar.jsx";
import navbarLinks from "../data/navbar.js";
import AboutHero from "../components/AboutHero.jsx";
import contactBg from "../assets/image1.jpg";
import ContactForm from "../components/ContactForm.jsx";
import ContactInfo from "../components/ContactInfo.jsx";
import Map from "../components/Map.jsx";
import Footer from "../components/Footer.jsx";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar links={navbarLinks} />

      <main className="flex-1">
        <AboutHero
          image={contactBg}
          title="Contact & Visit Campus"
          subtitle="We welcome prospective parents and visitors to our Bishoftu campus. Connect with our admissions team today."
          breadcrumb="Contact Us"
        />

        {/* Unified 2-Column Section */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: Contact Details & Campus Map */}
              <div className="lg:col-span-6 space-y-8">
                <ContactInfo />
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 px-1">
                    Find Our Campus on the Map
                  </h4>
                  <Map />
                </div>
              </div>

              {/* Right Column: Interactive Contact Form */}
              <div className="lg:col-span-6 lg:sticky lg:top-28">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}