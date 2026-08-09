import SEO from "../components/common/SEO";

export default function CustomerReview() {
  return (
    <section className="pt-20 min-h-screen bg-white flex items-center justify-center">
      <SEO
        title="Customer Reviews"
        description="Read what our customers say about Myzo's batteries and energy storage solutions."
        path="/customer-review"
      />
      <h1 className="text-3xl font-bold text-gray-800">Customer Reviews section</h1>
    </section>
  );
}
