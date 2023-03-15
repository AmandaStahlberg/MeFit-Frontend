import ProductList from "../components/products/ProductList";
import useProducts from "../hooks/useProducts";

function ProductsPage() {

    const { products, error } = useProducts();

  return (
    <div>
      <h1>Products Page</h1>
      <ProductList products={ products } error={ error } />
    </div>
  );
}
export default ProductsPage;
