import React, { useState, useEffect } from 'react';
import { fetchCategory, fetchProductsBySlug } from '@/turn-table-studio/utils/sanity.queries';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { ProductsWrapper } from '@/Components/ProductsWrapper.style';
import { BreadcrumbsWrapper } from '@/Components/Breadcrumbs.style';
import ProductCard from '@/Components/ProductCard.style';
import SortButton from '@/Components/SortButton.style';
import styled from 'styled-components';

const AltHeader = styled.h1`
    margin-bottom: .5rem;
`;

export default function ProductsByCategory({ wishlistItems }) {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [runEffectSortAlphabetical, setRunEffectSortAlphabetical] = useState(false);
    const [runEffectSortPriceAsc, setRunEffectSortPriceAsc] = useState(false);

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

    useEffect(() => {
        if (runEffectSortAlphabetical) {
            console.log("sort alphabetical")

            const productsSortedAlphabetical = products.sort((a, b) => {
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

            setRunEffectSortAlphabetical(false);
        }
    }, [handleSortAlphabetical])

    useEffect(() => {
        if (runEffectSortPriceAsc) {
            console.log("sort price ascending")

            const productsSortedPriceAsc = products.sort((a, b) => a.price - b.price);

            setProducts(productsSortedPriceAsc)

            setRunEffectSortPriceAsc(false);
        }
    }, [handleSortPriceAsc])

    function handleSortAlphabetical() {
        setRunEffectSortAlphabetical(true);
    }

    function handleSortPriceAsc() {
        setRunEffectSortPriceAsc(true);
    }

    return (
        <>
            <DefaultLayout>
                <AltHeader>{categoryTitle}</AltHeader>
                <BreadcrumbsWrapper>
                    <a href="/products"><span>Products</span></a>
                    <span> &gt; </span>
                    <span>{category && category.title}</span>
                </BreadcrumbsWrapper>

                <SortButton 
                    handleSortAlphabetical={() => {handleSortAlphabetical()}} 
                    handleSortPriceAsc={() => {handleSortPriceAsc()}} 
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