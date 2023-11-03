import styled from 'styled-components';
import { urlFor } from '@/turn-table-studio/utils/sanity.client';
import { AddToCart } from './AddToCart';
import { AddToWishlist } from './AddToWishlist';
import Check from '@/public/images/Check.svg';
import ShoppingCart from '@/public/images/ShoppingCart.svg';
import Wishlist from '@/public/images/Wishlist.svg';
import WishlistAdded from '@/public/images/WishlistAdded.svg';
import { useState } from 'react';

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
        transition: transform .5s ease-in-out;
    }

    a > img:hover {
        transform: scale(1.1);
    }
`

const ProductInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0.5rem 0 0.5rem;
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

const ProductCardWrapper = styled.article`
`;

const ProductCard = ({ product, showAddToCart, showAddToWishlist, wishlistUpdated, updateWishlist }) => {

    const [cartImage, setCartImage] = useState(null);
    
    const cartAddedConfirmed = () => {
        setCartImage(product._id);
    
        setTimeout(() => {
          setCartImage(null);
        }, 2000);
      };

    const addToWishlist = (productId) => {
        updateWishlist([...wishlistUpdated, productId]);
    };

    const removeFromWishlist = (productId) => {
        updateWishlist(wishlistUpdated.filter((item) => item !== productId));
    };

    return (
        <ProductCardWrapper>
            <ImagesWrapper>
            <a
                href={`/products${product.subcategory?.slug?.current}${product.subcategory?.slug?.current}${product.slug?.current}`}
            >
                <img src={urlFor(product.image)} alt="Picture of the product." />
            </a>
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
                    removeFromWishlist={() => removeFromWishlist(product._id)}
                    addToWishlist={() => addToWishlist(product._id)}
                    isWishlistItem={wishlistUpdated.includes(product._id)}
                    >
                    <img
                        src={wishlistUpdated.includes(product._id) ? WishlistAdded : Wishlist}
                        alt="Wishlist icon."
                    />
                    </AddToWishlist>
                )}
            </div>
            </ImagesWrapper>
            <a 
                href={`/products${product.subcategory?.slug?.current}${product.subcategory?.slug?.current}${product.slug?.current}`}
            >
                <ProductInfoWrapper>
                    <p>{product.title}</p>
                    <p>{product.price}:-</p>
                </ProductInfoWrapper>
            </a>
        </ProductCardWrapper>
    );
};

export default ProductCard;
