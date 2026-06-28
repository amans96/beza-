import React, { useEffect, useRef, useState } from 'react';
import cardsDatas from '../data/cardsData.js' 

 export default function Card({
  icon,
  title,
  description,
  color,
  delay,
  index
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add timeout for staggered animation
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(cardRef.current);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`
        group relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
      `}
      style={{
        transitionDelay: `${delay}ms`,
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Animated gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}></div>
      
      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:border-opacity-20"></div>
      
      {/* Icon with animation */}
      <div className={`
        mb-6 transform transition-all duration-500
        ${isVisible ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'}
      `}>
        <i className={`bi ${icon} text-5xl bg-gradient-to-br ${color} bg-clip-text text-transparent`}></i>
      </div>
      
      {/* Title with slide animation */}
      <h2 className={`
        mb-4 text-2xl font-bold text-gray-800 transition-all duration-500
        ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}
      `}>
        {title}
      </h2>
      
      {/* Description with fade animation */}
      <p className={`
        text-gray-600 leading-relaxed transition-all duration-500
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}>
        {description}
      </p>
      
      {/* Animated underline on hover */}
<div className="absolute bottom-0 left-1/2 h-1 w-0 bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-300 group-hover:left-0 group-hover:w-full"></div>
      
      {/* Floating particles effect (optional) */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-2xl transition-all duration-700 group-hover:scale-150"></div>
    </div>
  );
};

