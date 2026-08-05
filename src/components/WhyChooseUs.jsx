import React from "react";
import whyChooseData from "../data/whyChooseData";

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      {/* 1. Creative Background Blobs (Adds depth to the whole section) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header - Upgraded Typography */}
        <div className="text-center mb-20">
          <span className="text-sm font-bold tracking-wider text-indigo-500 uppercase mb-3 block">
            Discover the Difference
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 mb-6">
            Why Choose Us
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            We provide an environment where students thrive academically,
            socially, and personally. Step into a future built for you.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseData.map((item) => (
            <div
              key={item.id}
              className={`
                group relative
                bg-white/60 backdrop-blur-xl
                rounded-3xl
                p-8 md:p-10
                border border-white/80
                shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                transition-all duration-500
                hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)]
                hover:-translate-y-2
                ${item.hoverColor || ''}
                overflow-hidden
              `}
            >
              {/* Subtle Gradient Overlay inside card on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

              {/* 2. Icon Container with Ambient Glow Effect */}
              <div className="relative mb-8 inline-block z-10">
                {/* Blurred ambient glow behind the icon */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 rounded-full scale-150`}></div>

                {/* Actual Icon Box */}
                <div className={`
                  relative
                  w-16 h-16
                  rounded-2xl
                  bg-gradient-to-br ${item.color}
                  flex items-center justify-center
                  text-3xl
                  shadow-lg
                  transform transition-transform duration-500
                  group-hover:scale-110 group-hover:-rotate-3
                `}>
                  <span className="text-white drop-shadow-md">{item.icon}</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 transition-colors duration-300 group-hover:text-black">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-800">
                  {item.description}
                </p>
              </div>

              {/* 3. Modern Corner Splash (Replaces the basic bottom line) */}
              <div className={`
                absolute -bottom-16 -right-16
                w-40 h-40
                bg-gradient-to-br ${item.color}
                rounded-full
                opacity-0 group-hover:opacity-10
                transition-all duration-700 ease-out
                group-hover:scale-[2.5]
                z-0
              `} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;