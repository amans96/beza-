import React, { useState } from 'react';
import { FaGraduationCap, FaBookOpen, FaLightbulb, FaUsers, FaHandsHelping } from 'react-icons/fa';
import playing from '../assets/playing2.jpg';
import studying from '../assets/stdying.jpg';
import playing2 from '../assets/playing.jpg';

export default function Mission() {
  // States to track which item is tapped on mobile
  const [activeCard, setActiveCard] = useState(null);
  const [activeImg, setActiveImg] = useState(null);

  const missions = [
    {
      icon: <FaGraduationCap />,
      text: "To provide accessible, quality education that prepares every student for college, career, and life."
    },
    {
      icon: <FaUsers />,
      text: "To create a safe, inclusive learning environment where all students feel valued and supported."
    },
    {
      icon: <FaBookOpen />,
      text: "To develop critical thinking, creativity, and a lifelong love for learning in every student."
    },
    {
      icon: <FaHandsHelping />,
      text: "To partner with families and the community to build a brighter future for our students."
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
        
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Mission Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {missions.map((mission, index) => (
              <div 
                key={index}
                // Toggle active state on tap, reset on second tap
                onClick={() => setActiveCard(activeCard === index ? null : index)}
                // Clear state when mouse leaves (for desktop users)
                onMouseLeave={() => setActiveCard(null)}
                className={`
                  bg-white p-8 rounded-2xl shadow-md transition-all duration-300 relative overflow-hidden group cursor-pointer
                  ${activeCard === index ? 'shadow-xl -translate-y-2' : 'hover:shadow-xl hover:-translate-y-2'}
                `}
              >
                {/* Top border gradient on hover / tap */}
                <div className={`
                  absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-green-400 transform transition-transform duration-300
                  ${activeCard === index ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                `}></div>
                
                <div className="text-4xl text-orange-600 mb-4">
                  {mission.icon}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {mission.text}
                </p>
              </div>
            ))}
          </div>

          {/* Images Section */}
          <div className="relative w-80 h-96 lg:w-96 lg:h-[450px] flex-shrink-0">
            <div className="relative w-full h-full">
              <img 
                src={playing}
                alt="Play"
                onClick={() => setActiveImg(activeImg === 0 ? null : 0)}
                onMouseLeave={() => setActiveImg(null)}
                className={`
                  absolute top-12 left-6 w-48 h-36 lg:w-64 lg:h-44 object-cover rounded-2xl transition-all duration-300 rotate-[-6deg] cursor-pointer
                  ${activeImg === 0 ? 'scale-105 z-10 shadow-xl' : 'shadow-lg hover:scale-105 hover:z-10 hover:shadow-xl'}
                `}
              />
              <img 
                src={playing2}
                alt="Study"
                onClick={() => setActiveImg(activeImg === 1 ? null : 1)}
                onMouseLeave={() => setActiveImg(null)}
                className={`
                  absolute top-12 left-40 w-48 h-36 lg:w-64 lg:h-44 object-cover rounded-2xl transition-all duration-300 rotate-[4deg] cursor-pointer
                  ${activeImg === 1 ? 'scale-105 z-10 shadow-xl' : 'shadow-lg hover:scale-105 hover:z-10 hover:shadow-xl'}
                `}
              />
              <img 
                src={studying}
                alt="Play 2"
                onClick={() => setActiveImg(activeImg === 2 ? null : 2)}
                onMouseLeave={() => setActiveImg(null)}
                className={`
                  absolute top-44 left-20 w-48 h-36 lg:w-64 lg:h-44 object-cover rounded-2xl transition-all duration-300 rotate-[-2deg] cursor-pointer
                  ${activeImg === 2 ? 'scale-105 z-10 shadow-xl' : 'shadow-lg hover:scale-105 hover:z-10 hover:shadow-xl'}
                `}
              />
              {/* Glow effect overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-amber-100/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};