import React from "react";
import principal from "../assets/principal.jpg";

export default function PrincipalMessage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
      
      {/* Header */}
      <div className="mb-16 text-center">
       

        <h2 className="mt-5 text-4xl font-bold text-gray-900 md:text-5xl">
          Welcome to Beza School
        </h2>

        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#10b883]"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col-reverse items-center gap-12 lg:flex-row">
        
        {/* Text */}
        <div className="flex-1">
          <p className="mb-6 text-xl font-medium leading-relaxed text-gray-700">
            It is with great pride and deep appreciation that I extend a
            heartfelt welcome to all who visit our school — a vibrant and
            dynamic learning community that spans Early Years, Primary, and
            Secondary education.
          </p>

          <p className="mb-6 text-lg leading-relaxed text-gray-600">
            We proudly deliver the National Curriculum for England — guiding
            students from their earliest years through to A Levels.
          </p>

          <p className="mb-8 text-lg leading-relaxed text-gray-600">
            To our current families, staff, and students: thank you for your
            trust and partnership.
          </p>

          <div className="flex items-center gap-4">
            <div className="h-[2px] w-12 bg-[#10b883]"></div>

            <div>
              <h4 className="font-semibold text-gray-900">
                Dr. Alemseged Hailu
              </h4>
              <p className="text-sm text-gray-500">
                Principal & CEO
              </p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1">
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={principal}
              alt="Principal"
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
}