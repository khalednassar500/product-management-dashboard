import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localProducts, setLocalProducts] = useLocalStorage("products", []);

  const updateProduct = (productId, field, newValue) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          if (field === "price") {
            const numericValue = newValue.replace(/[^0-9.]/g, "");
            return {
              ...product,
              [field]: parseFloat(numericValue) || 0,
            };
          }

          return { ...product, [field]: newValue };
        }
        return product;
      })
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        if (localProducts.length > 0) {
          setProducts(localProducts);
          setError(null);
        } else {
          const response = await fetch("https://fakestoreapi.com/products");

          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }

          const data = await response.json();
          setProducts(data);
          setLocalProducts(data);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setLocalProducts(products);
    }
  }, [products, setLocalProducts]);

  return { products, loading, error, updateProduct };
};
