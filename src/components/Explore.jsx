import React, { useState, useRef, useEffect } from 'react';

const Explore = () => {
  const [activeTab, setActiveTab] = useState('learning');

  const imageMap = {
    learning: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop&crop=center&auto=format',
    alumni: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&h=400&fit=crop&crop=center&auto=format',
    activities: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop&crop=center&auto=format'
  };

  const contentMap = {
    learning: {
      title: 'Learning',
      description: 'Beza Bezbarok is a global leader in international education and innovation, creating impactful, personalized, real-world learning experiences for our students. We offer the full suite of International Baccalaureate programs, including the Primary Years Programme, Middle Years Programme (MYP), Diploma Programme (DP), and Career-related Programme (CP) in Grades 11 and 12. Find out more about academics at ICS.'
    },
    alumni: {
      title: 'Alumni',
      description: 'With more than 60 years of history, the ICS Alumni Network spans around the globe. We value the sustained connections we have with our former students, parents, and staff. There are several ways to remain involved with the school after your departure, including mentorship and internship programs, networking events, and use of the campus facilities.'
    },
    activities: {
      title: 'Activities',
      description: 'Our 15-acre campus is an oasis in the heart of Ethiopia\'s capital. Our school buildings feature state-of-the-art classrooms, purposefully designed to be flexible to adapt to different styles of learning. Our spaces are well-equipped with the latest technology and resources. We have internationally certified athletics facilities, as well as indoor and outdoor performance spaces, studios, and play areas. Plant and animal life are abundant at ICS Addis, with a student-run garden, water collection equipment, stunning flowers and the infamous tortoises who freely roam around the grounds.'
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center p-8">
      <div className="max-w-[1300px] w-full bg-white rounded-[2.5rem] shadow-[0_20px_40px_-12px_rgba(0,20,30,0.2)] p-10 transition-all">
        <div className="flex flex-col md:flex-row items-stretch relative">
          {/* Left Container */}
          <div className="flex-1 md:flex-[0_0_58%] bg-white rounded-2xl p-7 pl-8 relative z-10 shadow-[0_8px_20px_rgba(0,0,0,0.02)]">
            <h1 className="text-4xl font-semibold text-[#0b2b44] mb-7 tracking-tight">
              Explore ICS
            </h1>
            
            <div className="flex flex-col gap-1">
              {Object.keys(contentMap).map((key) => (
                <div
                  key={key}
                  className={`py-2 px-1 pl-3 cursor-pointer transition-all duration-200 ${
                    activeTab === key ? 'bg-transparent' : 'hover:bg-[#f0f5fe]'
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  <h2 
                    className={`text-[1.9rem] font-serif font-semibold tracking-[-0.02em] transition-all duration-200 inline-block ${
                      activeTab === key 
                        ? 'text-green-700 underline decoration-gray-400 decoration-2 underline-offset-[6px]' 
                        : 'text-[#0b2b44] hover:text-green-700'
                    }`}
                  >
                    {contentMap[key].title}
                  </h2>
                  <p 
                    className={`text-base leading-relaxed text-[#1f3a4e] font-['Montserrat','Segoe_UI',sans-serif] font-normal transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] overflow-hidden ${
                      activeTab === key 
                        ? 'max-h-[260px] opacity-100 pt-3 pb-2 px-5 mt-2' 
                        : 'max-h-0 opacity-0 p-0 m-0'
                    }`}
                  >
                    {contentMap[key].description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Container */}
          <div className="flex-1 md:flex-[0_0_42%] bg-transparent rounded-2xl md:-ml-8 self-stretch flex items-center justify-center overflow-hidden min-h-[300px] relative z-0 p-5">
            <div className="w-full h-[80%] relative rounded-2xl overflow-hidden shadow-[0_12px_28px_-8px_rgba(0,0,0,0.1)] bg-[#d9e2ec]">
              {Object.keys(imageMap).map((key) => (
                <img
                  key={key}
                  src={imageMap[key]}
                  alt={key}
                  className={`absolute top-0 left-0 w-full h-full object-cover rounded-2xl transition-opacity duration-700 ease-in-out ${
                    activeTab === key ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;