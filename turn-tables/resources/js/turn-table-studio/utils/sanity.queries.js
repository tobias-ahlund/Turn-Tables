import { client } from "./sanity.client";

const getAllProducts = `*[_type == 'product'] {
  _id,
  title,
  image,
  description,
  price,
  currency
}`;

const getProduct = `*[_type == "product" && slug.current == $slug][0]`

const fetchAllProducts = () => client.fetch(getAllProducts);

const fetchProduct = (slug) => {
  return client.fetch(getProduct, { slug });
};

export { fetchAllProducts, fetchProduct };