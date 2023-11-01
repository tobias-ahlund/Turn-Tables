import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';

const AddToWishlistWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

export const AddToWishlist = ({ children, productId, isWishlistItem, addToWishlist, removeFromWishlist }) => {
    const [inWishlist, setInWishlist] = useState(isWishlistItem);
    const csrfToken = window.csrfToken;

    useEffect(() => {
        setInWishlist(isWishlistItem);
    }, [isWishlistItem]);

    function updateWishlist() {
        const data = {
            product_id: productId,
        };

        if (inWishlist) {
            axios
                .post(route('wishlist.remove'), data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        setInWishlist(false);
                        console.log("Removed from wishlist!");
                        removeFromWishlist();
                    } else {
                        console.error('Error removing product from wishlist');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            axios
                .post(route('wishlist.add'), data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        setInWishlist(true);
                        console.log("Added to wishlist!");
                        addToWishlist();
                    } else {
                        console.error('Error adding product to wishlist');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    return (
        <AddToWishlistWrapper onClick={updateWishlist}>
            {children}
        </AddToWishlistWrapper>
    );
};
