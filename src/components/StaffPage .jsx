import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const staffData = [
  {
    name: 'Amanuel Sisay',
    initials: 'AS',
    color: '#6366f1',
    role: 'Creative Director',
    bio: 'Creative director with 12+ years of experience in brand strategy and visual storytelling.'
  },
  {
    name: 'Bethlehem Worku',
    initials: 'BW',
    color: '#8b5cf6',
    role: 'Lead Developer',
    bio: 'Full-stack developer passionate about building scalable web applications with modern tech.'
  },
  {
    name: 'Samuel Tesfaye',
    initials: 'ST',
    color: '#ec4899',
    role: 'Product Designer',
    bio: 'Product designer focused on creating intuitive user experiences and beautiful interfaces.'
  },
  {
    name: 'Meron Haile',
    initials: 'MH',
    color: '#f59e0b',
    role: 'Marketing Lead',
    bio: 'Marketing strategist who helps brands grow through data-driven campaigns and creative content.'
  },
  {
    name: 'Dawit Gebre',
    initials: 'DG',
    color: '#10b981',
    role: 'DevOps Engineer',
    bio: 'DevOps engineer ensuring smooth deployments and infrastructure reliability at scale.'
  }
];

const StaffPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Refs
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const initialsTextRef = useRef(null);
  const initialsSubRef = useRef(null);
  const circleBgRef = useRef(null);
  const clipOverlayRef = useRef(null);
  const progressBarRef = useRef(null);
  const staffItemsRef = useRef([]);
  const glowRingsRef = useRef([]);

  // Update initials with animation
  const updateInitials = (index, animate = true) => {
    if (isTransitioning) return;
    if (index === activeIndex && animate) return;

    setIsTransitioning(true);
    const data = staffData[index];

    if (animate) {
      // Exit animation
      gsap.to(initialsTextRef.current, {
        scale: 0.5,
        opacity: 0,
        rotation: -20,
        duration: 0.4,
        ease: 'power3.in'
      });

      gsap.to(initialsSubRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power3.in'
      });

      gsap.to(circleBgRef.current, {
        scale: 0.7,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          // Update content
          initialsTextRef.current.textContent = data.initials;
          initialsSubRef.current.textContent = data.name;
          circleBgRef.current.style.background = `radial-gradient(circle, ${data.color}, transparent)`;

          // Entry animation
          const tl = gsap.timeline();
          
          tl.to(circleBgRef.current, {
            scale: 1,
            opacity: 0.3,
            duration: 0.6,
            ease: 'power4.out'
          });

          tl.fromTo(initialsTextRef.current, {
            scale: 1.5,
            opacity: 0,
            rotation: 20
          }, {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.7,
            ease: 'back.out(2)'
          }, '-=0.3');

          tl.fromTo(initialsSubRef.current, {
            opacity: 0,
            y: -20
          }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power4.out'
          }, '-=0.3');

         gsap.killTweensOf(circleBgRef.current);

gsap.to(circleBgRef.current, {
  scale: 1.1,
  opacity: 0.4,
  duration: 1.5,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
});

          setIsTransitioning(false);
        }
      });

      // Animate wrapper border
      gsap.to(wrapperRef.current, {
        borderColor: data.color,
        boxShadow: `0 0 60px ${data.color}30`,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(wrapperRef.current, {
            borderColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 0 60px rgba(99, 102, 241, 0.15)',
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.3
          });
        }
      });

      // Animate clip overlay
      gsap.fromTo(clipOverlayRef.current, {
        clipPath: 'inset(0 60% 0 0)'
      }, {
        clipPath: 'inset(0 40% 0 0)',
        duration: 0.8,
        ease: 'power4.out',
        delay: 0.1
      });

    } else {
      // No animation (initial load)
      initialsTextRef.current.textContent = data.initials;
      initialsSubRef.current.textContent = data.name;
      circleBgRef.current.style.background = `radial-gradient(circle, ${data.color}, transparent)`;
    }

    setActiveIndex(index);
  };

  // Handle scroll
  useEffect(() => {
    const container = containerRef.current;
    const staffItems = staffItemsRef.current;

    // Initial setup
    updateInitials(0, false);

    // Scroll triggers
    staffItems.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
         
            updateInitials(index, true);
          
        },
        onEnterBack: () => {
          if (activeIndex !== index) {
            updateInitials(index, true);
          }
        }
      });
    });

    // Scroll progress bar
    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress * 100;
        if (progressBarRef.current) {
          progressBarRef.current.style.height = progress + '%';
        }
      }
    });

    // Image partial effect
    ScrollTrigger.create({
      trigger: '.left-content',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress;
        const clipAmount = 40 + (progress * 20);
        gsap.to(clipOverlayRef.current, {
          clipPath: `inset(0 ${clipAmount}% 0 0)`,
          duration: 0.1,
          ease: 'none'
        });
      }
    });

    // Load animations
    gsap.from(staffItems, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.2
    });

    gsap.from(wrapperRef.current, {
      scale: 0.7,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      delay: 0.3
    });

    gsap.from(glowRingsRef.current, {
      scale: 0,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out',
      delay: 0.5
    });

    // Initial pulse
    gsap.to(circleBgRef.current, {
      scale: 1.1,
      opacity: 0.4,
      duration: 1.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 0.5
    });

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      const next = (activeIndexRef.current + 1) % staffData.length;
        updateInitials(next, true);
        staffItems[next].scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
       const prev =
  (activeIndexRef.current - 1 + staffData.length) %
  staffData.length;
        updateInitials(prev, true);
        staffItems[prev].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden font-sans">
      {/* Scroll Progress Bar */}
      <div className="fixed left-0 top-0 w-1 h-screen bg-white/5 z-10">
        <div 
          ref={progressBarRef}
          className="w-full h-0 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-b"
        />
      </div>

      <div ref={containerRef} className="flex min-h-screen relative">
        {/* Left Content - Staff Names */}
        <div className="flex-1 py-12 px-8 md:py-16 md:px-12 flex flex-col justify-center gap-4 max-w-[50%] relative z-10 left-content">
          {staffData.map((staff, index) => (
            <div
              key={index}
              ref={el => staffItemsRef.current[index] = el}
              className={`staff-item py-4 border-b border-white/5 cursor-pointer transition-colors duration-300 ${
                activeIndex === index ? 'border-indigo-400/40' : ''
              }`}
              onMouseEnter={() => {
                if (activeIndex !== index) {
                  updateInitials(index, true);
                }
              }}
            >
              <h3 
                className={`text-2xl md:text-3xl lg:text-4xl font-light tracking-tight transition-all duration-300 inline-block relative ${
                  activeIndex === index ? 'text-white translate-x-3' : 'text-white/30'
                }`}
              >
                {staff.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-500 group-hover:w-full" />
              </h3>

              {/* Description */}
              <div 
                className={`overflow-hidden transition-all duration-500 ${
                  activeIndex === index ? 'max-h-40 opacity-100 translate-y-0 mt-3' : 'max-h-0 opacity-0 -translate-y-2'
                }`}
              >
                <p className="text-sm text-white/70 leading-relaxed max-w-md">
                  {staff.bio}
                </p>
                <span className="inline-block text-xs uppercase tracking-wider text-indigo-400 bg-indigo-400/15 px-4 py-1 rounded-full mt-2 border border-indigo-400/20">
                  {staff.role}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Content - Initials Display */}
        <div className="fixed right-0 top-0 w-[50%] h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent">
          {/* Glow Rings */}
          <div 
            ref={el => glowRingsRef.current[0] = el}
            className="absolute w-[400px] h-[400px] rounded-full border border-indigo-500/5 animate-pulse"
          />
          <div 
            ref={el => glowRingsRef.current[1] = el}
            className="absolute w-[500px] h-[500px] rounded-full border border-indigo-500/5 animate-pulse"
            style={{ animationDelay: '1s' }}
          />

          {/* Image Wrapper - Smaller */}
          <div 
            ref={wrapperRef}
            className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-2 border-white/10 shadow-2xl shadow-indigo-500/15 flex items-center justify-center bg-[#1a1a2e]"
          >
            {/* Circle Background */}
            <div 
              ref={circleBgRef}
              className="absolute w-[85%] h-[85%] rounded-full blur-[50px] opacity-30 transition-all duration-500"
              style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
            />

            {/* Initials */}
            <div className="flex flex-col items-center justify-center relative z-10">
              <div 
                ref={initialsTextRef}
                className="text-8xl md:text-9xl lg:text-[10rem] font-bold text-white tracking-wider leading-none"
                style={{ textShadow: '0 0 60px rgba(99, 102, 241, 0.3)' }}
              >
                AS
              </div>
              <div 
                ref={initialsSubRef}
                className="text-xs md:text-sm text-white/30 tracking-[0.3em] uppercase mt-2 font-light"
              >
                Amanuel Sisay
              </div>
            </div>

            {/* Clip Overlay - Partial Effect */}
            <div 
              ref={clipOverlayRef}
              className="absolute inset-0 bg-[#0a0a0f] pointer-events-none z-20"
              style={{ clipPath: 'inset(0 40% 0 0)' }}
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-8 right-8 md:bottom-10 md:right-12 text-xs md:text-sm text-white/20 tracking-widest font-light z-30">
            <span className="text-white/60">{String(activeIndex + 1).padStart(2, '0')}</span>
            {' / '}
            <span>{String(staffData.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <style >{`
        .staff-item h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          transition: width 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .staff-item:hover h3::after,
        .staff-item.active h3::after {
          width: 100%;
        }

        .staff-item:hover h3 {
          color: #ffffff;
          transform: translateX(15px);
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.6;
          }
        }

        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default StaffPage;