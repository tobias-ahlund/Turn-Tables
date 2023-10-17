import React, { useState, useEffect } from 'react';
import { fetchProduct } from "@/turn-table-studio/utils/sanity.queries"
import { urlFor } from '@/turn-table-studio/utils/sanity.client';

export default function Product() {
    const [product, setProduct] = useState(null);
    console.log(product);

    const slug = "/" + location.pathname.split('/').slice(-1)[0];

    useEffect(() => {
        fetchProduct(slug)
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => console.error('Error fetching product:', error));
        }, [slug]);

    return (
        <>
            <h2>Product</h2>
            <a href="/products"><span>Products</span></a>
            <span> &gt; </span>
            <span>{product && product.subcategory.title}</span>
            <span> &gt; </span>
            <span>{product && product.title}</span>
            <section>
                <div>
                {product && (
                    <div>
                        <p>{product.title}</p>
                        <img src={urlFor(product.image)} alt="Image of the product." />
                        <p>{product.description}</p>
                        <p>{product.price} {product.currency}</p>
                    </div>
                )}
                </div>
            </section>
        </>
    )
} 