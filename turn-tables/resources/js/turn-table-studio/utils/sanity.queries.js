import { client } from "./sanity.client";

const getAllProducts = `*[_type == 'product'] {
  _id,
  title,
  image,
  price,
  currency,
  slug,
  subcategory->{
    title,
    category->{
      title,
    },
  },
}`;

const getProduct = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  image,
  description,
  price,
  currency,
  slug,
  subcategory->{
    title,
    category->{
      title,
    },
  },
}`

const fetchAllProducts = () => client.fetch(getAllProducts);

const fetchProduct = (slug) => {
  return client.fetch(getProduct, { slug });
};

export { fetchAllProducts, fetchProduct };