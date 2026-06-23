import React from "react";
import aboutBg from "../assets/hero.jpg";

export default function AboutHero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={aboutBg}
          alt="About Us"
          className="h-full w-full object-cover blur-[2px] scale-110"
        />
      </div>

      {/* Dark Overlay */}
     

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
  <div className="px-6 lg:px-20">
   <h1 className="text-5xl font-extrabold uppercase tracking-wider text-[white] md:text-7xl">
  About Us
</h1>
    
  </div>
</div>
    </section>
  );
}