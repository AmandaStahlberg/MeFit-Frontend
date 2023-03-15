import useProductDetail from "../hooks/useProductDetail";
import {useParams} from "react-router-dom";

function EditProductPage() {

    const { productId } = useParams();
    const { product, error } = useProductDetail(productId);

    if (!product && !error) {
        return <p>Loading product...</p>
    }

    if (error !== null) {
        return (
          <>
            <h4>Could not fetch product</h4>
            <p>{ error }</p>
          </>
        );
    }

    return (
        <div>
            <h1>{ product.name }</h1>
            <img src={ product.image } alt={product.name} width="320"/>
            <h4>About this product</h4>
            <p>{ product.description }</p>
            <h2>Price: { product.price } NOK</h2>
        </div>
    );
}

export default EditProductPage;
