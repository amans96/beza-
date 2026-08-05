import React, { useState, useRef, useEffect } from 'react';
import image1 from '../assets/image8.jpg'
import image2 from '../assets/contact.jpg'
import image3 from '../assets/imges3.jpg'

const Explore = () => {
  const [activeTab, setActiveTab] = useState('learning');

  const imageMap = {
    learning: image1,
    alumni: image2,
    activities:image3
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
    
    <div className="min-h-screen bg-[#f4f7fb] flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                 <h1 className="text-3xl md:text-5xl font-serif font-semibold text-[#0B2B44] tracking-tight mb-8 text-center">
  Explore BezBarok
</h1>
  <div className="w-full flex justify-center">
      <div className="max-w-[1300px] w-full bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_40px_-12px_rgba(0,20,30,0.2)] p-5 sm:p-6 md:p-8 lg:p-10 transition-all">
        <div className="flex flex-col lg:flex-row items-stretch relative gap-6 lg:gap-0">
          
          {/* Left Container */}
          <div className="w-full lg:flex-1 lg:flex-[0_0_58%] bg-white rounded-2xl p-5 sm:p-6 md:p-7 lg:pl-8 relative z-10 shadow-[0_8px_20px_rgba(0,0,0,0.02)] order-1">
   
            
            
            <div className="flex flex-col gap-0.5 sm:gap-1">
              {Object.keys(contentMap).map((key) => (
                <div
                  key={key}
                  className={`py-1.5 sm:py-2 px-2 sm:px-3 pl-2 sm:pl-3 cursor-pointer transition-all duration-200 ${
                    activeTab === key ? 'bg-transparent' : 'hover:bg-[#f0f5fe]'
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  <h2 
                    className={`text-xl sm:text-2xl md:text-[1.9rem] font-serif font-semibold tracking-[-0.02em] transition-all duration-200 inline-block ${
                      activeTab === key 
                        ? 'text-green-700 underline decoration-gray-400 decoration-2 underline-offset-[6px]' 
                        : 'text-[#0b2b44] hover:text-green-700'
                    }`}
                  >
                    {contentMap[key].title}
                  </h2>
                  <p 
                    className={`text-sm sm:text-base leading-relaxed text-[#1f3a4e] font-['Montserrat','Segoe_UI',sans-serif] font-normal transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] overflow-hidden ${
                      activeTab === key 
                        ? 'max-h-[260px] opacity-100 pt-2 sm:pt-3 pb-2 px-3 sm:px-4 md:px-5 mt-1 sm:mt-2' 
                        : 'max-h-0 opacity-0 p-0 m-0'
                    }`}
                  >
                    {contentMap[key].description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Container - Appears from bottom on mobile */}
          <div className="w-full lg:flex-1 lg:flex-[0_0_42%] bg-transparent rounded-2xl lg:-ml-8 self-stretch flex items-center justify-center overflow-hidden min-h-[200px] sm:min-h-[250px] md:min-h-[300px] relative z-0 p-3 sm:p-4 md:p-5 order-2 lg:order-none">
            <div className="w-full h-[70%] sm:h-[75%] md:h-[80%] relative rounded-2xl overflow-hidden shadow-[0_12px_28px_-8px_rgba(0,0,0,0.1)] bg-[#d9e2ec]">
              {Object.keys(imageMap).map((key) => (
                <img
                  key={key}
                  src={imageMap[key]}
                  alt={key}
                  className={`absolute bottom-0 left-0 w-full h-full object-cover rounded-2xl transition-all duration-700 ease-out ${
                    activeTab === key 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-full'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default Explore;