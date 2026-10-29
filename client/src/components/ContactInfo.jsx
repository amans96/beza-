import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-8 sm:p-10 space-y-8">
      <div>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
          Campus Directory
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
          Get in Touch Directly
        </h3>
        <p className="text-sm text-slate-600 mt-2">
          Our administrative and admissions teams are available to assist prospective and current families during working hours.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-emerald-50/60 hover:border-emerald-200">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-600/20">
            <Mail size={22} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Email Address
            </p>
            <a
              href="mailto:info@bezaschool.edu.et"
              className="text-slate-900 font-medium text-sm hover:text-emerald-600 transition-colors block mt-0.5"
            >
              info@bezaschool.edu.et
            </a>
            <a
              href="mailto:admissions@bezaschool.edu.et"
              className="text-slate-500 text-xs hover:text-emerald-600 transition-colors block mt-0.5"
            >
              admissions@bezaschool.edu.et
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-emerald-50/60 hover:border-emerald-200">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-600/20">
            <Phone size={22} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Phone Lines
            </p>
            <a
              href="tel:+251114338000"
              className="text-slate-900 font-medium text-sm hover:text-blue-600 transition-colors block mt-0.5"
            >
              +251 11 433 8000
            </a>
            <a
              href="tel:+251911223344"
              className="text-slate-500 text-xs hover:text-blue-600 transition-colors block mt-0.5"
            >
              +251 91 122 3344 (Admissions)
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-emerald-50/60 hover:border-emerald-200">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-500/20">
            <MapPin size={22} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Campus Location
            </p>
            <p className="text-slate-800 text-sm font-medium mt-0.5 leading-snug">
              Beza / Besebarok Campus
              <br />
              <span className="text-slate-500 text-xs">Bishoftu (Debre Zeyit), Oromia, Ethiopia</span>
            </p>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-emerald-50/60 hover:border-emerald-200">
          <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-600/20">
            <Clock size={22} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Office Hours
            </p>
            <p className="text-slate-800 text-sm font-medium mt-0.5 leading-snug">
              Mon - Fri: 8:00 AM - 4:30 PM
              <br />
              <span className="text-slate-500 text-xs">Saturday: 8:30 AM - 12:30 PM</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}