import { PageShell, ActionButton } from "../components/UI";

const THEME = "#033e74";
const TEAL = "#20b2aa";

const sections = [
  { key: "hero", label: "Hero Slider", desc: "Manage homepage hero images and text", icon: "🖼️" },
  { key: "about", label: "About Us", desc: "Edit company description and leadership content", icon: "🏢" },
  { key: "products", label: "Products", desc: "Update product listings and specifications", icon: "🔋" },
  { key: "testimonials", label: "Testimonials", desc: "Manage customer reviews and ratings", icon: "⭐" },
  { key: "contact", label: "Contact Info", desc: "Update phone, email and address details", icon: "📞" },
  { key: "footer", label: "Footer", desc: "Edit footer links and social media URLs", icon: "🔗" },
];

export default function CMS() {
  return (
    <PageShell label="Content Management" title="Website CMS">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {sections.map(({ key, label, desc, icon }) => (
          <div key={key} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gray-50">{icon}</div>
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-gray-900">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
            </div>
            <button
              className="mt-auto text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition w-full"
            >
              Edit Section
            </button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
