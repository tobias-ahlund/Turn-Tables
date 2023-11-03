import React, { useState, useEffect } from 'react';
import { fetchCategory, fetchProductsBySlug } from '@/turn-table-studio/utils/sanity.queries';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { ProductsWrapper } from '@/Components/ProductsWrapper.style';
import { BreadcrumbsWrapper } from '@/Components/Breadcrumbs.style';
import ProductCard from '@/Components/ProductCard.style';

export default function ProductsByCategory({ wishlistItems }) {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [wishlistUpdated, setWishlistUpdated] = useState(wishlistItems);

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

    function updateWishlist(updatedWishlist) {
        setWishlistUpdated(updatedWishlist);
    }

    return (
        <>
            <DefaultLayout>
                <BreadcrumbsWrapper>
                <a href="/products"><span>Products</span></a>
                <span> &gt; </span>
                <span>{category && category.title}</span>
                </BreadcrumbsWrapper>
                <ProductsWrapper>
                    {products.map((product) => (
                        <ProductCard
                        key={product._id}
                        product={product}
                        showAddToCart={true}
                        showAddToWishlist={true}
                        wishlistUpdated={wishlistUpdated}
                        updateWishlist={updateWishlist}
                        />
                    ))}
                </ProductsWrapper>
            </DefaultLayout>
        </>
        );
};