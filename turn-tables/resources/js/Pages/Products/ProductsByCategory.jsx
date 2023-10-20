import React, { useState, useEffect } from 'react';
import { fetchProductsBySlug } from '@/turn-table-studio/utils/sanity.queries';
import { urlFor } from '@/turn-table-studio/utils/sanity.client';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { ProductsWrapper } from '@/Components/ProductsWrapper.style';

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
            <DefaultLayout>
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