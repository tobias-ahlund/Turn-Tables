import React, { useState, useEffect } from 'react';
import { fetchProductsBySlug } from '@/turn-table-studio/utils/sanity.queries';
import { urlFor } from '@/turn-table-studio/utils/sanity.client';

export default function ProductsByCategory() {
    const [products, setProducts] = useState([]);

    const slug = "/" + location.pathname.split('/').slice(-1)[0];

    useEffect(() => {
        fetchProductsBySlug(slug)
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.error('Error fetching product:', error));
        }, [slug]);

    return (
        <>
            {products.map((product) => (
            <div key={product._id}>
                {product && (
                <a href={`/products/${product.category.title}/${product.subcategory.title}${product.slug.current}`}>
                    <img src={urlFor(product.image)} alt="Picture of the product." />
                    <p>{product.title}</p>
                    <p>{product.price} {product.currency}</p>
                </a>
                )}
            </div>
            ))}
        </>
        );
};