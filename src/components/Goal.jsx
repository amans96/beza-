// components/Goal.jsx
import React from 'react';
import { FaBullseye, FaRocket, FaChartLine, FaUsers } from 'react-icons/fa';
import grad from '../assets/grad.jpg';
import image1 from '../assets/images.jpg';
import higher from '../assets/high1.jpg'; 


const Goal = () => {
  const goals = [
    {
      number: "01",
      text: "Achieve 100% customer satisfaction through exceptional service and support."
    },
    {
      number: "02",
      text: "Develop innovative solutions that solve real-world problems effectively."
    },
    {
      number: "03",
      text: "Build a sustainable business that creates value for all stakeholders."
    },
    {
      number: "04",
      text: "Foster a culture of continuous learning and professional growth."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Our Goals</h2>
        
        <div className="flex flex-col lg:flex-row items-start gap-20">
          {/* Images Section - Now on LEFT */}
          <div className="relative w-80 h-96 lg:w-96 lg:h-[450px] flex-shrink-0">
            <div className="relative w-full h-full">
              <img 
                src={grad}
                alt="Goal 1"
                className="absolute top-12 left-6 w-48 h-36 lg:w-64 lg:h-44 object-cover rounded-2xl shadow-lg hover:scale-105 hover:z-10 hover:shadow-xl transition-all duration-300 rotate-[-6deg]"
              />
              <img 
                src={image1}
                alt="Goal 2"
                className="absolute top-12 left-40 w-48 h-36 lg:w-64 lg:h-44 object-cover rounded-2xl shadow-lg hover:scale-105 hover:z-10 hover:shadow-xl transition-all duration-300 rotate-[4deg]"
              />
              <img 
                src={higher} 
                alt="Goal 3"
                className="absolute top-44 left-20 w-48 h-36 lg:w-64 lg:h-44 object-cover rounded-2xl shadow-lg hover:scale-105 hover:z-10 hover:shadow-xl transition-all duration-300 rotate-[-2deg]"
              />
              {/* Glow effect overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-amber-100/20 to-transparent"></div>
            </div>
          </div>

          {/* Goal Cards - Now on RIGHT */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal, index) => (
              <div 
                key={index} 
               className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Corner decoration */}
               <div className="absolute top-0 right-0 w-0 h-0 border-solid border-[30px] border-transparent bg-gradient-to-r from-lime-600 to-lime-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="flex items-start gap-6">
                  <span className="text-3xl md:text-4xl font-bold text-orange-600 min-w-[60px] font-serif">
                    {goal.number}
                  </span>
                  <p className="text-gray-600 leading-relaxed">
                    {goal.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Goal;