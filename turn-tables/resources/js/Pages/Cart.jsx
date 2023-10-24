import React from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { urlFor } from '@/turn-table-studio/utils/sanity.client';
import DefaultLayout from '@/Layouts/DefaultLayout';

export default function Cart() {
  const { cartDetails, cartCount, totalPrice, removeItem, clearCart } = useShoppingCart();

  const handleRemoveItem = (item) => {
    removeItem(item.id);
  };

  return (
    <DefaultLayout>
      <div>
        <h2>Shopping Cart</h2>
        <p>Items in Cart: {cartCount}</p>
        <p>Total Price: {totalPrice} SEK</p>

        {Object.values(cartDetails).map((item) => (
            <div key={item.id}>
                <p>{item.name}</p>
                <p>Price: {item.price} SEK</p>
                <img src={urlFor(item.image)} alt="Image of the product." />
                <button onClick={() => handleRemoveItem(item)}>Remove from Cart</button>
            </div>
        ))}

        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </DefaultLayout>
  );
}
