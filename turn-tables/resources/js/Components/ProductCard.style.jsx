import React, { useState } from 'react';
import styled from 'styled-components';
import { urlFor } from '@/turn-table-studio/utils/sanity.client';
import { AddToCart } from './AddToCart';
import { AddToWishlist } from './AddToWishlist';
import ShoppingCart from '@/public/images/ShoppingCart.svg';
import Check from '@/public/images/Check.svg';
import { Link } from '@inertiajs/react';

const ImagesWrapper = styled.div`
    position: relative;

    > div:first-of-type {
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 0.5rem;
        display: flex;
        cursor: pointer;
    }

    > div > div {
        background-color: white;
        border-radius: 100%;
        height: 2.5rem;
        width: 2.5rem;
        display: flex;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }

    > div > div:first-child {
        margin-right: 1rem;
    }

    > div > div > img {
        width: 1.5rem;
        height: 1.5rem;
        margin: auto;
    }

    a {
        overflow: hidden;
        display: block;
    }

    a > img {
        transition: transform 0.5s ease-in-out;
    }

    a > img:hover {
        transform: scale(1.1);
    }
`;

const ProductInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 0.5rem 0 0.5rem;
    align-items: center;

    p:first-of-type {
        font-size: 1.25rem;
        padding-bottom: 0.5rem;
    }

    p:last-of-type {
        font-size: 1rem;
        font-weight: bold;
    }
`;

const ProductCardWrapper = styled.article``;

const ProductCard = ({ product, showAddToCart, showAddToWishlist, onRemoveFromWishlist }) => {
    const [cartImage, setCartImage] = useState(null);

    const cartAddedConfirmed = () => {
        setCartImage(product._id);

        setTimeout(() => {
            setCartImage(null);
        }, 2000);
    };

    return (
        <ProductCardWrapper>
            <ImagesWrapper>
                <Link
                    href={`/products${product.subcategory?.category?.slug?.current || product.category?.slug?.current }${product.subcategory?.slug?.current}${product.slug?.current}`}
                >
                    <img src={urlFor(product.image)} alt="Picture of the product." />
                </Link>
                <div>
                    {showAddToCart && (
                        <AddToCart
                            product={product}
                            cartAddedConfirmed={cartAddedConfirmed}
                        >
                            <img
                                src={cartImage === product._id ? Check : ShoppingCart}
                                alt="Shopping cart icon."
                            />
                        </AddToCart>
                    )}
                    {showAddToWishlist && (
                        <AddToWishlist 
                            productId={product._id}
                            onRemoveFromWishlist={onRemoveFromWishlist}>
                        </AddToWishlist>
                    )}
                </div>
            </ImagesWrapper>
            
            <Link
                href={`/products${product.subcategory?.category?.slug?.current || product.category?.slug?.current }${product.subcategory?.slug?.current}${product.slug?.current}`}
            >
                <ProductInfoWrapper>
                    <p>{product.title}</p>
                    <p>{product.price}:-</p>
                </ProductInfoWrapper>
            </Link>
        </ProductCardWrapper>
    );
};

export default ProductCard;
