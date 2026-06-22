import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function Contact() {
  const [form, setForm] = useState({
    country: "",
    city: "",
    postalCode: "",
    address: "",
    phone: "",
    telephone: "",
    reason: "",
    message: "",
  });

  return (
    <div className="lg:col-span-3 bg-white rounded-2xl p-5">
      <h3 className="text-2xl font-bold text-gray-700 text-center mb-6">
        Connect With Myzo
      </h3>

      <form className="space-y-5">

        {/* Country & City */}
        <div className="grid md:grid-cols-2 gap-4">
          <select
            name="country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="UAE">UAE</option>
            <option value="Singapore">Singapore</option>
          </select>

          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
          />
        </div>

        {/* Postal Code & Phone */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Postal Code"
            value={form.postalCode}
            onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
          />

  <PhoneInput
    defaultCountry="in"
    value={form.phone}
    onChange={(phone) => setForm({ ...form, phone })}
    forceDialCode={true}
    style={{ width: "100%" }}
    inputStyle={{
      width: "100%",
      height: "50px",
      borderRadius: "8px",
      border: "1px solid #d1d5db",
      fontSize: "16px",
    }}
  />

        </div>

        {/* Address */}
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
        />

        {/* Telephone & Purpose */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Telephone (Optional)"
            value={form.telephone}
            onChange={(e) => setForm({ ...form, telephone: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
          />

          <select
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
          >
            <option value="">Select Purpose</option>
            <option>Product Inquiry</option>
            <option>Become a Dealer</option>
            <option>Technical Support</option>
            <option>Partnership / Collaboration</option>
            <option>Bulk Order</option>
            <option>Business Inquiry</option>
            <option>Career Opportunity</option>
            <option>Other</option>
          </select>
        </div>

        {/* Message */}
        <textarea
          rows="4"
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 resize-none"
        />

        <button
          type="submit"
          className="w-full bg-[#033e74] hover:bg-[#042b50] text-white font-semibold py-3 rounded-xl transition"
        >
          Send Message
        </button>

      </form>
    </div>
  );
}