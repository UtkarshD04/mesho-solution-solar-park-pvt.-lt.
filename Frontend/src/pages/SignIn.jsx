import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useGoogleLogin } from "@react-oauth/google";

const THEME = "#033e74";
const THEME_DARK = "#022d56";
const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? '';

export default function SignIn() {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useUser();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const [form, setForm] = useState({ email: "", password: "" });
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
    if (!form.email.trim()) e.email = "Please enter your email address.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Please enter a valid email address.";
    if (!form.password) e.password = "Please enter your password.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || "Login failed.");
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setErrors({ server: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left — Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 bg-white">

        <Link to="/" className="mb-10 inline-block">
          <img src="/logo.png" alt="Myzo" className="h-16 w-auto object-contain" />
        </Link>

        <div className="max-w-sm w-full">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-2" style={{ color: THEME }}>
            Welcome Back
          </p>
          <h1 className="text-3xl font-black text-gray-900 mb-1">Sign In</h1>
          <p className="text-sm text-gray-500 mb-8">
            Sign in to your Myzo account to continue.
          </p>

          {/* Google Button */}
          <button
            type="button"
            onClick={() => handleGoogleLogin()}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm font-semibold text-gray-700 transition-all duration-200 hover:shadow-md disabled:opacity-60 mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="border-b border-gray-300 focus-within:border-[#033e74] transition-colors">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => handle("email", e.target.value)}
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 py-2 focus:outline-none"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <button type="button" className="text-xs font-semibold hover:underline" style={{ color: THEME }}>
                  Forgot password?
                </button>
              </div>
              <div className="border-b border-gray-300 focus-within:border-[#033e74] transition-colors flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => handle("password", e.target.value)}
                  className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 py-2 focus:outline-none"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 transition-colors pb-1">
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
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            {errors.server && <p className="text-sm text-red-500 -mt-2">{errors.server}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg text-sm font-black uppercase tracking-wider text-white transition-all duration-200 hover:shadow-lg hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: THEME }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = THEME_DARK)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = THEME)}
            >
              {loading ? "Signing in..." : "Continue"}
            </button>

          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don't have a Myzo Account?{" "}
            <Link to="/create-account" className="font-bold hover:underline" style={{ color: THEME }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right — Image */}
      <div className="hidden lg:block lg:w-[55%] relative">
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=80"
          alt="Solar Energy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#033e74]/80 via-[#033e74]/40 to-transparent" />
        <div className="absolute bottom-12 left-10 right-10 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-3">Myzo Energy</p>
          <h2 className="text-4xl font-black uppercase leading-tight mb-3">
            Power Your<br />Future Today
          </h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-sm">
            Advanced BESS solutions for homes, businesses and industries across India.
          </p>
        </div>
      </div>

    </div>
  );
}
