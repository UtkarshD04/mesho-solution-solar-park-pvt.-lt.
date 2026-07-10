import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useUser } from "../../context/UserContext";

const THEME = "#033e74";
const THEME_DARK = "#022d56";

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

function Field({ children }) {
  return (
    <div className="border-b border-gray-300 transition-colors focus-within:border-[#033e74]">
      {children}
    </div>
  );
}

function UnderlineSelect({ placeholder, options, value, onChange }) {
  return (
    <div className="border-b border-gray-300 transition-colors focus-within:border-[#033e74]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm text-gray-900 py-1.5 focus:outline-none appearance-none cursor-pointer"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function AfterSalesService() {
  const navigate = useNavigate();
  const { submitAfterSales, loading, user } = useUser();
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    model: "",
    serial: "",
    date: "",
    issue: "",
    invoice: null,
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
    const err = {};
    if (!form.firstName.trim()) err.firstName = "Please provide your first name";
    if (!form.lastName.trim()) err.lastName = "Please provide your last name";
    if (!form.phone) err.phone = "Please provide your mobile number";
    if (!form.email.trim()) err.email = "Please provide your email address";
    if (!form.model) err.model = "Please select a product model";
    if (!form.issue.trim()) err.issue = "Please describe your issue";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setServerError("");
    try {
      const { invoice, ...data } = form;
      await submitAfterSales(data, invoice);
      setSubmitted(true);
    } catch (err) {
      setServerError(err.message || "Submission failed. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
        <div className="max-w-xl text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl sm:text-4xl font-black mb-3 text-gray-900">Service Request Submitted</h2>
          <p className="text-gray-600 mb-8">
            Thank you for contacting us. Our service team will review your request and respond within 24 business hours.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center rounded-lg bg-[#033e74] px-8 py-3 text-sm font-black text-white transition hover:bg-[#022d56]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
    

      <div className="max-w-2xl mx-auto px-6 py-12">
       


        <form onSubmit={handleSubmit} className="space-y-10">
          {user && (
            <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <p className="text-sm text-blue-700 font-medium">Logged in as <span className="font-black">{user.fullname?.firstname}</span></p>
              <button type="button"
                onClick={() => setForm(f => ({ ...f, firstName: user.fullname?.firstname || '', lastName: user.fullname?.lastname || '', email: user.email || '', phone: user.phone || '' }))}
                className="text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg text-white" style={{ background: THEME }}>
                Fill My Details
              </button>
            </div>
          )}
          <div>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-7">
              <UnderlineInput label="First Name" required error={errors.firstName}>
                <Field>
                  <input
                    type="text"
                    placeholder="First Name*"
                    value={form.firstName}
                    onChange={(e) => handle('firstName', e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 py-1.5 focus:outline-none"
                  />
                </Field>
              </UnderlineInput>

              <UnderlineInput label="Last Name" required error={errors.lastName}>
                <Field>
                  <input
                    type="text"
                    placeholder="Last Name*"
                    value={form.lastName}
                    onChange={(e) => handle('lastName', e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 py-1.5 focus:outline-none"
                  />
                </Field>
              </UnderlineInput>

              <UnderlineInput label="Mobile Number" required error={errors.phone}>
                <PhoneField value={form.phone} onChange={(v) => handle('phone', v)} />
              </UnderlineInput>

              <UnderlineInput label="Email Address" required error={errors.email}>
                <Field>
                  <input
                    type="email"
                    placeholder="Email Address*"
                    value={form.email}
                    onChange={(e) => handle('email', e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 py-1.5 focus:outline-none"
                  />
                </Field>
              </UnderlineInput>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-7">
            <UnderlineInput label="Product Model" required error={errors.model}>
              <UnderlineSelect
                placeholder="Select product model"
                options={['MyzoEE 1', 'MyzoEE LIGHT 1', 'MyzoEE 2', 'MaxPower 8 AIO', 'MaxPower 16', 'MaxPower 30', 'NeoPower 4', 'LEGEND 112C', 'LEGEND 112S', 'Other']}
                value={form.model}
                onChange={(v) => handle('model', v)}
              />
            </UnderlineInput>

            <UnderlineInput label="Serial Number">
              <Field>
                <input
                  type="text"
                  placeholder="e.g. HE-2024-XXXXX"
                  value={form.serial}
                  onChange={(e) => handle('serial', e.target.value)}
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 py-1.5 focus:outline-none"
                />
              </Field>
            </UnderlineInput>

            <UnderlineInput label="Purchase Date">
              <Field>
                <input
                  type="date"
                  value={form.date}
                  max={new Date().toISOString().split('T')[0]}
                  onChange={(e) => handle('date', e.target.value)}
                  className="w-full bg-transparent text-sm text-gray-900 py-1.5 focus:outline-none"
                />
              </Field>
            </UnderlineInput>

            <div className="sm:col-span-2">
              <UnderlineInput label="Issue Description" required error={errors.issue}>
                <Field>
                  <textarea
                    rows={4}
                    placeholder="Please describe the issue in detail — what happened, when it started, and any error messages..."
                    value={form.issue}
                    onChange={(e) => handle('issue', e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 py-1.5 focus:outline-none resize-none"
                  />
                </Field>
              </UnderlineInput>
            </div>

            <div className="sm:col-span-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Invoice Image</label>
                <label className="mt-1 flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 transition hover:border-[#033e74]">
                  <span className="text-sm text-slate-600">
                    {form.invoice ? form.invoice.name : 'Upload invoice image from gallery'}
                  </span>
                  <span className="text-sm font-semibold text-[#033e74]">Choose File</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handle('invoice', e.target.files?.[0] || null)}
                  />
                </label>
                <p className="text-xs text-slate-500">PNG, JPG, JPEG, WEBP</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            {serverError && <p className="text-sm text-red-500 mb-4">{serverError}</p>}
            <button
              type="submit"
              disabled={loading}
              className="text-white font-black uppercase tracking-wider px-16 py-4 rounded-lg text-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: THEME }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = THEME_DARK)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = THEME)}
            >
              {loading ? "Submitting..." : "Submit Service Request"}
            </button>
            <p className="text-xs text-gray-400 mt-3">Our support team will respond within 24 business hours.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
