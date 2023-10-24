import React, { useState, useEffect } from 'react';
import { fetchProductBySlug } from "@/turn-table-studio/utils/sanity.queries"
import { urlFor } from '@/turn-table-studio/utils/sanity.client';
import { ProductWrapper } from '@/Components/ProductWrapper.style';
import StockStatus from '@/Components/StockStatus';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { useShoppingCart } from 'use-shopping-cart';

export default function Product() {
    const [product, setProduct] = useState(null);

    const slug = "/" + location.pathname.split('/').slice(-1)[0];

    useEffect(() => {
        fetchProductBySlug(slug)
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => console.error('Error fetching product:', error));
        }, [slug]);

    const { addItem } = useShoppingCart();

    const handleAddToCart = () => {
        if (product) {
            addItem({
                id: product.id,
                name: product.title,
                price: product.price,
                currency: product.currency,
                image: product.image,
                quantity: 1,
            });
        };
    };

    return (
        <>
            <DefaultLayout>
                <a href="/products"><span>Products</span></a>
                <span> &gt; </span>
                <a href={`/products${product && product.subcategory.category.slug.current}`}><span>{product && product.subcategory.category.title}</span></a>
                <span> &gt; </span>
                <span>{product && product.subcategory.title}</span>
                <span> &gt; </span>
                <span>{product && product.title}</span>
                <ProductWrapper>
                    {product && (
                        <>
                            <img src={urlFor(product.image)} alt="Image of the product." />
                            <div>
                                <p>{product.title}</p>
                                <p>{product.description}</p>
                                <p>{product.price} {product.currency}</p>
                                <StockStatus />
                                <button onClick={handleAddToCart}>Add To Cart</button>
                            </div>
                        </>
                    )}
                </ProductWrapper>
            </DefaultLayout>
        </>
    )
} 