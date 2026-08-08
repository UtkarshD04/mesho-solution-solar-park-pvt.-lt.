import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resolveImageUrl } from "../utils/resolveImage";
import { useCart } from "../context/CartContext";

const NAVY = "#033e74";
const PIN_KEY = "myzo_pincode";

const productSeriesValues = {
  "LIGHT Series": "LIGHT Series – Portable Power Stations",
  "MaxPower Series": "MaxPower Series – Residential ESS",
  "NeoPower Series": "NeoPower Series – Lead-acid Replacement",
  "LEGEND Series": "LEGEND Series – C&I ESS",
};

const inr = (n) => `₹ ${Number(n).toLocaleString("en-IN")}`;
const hasPrice = (item) => typeof item.price === "number" && item.price > 0;

/* ── Icons ── */
const TrashIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const EditIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

/* ── Stock label from real product status ── */
function StockLabel({ status }) {
  if (status === "Out of Stock") return <span className="text-xs font-semibold text-red-600">Out of Stock</span>;
  if (status === "Low Stock") return <span className="text-xs font-semibold text-amber-600">Only a few left</span>;
  return <span className="text-xs font-semibold text-green-600">In Stock</span>;
}

/* ── Single cart line item ── */
function CartRow({ item, onQtyChange, onRemove }) {
  const imgSrc = resolveImageUrl(item.image);
  const priced = hasPrice(item);
  const discount = priced && item.mrp > item.price
    ? Math.round(((item.mrp - item.price) / item.mrp) * 100)
    : 0;

  return (
    <div className="flex gap-4 sm:gap-6 p-4 sm:p-6">
      {/* Image */}
      <Link
        to={`/products/${item._id}`}
        className="shrink-0 w-24 h-24 sm:w-40 sm:h-40 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden"
      >
        {imgSrc ? (
          <img src={imgSrc} alt={item.model} className="w-full h-full object-contain p-2" />
        ) : (
          <span className="text-[10px] text-gray-400 text-center px-2">Image Pending</span>
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/products/${item._id}`} className="block text-base sm:text-lg font-semibold text-gray-900 hover:text-[#033e74] transition-colors">
              {item.model}
            </Link>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {item.series}{item.type ? ` · ${item.type}` : ""}
            </p>
          </div>

          <button
            onClick={() => onRemove(item._id)}
            className="shrink-0 flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            <TrashIcon />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>

        {/* Price block */}
        <div className="mt-3">
          {priced ? (
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span className="text-lg sm:text-xl font-bold text-gray-900">{inr(item.price)}</span>
              <span className="text-xs text-gray-500">(Inclusive of all taxes)</span>
              {discount > 0 && (
                <span className="w-full text-sm">
                  <span className="font-semibold text-green-600">{discount}% off</span>
                  <span className="text-gray-400"> | MRP </span>
                  <span className="text-gray-400 line-through">{inr(item.mrp)}</span>
                </span>
              )}
            </div>
          ) : (
            <p className="text-base font-semibold text-gray-900">
              Price on request
              <span className="hidden sm:inline ml-2 text-xs font-normal text-gray-500">Quoted per project</span>
            </p>
          )}
        </div>

        <div className="mt-2"><StockLabel status={item.status} /></div>

        {/* Quantity */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm text-gray-600">Quantity:</span>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => onQtyChange(item._id, item.qty - 1)}
              disabled={item.qty <= 1}
              aria-label="Decrease quantity"
              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >−</button>
            <span className="w-10 text-center text-sm font-semibold text-gray-900 border-x border-gray-300">{item.qty}</span>
            <button
              onClick={() => onQtyChange(item._id, item.qty + 1)}
              aria-label="Increase quantity"
              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            >+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const { items, updateQty, removeFromCart, clearCart, totalItems } = useCart();
  const navigate = useNavigate();

  const [pincode, setPincode] = useState(() => localStorage.getItem(PIN_KEY) || "");
  const [editingPin, setEditingPin] = useState(false);
  const [pinDraft, setPinDraft] = useState("");
  const [showBreakup, setShowBreakup] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const savePin = () => {
    if (!/^\d{6}$/.test(pinDraft)) return;
    setPincode(pinDraft);
    localStorage.setItem(PIN_KEY, pinDraft);
    setEditingPin(false);
  };

  const pricedItems = items.filter(hasPrice);
  const allPriced = items.length > 0 && pricedItems.length === items.length;
  const orderTotal = pricedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const mrpTotal = pricedItems.reduce((sum, i) => sum + (i.mrp || i.price) * i.qty, 0);

  const handleCheckout = () => {
    const seriesUsed = [...new Set(items.map((i) => i.series))];
    const product = seriesUsed.length === 1
      ? (productSeriesValues[seriesUsed[0]] || "Not Sure / Other")
      : "Not Sure / Other";

    const message = [
      "I'd like a quote for the following items from my cart:",
      "",
      ...items.map((i) => `• ${i.model} (${i.series}) — Qty: ${i.qty}`),
    ].join("\n");

    navigate("/contact/product-enquiry", {
      state: { cartProduct: product, cartMessage: message, cartPincode: pincode },
    });
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      {/* Header band — keeps the transparent navbar legible */}
      <div className="pt-24 lg:pt-32 pb-8" style={{ background: NAVY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white/90">Cart</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Your Cart Items</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {items.length === 0 ? (
          /* ── Empty state ── */
          <div className="bg-white rounded-lg border border-gray-200 px-6 py-16 text-center">
            <svg className="w-14 h-14 mx-auto mb-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.694 2.591-7.159a1.125 1.125 0 00-1.087-1.391H5.106M7.5 14.25L5.106 5.106M7.5 14.25L5.85 17.25m0 0a1.5 1.5 0 102.121 2.121 1.5 1.5 0 00-2.12-2.121zm9 0a1.5 1.5 0 102.121 2.121 1.5 1.5 0 00-2.12-2.121z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-sm text-gray-500 mb-7 max-w-sm mx-auto">
              Add products to your cart and request a customised quote from our sales team.
            </p>
            <Link
              to="/products"
              className="inline-block rounded-md px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: NAVY }}
            >
              Shop Products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-5 items-start">

            {/* ── Left: items ── */}
            <div>
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-900">
                    {items.length} Item{items.length === 1 ? "" : "s"}
                  </span>
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <TrashIcon />
                    Clear all items
                  </button>
                </div>

                {/* Pincode */}
                <div className="flex items-center gap-2 text-sm">
                  {editingPin ? (
                    <>
                      <input
                        autoFocus
                        value={pinDraft}
                        maxLength={6}
                        placeholder="6-digit pincode"
                        onChange={(e) => { if (/^\d*$/.test(e.target.value)) setPinDraft(e.target.value); }}
                        onKeyDown={(e) => { if (e.key === "Enter") savePin(); if (e.key === "Escape") setEditingPin(false); }}
                        className="w-32 px-2.5 py-1.5 rounded-md border border-gray-300 text-sm focus:outline-none focus:border-[#033e74]"
                      />
                      <button onClick={savePin} className="font-semibold text-[#033e74] hover:underline">Save</button>
                      <button onClick={() => setEditingPin(false)} className="text-gray-400 hover:text-gray-600">Cancel</button>
                    </>
                  ) : (
                    <>
                      <span className="text-gray-500">
                        {pincode ? `Showing results for Pincode - ${pincode}` : "Delivery pincode not set"}
                      </span>
                      <button
                        onClick={() => { setPinDraft(pincode); setEditingPin(true); }}
                        className="flex items-center gap-1 font-semibold text-[#033e74] hover:underline"
                      >
                        {pincode ? "Change" : "Add"}
                        <EditIcon />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Items card */}
              <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
                {items.map((item) => (
                  <CartRow key={item._id} item={item} onQtyChange={updateQty} onRemove={removeFromCart} />
                ))}
              </div>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-[#033e74] hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </Link>
            </div>

            {/* ── Right: order summary ── */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 sm:p-6 lg:sticky lg:top-32">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700">Order Total</span>
                {allPriced ? (
                  <span className="text-xl font-bold text-gray-900">{inr(orderTotal)}</span>
                ) : (
                  <span className="text-base font-bold text-gray-900">On Request</span>
                )}
              </div>

              {allPriced && mrpTotal > orderTotal && (
                <p className="text-sm text-right mb-1">
                  <span className="font-semibold text-green-600">
                    {Math.round(((mrpTotal - orderTotal) / mrpTotal) * 100)}% off
                  </span>
                  <span className="text-gray-400"> | MRP </span>
                  <span className="text-gray-400 line-through">{inr(mrpTotal)}</span>
                </p>
              )}

              <button
                onClick={() => setShowBreakup((v) => !v)}
                className="text-sm font-semibold text-[#033e74] hover:underline"
              >
                {showBreakup ? "Hide Breakup" : "Show Breakup"}
              </button>

              {showBreakup && (
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                  {items.map((item) => (
                    <div key={item._id} className="flex items-start justify-between gap-3 text-sm">
                      <span className="text-gray-600 min-w-0">
                        <span className="block truncate">{item.model}</span>
                        <span className="text-xs text-gray-400">Qty {item.qty}</span>
                      </span>
                      <span className="shrink-0 font-medium text-gray-800">
                        {hasPrice(item) ? inr(item.price * item.qty) : "On request"}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-sm">
                    <span className="text-gray-600">Total Units</span>
                    <span className="font-semibold text-gray-900">{totalItems}</span>
                  </div>
                </div>
              )}

              <div className="my-5 border-t border-gray-100" />

              <div className="rounded-md bg-blue-50 px-4 py-3 mb-5">
                <p className="text-xs leading-relaxed text-gray-700">
                  Pricing is customised per project. Submit your cart and our sales engineers will send a
                  detailed quote within 24 business hours.
                </p>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full rounded-md py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: NAVY }}
              >
                Proceed to Enquiry
              </button>

              <p className="mt-4 text-xs text-gray-500 text-center">
                No payment required at this step
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
