import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { seriesMeta, icons } from "../data/productDetails";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const seriesIconMap = {
  "LIGHT Series": "portable",
  "MaxPower Series": "stack",
  "NeoPower Series": "battery",
  "LEGEND Series": "industrial",
};

/* ── Series accent colours ── */
const seriesColors = {
  "LIGHT Series":    { primary: "#20b2aa", dark: "#0d7a74", light: "rgba(32,178,170,0.12)" },
  "MaxPower Series": { primary: "#033e74", dark: "#011d37", light: "rgba(3,62,116,0.12)" },
  "NeoPower Series": { primary: "#6366f1", dark: "#4338ca", light: "rgba(99,102,241,0.12)" },
  "LEGEND Series":   { primary: "#f59e0b", dark: "#b45309", light: "rgba(245,158,11,0.12)" },
};

/* ── Spec group labels ── */
const SPEC_GROUPS = [
  { label: "Power",     keys: ["AC Output Power","AC Output Voltage","AC Input Power","Max PV Input Power","PV Input Voltage","Max PV Input Current"] },
  { label: "Battery",   keys: ["Battery Type","Battery Capacity","Cell Capacity","Battery Cycles"] },
  { label: "Protection",keys: ["Ingress Protection","Operating Temp","Storage Temp","Certifications"] },
  { label: "Physical",  keys: ["Net Weight","Dimensions"] },
];

/* ── Key feature icons ── */
const KF_ICONS = {
  "Battery Type":     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 7h18M3 17h18M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/>,
  "Battery Capacity": <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z"/>,
  "Battery Cycles":   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>,
  "Ingress Protection":<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6a11.99 11.99 0 00-.598 3.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>,
  "AC Output Power":  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>,
  "Operating Temp":   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.617a8.252 8.252 0 003 2.932 8.252 8.252 0 003 .001z"/>,
};
const defaultIcon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/>;

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); ob.disconnect(); } },
      { threshold }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return [ref, inView];
}

/* ── Animated count-up ── */
function AnimCount({ value }) {
  const num = parseInt(value?.replace(/[^0-9]/g, "")) || 0;
  const [cur, setCur] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => {
    if (!inView || num === 0) return;
    let s = 0;
    const step = Math.ceil(num / 60);
    const t = setInterval(() => {
      s = Math.min(s + step, num);
      setCur(s);
      if (s >= num) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [inView, num]);
  if (!num) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>{value?.replace(/[0-9,]+/, cur.toLocaleString())}</span>;
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [entered, setEntered] = useState(false);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState(false);

  const [heroRef, heroInView] = useInView(0.05);
  const [featRef, featInView] = useInView();
  const [specsRef, specsInView] = useInView();
  const [ucRef, ucInView] = useInView();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setLoading(true); setEntered(false); setImgLoaded(false);
    fetch(`${API_BASE}/api/products/${id}`)
      .then(r => r.json())
      .then(d => { setProduct(d); setTimeout(() => setEntered(true), 60); })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const showToast = useCallback(() => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-3 border-[#20b2aa] border-t-transparent animate-spin" />
        <p className="text-slate-400 text-sm tracking-widest uppercase">Loading…</p>
      </div>
    </div>
  );

  if (!product || product.message) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-slate-500 text-lg font-medium">Product not found</p>
      <Link to="/products" className="text-sm font-bold text-[#20b2aa] underline">← Back to Products</Link>
    </div>
  );

  const meta = seriesMeta[product.series] || { color: "#033e74", label: product.series };
  const color = seriesColors[product.series] || seriesColors["MaxPower Series"];
  const iconSvg = icons[seriesIconMap[product.series] || "battery"] || "";

  /* Key features from first 6 specs */
  const kf = product.specs.slice(0, 6).map(s => ({
    label: s.label, value: s.value,
    icon: KF_ICONS[s.label] || defaultIcon,
  }));

  /* Spec groups */
  const specGroups = SPEC_GROUPS.map(g => ({
    ...g,
    items: product.specs.filter(s => g.keys.includes(s.label)),
  })).filter(g => g.items.length > 0);

  /* Gallery (fallback to placeholder) */
  const mainImg = product.image ? `${API_BASE}${product.image}` : null;

  /* Hero background images per series */
  const heroBgMap = {
    "LIGHT Series":    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80",
    "MaxPower Series": "https://images.unsplash.com/photo-1620714223084-8fcacc2dbe4d?w=1920&q=80",
    "NeoPower Series": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80",
    "LEGEND Series":   "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80",
  };
  const heroBg = heroBgMap[product.series] || heroBgMap["MaxPower Series"];

  return (
    <div className="min-h-screen" style={{ background: "transparent" }}>

      {/* ════════ HERO BANNER ════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          height: "420px",
          opacity: entered ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        {/* Background image */}
        <img
          src={heroBg}
          alt={product.series}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0"
          style={{
            background: `linear-gradient(
              120deg,
              rgba(1,13,28,0.85) 0%,
              rgba(1,13,28,0.65) 45%,
              rgba(1,13,28,0.30) 100%
            )`
          }}
        />

        {/* Colored accent overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 80% at 5% 50%, ${color.primary}22 0%, transparent 60%)`
          }}
        />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <nav className="flex items-center gap-2 text-xs text-white/50">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="text-white/80 font-semibold">{product.model}</span>
          </nav>
        </div>

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-12">
          {/* Series badge */}
          <div className="mb-4">
            <span
              className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white"
              style={{ background: `linear-gradient(135deg, ${color.primary}, ${color.dark})` }}
            >
              {product.series}
            </span>
            {product.badge && (
              <span className="ml-2 inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border text-white/80"
                style={{ borderColor: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.08)" }}>
                {product.badge}
              </span>
            )}
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-3"
            style={{
              textShadow: "0 2px 30px rgba(0,0,0,0.5)",
              opacity: entered ? 1 : 0,
              transform: entered ? "none" : "translateY(20px)",
              transition: "opacity 0.8s 0.15s ease, transform 0.8s 0.15s ease",
            }}
          >
            {product.model}
          </h1>

          <p
            className="text-lg font-semibold max-w-xl"
            style={{
              color: color.primary === "#20b2aa" ? "#5eead4" : `${color.primary}cc`,
              opacity: entered ? 1 : 0,
              transform: entered ? "none" : "translateY(16px)",
              transition: "opacity 0.8s 0.25s ease, transform 0.8s 0.25s ease",
            }}
          >
            {product.tagline}
          </p>

          {/* Scroll cue */}
          <div className="mt-6 flex items-center gap-2 text-white/40 text-xs"
            style={{ opacity: entered ? 1 : 0, transition: "opacity 1s 0.6s" }}>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1">
              <div className="w-1 h-2 bg-white/50 rounded-full" style={{ animation: "scrollDot 1.8s ease infinite" }} />
            </div>
            <span>Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* ════════ PRODUCT DETAIL SECTION ════════ */}
      <section
        ref={heroRef}
        className="relative pt-8 pb-0"
        style={{ transition: "opacity 0.6s, transform 0.6s", opacity: entered ? 1 : 0, transform: entered ? "none" : "translateY(24px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

          {/* Breadcrumb — hidden (already in hero) */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-[#20b2aa] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-[#20b2aa] transition-colors">Products</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">{product.model}</span>
          </nav>

          {/* Main product card */}
          <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-2xl shadow-slate-200/80 overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-0">

              {/* ── LEFT: Image panel ── */}
              <div
                className="relative flex items-center justify-center min-h-[420px] lg:min-h-[560px] overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${color.light} 0%, rgba(248,250,252,0.6) 100%)` }}
              >
                {/* Decorative rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="rounded-full opacity-20" style={{ width: 380, height: 380, border: `1px solid ${color.primary}` }} />
                  <div className="absolute rounded-full opacity-10" style={{ width: 520, height: 520, border: `1px solid ${color.primary}` }} />
                </div>

                {/* Glow */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: `radial-gradient(ellipse 60% 55% at 50% 50%, ${color.light} 0%, transparent 70%)`
                }} />

                {mainImg ? (
                  <img
                    src={mainImg}
                    alt={product.model}
                    onLoad={() => setImgLoaded(true)}
                    className="relative z-10 w-full max-w-[440px] max-h-[440px] object-contain p-8 transition-all duration-700"
                    style={{ opacity: imgLoaded ? 1 : 0, transform: imgLoaded ? "scale(1)" : "scale(0.96)" }}
                  />
                ) : (
                  <div className="relative z-10 flex items-center justify-center w-[260px] h-[260px]"
                    style={{ color: color.primary }}
                    dangerouslySetInnerHTML={{ __html: iconSvg }}
                  />
                )}

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-5 left-5 z-20 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${color.primary}, ${color.dark})` }}>
                    {product.badge}
                  </div>
                )}

                {/* Series tag */}
                <div className="absolute bottom-5 left-5 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.22em] border"
                  style={{ color: color.primary, borderColor: color.primary, background: "rgba(255,255,255,0.85)" }}>
                  {product.series}
                </div>
              </div>

              {/* ── RIGHT: Info panel ── */}
              <div className="flex flex-col justify-between p-8 lg:p-10">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: color.primary }}>
                      {product.type}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Myzo Battery</span>
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-2">
                    {product.model}
                  </h1>
                  <p className="text-base font-semibold mb-4" style={{ color: color.primary }}>
                    {product.tagline}
                  </p>

                  {/* Star rating (visual) */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <svg key={i} className="w-4 h-4" fill={i <= 4 ? "#f59e0b" : "none"} stroke="#f59e0b" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 3.12a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-3.12a1 1 0 00-1.176 0l-3.976 3.12c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.977 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-bold text-slate-700">4.9</span>
                    <span className="text-xs text-slate-400">· 128 verified buyers</span>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-7 max-w-md">{product.description}</p>

                  {/* ── 4 quick-spec pills ── */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {product.specs.slice(0, 4).map(s => (
                      <div key={s.label} className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 hover:border-slate-200 hover:bg-white transition-all">
                        <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-slate-400 mb-1">{s.label}</p>
                        <p className="text-sm font-black text-slate-800">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Actions ── */}
                <div className="space-y-3">
                  {/* Qty + Add to Enquiry */}
                  <div className="flex items-center gap-3">
                    {/* Qty control */}
                    <div className="flex items-center rounded-xl border border-slate-200 bg-white overflow-hidden">
                      <button onClick={() => setQty(q => Math.max(1, q - 1))}
                        className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-lg font-bold">−</button>
                      <span className="w-10 text-center text-sm font-bold text-slate-800">{qty}</span>
                      <button onClick={() => setQty(q => q + 1)}
                        className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-lg font-bold">+</button>
                    </div>

                    {/* Add to enquiry */}
                    <button
                      onClick={showToast}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-6 text-sm font-black text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
                      style={{ background: `linear-gradient(135deg, ${color.primary}, ${color.dark})`, boxShadow: `0 8px 24px -4px ${color.primary}55` }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                      </svg>
                      Add to Enquiry · {qty}
                    </button>
                  </div>

                  {/* Contact CTA */}
                  <Link to="/contact"
                    className="flex items-center justify-center gap-2 rounded-xl py-3 px-6 text-sm font-bold text-slate-700 border border-slate-200 bg-white/60 hover:bg-white hover:border-slate-300 transition-all">
                    <svg className="w-4 h-4 text-[#20b2aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    Talk to a Sales Engineer
                  </Link>

                  {/* Free shipping note */}
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                    Free priority shipping · ISI certified · 3-year warranty
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ TABS NAVIGATION ════════ */}
      <div className="sticky top-16 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex gap-1 overflow-x-auto scrollbar-none">
            {["overview", "specifications", "use-cases"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative flex-shrink-0 px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all"
                style={{ color: activeTab === tab ? color.primary : "#94a3b8" }}
              >
                {tab === "overview" ? "Overview" : tab === "specifications" ? "Specifications" : "Use Cases"}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: color.primary }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════════ TAB: OVERVIEW ════════ */}
      {activeTab === "overview" && (
        <section key="overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14" style={{ animation: "fadeUp 0.4s ease" }}>

          {/* Section title */}
          <div
            ref={featRef}
            className="mb-10 transition-all duration-700"
            style={{ opacity: featInView ? 1 : 0, transform: featInView ? "none" : "translateY(30px)" }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: color.primary }}>Key Highlights</span>
            <h2 className="mt-2 text-3xl font-black text-slate-900">
              Pure Lithium Power.{" "}
              <span style={{ color: color.primary }}>Engineered to Last.</span>
            </h2>
            <p className="mt-2 text-slate-500 text-sm max-w-xl">
              {product.model} is built on advanced LiFePO4 chemistry, delivering unmatched safety, cycle life, and thermal stability for Indian homes, businesses, and industries.
            </p>
          </div>

          {/* ── Key feature cards (6 grid) ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {kf.map((f, i) => (
              <div
                key={f.label}
                className="group rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-100 p-6 hover:border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{
                  transitionDelay: `${i * 70}ms`,
                  opacity: featInView ? 1 : 0,
                  transform: featInView ? "none" : "translateY(28px)",
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: color.light }}>
                  <svg className="w-5 h-5" fill="none" stroke={color.primary} viewBox="0 0 24 24">{f.icon}</svg>
                </div>
                <p className="text-[10px] uppercase tracking-[0.25em] font-bold mb-1" style={{ color: color.primary }}>{f.label}</p>
                <p className="text-lg font-black text-slate-900 mb-1">
                  <AnimCount value={f.value} />
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {f.label === "Battery Type" && "Advanced lithium iron phosphate chemistry — safest, most stable battery technology."}
                  {f.label === "Battery Capacity" && "Extended runtime to power essential devices through long outages."}
                  {f.label === "Battery Cycles" && "Industry-leading cycle life — built to last for decades without degradation."}
                  {f.label === "Ingress Protection" && "Sealed against dust and water intrusion for indoor and semi-outdoor use."}
                  {f.label === "AC Output Power" && "Sufficient continuous power output for a wide range of appliances."}
                  {f.label === "Operating Temp" && "Reliable performance across Indian climate extremes."}
                  {!["Battery Type","Battery Capacity","Battery Cycles","Ingress Protection","AC Output Power","Operating Temp"].includes(f.label) && "Precision-engineered for maximum efficiency and durability."}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ════════ TAB: SPECIFICATIONS ════════ */}
      {activeTab === "specifications" && (
        <section key="specifications" ref={specsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14" style={{ animation: "fadeUp 0.4s ease" }}>
          <div className="mb-10 transition-all duration-700"
            style={{ opacity: specsInView ? 1 : 0, transform: specsInView ? "none" : "translateY(20px)" }}>
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: color.primary }}>Technical Data</span>
            <h2 className="mt-2 text-3xl font-black text-slate-900">Full Specifications</h2>
            <p className="mt-2 text-slate-500 text-sm">Complete technical parameters for {product.model}.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {specGroups.map((g, gi) => (
              <div key={g.label}
                className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-100 overflow-hidden shadow-sm transition-all duration-500"
                style={{ opacity: specsInView ? 1 : 0, transform: specsInView ? "none" : "translateY(20px)", transitionDelay: `${gi * 100}ms` }}>
                {/* Group header */}
                <div className="px-6 py-3 flex items-center gap-2 border-b border-slate-100"
                  style={{ background: color.light }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: color.primary }} />
                  <span className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: color.primary }}>{g.label}</span>
                </div>
                {/* Rows */}
                <div className="divide-y divide-slate-50">
                  {g.items.map((spec, si) => (
                    <div key={spec.label}
                      className="flex items-start justify-between px-6 py-3.5 hover:bg-slate-50/60 transition-colors"
                    >
                      <span className="text-xs font-semibold text-slate-500 w-40 shrink-0">{spec.label}</span>
                      <span className="text-xs font-bold text-slate-800 text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Full spec table (all remaining) */}
          {product.specs.length > 0 && (
            <div className="mt-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-100 overflow-hidden shadow-sm">
              <div className="px-6 py-3 flex items-center gap-2 border-b border-slate-100" style={{ background: color.light }}>
                <div className="w-2 h-2 rounded-full" style={{ background: color.primary }} />
                <span className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: color.primary }}>All Parameters</span>
              </div>
              <div className="divide-y divide-slate-50">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex items-start justify-between px-6 py-3.5 hover:bg-slate-50/60 transition-colors">
                    <span className="text-xs font-semibold text-slate-500 w-48 shrink-0">{spec.label}</span>
                    <span className="text-xs font-bold text-slate-800 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          <div className="mt-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-100 p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.25em] mb-4" style={{ color: color.primary }}>Certifications & Standards</p>
            <div className="flex flex-wrap gap-3">
              {["CE", "UN38.3", "IEC62619", "RoHS", "ISO 9001"].map(cert => (
                <span key={cert} className="px-4 py-2 rounded-full border text-xs font-bold"
                  style={{ borderColor: color.primary, color: color.primary, background: color.light }}>
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════ TAB: USE CASES ════════ */}
      {activeTab === "use-cases" && (
        <section key="use-cases" ref={ucRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14" style={{ animation: "fadeUp 0.4s ease" }}>
          <div className="mb-10 transition-all duration-700"
            style={{ opacity: ucInView ? 1 : 0, transform: ucInView ? "none" : "translateY(20px)" }}>
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: color.primary }}>What Can It Power?</span>
            <h2 className="mt-2 text-3xl font-black text-slate-900">Runtime Estimates</h2>
            <p className="mt-2 text-slate-500 text-sm">Based on full charge and rated capacity at standard conditions.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {(product.useCases || []).map((uc, i) => {
              const [device, ...rest] = uc.split("–");
              const time = rest.join("–").trim();
              return (
                <div key={i}
                  className="group rounded-2xl bg-white/80 border border-slate-100 p-5 hover:border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  style={{ transitionDelay: `${i * 60}ms`, opacity: ucInView ? 1 : 0, transform: ucInView ? "none" : "translateY(20px)" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{device.trim()}</p>
                      {time && <p className="text-xs text-slate-400 mt-0.5">Runtime</p>}
                    </div>
                    {time && (
                      <div className="text-right">
                        <p className="text-xl font-black" style={{ color: color.primary }}>{time}</p>
                      </div>
                    )}
                  </div>
                  {/* Mini progress bar */}
                  <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: ucInView ? `${Math.min(95, 30 + (i * 15))}%` : "0%",
                        background: `linear-gradient(90deg, ${color.primary}, ${color.dark})`,
                        transitionDelay: `${i * 80 + 300}ms`
                      }} />
                  </div>
                </div>
              );
            })}

            {(!product.useCases || product.useCases.length === 0) && (
              <div className="col-span-full text-center py-16 text-slate-400 text-sm">
                Use case data not available for this product.
              </div>
            )}
          </div>

          {/* ── Application domains ── */}
          <div className="rounded-3xl border border-slate-100 bg-white/70 backdrop-blur-sm p-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] mb-6" style={{ color: color.primary }}>Ideal Applications</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "🏠", title: "Residential", desc: "Home backup, solar integration, UPS replacement" },
                { icon: "🏢", title: "Commercial", desc: "Office backup, retail shops, telecom towers" },
                { icon: "⚡", title: "Industrial", desc: "Factory UPS, data centers, EV charging stations" },
                { icon: "🌿", title: "Solar ESS", desc: "Pair with rooftop solar for round-the-clock green power" },
              ].map((a, i) => (
                <div key={i} className="rounded-2xl p-4 border border-slate-100 hover:border-slate-200 hover:bg-white transition-all">
                  <span className="text-2xl">{a.icon}</span>
                  <p className="mt-2 text-sm font-bold text-slate-800">{a.title}</p>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ════════ TOAST ════════ */}
      <div className="fixed bottom-6 right-6 z-50 transition-all duration-400"
        style={{ opacity: toast ? 1 : 0, transform: toast ? "translateY(0)" : "translateY(16px)", pointerEvents: "none" }}>
        <div className="flex items-center gap-3 rounded-2xl bg-slate-900 px-5 py-3.5 shadow-2xl">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-white text-sm font-semibold">{product.model} added to enquiry!</p>
        </div>
      </div>

    </div>
  );
}
