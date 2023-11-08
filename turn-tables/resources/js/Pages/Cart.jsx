import React from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import DefaultLayout from '@/Layouts/DefaultLayout';
import styled from 'styled-components';
import axios from 'axios';
import getStripe from "@/lib/getStripe";

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
	const { redirectToCheckout, cartDetails, cartCount, totalPrice, removeItem, clearCart } = useShoppingCart();

	const handleRemoveItem = (item) => {
	removeItem(item.id);
	};

	async function handleCheckout() {
		const stripe = await getStripe();

		const lineItems = Object.values(cartDetails).map((product) => ({
			"price_data": {
				"currency": product.currency,
				"unit_amount": product.price * 100,
				"product_data": {
					"name": product.name,
					"images": [
						product.image,
					],
				},
			},
			"quantity": product.quantity,
		}));

		try {
			const response = await axios.post('/create-session', { lineItems }, {
				headers: {
				'Content-Type': 'application/json',
				'X-CSRF-TOKEN': csrfToken,
				},
			});

			if (response.status === 200) {				
				const { error } = await stripe.redirectToCheckout({
					sessionId: response.data.sessionId,
				});

				if (error) {
				console.error(error.message);
				}
			} else {
				console.error('Error creating session. Status:', response.status);
			}
			} catch (error) {
				console.error("Error creating session:", error);
			}
		}

	return (
		<DefaultLayout>
			{cartCount > 0 && (
				<>
				<button onClick={handleCheckout}>Checkout</button>
				<p>To complete purchase in this test version, use card number 4242 4242 4242 4242.</p>
				</>
			)}
			<div>
			<h1>Shopping cart</h1>
			<p>Items in Cart: {cartCount}</p>
			<p>Total Price: {totalPrice} SEK</p>

			{Object.values(cartDetails).map((item) => (
				<ProductCartWrapper key={item.id}>
					<ProductImage src={item.image} alt="Image of the product." />
					<div>
					<p>{item.name}</p>
					<p>Price: {item.price} SEK</p>
					<p>Total price: {item.value} SEK</p>
					<p>Quantity: {item.quantity}</p>
					<button onClick={() => handleRemoveItem(item)}>Remove from Cart</button>
					</div>
				</ProductCartWrapper>
			))}

			{cartCount > 0 && <button onClick={clearCart}>Clear Cart</button>}
			</div>
		</DefaultLayout>
	);
}
