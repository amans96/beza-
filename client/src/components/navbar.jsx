import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, GraduationCap, ArrowRight, UserCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import defaultLogo from "../assets/logo.jpg";

export default function Navbar({ logo, links = [], actions = [] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const schoolLogo = logo || defaultLogo;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-xl shadow-xl shadow-slate-950/20 border-b border-white/10 py-3.5"
          : "bg-slate-950/95 backdrop-blur-md border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* BRAND LOGO & TITLE */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-xl"
            aria-label="Beza School Homepage"
          >
            <div className="relative w-11 h-11 rounded-xl overflow-hidden ring-2 ring-emerald-500/30 group-hover:ring-emerald-400 transition-all shadow-md shadow-emerald-950/40 flex-shrink-0 bg-slate-900">
              <img
                src={schoolLogo}
                alt="Beza School Logo"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-white leading-tight font-heading">
                BEZA <span className="text-emerald-400">SCHOOL</span>
              </span>
              <span className="text-[10px] tracking-wider text-slate-400 uppercase font-semibold">
                Excellence & Innovation
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            <ul className="flex items-center gap-1">
              {links.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  (link.children &&
                    link.children.some((child) => location.pathname === child.path));

                return (
                  <li
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {!link.children ? (
                      <Link
                        to={link.path}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                          isActive
                            ? "text-emerald-400 bg-white/5 font-semibold"
                            : "text-slate-200 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          type="button"
                          aria-expanded={openDropdown === link.label}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 focus:outline-none ${
                            isActive
                              ? "text-emerald-400 bg-white/5 font-semibold"
                              : "text-slate-200 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {link.label}
                          <ChevronDown
                            size={15}
                            className={`transition-transform duration-200 ${
                              openDropdown === link.label ? "rotate-180 text-emerald-400" : "text-slate-400"
                            }`}
                          />
                        </button>

                        {/* Dropdown Menu */}
                        <div
                          className={`absolute top-full left-0 pt-2 min-w-[230px] transition-all duration-200 ${
                            openDropdown === link.label
                              ? "opacity-100 visible translate-y-0"
                              : "opacity-0 invisible -translate-y-2 pointer-events-none"
                          }`}
                        >
                          <div className="rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl p-2 space-y-1">
                            {link.children.map((child) => {
                              const isChildActive = location.pathname === child.path;
                              return (
                                <Link
                                  key={child.label}
                                  to={child.path}
                                  className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    isChildActive
                                      ? "bg-emerald-500/15 text-emerald-400 font-semibold"
                                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-3">
            {actions.length > 0 ? (
              actions.map((action) => (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  className={action.className}
                >
                  {action.label}
                </button>
              ))
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 flex items-center gap-1.5"
                >
                  <UserCheck size={16} className="text-slate-400" />
                  Portal Login
                </Link>
                <Link
                  to="/admissions"
                  className="px-4 py-2 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 rounded-xl transition-all duration-200 flex items-center gap-1.5 hover:-translate-y-0.5"
                >
                  <span>Apply Now</span>
                  <ArrowRight size={15} />
                </Link>
              </>
            )}
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-white/10 bg-slate-950/98 backdrop-blur-2xl ${
          menuOpen ? "max-h-[85vh] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 space-y-3">
          <ul className="divide-y divide-white/5">
            {links.map((link) => (
              <li key={link.label} className="py-2">
                {!link.children ? (
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 text-base font-medium text-slate-200 hover:text-emerald-400 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={16} className="text-slate-500" />
                  </Link>
                ) : (
                  <div>
                    <div className="py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                      {link.label}
                    </div>
                    <ul className="pl-3 space-y-1 pb-2">
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            to={child.path}
                            onClick={() => setMenuOpen(false)}
                            className="block py-2 text-sm text-slate-300 hover:text-white transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Action Buttons */}
          <div className="pt-4 flex flex-col gap-2.5 border-t border-white/10">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full py-3 px-4 rounded-xl text-center text-sm font-semibold text-white bg-white/10 hover:bg-white/15 transition-colors flex items-center justify-center gap-2"
            >
              <UserCheck size={17} />
              Portal Login
            </Link>
            <Link
              to="/admissions"
              onClick={() => setMenuOpen(false)}
              className="w-full py-3 px-4 rounded-xl text-center text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <GraduationCap size={18} />
              Apply for Admission
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}