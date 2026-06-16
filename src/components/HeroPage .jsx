import React from 'react';
import { Play, Info, ShoppingBag } from 'lucide-react';
import herovideo from '../assets/hero.mp4';
import heroimg from '../assets/hero.jpg';
const HeroPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Blurred Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop"
        >
          <source
            src={herovideo}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for better text readability and blur effect */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 lg:flex-row lg:justify-between lg:px-20">
        
        {/* Left Side - Text Content */}
        <div className="max-w-2xl text-center lg:text-left animate-fade-in-up">
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white drop-shadow-lg md:text-7xl">
            Shape Your Future <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              With Modern Education
            </span>
          </h1>
          
          <p className="mb-10 text-xl text-gray-200 drop-shadow-md">
            Join thousands of learners worldwide and unlock your potential with industry-ready courses.
          </p>

          {/* Three Buttons */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center lg:justify-start">
            <button className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <Play size={20} className="transition-transform group-hover:scale-110" />
              Get Started
            </button>
            
            <button className="flex items-center justify-center gap-2 rounded-full border-2 border-white/80 bg-white/10 px-8 py-3 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105">
              <Info size={20} />
              Learn More
            </button>
            
            <button className="flex items-center justify-center gap-2 rounded-full bg-[#e78c16] px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400">
              <ShoppingBag size={20} />
              View Courses
            </button>
          </div>
        </div>

        {/* Right Side - Floating Image with Animation */}
        <div className="mt-12 lg:mt-0 animate-float">
          <div className="relative">
            {/* Decorative glow behind image */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-2xl"></div>
            
            <img
              src={heroimg}
              alt="Students learning together"
              className="relative h-auto w-full max-w-md rounded-2xl object-cover shadow-2xl ring-4 ring-white/20 lg:max-w-lg"
            />
            
            {/* Floating education badge */}
            <div className="absolute -top-6 -right-6 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm animate-float-slow">
              <span className="text-sm font-bold text-gray-800">🎓 10k+ Students</span>
            </div>
            
            {/* Another floating element */}
            <div className="absolute -bottom-4 -left-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 shadow-lg">
              <span className="text-sm font-bold text-white">✨ Expert Instructors</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="h-10 w-6 rounded-full border-2 border-white/50">
          <div className="mx-auto mt-2 h-2 w-2 animate-ping rounded-full bg-white"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: floatSlow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroPage;