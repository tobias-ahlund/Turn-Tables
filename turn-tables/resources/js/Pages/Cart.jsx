import React from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { urlFor } from '@/turn-table-studio/utils/sanity.client';
import DefaultLayout from '@/Layouts/DefaultLayout';
import styled from 'styled-components';

const ProductCartWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  padding: 1rem;
`;

const ProductImage = styled.img`
  max-width: 100px; 
  margin-right: 1rem;
`;

export default function Cart() {
  const { cartDetails, cartCount, totalPrice, removeItem, clearCart } = useShoppingCart();

  const handleRemoveItem = (item) => {
    removeItem(item.id);
  };

  return (
    <DefaultLayout>
      <div>
        <h1>Shopping cart</h1>
        <p>Items in Cart: {cartCount}</p>
        <p>Total Price: {totalPrice} SEK</p>

        {Object.values(cartDetails).map((item) => (
            <ProductCartWrapper key={item.id}>
              <ProductImage src={urlFor(item.image)} alt="Image of the product." />
              <div>
                <p>{item.name}</p>
                <p>Price: {item.price} SEK</p>
                <p>Total price: {item.value} SEK</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleRemoveItem(item)}>Remove from Cart</button>
              </div>
            </ProductCartWrapper>
        ))}

        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </DefaultLayout>
  );
}
