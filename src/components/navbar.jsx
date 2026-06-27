import React, { useState, useEffect } from "react";
import { ChevronDown,Menu,X } from "lucide-react";

import { Link } from "react-router-dom";

export default function Navbar({ logo, links = [], actions = [] }) {
  const [scrolled, setScrolled] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
const [openDropdown, setOpenDropdown] = useState(null);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
<nav
  className={`sticky top-0 z-50 transition-all duration-300 ${
    scrolled
      ? "bg-[#22173f]/60 backdrop-blur-md shadow-lg border-b border-white/10"
      : "bg-[#22173f]"
  }`}
>
  <div className="flex items-center justify-between h-13 px-6">

    {/* LOGO */}
    <div>
      {logo && (
        <img
          src={logo}
          alt="Logo"
          className="w-14 h-14"
        />
      )}
    </div>

    {/* DESKTOP MENU */}
    <div className="hidden lg:flex items-center gap-10">

      <ul className="flex items-center gap-8">
        {links.map((link) => (
        <li
  className="relative"
  onMouseEnter={() => setOpenDropdown(link.label)}
  onMouseLeave={() => setOpenDropdown(null)}
>
            {!link.children ? (
              <Link
                to={link.path}
                className="text-white hover:text-emerald-400 transition"
              >
                {link.label}
              </Link>
            ) : (
              <>
                <button className="flex items-center gap-1 text-white hover:text-emerald-400">
                  {link.label}
                  <ChevronDown
                    size={18}
                    className="group-hover:rotate-180 transition"
                  />
                </button>

<div
  className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[220px]
  rounded-xl bg-[#22173f]/95 backdrop-blur-md border border-white/10
  shadow-2xl transition-all duration-300

  ${
    openDropdown === link.label
      ? "opacity-100 visible translate-y-0"
      : "opacity-0 invisible translate-y-2"
  }
`}
>
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.path}
                      className="block px-5 py-3 text-white hover:bg-white/10"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="flex gap-3">
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

    </div>

    {/* MOBILE BUTTON */}
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="lg:hidden text-white"
    >
      {menuOpen ? <X size={32} /> : <Menu size={32} />}
    </button>

  </div>

  {/* MOBILE MENU */}
  <div
    className={`overflow-hidden transition-all duration-500 lg:hidden ${
      menuOpen ? "max-h-screen py-4" : "max-h-0"
    }`}
  >
    <ul className="flex flex-col px-6">

      {links.map((link) => (
        <li key={link.label} className="border-b border-white/10">

          {!link.children ? (
            <Link
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block py-4 text-white"
            >
              {link.label}
            </Link>
          ) : (
            <>
              <div className="py-4 text-white font-semibold">
                {link.label}
              </div>

              <div className="pl-4 pb-3">
                {link.children.map((child) => (
                  <Link
                    key={child.label}
                    to={child.path}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-gray-300 hover:text-emerald-400"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </>
          )}

        </li>
      ))}

    </ul>

    <div className="flex flex-col gap-3 px-6 pt-4">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => {
            action.onClick?.();
            setMenuOpen(false);
          }}
          className={action.className}
        >
          {action.label}
        </button>
      ))}
    </div>
  </div>
</nav>
  );
}