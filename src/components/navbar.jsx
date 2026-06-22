import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar({ logo, links = [], actions = [] }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`flex items-center justify-between gap-3 max-h-[78px] px-4 sticky top-0 z-50 transition-all duration-300
      ${
        scrolled
          ? "bg-[#22173f]/60 backdrop-blur-md shadow-lg border-b border-white/10"
          : "bg-[#22173f]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-[50px] w-[50px] ml-5 transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Links */}
      <div className="flex-1">
        <ul className="flex items-center justify-center gap-6 mt-2">
          {links.map((link) => (
            <li
              key={link.label}
              className={`relative ${link.children ? "group" : ""}`}
            >
              {link.children ? (
                <button
                  className="
                    flex items-center gap-1
                    text-white text-lg font-sans pb-1
                    transition-colors duration-300
                    hover:text-[#10b981]
                  "
                >
                  {link.label}

                  <ChevronDown
                    size={18}
                    className="
                      transition-transform
                      duration-300
                      group-hover:rotate-180
                    "
                  />
                </button>
              ) : (
                <Link
                  to={link.path}
                  className="
                    flex items-center gap-1
                    text-white text-lg font-sans pb-1
                    transition-colors duration-300
                    hover:text-[#10b981]
                  "
                >
                  {link.label}
                </Link>
              )}

              {link.children && (
                <div
                  className="
                    absolute top-full left-1/2 -translate-x-1/2 mt-3
                    min-w-[240px]
                    bg-[#22173f]/95
                    backdrop-blur-md
                    rounded-xl
                    border border-white/10
                    shadow-2xl

                    opacity-0
                    invisible
                    translate-y-2

                    group-hover:opacity-100
                    group-hover:visible
                    group-hover:translate-y-0

                    transition-all
                    duration-300
                    overflow-hidden
                  "
                >
                  {link.children.map((course) => (
                    <Link
                      key={course.label}
                      to={course.path}
                      className="
                        block
                        px-5 py-3
                        text-white
                        transition-all
                        duration-300
                        hover:bg-white/10
                        hover:text-[#10b981]
                      "
                    >
                      {course.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-2.5">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className={action.className}
          >
            {action.label}
          </button>
        ))}
      </div>
    </nav>
  );
}