import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WishlistContext = createContext();

export const WishlistProvider = ({ children, auth }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistFetched, setWishlistFetched] = useState(false);

  useEffect(() => {
    if (!wishlistFetched) {
      axios
        .get('/api/wishlist')
        .then(response => {
          const wishlistItems = response.data.productIds;
          setWishlistItems(wishlistItems);
          setWishlistFetched(true);
        })
        .catch(error => {
          console.error('Error fetching wishlist items', error);
        });
    }
  }, [auth, wishlistFetched]);

  return (
    <WishlistContext.Provider value={{ wishlistItems, setWishlistItems }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
