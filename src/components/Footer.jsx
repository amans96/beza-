import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaDiscord,
  FaTelegram,
  FaPhone,
  FaTiktok,
} from "react-icons/fa";

import  {footerLinks}  from "../data/footerdata.js";
import logo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <footer className="relative bg-[#020617] overflow-hidden text-white">

      
   

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6 md:py-4">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-5">
              Our school
            </h3>

            <ul className="space-y-3 text-slate-400">
              {footerLinks.school.map((item) => (
                <li
                  key={item}
                  className="hover:text-white cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-bold text-lg mb-5">
              About
            </h3>

            <ul className="space-y-3 text-slate-400">
              {footerLinks.about.map((item) => (
                <li
                  key={item}
                  className="hover:text-white cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Interview Prep */}
          <div>
            <h3 className="font-bold text-lg mb-5">
          Academics
            </h3>

            <ul className="space-y-3 text-slate-400">
              {footerLinks.academics.map((item) => (
                <li
                  key={item}
                  className="hover:text-white cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-5">
              Resources
            </h3>

            <ul className="space-y-3 text-slate-400">
              {footerLinks.resources.map((item) => (
                <li
                  key={item}
                  className="hover:text-white cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-bold text-lg mb-5">
              Community
            </h3>

            <ul className="space-y-3 text-slate-400">
              {footerLinks.community.map((item) => (
                <li
                  key={item}
                  className="hover:text-white cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800 my-12"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div>
            <h2 className="text-2xl font-bold">
              Beza<span className="text-[#10b981]"> BezaBarok</span>
            </h2>
            <img src={logo} className="h-[50px] w-[50px] ml-5 transition-transform duration-300 hover:scale-105"></img>

            <p className="text-slate-400 mt-2">
              Build your future here.
            </p>
          </div>

          <div className="flex items-center gap-5">

            <FaTelegram 
              size={22}
              className="cursor-pointer hover:scale-110 transition"
            />

            <FaLinkedin 
              size={22}
              className="cursor-pointer hover:scale-110 transition"
            />

            <FaPhone
              size={22}
              className="cursor-pointer hover:scale-110 transition"
            />

            <FaTiktok
              size={22}
              className="cursor-pointer hover:scale-110 transition"
            />


          </div>
        </div>

        <div className="text-center text-slate-500 mt-12">
          © 2026 Beza. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;