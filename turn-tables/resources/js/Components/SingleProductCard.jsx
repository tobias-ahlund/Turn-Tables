import styled from 'styled-components';
import { urlFor } from '@/turn-table-studio/utils/sanity.client';
import { AddToWishlist } from './AddToWishlist';

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

const SingleProductCard = ({ product, showAddToWishlist }) => {

    return (
        <SingleProductCardWrapper>
            <ImageWrapper>
                <img src={urlFor(product.image)} alt="Picture of the product." />
                <div>
                    {showAddToWishlist && (
                        <AddToWishlist
                            productId={product._id}>
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
