import React from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import DefaultLayout from '@/Layouts/DefaultLayout';
import styled from 'styled-components';
import axios from 'axios';
import getStripe from "@/lib/getStripe";
import CartProducts from '@/Components/CartProducts';
import OrderSummary from '@/Components/OrderSummary';

const PageContentWrapper = styled.div`
	margin-bottom: 4rem;
	display: flex;
	flex-direction: column;

	@media (min-width: 1090px) {
		flex-direction: row;
		gap: 4rem;
		justify-content: space-between;
	}
`

const ProductsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	max-width: 800px;
`

export default function Cart() {
	const { redirectToCheckout, cartDetails, cartCount, totalPrice, removeItem, clearCart } = useShoppingCart();

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
				
				axios.post(route('store.order'), { cart_details: cartDetails, total_price: totalPrice }, {
					headers: {
					  'Content-Type': 'application/json',
					  'X-CSRF-TOKEN': csrfToken,
					}
				});

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

		console.log(cartDetails);

	return (
		<DefaultLayout>
					<h1>Your Cart</h1>
					{cartCount <= 0 && <p>Your shopping cart appears to be empty.</p>}
			<PageContentWrapper>
				<ProductsWrapper>
					{Object.values(cartDetails).map((item) => (
						<CartProducts key={item.id} item={item} />
					))}
				</ProductsWrapper>

				{cartCount > 0 && (
					<OrderSummary totalPrice={totalPrice} cartCount={cartCount} handleCheckout={handleCheckout}/>
				)}
			</PageContentWrapper>
		</DefaultLayout>
	);
}