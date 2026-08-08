import React, { useState } from "react";
import { motion } from "framer-motion";
import { careerReasonsData } from "../data/careerReasonsData"; // Adjust the path based on your folder structure

const WhyWorkWithUs = () => {
  // State to track which card is tapped on mobile
  const [activeCard, setActiveCard] = useState(null);

  // Framer Motion variants for the staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Slight delay between each card appearing
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="w-full py-24 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Why Work With Beza School?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We believe that our staff is our greatest asset. Discover the benefits, culture, and opportunities that make Beza School a rewarding place to build your career.
          </p>
        </div>

        {/* Responsive Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {careerReasonsData.map((reason) => {
            const isActive = activeCard === reason.id;

            return (
              <motion.div 
                key={reason.id}
                variants={cardVariants}
                onClick={() => setActiveCard(isActive ? null : reason.id)}
                onMouseLeave={() => setActiveCard(null)}
                className={`
                  group bg-white rounded-xl p-8 transition-all duration-300 cursor-pointer
                  ${isActive 
                    ? 'shadow-md -translate-y-1' 
                    : 'shadow-sm hover:shadow-md hover:-translate-y-1'
                  }
                `}
              >
                {/* Icon Container */}
                <div className={`
                  w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 mb-6
                  ${isActive 
                    ? 'bg-[#22C55E] text-white' 
                    : 'bg-gray-100 text-gray-700 group-hover:bg-[#22C55E] group-hover:text-white'
                  }
                `}>
                  <reason.icon size={24} strokeWidth={1.5} />
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyWorkWithUs;