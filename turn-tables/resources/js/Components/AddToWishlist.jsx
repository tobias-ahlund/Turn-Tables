import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { usePage } from '@inertiajs/react'
import Wishlist from '@/public/images/Wishlist.svg';
import WishlistAdded from '@/public/images/WishlistAdded.svg';

const AddToWishlistWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

export const AddToWishlist = ({ productId, onRemoveFromWishlist }) => {
    const { auth } = usePage().props
    const [inWishlist, setInWishlist] = useState(false);
    const [wishlistItems, setWishlistItems] = useState([]);
    const csrfToken = window.csrfToken;

    useEffect(() => {
        if (auth.user) {
        axios.get('/api/wishlist')
            .then(response => {
                const wishlistItems = response.data.productIds;
                setInWishlist(wishlistItems.includes(productId));
                setWishlistItems(wishlistItems);
            })
            .catch(error => {
                console.error('Error fetching wishlist items', error);
            });
        }
    }, [productId]);

    function addToWishlist() {
        if (!auth.user) {
            window.location.href = '/login';
            return;
        }

        axios.post(route('wishlist.add'), { product_id: productId }, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
        })
        .then(response => {
            if (response.status === 200) {
                setInWishlist(true);
                setWishlistItems([...wishlistItems, productId]);
                console.log("Added to wishlist!");
            } else {
                console.error('Error adding product to wishlist');
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    function removeFromWishlist() {
        if (!auth.user) {
            window.location.href = '/login';
            return;
        }

        axios.post(route('wishlist.remove'), { product_id: productId }, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
        })
        .then(response => {
            if (response.status === 200) {
                setInWishlist(false);
                const updatedWishlist = wishlistItems.filter(item => item !== productId);
                setWishlistItems(updatedWishlist);
                console.log("Removed from wishlist!");

                if (onRemoveFromWishlist) {
                    onRemoveFromWishlist(productId);
                }
            } else {
                console.error('Error removing product from wishlist');
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    function updateWishlist() {
        if (inWishlist) {
            removeFromWishlist();
        } else {
            addToWishlist();
        }
    }

    return (
        <AddToWishlistWrapper onClick={updateWishlist}>
            <img 
                src={wishlistItems.includes(productId) ? WishlistAdded : Wishlist} 
                alt="Wishlist icon.">
            </img>
        </AddToWishlistWrapper>
    );
};
