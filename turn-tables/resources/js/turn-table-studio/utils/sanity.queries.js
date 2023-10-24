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
    slug,
    category->{
      title,
      slug,
    },
  },
}`;

const getProductsBySlug = `*[_type == 'product' && category->slug.current == $slug]
{
  _id,
  title,
  image,
  description,
  price,
  currency,
  slug,
  category->{
    title,
    slug,
  },
  subcategory->{
    title,
    slug,
  }
}`;

const getProductBySlug = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  image,
  description,
  price,
  currency,
  slug,
  subcategory->{
    title,
    slug,
    category->{
      title,
      slug,
    },
  },
}`;

const getAllCategories = `*[_type == 'category'] {
  _id,
  title,
  slug,
  description,
}`;

const getCategory = `*[_type == 'category' && title == $title] {
  _id,
  title,
  slug,
  description,
  "subcategories": *[_type == 'subcategory' && references(^._id)] {
    _id,
    title,
    slug
  }
}[0]`;;

const fetchAllProducts = () => client.fetch(getAllProducts);

const fetchAllCategories = () => client.fetch(getAllCategories);

const fetchCategory = (title) => {
  return client.fetch(getCategory, { title });
};

const fetchProductBySlug = (slug) => {
  return client.fetch(getProductBySlug, { slug });
};

const fetchProductsBySlug = (slug) => {
  return client.fetch(getProductsBySlug, { slug });
};

export { fetchAllProducts, fetchProductBySlug, fetchProductsBySlug, fetchAllCategories, fetchCategory };