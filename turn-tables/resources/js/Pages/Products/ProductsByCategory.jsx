import React, { useState, useEffect } from 'react';
import { fetchCategory, fetchProductsBySlug } from '@/turn-table-studio/utils/sanity.queries';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { ProductsWrapper } from '@/Components/ProductsWrapper.style';
import { BreadcrumbsWrapper } from '@/Components/Breadcrumbs.style';
import ProductCard from '@/Components/ProductCard.style';
import SortButton from '@/Components/SortButton.style';
import styled from 'styled-components';
import { Link } from '@inertiajs/react';

const AltHeader = styled.h1`
    margin-bottom: .5rem;
`;

export default function ProductsByCategory({ wishlistItems }) {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [sort, setSort] = useState("");

    const slug = "/" + location.pathname.split('/').slice(-1)[0];
    const categoryTitle = location.pathname
        .split('/')
        .slice(-1)[0]
        .replace(/-/g, ' ')
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

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

    useEffect(() => {
        if (sort === "alphabetical") {
            console.log("sort alphabetical")

            const productsSortedAlphabetical = [...products].sort((a, b) => {
                const titleA = a.title.toUpperCase();
                const titleB = b.title.toUpperCase();
                
                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                return 0;
            });

            setProducts(productsSortedAlphabetical);
        }
        
        if (sort === "priceAsc") {
            console.log("sort price ascending")

            const productsSortedPriceAsc = [...products].sort((a, b) => a.price - b.price);

            setProducts(productsSortedPriceAsc);
        }

        if (sort === "priceDesc") {
            console.log("sort price descending")

            const productsSortedPriceDesc = [...products].sort((a, b) => b.price - a.price);

            setProducts(productsSortedPriceDesc);
        }
    }, [sort]);

    function handleSort(sortMethod) {
        setSort(sortMethod);   
    }

    return (
        <>
            <DefaultLayout>
                <AltHeader>{categoryTitle}</AltHeader>
                <BreadcrumbsWrapper>
                    <Link href="/products"><span>Products</span></Link>
                    <span> &gt; </span>
                    <span>{category && category.title}</span>
                </BreadcrumbsWrapper>

                <SortButton 
                    handleSort={handleSort}
                />

                <ProductsWrapper>
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            showAddToCart={true}
                            showAddToWishlist={true}
                        />
                    ))}
                </ProductsWrapper>
            </DefaultLayout>
        </>
        );
};