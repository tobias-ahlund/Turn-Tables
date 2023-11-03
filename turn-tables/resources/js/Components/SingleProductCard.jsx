import styled from 'styled-components';
import { urlFor } from '@/turn-table-studio/utils/sanity.client';
import { AddToWishlist } from './AddToWishlist';
import Wishlist from '@/public/images/Wishlist.svg';
import WishlistAdded from '@/public/images/WishlistAdded.svg';

const ImageWrapper = styled.div`
    aspect-ratio: 1/1;
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

const SingleProductCardWrapper = styled.div`
`;

const SingleProductCard = ({ product, showAddToWishlist, wishlistUpdated, updateWishlist }) => {
    const addToWishlist = (productId) => {
        updateWishlist([...wishlistUpdated, productId]);
    };

    const removeFromWishlist = (productId) => {
        updateWishlist(wishlistUpdated.filter((item) => item !== productId));
    };

    return (
        <SingleProductCardWrapper>
            <ImageWrapper>
                <img src={urlFor(product.image)} alt="Picture of the product." />
                <div>
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
            </ImageWrapper>
                <div>
                </div>
        </SingleProductCardWrapper>
    );
};

export default SingleProductCard;
