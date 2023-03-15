import axios from ".";

/**
 * SAMPLE FUNCTION: Fetch products from a REST API
 * @returns { Promise<{ products: [], error: null | string }>} response
 */
export const fetchProducts = async () => {

  const productsURL = "https://acc-products-fake.herokuapp.com/api/products";

  try {
    const { data } = await axios.get(productsURL);
    return Promise.resolve({
      products: data,
      error: null,
    });
  } 
  catch (e) {
    return {
      products: [],
      error: e.message,
    };
  }
};

/**
 * Fetch a product by its id.
 * @param {number} productId
 * @returns {Promise<{product: { id, name, price, description, quantity } | null, error: null}>}
 */
export const fetchProductById = async (productId) => {
  const productsURL = "https://acc-products-fake.herokuapp.com/api/products";

  try {
    const { data, status } = await axios.get(productsURL + "/" + productId);
    console.log(status)
    return Promise.resolve({
      product: data,
      error: null,
    });
  }
  catch (e) {
    return {
      product: null,
      error: e.message,
    };
  }
}
