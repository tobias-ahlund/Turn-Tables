import React, { useState, useEffect } from 'react';
import { fetchCategory, fetchProductsBySlug } from '@/turn-table-studio/utils/sanity.queries';
import { urlFor } from '@/turn-table-studio/utils/sanity.client';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { ProductsWrapper } from '@/Components/ProductsWrapper.style';

export default function ProductsByCategory() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);

    const slug = "/" + location.pathname.split('/').slice(-1)[0];
    const categoryTitle = location.pathname.split('/').slice(-1)[0].charAt(0).toUpperCase() + location.pathname.split('/').slice(-1)[0].slice(1);

    useEffect(() => {
        fetchProductsBySlug(slug)
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.error('Error fetching product:', error));

        fetchCategory(categoryTitle)
            .then((data) => {
                setCategory(data);
            })
            .catch((error) => console.error('Error fetching category:', error));
        }, [slug]);

    return (
        <>
            <DefaultLayout>
                <a href="/products"><span>Products</span></a>
                <span> &gt; </span>
                <span>{category && category.title}</span>
                <ProductsWrapper>
                    {products.map((product) => (
                    <div key={product._id}>
                        {product && (
                        <a href={`/products/${product.category.title.toLowerCase()}/${product.subcategory.title.toLowerCase()}${product.slug.current}`}>
                            <img src={urlFor(product.image)} alt="Picture of the product." />
                            <p>{product.title}</p>
                            <p>{product.price} {product.currency}</p>
                        </a>
                        )}
                    </div>
                    ))}
                </ProductsWrapper>
            </DefaultLayout>
        </>
        );
};