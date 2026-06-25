import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const THEME = "#033e74";
const THEME_DARK = "#022d56";
const THEME_LIGHT = "#e8eef7";

const productSeries = [
  { value: "LIGHT Series – Portable Power Stations", label: "LIGHT Series – Portable Power Stations" },
  { value: "MaxPower Series – Residential ESS", label: "MaxPower Series – Residential ESS" },
  { value: "NeoPower Series – Lead-acid Replacement", label: "NeoPower Series – Lead-acid Replacement" },
  { value: "LEGEND Series – C&I ESS", label: "LEGEND Series – C&I ESS" },
  { value: "Not Sure / Other", label: "Not Sure / Other – Help me choose" },
];

function PhoneField({ value, onChange }) {
  return (
    <div className="border-b border-gray-300 py-1">
      <PhoneInput
        defaultCountry="in"
        value={value}
        onChange={onChange}
        style={{ border: 'none', background: 'transparent' }}
        inputStyle={{ border: 'none', background: 'transparent', fontSize: '14px', color: '#111827', outline: 'none', width: '100%' }}
        countrySelectorStyleProps={{ buttonStyle: { border: 'none', background: 'transparent' } }}
      />
    </div>
  );
}

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

function UnderlineSelect({ placeholder, options, value, onChange }) {
  return (
    <div className="border-b border-gray-300 transition-colors">
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm text-gray-900 py-1.5 focus:outline-none appearance-none cursor-pointer"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function Field({ children }) {
  return (
    <div className="border-b border-gray-300 transition-colors">
      {children}
    </div>
  );
}

export default function ProductEnquiry() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    firstName: "", lastName: "",
    phone: "", email: "",
    pinCode: "", address: "",
    product: "", message: "",
    hearAbout: "",
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
    if (!form.firstName.trim()) e.firstName = "Please provide your firstname";
    if (!form.lastName.trim()) e.lastName = "Please provide your lastname";
    if (!form.phone) e.phone = "Please provide your mobile number";
    if (!form.email.trim()) e.email = "Please provide your email address";
    if (!form.pinCode.trim() || form.pinCode.length !== 6) e.pinCode = "Please provide a valid 6 digit pincode of your address";
    if (!form.product) e.product = "Please select a product";
    if (!form.hearAbout) e.hearAbout = "Please select an option";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-black uppercase mb-3" style={{ color: THEME }}>Enquiry Submitted!</h2>
          <p className="text-gray-500 mb-6">We typically respond within 24 business hours.</p>
          <button onClick={() => navigate(-1)} className="font-bold text-sm hover:underline" style={{ color: THEME }}>← Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}
    >
      {/* Hero */}
      <div className="relative h-56 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80" alt="Product Enquiry" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${THEME}ee, ${THEME_DARK}cc)` }} />
        <div className="absolute inset-0 flex items-end px-6 sm:px-10 pb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">Contact Us</p>
            <h1 className="text-3xl sm:text-4xl font-black text-white">Product Enquiry</h1>
          </div>
        </div>
        <button onClick={() => navigate(-1)}
          className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black uppercase mb-4" style={{ color: THEME }}>
            Product Enquiry Form
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed">
            Have questions about our products? Fill in your details below<br />and our team will get back to you within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div>
            <h3 className="text-2xl font-black uppercase text-center mb-8" style={{ color: THEME }}>
              Personal Information
            </h3>

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
                <PhoneField value={form.phone} onChange={(v) => handle("phone", v)} />
              </UnderlineInput>

              <UnderlineInput label="Email Address" required error={errors.email}>
                <Field>
                  <input type="email" placeholder="Email Address*" value={form.email}
                    onChange={(e) => handle("email", e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 py-1.5 focus:outline-none"
                  />
                </Field>
              </UnderlineInput>

              <UnderlineInput label="Pin Code" required error={errors.pinCode}>
                <Field>
                  <input type="text" placeholder="Pin Code*" maxLength={6} value={form.pinCode}
                    onChange={(e) => { if (/^\d*$/.test(e.target.value)) handle("pinCode", e.target.value); }}
                    className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 py-1.5 focus:outline-none"
                  />
                </Field>
              </UnderlineInput>

              <div className="sm:col-span-2">
                <UnderlineInput label="Address">
                  <Field>
                    <textarea placeholder="Address" rows={3} value={form.address}
                      onChange={(e) => handle("address", e.target.value)}
                      className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 py-1.5 focus:outline-none resize-none"
                    />
                  </Field>
                </UnderlineInput>
              </div>

              <div className="sm:col-span-2">
                <UnderlineInput label="Product of Interest" required error={errors.product}>
                  <UnderlineSelect placeholder="Please select a product" options={productSeries}
                    value={form.product} onChange={(v) => handle("product", v)}
                  />
                </UnderlineInput>
              </div>

              <div className="sm:col-span-2">
                <UnderlineInput label="How did you know about Myzo?" required error={errors.hearAbout}>
                  <UnderlineSelect
                    placeholder="Please select an option"
                    options={[
                      { value: "Social Media", label: "Social Media" },
                      { value: "Google Search", label: "Google Search" },
                      { value: "Friend / Referral", label: "Friend / Referral" },
                      { value: "Exhibition / Event", label: "Exhibition / Event" },
                      { value: "Advertisement", label: "Advertisement" },
                      { value: "Other", label: "Other" },
                    ]}
                    value={form.hearAbout}
                    onChange={(v) => handle("hearAbout", v)}
                  />
                </UnderlineInput>
              </div>

              <div className="sm:col-span-2">
                <UnderlineInput label="Message">
                  <Field>
                    <textarea placeholder="Tell us about your requirements..." rows={4} value={form.message}
                      onChange={(e) => handle("message", e.target.value)}
                      className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 py-1.5 focus:outline-none resize-none"
                    />
                  </Field>
                </UnderlineInput>
              </div>

            </div>
          </div>

          <div className="text-center pt-4">
            <button type="submit"
              className="text-white font-black uppercase tracking-wider px-16 py-4 rounded-lg text-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
              style={{ backgroundColor: THEME }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = THEME_DARK}
              onMouseOut={e => e.currentTarget.style.backgroundColor = THEME}
            >
              Submit Enquiry
            </button>
            <p className="text-xs text-gray-400 mt-3">We typically respond within 24 business hours.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
