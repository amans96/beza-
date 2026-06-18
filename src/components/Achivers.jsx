import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.jpg';
import stud1 from '../assets/stud1.jpg';
import stud2 from '../assets/stud2.jpg';
import stud3 from '../assets/stud3.webp';
import stud4 from '../assets/stud4.jpg';

export default function Achievers() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);

  const achievers = [
    {
      id: 1,
      name: "Tola Chala",
      logo: logo,
      photo: stud1,
      achievement: "Completed 100+ coding challenges and became a full-stack developer within 6 months. Now working at Google.",
      badge: "🥇",
      year: "2024",
    },
    {
      id: 2,
      name: "Michael Chen",
      logo: logo,
      photo: stud2,
      achievement: "Built 5 full-stack applications and contributed to open-source projects. Landed a role at Microsoft.",
      badge: "🥈",
      year: "2024",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      logo: logo,
      photo: stud3,
      achievement: "Mastered Python and Data Science in 4 months. Now working as a Data Analyst at Amazon.",
      badge: "🥉",
      year: "2023",
    },
    {
      id: 4,
      name: "James Wilson",
      logo: logo,
      photo: stud4,
      achievement: "Transitioned from finance to tech in 8 months. Now a Cloud Architect at AWS.",
      badge: "⭐",
      year: "2023",
    },
    {
      id: 5,
      name: "Priya Patel",
      logo: logo,
      photo: stud1,
      achievement: "Learned React Native and published 3 mobile apps. Founded her own startup with 50k+ users.",
      badge: "🏆",
      year: "2024",
    },
    {
      id: 6,
      name: "David Kim",
      logo: logo,
      photo: stud2,
      achievement: "Mastered AI and Machine Learning in 5 months. Leading AI research at a Fortune 500 company.",
      badge: "🌟",
      year: "2023",
    },
    {
      id: 7,
      name: "Lisa Thompson",
      logo: logo,
      photo: stud3,
      achievement: "Went from beginner to senior developer in 1 year. Now mentoring 100+ students.",
      badge: "🎯",
      year: "2024",
    },
    {
      id: 8,
      name: "Alex Rivera",
      logo: logo,
      photo: stud4,
      achievement: "Built a coding bootcamp that helped 500+ students get jobs in tech. Featured in Forbes 30 Under 30.",
      badge: "🚀",
      year: "2023",
    },
    {
      id: 9,
      name: "Maya Williams",
      logo: logo,
      photo: stud1,
      achievement: "Designed and built a learning platform used by 10,000+ students worldwide.",
      badge: "💎",
      year: "2024",
    },
    {
      id: 10,
      name: "Ryan Park",
      logo: logo,
      photo: stud2,
      achievement: "Developed an AI-powered coding assistant that helped 5,000+ developers debug faster.",
      badge: "🔥",
      year: "2023",
    }
  ];

  // Triple the array for seamless infinite scroll
  const infiniteAchievers = [...achievers, ...achievers, ...achievers];

  // Auto-scroll logic with slower speed
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPos = 0;
    const speed = 0.5; // Slower speed (was 0.8)

    const animate = () => {
      if (!container) return;
      const firstSetWidth = achievers.length * (246 + 24);
      scrollPos += speed;
      
      if (scrollPos >= firstSetWidth) {
        scrollPos = 0;
        container.scrollLeft = 0;
      }
      
      container.scrollLeft = scrollPos;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleMouseEnter = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    const handleMouseLeave = () => {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [achievers.length]);

  // Modal navigation
  const handleCardClick = (index) => {
    const actualIndex = index % achievers.length;
    setSelectedIndex(actualIndex);
    setCurrentIndex(actualIndex);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? achievers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === achievers.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex !== null) {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'Escape') handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#10b981] font-semibold uppercase tracking-wider text-sm bg-emerald-100 px-4 py-2 rounded-full inline-block">
            Our Achievers
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 text-gray-800">
            Success Stories
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Meet our amazing students who transformed their careers through CodeHub
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar cursor-grab"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            overflowX: 'auto',
            scrollBehavior: 'auto'
          }}
        >
          {infiniteAchievers.map((achiever, index) => (
            <div
              key={`${achiever.id}-${index}`}
              onClick={() => handleCardClick(index)}
              className="flex-shrink-0 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-emerald-200 cursor-pointer hover:scale-105 hover:border-emerald-400"
              style={{ 
                width: '246px', 
                height: '353px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Badge - Emerald Green */}
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-3 py-1.5 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-1.5">
                  <span className="text-lg">{achiever.badge}</span>
                  <span className="text-white font-semibold text-xs">
                    {achiever.year}
                  </span>
                </div>
                <span className="text-white/70 text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                  #{achiever.id}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                {/* Logo and Photo */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img src={achiever.logo} alt="logo" className="w-8 h-8 object-contain" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm truncate">
                        {achiever.name}
                      </h3>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src={achiever.photo} alt="student" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Achievement */}
                <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100 flex-1">
                  <p className="text-gray-700 text-[11px] leading-relaxed line-clamp-4">
                    {achiever.achievement}
                  </p>
                </div>

                {/* Stats */}
                <div className="mt-3 flex items-center justify-between text-[10px] text-gray-500 border-t border-emerald-100 pt-2 flex-shrink-0">
                  <div className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span>Top Achiever</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                    Class of {achiever.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
       
      </div>

      {/* Modal - Zoomed View (Smaller) */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleClose}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 text-xl transition-colors"
            >
              ✕
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg text-xl transition-all"
            >
              ◀
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg text-xl transition-all"
            >
              ▶
            </button>

            {/* Content - Simplified like ID 1 */}
            <div className="p-6 md:p-8">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={achievers[currentIndex].photo} alt="student" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl">{achievers[currentIndex].badge}</span>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {achievers[currentIndex].name}
                    </h2>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <span>🏅 {achievers[currentIndex].year}</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                <h3 className="font-semibold text-gray-800 mb-2">🏆 Achievement</h3>
                <p className="text-gray-700 leading-relaxed">
                  {achievers[currentIndex].achievement}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between text-sm text-gray-400 border-t border-emerald-100 pt-4">
                <span>{currentIndex + 1} of {achievers.length}</span>
        
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}