
import { useState } from "react";

const contactReasons = [
  "Product Inquiry",
  "Become a Dealer",
  "Technical Support",
  "Partnership / Collaboration",
  "Bulk Order",
  "Business Inquiry",
  "Career Opportunity",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    country: "",
    city: "",
    postalCode: "",
    address: "",
    mobile: "",
    telephone: "",
    reason: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white pt-24">

      {/* Header */}
      <div className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Contact Us 
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Connect with our team to discuss Battery Energy Storage Systems,
          dealership opportunities, technical support, and business partnerships.
        </p>
      </div>

      {/* Form Container */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 pb-16">

        {sent ? (
          <div className="text-center py-20 border border-gray-200 rounded-2xl">
            <div className="text-5xl mb-4">✅</div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Message Sent Successfully!
            </h3>

            <p className="text-gray-600 mb-6">
              Thank you for contacting us. Our team will get back to you shortly.
            </p>

            <button
              onClick={() => setSent(false)}
              className="bg-[#20b2aa] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#179089] transition"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl p-8">

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Country & City */}
              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>

                  <select
                    name="country"
                    required
                    value={form.country}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#20b2aa]"
                  >
                    <option value="">Select Country</option>
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Germany</option>
                    <option>Australia</option>
                    <option>Singapore</option>
                    <option>UAE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>

                  <input
                    type="text"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#20b2aa]"
                  />
                </div>

              </div>

              {/* Postal Code & Mobile */}
              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code *
                  </label>

                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={form.postalCode}
                    onChange={handleChange}
                    placeholder="Enter postal code"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#20b2aa]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>

                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#20b2aa]"
                  />
                </div>

              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>

                <input
                  type="text"
                  name="address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#20b2aa]"
                />
              </div>

              {/* Telephone & Purpose */}
              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telephone
                  </label>

                  <input
                    type="tel"
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    placeholder="Enter telephone number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#20b2aa]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose of Contact *
                  </label>

                  <select
                    name="reason"
                    required
                    value={form.reason}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#20b2aa]"
                  >
                    <option value="">Select Purpose</option>

                    {contactReasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>

                <textarea
                  name="message"
                  required
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:border-[#20b2aa]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#20b2aa] hover:bg-[#179089] text-white font-semibold py-3 rounded-xl transition"
              >
                Send Message
              </button>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}

