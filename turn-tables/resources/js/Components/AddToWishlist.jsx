import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Wishlist from '@/public/images/Wishlist.svg';
import WishlistAdded from '@/public/images/WishlistAdded.svg';
import { useWishlist } from './WishlistProvider'
import { usePage } from '@inertiajs/react'

const AddToWishlistWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const AddToWishlist = ({ productId, onRemoveFromWishlist }) => {
  const { auth } = usePage().props;
  const { wishlistItems, setWishlistItems } = useWishlist();
  const csrfToken = window.csrfToken;

  function addToWishlist() {
    if (!auth.user) {
      window.location.href = '/login';
      return;
    }

    axios
      .post(
        route('wishlist.add'),
        { product_id: productId },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
          },
        }
      )
      .then(response => {
        if (response.status === 200) {
          setWishlistItems([...wishlistItems, productId]);
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

    axios
      .post(
        route('wishlist.remove'),
        { product_id: productId },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
          },
        }
      )
      .then(response => {
        if (response.status === 200) {
          const updatedWishlist = wishlistItems.filter(item => item !== productId);
          setWishlistItems(updatedWishlist);
          if (onRemoveFromWishlist) {
            onRemoveFromWishlist(productId);
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  function updateWishlist() {
    if (wishlistItems.includes(productId)) {
      removeFromWishlist();
    } else {
      addToWishlist();
    }
  }

  return (
    <AddToWishlistWrapper onClick={updateWishlist}>
      <img
        src={wishlistItems.includes(productId) ? WishlistAdded : Wishlist}
        alt="Wishlist icon."
      />
    </AddToWishlistWrapper>
  );
};

export default AddToWishlist;
