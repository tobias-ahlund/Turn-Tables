import { client } from "./sanity.client";

const getAllProducts = `*[_type == 'product'] {
  _id,
  title,
  image,
  description,
  price,
  currency,
  slug,
}`;

const fetchAllProducts = () => client.fetch(getAllProducts);

export { fetchAllProducts };
