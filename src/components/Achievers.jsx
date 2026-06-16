import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Achievers() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);

  const achievers = [
    {
      id: 1,
      name: "Sarah Johnson",
      school: "MIT University",
      logo: "🏛️",
      photo: "👩‍💻",
      achievement: "Completed 100+ coding challenges and became a full-stack developer within 6 months. Now working at Google as a Software Engineer.",
      badge: "🥇",
      year: "2024",
      fullName: "Sarah M. Johnson",
      location: "Cambridge, MA",
      company: "Google",
      role: "Senior Software Engineer",
      story: "Sarah's journey from a complete beginner to a Google engineer is nothing short of inspiring. Within just 6 months of joining CodeHub, she had completed over 100 coding challenges and built 5 full-stack applications. Her dedication and hard work paid off when she landed her dream job at Google."
    },
    {
      id: 2,
      name: "Michael Chen",
      school: "Stanford University",
      logo: "🎓",
      photo: "👨‍💻",
      achievement: "Built 5 full-stack applications and contributed to open-source projects. Landed a role at Microsoft as a Frontend Developer.",
      badge: "🥈",
      year: "2024",
      fullName: "Michael T. Chen",
      location: "Palo Alto, CA",
      company: "Microsoft",
      role: "Frontend Developer",
      story: "Michael transformed his career through CodeHub's comprehensive curriculum. He built 5 production-ready applications and became a regular contributor to major open-source projects. His portfolio caught Microsoft's attention, and he now works on their flagship products."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      school: "Harvard University",
      logo: "📚",
      photo: "👩‍🎓",
      achievement: "Mastered Python and Data Science in 4 months. Now working as a Data Analyst at Amazon.",
      badge: "🥉",
      year: "2023",
      fullName: "Emily R. Rodriguez",
      location: "Boston, MA",
      company: "Amazon",
      role: "Data Analyst",
      story: "Emily went from knowing zero Python to becoming a Data Analyst at Amazon in just 4 months. Her ability to master complex data science concepts and apply them to real-world problems made her stand out among hundreds of applicants."
    },
    {
      id: 4,
      name: "James Wilson",
      school: "Oxford University",
      logo: "🏫",
      photo: "👨‍🎓",
      achievement: "Transitioned from finance to tech in 8 months. Now a Cloud Architect at AWS.",
      badge: "⭐",
      year: "2023",
      fullName: "James A. Wilson",
      location: "London, UK",
      company: "AWS",
      role: "Cloud Architect",
      story: "James left a 10-year career in finance to pursue his passion for technology. Through CodeHub's cloud computing track, he mastered AWS, Azure, and GCP. He now leads a team of cloud engineers at Amazon Web Services."
    },
    {
      id: 5,
      name: "Priya Patel",
      school: "Cambridge University",
      logo: "🌍",
      photo: "👩‍💻",
      achievement: "Learned React Native and published 3 mobile apps. Founded her own startup with 50k+ users.",
      badge: "🏆",
      year: "2024",
      fullName: "Priya S. Patel",
      location: "London, UK",
      company: "TechStart Inc.",
      role: "Founder & CEO",
      story: "Priya turned her mobile app ideas into reality with CodeHub's React Native course. She published 3 successful apps and eventually founded her own startup, which now serves over 50,000 users across the globe."
    },
    {
      id: 6,
      name: "David Kim",
      school: "UC Berkeley",
      logo: "🔬",
      photo: "👨‍💻",
      achievement: "Mastered AI and Machine Learning in 5 months. Leading AI research at a Fortune 500 company.",
      badge: "🌟",
      year: "2023",
      fullName: "David H. Kim",
      location: "San Francisco, CA",
      company: "Fortune 500 Tech",
      role: "AI Research Lead",
      story: "David dove deep into AI and Machine Learning with CodeHub's advanced curriculum. Within 5 months, he was leading AI research projects at a Fortune 500 company, developing cutting-edge solutions that impact millions of users."
    },
    {
      id: 7,
      name: "Lisa Thompson",
      school: "Yale University",
      logo: "📖",
      photo: "👩‍🎓",
      achievement: "Went from beginner to senior developer in 1 year. Now mentoring 100+ students.",
      badge: "🎯",
      year: "2024",
      fullName: "Lisa M. Thompson",
      location: "New Haven, CT",
      company: "CodeHub",
      role: "Senior Mentor",
      story: "Lisa's transformation from a complete beginner to a senior developer in just one year is remarkable. Now she gives back to the community by mentoring over 100 students, helping them achieve their coding goals."
    },
    {
      id: 8,
      name: "Alex Rivera",
      school: "Princeton University",
      logo: "💡",
      photo: "👨‍💻",
      achievement: "Built a coding bootcamp that helped 500+ students get jobs in tech. Featured in Forbes 30 Under 30.",
      badge: "🚀",
      year: "2023",
      fullName: "Alex J. Rivera",
      location: "New York, NY",
      company: "CodeAcademy",
      role: "Founder & CTO",
      story: "Alex used his CodeHub experience to build a coding bootcamp that has helped over 500 students land tech jobs. His innovative approach to teaching has earned him a spot on Forbes 30 Under 30 list."
    },
    {
      id: 9,
      name: "Maya Williams",
      school: "Columbia University",
      logo: "🎨",
      photo: "👩‍💻",
      achievement: "Designed and built a learning platform used by 10,000+ students worldwide.",
      badge: "💎",
      year: "2024",
      fullName: "Maya K. Williams",
      location: "New York, NY",
      company: "EduTech Global",
      role: "Lead Developer",
      story: "Maya combined her design skills with coding expertise to create an innovative learning platform. Today, her platform is used by over 10,000 students across 50 countries, making quality education accessible to all."
    },
    {
      id: 10,
      name: "Ryan Park",
      school: "Cornell University",
      logo: "⚡",
      photo: "👨‍💻",
      achievement: "Developed an AI-powered coding assistant that helped 5,000+ developers debug faster.",
      badge: "🔥",
      year: "2023",
      fullName: "Ryan S. Park",
      location: "Ithaca, NY",
      company: "DevTools AI",
      role: "Co-Founder",
      story: "Ryan's AI-powered coding assistant started as a CodeHub project and has now helped over 5,000 developers debug their code faster. He co-founded DevTools AI to bring his innovation to the global developer community."
    }
  ];

  // Duplicate the array for infinite scroll effect
  const infiniteAchievers = [...achievers, ...achievers, ...achievers];

  useEffect(() => {
    const section = sectionRef.current;
    const container = scrollContainerRef.current;

    if (!section || !container) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      
      const maxScroll = container.scrollWidth - container.clientWidth;
      const scrollPosition = Math.max(0, Math.min(scrollProgress * maxScroll, maxScroll));
      
      container.scrollLeft = scrollPosition;

      // Reset scroll position for infinite effect
      const middleSet = achievers.length * 246 + (achievers.length - 1) * 24;
      if (container.scrollLeft >= achievers.length * 3 * 246) {
        container.scrollLeft = container.scrollLeft - achievers.length * 246;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

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
    <div 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-16 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#ff6a00] font-semibold uppercase tracking-wider text-sm bg-orange-100 px-4 py-2 rounded-full inline-block">
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
          className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            overflowX: 'auto'
          }}
        >
          {infiniteAchievers.map((achiever, index) => (
            <div
              key={`${achiever.id}-${index}`}
              onClick={() => handleCardClick(index)}
              className="flex-shrink-0 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer hover:scale-105"
              style={{ 
                width: '246px', 
                height: '353px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Badge */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1.5 flex items-center justify-between flex-shrink-0">
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
                {/* School Logo and Photo */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                      {achiever.logo}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm truncate">
                        {achiever.name}
                      </h3>
                      <p className="text-gray-500 text-[10px] truncate">
                        {achiever.school}
                      </p>
                    </div>
                  </div>
                  <div className="text-2xl flex-shrink-0">
                    {achiever.photo}
                  </div>
                </div>

                {/* Achievement */}
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 flex-1">
                  <p className="text-gray-700 text-[11px] leading-relaxed line-clamp-4">
                    {achiever.achievement}
                  </p>
                </div>

                {/* Stats */}
                <div className="mt-3 flex items-center justify-between text-[10px] text-gray-500 border-t border-gray-100 pt-2 flex-shrink-0">
                  <div className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span>Top Achiever</span>
                  </div>
                  <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">
                    Class of {achiever.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            ↓ Scroll down to explore • Click any card to view details →
          </p>
        </div>
      </div>

      {/* Modal - Zoomed View */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="p-8 md:p-10">
              <div className="flex items-start space-x-6 mb-6">
                <div className="text-6xl">{achievers[currentIndex].photo}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-3xl">{achievers[currentIndex].badge}</span>
                    <h2 className="text-3xl font-bold text-gray-800">
                      {achievers[currentIndex].fullName}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                      {achievers[currentIndex].school}
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {achievers[currentIndex].company}
                    </span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {achievers[currentIndex].role}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>📍 {achievers[currentIndex].location}</span>
                    <span>🎓 Class of {achievers[currentIndex].year}</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-6 border border-orange-100 mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">🏆 Achievement</h3>
                <p className="text-gray-700 leading-relaxed">
                  {achievers[currentIndex].achievement}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">📖 Success Story</h3>
                <p className="text-gray-700 leading-relaxed">
                  {achievers[currentIndex].story}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between text-sm text-gray-400 border-t border-gray-100 pt-4">
                <span>{currentIndex + 1} of {achievers.length}</span>
                <span>Click outside to close • Use arrow keys to navigate</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}