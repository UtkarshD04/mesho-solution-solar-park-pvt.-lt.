import SEO from "../components/common/SEO";

export default function Article() {
  return (
    <section className="pt-20 min-h-screen bg-white flex items-center justify-center">
      <SEO
        title="Articles"
        description="Read the latest articles and insights from Myzo on energy storage, battery technology, and solar solutions."
        path="/article"
      />
      <h1 className="text-3xl font-bold text-gray-800">Articles</h1>
    </section>
  );
}
