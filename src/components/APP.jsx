export default function APP() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f7f5f2]">
      
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[50vw] leading-none font-normal tracking-[-3vw] text-[#10b981]/10">
          BEZA
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-normal text-[#1f2937] mb-6">
          Let Your Adventure Begin Here
        </h1>

        <div className="flex flex-wrap justify-center gap-5">
          <button className="w-44 h-14 rounded-xl bg-[#e78c16] text-white font-semibold shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/30">
            Register
          </button>

          <button className="w-44 h-14 rounded-xl border-2 border-[#e78c16] text-[#e78c16] font-semibold bg-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#e78c16] hover:text-white">
            FAQs
          </button>

          <button className="w-44 h-14 rounded-xl bg-[#e78c16] text-white font-semibold shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/30">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}