import React, { useState } from 'react';
import image1 from '../assets/image8.jpg';
import image2 from '../assets/contact.jpg';
import image3 from '../assets/imges3.jpg';

const Explore = () => {
  const [activeTab, setActiveTab] = useState('learning');

  // Merging content and images into a single cleaner data object
  const data = {
    learning: {
      title: 'Learning',
      description: 'Beza Bezbarok is a global leader in international education and innovation, creating impactful, personalized, real-world learning experiences for our students. We offer the full suite of International Baccalaureate programs, including the Primary Years Programme, Middle Years Programme (MYP), Diploma Programme (DP), and Career-related Programme (CP) in Grades 11 and 12. Find out more about academics at ICS.',
      img: image1
    },
    alumni: {
      title: 'Alumni',
      description: 'With more than 60 years of history, the ICS Alumni Network spans around the globe. We value the sustained connections we have with our former students, parents, and staff. There are several ways to remain involved with the school after your departure, including mentorship and internship programs, networking events, and use of the campus facilities.',
      img: image2
    },
    activities: {
      title: 'Activities',
      description: "Our 15-acre campus is an oasis in the heart of Ethiopia's capital. Our school buildings feature state-of-the-art classrooms, purposefully designed to be flexible to adapt to different styles of learning. Our spaces are well-equipped with the latest technology and resources. We have internationally certified athletics facilities, as well as indoor and outdoor performance spaces, studios, and play areas. Plant and animal life are abundant at ICS Addis, with a student-run garden, water collection equipment, stunning flowers and the infamous tortoises who freely roam around the grounds.",
      img: image3
    }
  };

  return (
    // Added 'flex' here which was missing in the original code for flex-col to work properly
    <div className="min-h-screen bg-[#f4f7fb] flex flex-col items-center justify-center p-4 sm:p-8 md:p-12">
      
      <h1 className="text-3xl md:text-5xl font-serif font-semibold text-[#0B2B44] tracking-tight mb-8 text-center">
        Explore BezBarok
      </h1>

      {/* Main Unified Card Container */}
      <div className="w-full max-w-6xl bg-white rounded-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side: Text / Accordion Content */}
        <div className="w-full lg:w-[55%] p-6 sm:p-10 md:p-12 flex flex-col justify-center bg-white z-10">
          <div className="flex flex-col gap-2">
            {Object.entries(data).map(([key, item]) => {
              const isActive = activeTab === key;
              return (
                <div 
                  key={key} 
                  className="cursor-pointer border-b border-gray-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0"
                  onClick={() => setActiveTab(key)}
                >
                  {/* Title */}
                  <h2 className={`text-2xl sm:text-3xl font-serif font-semibold transition-colors duration-300 ${
                    isActive ? 'text-green-700' : 'text-[#0b2b44] hover:text-green-600'
                  }`}>
                    {item.title}
                  </h2>
                  
                  {/* Description with smooth CSS Grid height animation */}
                  <div className={`grid transition-all duration-500 ease-in-out ${
                    isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                  }`}>
                    <div className="overflow-hidden">
                      <p className="text-[#1f3a4e] leading-relaxed text-sm sm:text-base font-['Montserrat','Segoe_UI',sans-serif] pr-2 sm:pr-6">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side (Desktop) / Bottom (Mobile): Images */}
        {/* Fixed height on mobile (h-[300px]) removes the awkward white space, auto stretches on desktop */}
        <div className="w-full lg:w-[45%] h-[300px] sm:h-[400px] lg:h-auto relative bg-[#d9e2ec] overflow-hidden">
          {Object.entries(data).map(([key, item]) => {
            const isActive = activeTab === key;
            return (
              <div
                key={key}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                  isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'
                }`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Optional overlay to make it look a bit richer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Explore;