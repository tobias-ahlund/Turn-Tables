import { client } from "./sanity.client";

const getAllProducts = `*[_type == 'product'] {
  _id,
  title,
  "image": image.asset->url,
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
  "image": image.asset->url,
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
  "image": image.asset->url,
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
}[0]`;

const getWishlist = `*[_type == 'product' && (_id in $ids)]
{
  _id,
  title,
  "image": image.asset->url,
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
}`

const getPreviousOrders = `*[_type == 'product' && (_id in $ids)]
{
  _id,
  title,
  "image": image.asset->url,
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
}`

const fetchAllProducts = () => client.fetch(getAllProducts);

const fetchAllCategories = () => client.fetch(getAllCategories);

const fetchWishlist = (ids) => {
  return client.fetch(getWishlist, { ids });
};

const fetchCategory = (title) => {
  return client.fetch(getCategory, { title });
};

const fetchProductBySlug = (slug) => {
  return client.fetch(getProductBySlug, { slug });
};

const fetchProductsBySlug = (slug) => {
  return client.fetch(getProductsBySlug, { slug });
};

const fetchPreviousOrders = (ids) => {
  return client.fetch(getPreviousOrders, { ids });
}

export { fetchAllProducts, fetchProductBySlug, fetchProductsBySlug, fetchAllCategories, fetchCategory, fetchWishlist, fetchPreviousOrders };