import { useEffect, useState } from "react";
import { fetchProductById } from "../api/products";

/**
 * Make an HTTP Request and return response
 * @returns {{product: any, error: string | null }}
 */
function useProductDetail(productId) {
    const [product, setProduct] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        const init = async () => {
            const { product, error } = await fetchProductById(productId);
            setProduct(product);
            setError(error);
        };
        init();
    }, [ productId ]);

    return { product, error };
}
export default useProductDetail;
