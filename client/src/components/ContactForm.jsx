import { useState } from "react";
import { Mail, Phone, User, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    inquiryType: "General Admission",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate clean submission feedback
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        inquiryType: "General Admission",
        message: "",
      });
    }, 800);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-8 sm:p-10">
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
          <MessageSquare size={13} />
          Send a Message
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
          How Can We Help You?
        </h3>
        <p className="text-sm text-slate-600 mt-2">
          Fill out the form below and our admissions office will reach out within 24 business hours.
        </p>
      </div>

      {submitted ? (
        <div
          role="status"
          className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3"
        >
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 size={30} />
          </div>
          <h4 className="text-xl font-bold text-slate-900">Message Received!</h4>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Thank you for reaching out to Beza School. Our admissions coordinator has received your message and will contact you shortly.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
          >
            Send Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Full Name <span className="text-emerald-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <User size={18} />
              </div>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Parent or Guardian Name"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Email Address <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Mail size={18} />
                </div>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="parent@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Phone Number <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Phone size={18} />
                </div>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+251 91 234 5678"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Inquiry Type */}
          <div>
            <label htmlFor="contact-inquiry" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Inquiry Type
            </label>
            <select
              id="contact-inquiry"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 px-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            >
              <option value="General Admission">General Admissions Inquiry</option>
              <option value="Early Childhood">Early Years / Kindergarten</option>
              <option value="Primary School">Primary School (Grades 1-6)</option>
              <option value="Secondary School">Secondary School (Grades 7-12)</option>
              <option value="Campus Tour">Schedule Campus Tour</option>
              <option value="Careers">Employment Opportunities</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Your Message <span className="text-emerald-600">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your student, grade level of interest, or specific questions..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 disabled:opacity-60"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending Inquiry...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send size={17} />
                Send Inquiry
              </span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}