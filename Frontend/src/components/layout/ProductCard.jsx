const ProductCard = ({ product }) => {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{product?.model}</h3>
      {product?.tagline && <p className="mt-2 text-sm text-slate-600">{product.tagline}</p>}
    </article>
  );
};

export default ProductCard;
