import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useUser } from "../context/UserContext";
import { useGoogleLogin } from "@react-oauth/google";

const THEME = "#033e74";
const THEME_DARK = "#022d56";
const TEAL = "#20b2aa";
const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? '';

const FEATURES = [
  {
    label: "Clean Energy",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    label: "Smart Solutions",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14" />
      </svg>
    ),
  },
  {
    label: "Reliable Support",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

function BrandPanel() {
  return (
    <div
      className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 xl:p-16"
      style={{ backgroundImage: "url('/hero1.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${THEME}cc 0%, ${THEME}55 45%, ${THEME}d9 100%)` }} />

      {/* Top — Headline */}
      <div className="relative z-10">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-4">Myzo Energy</p>
        <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4">
          Join The<br />
          <span style={{ color: TEAL }}>Clean Energy Movement</span>
        </h1>
        <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-6">
          Create your Myzo account to track orders, enquiries and more.
        </p>
        <div className="w-16 h-1 rounded-full mb-8" style={{ background: TEAL }} />

        <div className="flex flex-wrap gap-6">
          {FEATURES.map((f) => (
            <div key={f.label} className="flex flex-col items-start gap-2.5">
              <div className="w-11 h-11 rounded-xl bg-white/95 flex items-center justify-center shadow-lg" style={{ color: THEME }}>
                {f.icon}
              </div>
              <span className="text-white text-xs font-bold">{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom — Quote card */}
      <div className="relative z-10 rounded-2xl border border-white/15 bg-black/25 backdrop-blur-sm p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: TEAL }}>
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-white/85 text-xs leading-relaxed">
          Harness the power of the sun with <span className="font-bold" style={{ color: TEAL }}>Myzo</span> Solar Solutions.
        </p>
      </div>
    </div>
  );
}

function IconField({ icon, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`flex items-center gap-2.5 rounded-xl border bg-white px-3.5 focus-within:ring-2 transition-all ${
          error ? "border-red-300" : "border-gray-200"
        }`}
        style={{ "--tw-ring-color": `${TEAL}40` }}
      >
        <span className="text-gray-400 shrink-0">{icon}</span>
        {children}
      </div>
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
}

export default function CreateAccount() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/users/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ access_token: tokenResponse.access_token }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Google login failed.');
        login(data.user);
        navigate('/');
      } catch (err) {
        setErrors({ server: err.message });
      } finally {
        setLoading(false);
      }
    },
    onError: () => setErrors({ server: 'Google login failed. Please try again.' }),
  });

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Please enter your first name.";
    if (!form.lastName.trim()) e.lastName = "Please enter your last name.";
    if (!form.phone) e.phone = "Please enter your phone number.";
    if (!form.email.trim()) e.email = "Please enter your email address.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Please enter a valid email address.";
    if (!form.password) e.password = "Please enter a password.";
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullname: { firstname: form.firstName, lastname: form.lastName },
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.errors?.[0]?.msg || data.message || "Registration failed.");
      login(data.user);
      navigate("/");
    } catch (err) {
      setErrors({ server: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <BrandPanel />

      {/* Right — Card */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">

          <Link to="/" className="flex justify-center mb-6">
            <img src="/logo.png" alt="Myzo" className="h-14 w-auto object-contain" />
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-gray-900 mb-1.5">Create Account</h1>
            <p className="text-sm text-gray-500">Join Myzo and power your future today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700">First Name</label>
                <IconField
                  error={errors.firstName}
                  icon={
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                >
                  <input
                    type="text"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={(e) => handle("firstName", e.target.value)}
                    className="w-full min-w-0 bg-transparent text-sm text-gray-900 placeholder-gray-400 py-3 focus:outline-none"
                  />
                </IconField>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700">Last Name</label>
                <IconField
                  error={errors.lastName}
                  icon={
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                >
                  <input
                    type="text"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={(e) => handle("lastName", e.target.value)}
                    className="w-full min-w-0 bg-transparent text-sm text-gray-900 placeholder-gray-400 py-3 focus:outline-none"
                  />
                </IconField>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <IconField
                error={errors.email}
                icon={
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => handle("email", e.target.value)}
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 py-3 focus:outline-none"
                />
              </IconField>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700">Phone Number</label>
              <IconField
                error={errors.phone}
                icon={
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              >
                <div className="flex-1 min-w-0">
                  <PhoneInput
                    defaultCountry="in"
                    value={form.phone}
                    onChange={(v) => handle("phone", v)}
                    style={{ border: "none", background: "transparent" }}
                    inputStyle={{ border: "none", background: "transparent", fontSize: "14px", color: "#111827", outline: "none", width: "100%", padding: "12px 0" }}
                    countrySelectorStyleProps={{ buttonStyle: { border: "none", background: "transparent" } }}
                  />
                </div>
              </IconField>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700">Password</label>
              <IconField
                error={errors.password}
                icon={
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={(e) => handle("password", e.target.value)}
                  className="flex-1 min-w-0 bg-transparent text-sm text-gray-900 placeholder-gray-400 py-3 focus:outline-none"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </IconField>
            </div>

            {errors.server && <p className="text-sm text-red-500 -mt-2">{errors.server}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-black uppercase tracking-wider text-white transition-all duration-200 hover:shadow-lg hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: THEME }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = THEME_DARK)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = THEME)}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={() => handleGoogleLogin()}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-semibold text-gray-700 transition-all duration-200 hover:shadow-md disabled:opacity-60"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>

          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <Link to="/signup" className="font-bold hover:underline" style={{ color: THEME }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
