import { useState } from "react";
import { ChevronDown } from "lucide-react";
import faqData from "../data/faqsData.js";

const Faq = () => {
  const [activeId, setActiveId] = useState(null);

  const handleToggle = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="w-full py-20 text-white bg-gradient-to-b from-transparent via-transparent via-50% to-[#030619]">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#22C55E] mb-4 tracking-tight">
            Frequently Asked <span className="text-[#22C55E]">Questions</span>
          </h2>
         
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((faq) => {
            const isActive = activeId === faq.id;

            return (
              <div
                key={faq.id}
                className={`bg-[#030619]/80 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 border shadow-lg ${
                  isActive 
                    ? "border-[#22C55E]/50 shadow-[#22C55E]/5" 
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => handleToggle(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-white/5"
                >
                  <span
                    className={`font-medium text-lg transition-colors duration-300 ${
                      isActive ? "text-[#22C55E]" : "text-gray-200"
                    }`}
                  >
                    {faq.question}
                  </span>

                  {/* Icon with smooth rotation and dynamic background */}
                  <div 
                    className={`p-1.5 rounded-full transition-colors duration-300 flex-shrink-0 ml-4 ${
                      isActive ? "bg-[#22C55E]/10 text-[#22C55E]" : "text-gray-400"
                    }`}
                  >
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ease-in-out ${
                        isActive ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </button>

                {/* Animated Answer Wrapper */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;