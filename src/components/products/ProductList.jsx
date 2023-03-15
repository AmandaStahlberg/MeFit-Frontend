import useProducts from "../../hooks/useProducts";
import {Link} from "react-router-dom";

function ProductList(props) {

  const { products, error } = props;

  if (error) {
    return <p>{error}</p>;
  }

  if (!products) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link to={ "/products/" + p.id } >
              <span>{p.name}</span> - <span>{p.price}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
