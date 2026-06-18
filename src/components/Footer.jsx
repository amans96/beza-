

const Footer = () => {
  return (
    <footer className="relative bg-[#020617] overflow-hidden text-white">

      {/* Background Text */}
      <div
  className="
    absolute
    inset-0
    flex
    items-center
    justify-center
    pointer-events-none
    select-none
    overflow-hidden
  "
>
  <h1
    className="
      text-[120px]
      md:text-[220px]
      lg:text-[280px]
      font-black
      uppercase
      tracking-wider
      opacity-10
      blur-[2px]
      whitespace-nowrap
    "
  >
      <span className="text-white">CODE </span>
  <span className="text-[#e78c16]">HUB</span>
  </h1>
</div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-slate-400">
              {footerLinks.company.map((item) => (
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
              Courses
            </h3>

            <ul className="space-y-3 text-slate-400">
              {footerLinks.courses.map((item) => (
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
              Interview Prep
            </h3>

            <ul className="space-y-3 text-slate-400">
              {footerLinks.interviewPrep.map((item) => (
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
              Code<span className="text-[#e78c16]"> Hub</span>
            </h2>

            <p className="text-slate-400 mt-2">
              Learn. Build. Get Hired.
            </p>
          </div>

          <div className="flex items-center gap-5">

            <FaGithub 
              size={22}
              className="cursor-pointer hover:scale-110 transition"
            />

            <FaLinkedin 
              size={22}
              className="cursor-pointer hover:scale-110 transition"
            />

            <FaYoutube
              size={22}
              className="cursor-pointer hover:scale-110 transition"
            />

            <FaDiscord
              size={22}
              className="cursor-pointer hover:scale-110 transition"
            />


          </div>
        </div>

        <div className="text-center text-slate-500 mt-12">
          © 2026 Code Hub. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;