import { client } from "./sanity.client";

const getAllProducts = `*[_type == 'product'] {
  _id,
  title,
  image,
  description,
  price,
  currency
}`;

const fetchAllProducts = () => client.fetch(getAllProducts);

export { fetchAllProducts };
