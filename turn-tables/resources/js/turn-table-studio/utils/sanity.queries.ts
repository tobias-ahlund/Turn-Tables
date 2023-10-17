import client from "./sanity.client";

const getAllProducts = `*[_type == 'product'] {
  _id,
  title,
}`;

const fetchAllProducts = () => client.fetch(getAllProducts);

export { fetchAllProducts };
