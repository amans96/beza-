
import React from 'react';
import { FaGraduationCap , FaBookOpen , FaLightbulb , FaUsers, FaHandsHelping  } from 'react-icons/fa';
import playing  from '../assets/playing2.jpg';
import studying  from '../assets/stdying.jpg';
import playing2 from '../assets/playing.jpg'

 export default function Mission ()  {
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
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group"
              >
                {/* Top border gradient on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                
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
                className="absolute top-12 left-6 w-48 h-36 lg:w-64 lg:h-44 object-cover rounded-2xl shadow-lg hover:scale-105 hover:z-10 hover:shadow-xl transition-all duration-300 rotate-[-6deg]"
              />
              <img 
                src={playing2}
                alt="Study"
                className="absolute top-12 left-40 w-48 h-36 lg:w-64 lg:h-44 object-cover rounded-2xl shadow-lg hover:scale-105 hover:z-10 hover:shadow-xl transition-all duration-300 rotate-[4deg]"
              />
              <img 
             src={studying}
                alt="Play 2"
                className="absolute top-44 left-20 w-48 h-36 lg:w-64 lg:h-44 object-cover rounded-2xl shadow-lg hover:scale-105 hover:z-10 hover:shadow-xl transition-all duration-300 rotate-[-2deg]"
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
