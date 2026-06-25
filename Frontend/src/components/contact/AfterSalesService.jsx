import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AfterSalesService() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", model: "", serial: "", date: "", issue: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handle = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div
      className="min-h-screen bg-white"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}
    >
      {/* Hero */}
      <div className="relative h-56 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80" alt="After Sales Service" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#059669]/90 to-[#047857]/80" />
        <div className="absolute inset-0 flex items-end px-6 sm:px-10 pb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-200 mb-1">Contact Us</p>
            <h1 className="text-3xl sm:text-4xl font-black text-white">After Sales Service</h1>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "#d1fae5" }}>
            <svg className="w-7 h-7 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900">Need support with your purchase?</h2>
            <p className="text-sm text-gray-500 mt-0.5">Our service team is here to help with any issues or queries.</p>
          </div>
        </div>

        {/* Support info strip */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {["Warranty Support", "Technical Help", "Installation Guide"].map((b) => (
            <div key={b} className="text-center p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <p className="text-xs font-semibold text-emerald-700">{b}</p>
            </div>
          ))}
        </div>

        <form className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Full Name *</label>
              <input
                type="text" placeholder="John Doe" value={form.name}
                onChange={(e) => handle("name", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Email *</label>
              <input
                type="email" placeholder="you@example.com" value={form.email}
                onChange={(e) => handle("email", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Phone *</label>
              <input
                type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone}
                onChange={(e) => handle("phone", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Product Model *</label>
              <select
                value={form.model} onChange={(e) => handle("model", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all"
              >
                <option value="">Select model</option>
                <option>HeroEE 1</option>
                <option>HeroEE LIGHT 1</option>
                <option>HeroEE 2</option>
                <option>MaxPower 8 AIO</option>
                <option>MaxPower 16</option>
                <option>MaxPower 30</option>
                <option>NeoPower 4</option>
                <option>LEGEND 112C</option>
                <option>LEGEND 112S</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Serial Number</label>
              <input
                type="text" placeholder="e.g. HE-2024-XXXXX" value={form.serial}
                onChange={(e) => handle("serial", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Purchase Date</label>
              <input
                type="date" value={form.date}
                onChange={(e) => handle("date", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Issue Description *</label>
            <textarea
              rows={5} placeholder="Please describe the issue in detail — what happened, when it started, and any error messages you see..."
              value={form.issue} onChange={(e) => handle("issue", e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 resize-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl text-white text-sm font-bold transition-all duration-300 hover:opacity-90 hover:scale-[1.01] hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
          >
            Submit Service Request →
          </button>

          <p className="text-center text-xs text-gray-400">Our support team will respond within 24 business hours.</p>
        </form>
      </div>
    </div>
  );
}
