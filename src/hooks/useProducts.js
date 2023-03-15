import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";

/**
 * Make an HTTP Request and return response
 * @returns {{products:[], error: string | null }}
 */
function useProducts() {
  const [products, setProducts] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const init = async () => {
      const { products, error } = await fetchProducts();

      setProducts(products);
      setError(error);
    };

    init();
  }, []);

  return { products, error };
}
export default useProducts;
