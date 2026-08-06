import { motion } from "framer-motion";
import teachs from "../assets/teachs.jpg";

const Careers = () => {
  // Simple fade-in animation for the text content to keep it professional
  const textFadeIn = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="w-full py-24 bg-white text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Two-column responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textFadeIn}
            className="space-y-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Join Our Team
            </h2>

            <div className="space-y-8">
              {/* Reason 1: Professional Growth */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-3 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  Professional Growth
                </h3>
                <p className="text-gray-600 leading-relaxed pl-4 border-l-2 border-gray-100">
                  Beza School is dedicated to the continuous improvement of our staff. We support professional development, ongoing training, and provide clear pathways for career advancement within our institution.
                </p>
              </div>

              {/* Reason 2: Supportive Environment */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-3 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  Supportive Environment
                </h3>
                <p className="text-gray-600 leading-relaxed pl-4 border-l-2 border-gray-100">
                  We believe that a great education starts with a great team. Our teachers and staff work together in a deeply respectful, inclusive, and collaborative environment where every voice is valued.
                </p>
              </div>

              {/* Reason 3: Make an Impact */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-3 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  Make an Impact
                </h3>
                <p className="text-gray-600 leading-relaxed pl-4 border-l-2 border-gray-100">
                  Working at Beza School means directly shaping the future. Our team members play a vital role in guiding our students' academic success, character development, and personal growth every single day.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Professional Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <img 
              src={teachs} 
              alt="A professional teacher interacting with students in a modern, collaborative classroom setting" 
              className="w-full h-auto rounded-xl object-cover aspect-[4/3]"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Careers;