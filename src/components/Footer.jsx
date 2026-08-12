import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { footerLinks, socialLinks } from "../data/footerdata.js";
import logo from '../assets/logo.jpg';

const socialIconMap = {
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedin,
  YouTube: FaYoutube,
};

const Footer = () => {
  return (
    <footer className="relative bg-[#030619] overflow-hidden text-white border-t border-white/5">
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-6">
        
        {/* Main Content: Links (Left) and Branding/Socials (Right) */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 text-sm">
          
          {/* Left Side: 3-Column Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full lg:w-2/3">
            
            {/* School */}
            <div>
              <h3 className="font-semibold text-base mb-4 text-gray-200">Our School</h3>
              <ul className="space-y-3 text-slate-400">
                {footerLinks.school.map((item) => {
                  // Intercept the path and append the specific #id hashes
                  let targetPath = item.path;
                  if (item.label === "About Us" || item.label === "About") targetPath = "/about#principal";
                  if (item.label === "Admissions") targetPath = "/admissions#why";
                  if (item.label === "Gallery") targetPath = "/gallery#gallery";

                  return (
                    <li key={item.label}>
                      <Link
                        to={targetPath}
                        className="hover:text-[#22C55E] transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="font-semibold text-base mb-4 text-gray-200">About</h3>
              <ul className="space-y-3 text-slate-400">
                {footerLinks.about.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="hover:text-[#22C55E] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h3 className="font-semibold text-base mb-4 text-gray-200">Explore</h3>
              <ul className="space-y-3 text-slate-400">
                {footerLinks.explore.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="hover:text-[#22C55E] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Logo, Slogan & Socials */}
          <div className="flex flex-col items-start lg:items-end w-full lg:w-1/3 space-y-6">
            
            {/* Logo & Brand Name */}
            <div className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="Beza School Logo" 
                className="h-12 w-12 rounded-lg object-contain bg-transparent transition-transform duration-300 hover:scale-105"
              />
              <div className="text-left lg:text-right">
                <h2 className="text-2xl font-bold leading-tight">
                  Beza<span className="text-[#22C55E]">Barok</span>
                </h2>
                <p className="text-slate-400 text-sm mt-1">Build your future here.</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-5 text-slate-400">
              {socialLinks.map((social) => {
                const IconComponent = socialIconMap[social.name];
                return (
                  <a
                    key={social.name}
                    href={social.link}
                    aria-label={social.name}
                    className="hover:text-[#22C55E] hover:scale-110 transition-all"
                  >
                    {IconComponent && <IconComponent size={22} />}
                  </a>
                );
              })}
            </div>
            
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-8"></div>

        {/* Bottom Section: Copyright Centered */}
        <div className="text-slate-500 text-sm text-center">
          © 2026 Beza. All rights reserved.
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;