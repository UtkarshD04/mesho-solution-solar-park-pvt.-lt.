import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useUser } from "../context/UserContext";
import useInView from "../hooks/useInView";

const THEME = "#033e74";
const THEME_DARK = "#022d56";
const TEAL = "#20b2aa";

const departments = [
  "Sales & Business Development",
  "Engineering & R&D",
  "Site / Field Operations",
  "Customer Support",
  "Marketing",
  "Human Resources & Administration",
  "Finance & Accounts",
  "Other",
];

const values = [
  {
    title: "Meaningful Work",
    desc: "Every role here contributes directly to India's clean energy transition — real projects, real impact.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Room to Grow",
    desc: "A fast-growing company means fast-growing responsibility — we promote from within whenever we can.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Hands-On Culture",
    desc: "From the shop floor to site execution, our team builds and ships — not just plans on paper.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1H3a1 1 0 01-1-1V9a1 1 0 011-1h1a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
];

function UnderlineInput({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}

function Field({ children }) {
  return <div className="border-b border-gray-300 transition-colors">{children}</div>;
}

function UnderlineSelect({ placeholder, options, value, onChange }) {
  return (
    <div className="border-b border-gray-300 transition-colors">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm text-gray-900 py-1.5 focus:outline-none appearance-none cursor-pointer"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function Careers() {
  const navigate = useNavigate();
  const { submitCareerApplication, loading } = useUser();
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const [valuesRef, valuesInView] = useInView();

  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    department: "", experience: "", message: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handle = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Please provide your first name";
    if (!form.lastName.trim()) e.lastName = "Please provide your last name";
    if (!form.phone) e.phone = "Please provide your mobile number";
    if (!form.email.trim()) e.email = "Please provide your email";
    if (!form.department) e.department = "Please select a department";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setServerError("");
    try {
      await submitCareerApplication(form);
      setSubmitted(true);
    } catch (err) {
      setServerError(err.message || "Submission failed. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-black uppercase mb-3" style={{ color: THEME }}>Application Submitted!</h2>
          <p className="text-gray-500 mb-6">Our HR team will review your details and reach out if there's a fit.</p>
          <button onClick={() => navigate(-1)} className="font-bold text-sm hover:underline" style={{ color: THEME }}>← Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}
    >
      {/* HERO */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center text-white text-center"
        style={{ backgroundImage: "url('/site-team-visit.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/75" />
        <div className="relative z-10 px-6 max-w-3xl mx-auto pt-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-4">Join Us</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-tight mb-5">Careers</h1>
          <p className="text-white/70 text-base max-w-xl mx-auto leading-relaxed">
            Help us build India's clean energy future — on the factory floor, on-site, and everywhere in between.
          </p>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="py-20 bg-white">
        <div ref={valuesRef} className="max-w-7xl mx-auto px-6">
          <div
            className="text-center max-w-2xl mx-auto mb-14 transition-all duration-1000"
            style={{ opacity: valuesInView ? 1 : 0, transform: valuesInView ? "translateY(0)" : "translateY(24px)" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#20b2aa] mb-3">Why Myzo</p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-gray-900 leading-tight">Why Work With Us</h2>
            <div className="w-24 h-[2px] bg-[#033e74] mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 p-8"
                style={{
                  opacity: valuesInView ? 1 : 0,
                  transform: valuesInView ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: `${i * 120 + 100}ms`,
                }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "#e6f7f7", color: TEAL }}>
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS NOTE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black uppercase mb-4" style={{ color: THEME }}>
            No Fixed Openings Listed Right Now
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We're growing across Sales, Engineering, Site Operations, and Support — and we're always open to hearing
            from talented people even without a specific vacancy. Tell us where you'd fit best below, and our HR
            team will reach out if there's a match.
          </p>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black uppercase mb-4" style={{ color: THEME }}>
              Express Your Interest
            </h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed">
              Share a few details about yourself and the kind of role you're looking for.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-7">

              <UnderlineInput label="First Name" required error={errors.firstName}>
                <Field>
                  <input type="text" placeholder="First Name*" value={form.firstName}
                    onChange={(e) => handle("firstName", e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 py-1.5 focus:outline-none"
                  />
                </Field>
              </UnderlineInput>

              <UnderlineInput label="Last Name" required error={errors.lastName}>
                <Field>
                  <input type="text" placeholder="Last Name*" value={form.lastName}
                    onChange={(e) => handle("lastName", e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 py-1.5 focus:outline-none"
                  />
                </Field>
              </UnderlineInput>

              <UnderlineInput label="Mobile Number" required error={errors.phone}>
                <div className="border-b border-gray-300 py-1">
                  <PhoneInput
                    defaultCountry="in"
                    value={form.phone}
                    onChange={(v) => handle("phone", v)}
                    style={{ border: "none", background: "transparent" }}
                    inputStyle={{ border: "none", background: "transparent", fontSize: "14px", color: "#111827", outline: "none", width: "100%" }}
                    countrySelectorStyleProps={{ buttonStyle: { border: "none", background: "transparent" } }}
                  />
                </div>
              </UnderlineInput>

              <UnderlineInput label="Email Address" required error={errors.email}>
                <Field>
                  <input type="email" placeholder="Email Address*" value={form.email}
                    onChange={(e) => handle("email", e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 py-1.5 focus:outline-none"
                  />
                </Field>
              </UnderlineInput>

              <UnderlineInput label="Department of Interest" required error={errors.department}>
                <UnderlineSelect placeholder="Please select a department" options={departments}
                  value={form.department} onChange={(v) => handle("department", v)}
                />
              </UnderlineInput>

              <UnderlineInput label="Current Experience">
                <Field>
                  <input type="text" placeholder="e.g. 3 years" value={form.experience}
                    onChange={(e) => handle("experience", e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 py-1.5 focus:outline-none"
                  />
                </Field>
              </UnderlineInput>

              <div className="sm:col-span-2">
                <UnderlineInput label="Tell Us About Yourself">
                  <Field>
                    <textarea placeholder="A short note about your background and what you're looking for" rows={4} value={form.message}
                      onChange={(e) => handle("message", e.target.value)}
                      className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 py-1.5 focus:outline-none resize-none"
                    />
                  </Field>
                </UnderlineInput>
              </div>

            </div>

            <div className="text-center pt-4">
              {serverError && <p className="text-sm text-red-500 mb-4">{serverError}</p>}
              <button type="submit" disabled={loading}
                className="text-white font-black uppercase tracking-wider px-16 py-4 rounded-lg text-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: THEME }}
                onMouseOver={e => !loading && (e.currentTarget.style.backgroundColor = THEME_DARK)}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = THEME)}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
              <p className="text-xs text-gray-400 mt-3">
                Resume upload isn't available yet — our HR team will contact you directly for next steps.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
