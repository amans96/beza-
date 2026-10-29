import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { socialLinks } from "../data/footerdata.js";
import logo from "../assets/logo.jpg";

const socialIconMap = {
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedin,
  YouTube: FaYoutube,
};

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-white border-t border-white/10 overflow-hidden font-sans">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 relative z-10">
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Info (2 Cols on Desktop) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-emerald-500/30 group-hover:ring-emerald-400 transition-all flex-shrink-0 bg-slate-900">
                <img
                  src={logo}
                  alt="Beza School Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-white font-heading">
                  BEZA <span className="text-emerald-400">SCHOOL</span>
                </h3>
                <p className="text-xs text-slate-400 font-medium tracking-wide">
                  Excellence • Character • Innovation
                </p>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Dedicated to nurturing young minds with over 23 years of academic distinction, comprehensive STEM programs, and a vibrant community in Bishoftu, Ethiopia.
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-emerald-400 flex-shrink-0" />
                <span>Bishoftu (Debre Zeyit), Oromia, Ethiopia</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-400 flex-shrink-0" />
                <span>+251 11 433 8000 / +251 91 122 3344</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-emerald-400 flex-shrink-0" />
                <span>info@bezaschool.edu.et</span>
              </p>
            </div>
          </div>

          {/* Col 2: Our School */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-4 font-heading">
              Our School
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  About Us & Leadership
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-emerald-400 transition-colors">
                  Admissions & Enrollment
                </Link>
              </li>
              <li>
                <Link to="/student" className="hover:text-emerald-400 transition-colors">
                  Student Life & Clubs
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-emerald-400 transition-colors">
                  Campus Gallery
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-emerald-400 transition-colors">
                  Careers & Faculty
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Pathways */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-4 font-heading">
              Academics
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/admissions#why" className="hover:text-emerald-400 transition-colors">
                  Early Years (Ages 3-5)
                </Link>
              </li>
              <li>
                <Link to="/admissions#why" className="hover:text-emerald-400 transition-colors">
                  Primary School (Grades 1-6)
                </Link>
              </li>
              <li>
                <Link to="/admissions#why" className="hover:text-emerald-400 transition-colors">
                  Secondary School (Grades 7-12)
                </Link>
              </li>
              <li>
                <Link to="/about#mission" className="hover:text-emerald-400 transition-colors">
                  STEM & Robotics Labs
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-emerald-400 transition-colors">
                  Admissions FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Portals & Socials */}
          <div className="space-y-5">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-4 font-heading">
              Community
            </h4>

            {/* Social Icons */}
            <div className="flex items-center gap-3 text-slate-400">
              {socialLinks.map((social) => {
                const IconComponent = socialIconMap[social.name];
                return (
                  <a
                    key={social.name}
                    href={social.link}
                    aria-label={social.name}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400 flex items-center justify-center transition-all"
                  >
                    {IconComponent && <IconComponent size={16} />}
                  </a>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
              >
                <span>Administrator Portal</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Beza School. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link to="/admissions" className="hover:text-slate-400 transition-colors">Terms of Admission</Link>
            <Link to="/contact" className="hover:text-slate-400 transition-colors">Campus Map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}