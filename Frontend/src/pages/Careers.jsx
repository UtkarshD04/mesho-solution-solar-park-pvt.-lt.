import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useUser } from "../context/UserContext";
import useInView from "../hooks/useInView";
import SEO from "../components/common/SEO";

const ACCENT = "#033e74";
const TEAL = "#20b2aa";
const CARD_SHADOW = "0px 1px 8px 0px rgba(102,102,102,0.24)";

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
      <svg className="w-7 h-7" fill="none" stroke={ACCENT} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Room to Grow",
    desc: "A fast-growing company means fast-growing responsibility — we promote from within whenever we can.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke={ACCENT} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Hands-On Culture",
    desc: "From the shop floor to site execution, our team builds and ships — not just plans on paper.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke={ACCENT} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1H3a1 1 0 01-1-1V9a1 1 0 011-1h1a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1V4z" />
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
  const [heroRef, heroInView] = useInView(0.05);
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
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${TEAL}1A` }}>
            <svg className="w-8 h-8" fill="none" stroke={TEAL} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">Our HR team will review your details and reach out if there's a fit.</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-block font-bold rounded px-6 py-3 border-2 transition-colors"
            style={{ borderColor: ACCENT, color: ACCENT }}
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}
    >
      <SEO
        title="Careers"
        description="Explore career opportunities at Myzo. Join our team across Sales, Engineering, Operations, Marketing, and more."
        path="/careers"
      />

      {/* HERO — contained image card */}
      <section className="bg-white pt-24 md:pt-24 lg:pt-36 pb-14">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6">
          <div
            ref={heroRef}
            className="relative rounded-lg overflow-hidden transition-all duration-1000"
            style={{ boxShadow: CARD_SHADOW, opacity: heroInView ? 1 : 0, transform: heroInView ? "translateY(0)" : "translateY(16px)" }}
          >
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1400&q=80"
              alt="Myzo team at work"
              className="w-full h-[380px] md:h-[460px] object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 flex items-end">
              <div className="p-8 md:p-12 max-w-2xl">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: TEAL }}>
                  Join Us
                </span>
                <h1 className="text-[32px] leading-[38px] md:text-[44px] md:leading-[50px] font-bold text-white mb-5">
                  Help Build India's Clean Energy Future
                </h1>
                <p className="text-white/80 text-base leading-relaxed max-w-xl">
                  On the factory floor, on-site, and everywhere in between — we're growing, and we're looking for people who build, not just plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="bg-[#f1f1f1] py-20">
        <div ref={valuesRef} className="max-w-[1220px] mx-auto px-4 sm:px-6">
          <h2
            className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-gray-900 text-center mb-12 transition-all duration-700"
            style={{ opacity: valuesInView ? 1 : 0, transform: valuesInView ? "translateY(0)" : "translateY(16px)" }}
          >
            Why Work With Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="rounded-lg bg-white border border-gray-200 p-8 text-center flex flex-col items-center transition-all duration-700"
                style={{ opacity: valuesInView ? 1 : 0, transform: valuesInView ? "translateY(0)" : "translateY(16px)", transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: `${ACCENT}0D` }}>
                  {v.icon}
                </div>
                <h3 className="text-[18px] font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS NOTE */}
      <section className="bg-white py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-[22px] md:text-[26px] font-bold text-gray-900 mb-4">
            No Fixed Openings Listed Right Now
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We're growing across Sales, Engineering, Site Operations, and Support — and we're always open to hearing from talented people even without a specific vacancy. Tell us where you'd fit best below, and our HR team will reach out if there's a match.
          </p>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section className="bg-[#f1f1f1] py-20">
        <div className="max-w-[880px] mx-auto px-6">
          <div className="rounded-lg bg-white border border-gray-200 p-8 md:p-14" style={{ boxShadow: CARD_SHADOW }}>
            <div className="text-center mb-12">
              <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-3">
                Express Your Interest
              </h2>
              <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed">
                Share a few details about yourself and the kind of role you're looking for.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">

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
                <button
                  type="submit"
                  disabled={loading}
                  className="font-bold rounded px-10 py-3.5 border-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: ACCENT, borderColor: ACCENT, color: "#fff" }}
                  onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = ACCENT; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ACCENT; e.currentTarget.style.color = "#fff"; }}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
                <p className="text-xs text-gray-400 mt-3">
                  Resume upload isn't available yet — our HR team will contact you directly for next steps.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
