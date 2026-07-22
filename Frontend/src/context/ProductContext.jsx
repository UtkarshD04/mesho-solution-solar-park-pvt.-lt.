import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ProductContext = createContext(null);
const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/products`);
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  return (
    <ProductContext.Provider value={{ products, loading, refreshProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider.");
  return context;
}
