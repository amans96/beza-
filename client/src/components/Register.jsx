import { useState } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, BookOpen, Pencil, Star, 
  Home, Mail, Smartphone, UploadCloud, 
  Bell, FileText, ArrowRight
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
const ComingSoon = () => {
  const [email, setEmail] = useState("");

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const features = [
    { title: "Easy Online Application", icon: FileText },
    { title: "Secure Document Upload", icon: UploadCloud },
    { title: "Instant Application Updates", icon: Bell },
    { title: "Mobile-Friendly Registration", icon: Smartphone },
  ];

  const floatingIcons = [
    { Icon: GraduationCap, top: "15%", left: "10%", delay: 0 },
    { Icon: BookOpen, top: "25%", right: "12%", delay: 1.5 },
    { Icon: Pencil, bottom: "30%", left: "12%", delay: 2 },
    { Icon: Star, top: "10%", right: "30%", delay: 0.5 },
    { Icon: Star, bottom: "20%", right: "15%", delay: 2.5 },
  ];

  return (
    // Deep Dark Background consistent with your brand
    <section className="relative min-h-screen w-full bg-[#030619] flex flex-col items-center justify-center overflow-hidden font-sans selection:bg-[#22C55E] selection:text-white">
      
      {/* Subtle moving background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute bottom-[0%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[#22C55E]/10 blur-[150px]" />
      </div>

      {/* Floating Background Icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-white/5 hidden md:block pointer-events-none"
          style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
        >
          <item.Icon size={48} strokeWidth={1} />
        </motion.div>
      ))}

      {/* Main Glassmorphism Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12 md:py-20"
      >
        <div className="bg-[#030619]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-14 shadow-2xl shadow-black/50 text-center">
          
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-sm font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(34,197,94,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              Coming Soon
            </span>
          </motion.div>

          {/* Hero Headline */}
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Online Registration is <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-green-300">
              Almost Here!
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Beza School is preparing a seamless, fast, and secure online admission experience. 
            Our new portal will be available very soon to make enrolling your child easier than ever.
          </motion.p>

          {/* Progress Section */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-16">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300 font-medium">Portal Development</span>
              <span className="text-[#22C55E] font-bold">90%</span>
            </div>
            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden mb-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "90%" }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-green-500 to-[#22C55E] rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </motion.div>
            </div>
            <p className="text-gray-500 text-sm">
              We're putting the finishing touches on a better admission experience.
            </p>
          </motion.div>

          {/* Features Preview */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="group bg-white/5 border border-white/5 rounded-2xl p-6 hover:-translate-y-2 hover:bg-white/10 hover:border-[#22C55E]/30 hover:shadow-[0_8px_30px_rgba(34,197,94,0.1)] transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-[#22C55E]" size={24} />
                </div>
                <h3 className="text-white font-medium">{feature.title}</h3>
              </div>
            ))}
          </motion.div>

          {/* Notification Section */}
          <motion.div variants={itemVariants} className="max-w-md mx-auto mb-16">
            <h3 className="text-white font-semibold mb-4">Be the first to know when we launch!</h3>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 transition-all"
                  required
                />
              </div>
              <button 
                type="submit"
                className="bg-[#22C55E] hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                Notify Me
                <ArrowRight size={18} />
              </button>
            </form>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-white/10 pt-10">
            <button className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/20 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
              <Home size={18} />
              Back to Home
            </button>
            <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-colors">
              <Mail size={18} />
              Contact Admissions
            </button>
          </motion.div>
        </div>

        {/* Footer Text & Socials */}
        <motion.div variants={itemVariants} className="text-center mt-8">
          <p className="text-gray-500 text-sm max-w-2xl mx-auto mb-6">
            Thank you for your patience. We are working hard to provide a fast, secure, 
            and convenient online registration experience for all future Beza School students.
          </p>
          <div className="flex justify-center gap-4">
            {[FaFacebookF, FaXTwitter, FaInstagram].map((Icon, idx) => (
              <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#22C55E] hover:border-[#22C55E]/50 hover:bg-[#22C55E]/10 transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ComingSoon;