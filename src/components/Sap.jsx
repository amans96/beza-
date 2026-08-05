import gsap from "gsap";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Sap() {
  const bezaRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      bezaRef.current,
      {
        scale: 1.3,
        opacity: 0,
        letterSpacing: "-5vw",
      },
      {
        scale: 1,
        opacity: 1,
        letterSpacing: "-3vw",
        duration: 2,
        ease: "power4.out",
      }
    );

    gsap.to(bezaRef.current, {
      x: 40,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2c343f]">
      
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          ref={bezaRef}
          className="text-[50vw] leading-none font-normal tracking-[-3vw] text-[#10b981]/15"
        >
          BEZA
        </span>
      </div>


      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">

        <h1 className="text-5xl md:text-7xl font-normal text-white mb-6">
          Let Your Adventure Begin Here
        </h1>


        <div className="flex flex-wrap justify-center gap-5">

          {/* Register */}
          <a
            href="#register"
            className="flex items-center justify-center w-44 h-14 rounded-xl bg-[#10b981] text-white font-semibold shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#10b981]/30"
          >
            Register
          </a>


          {/* FAQ */}
          <a
            href="#faq"
            className="flex items-center justify-center w-44 h-14 rounded-xl border-2 border-[#10b981] text-[#10b981] font-semibold bg-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#10b981] hover:text-white"
          >
            FAQs
          </a>


          {/* Contact */}
         <Link
  to="/contact"
  className="flex items-center justify-center w-44 h-14 rounded-xl bg-[#10b981] text-white font-semibold shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#10b981]/30"
>
  Contact Us
</Link>

        </div>

      </div>

    </section>
  );
}