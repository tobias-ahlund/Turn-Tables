import React from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import DefaultLayout from '@/Layouts/DefaultLayout';
import styled from 'styled-components';
import axios from 'axios';
import getStripe from "@/lib/getStripe";

const Orka = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto auto auto;
`

const HeadingWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 2rem 0 1rem 0;
	margin-right: 2rem;
    font-size: 3rem;
    line-height: 100%;
    border-bottom: 1px solid black;
    margin-bottom: 2rem;

	& h1 {
		padding: 0;
    	border-bottom: none;
    	margin-bottom: 0;
	}

	& :last-child {
		flex-grow: 1;
		text-align: end;
	}
`

const ProductsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`

const CartDetails = styled.div`
	display: flex;
	justify-content: space-between;
	margin-right: 2rem;
`

const CartCol1 = styled.div`
	display: flex;
`

const OrderSummary = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	background-color: #f7f7f7;
	padding: 2rem	;
	grid-column-start: 2;
	grid-row: 1 / span 2;
`

const OrderSumHeading = styled.div`
	padding-bottom: 1rem;
    font-size: 3rem;
    line-height: 100%;
    border-bottom: 1px solid black;
    margin-bottom: 2rem;
`

const ProductCartWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-right: 2rem;
`;

const ProductImage = styled.img`
	max-width: 100px; 
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
			<Orka>
				<HeadingWrapper>
					<h1>Shopping cart</h1>
					<h2>{cartCount} Item{cartCount > 1 && "s"}</h2>
				</HeadingWrapper>
				<ProductsWrapper>
					<CartDetails>
						<p>Product Details</p>
						<p>Quantity</p>
						<p>Price</p>
						<p>Total</p>
					</CartDetails>
					{Object.values(cartDetails).map((item) => (
						<ProductCartWrapper key={item.id}>
							<CartCol1>
								<ProductImage src={item.image} alt="Image of the product." />
								<div>
									<p>{item.name}</p>
									<button onClick={() => handleRemoveItem(item)}>Remove</button>
								</div>
							</CartCol1>
								<p>{item.quantity}</p>
								<p>{item.price}:-</p>
								<p>{item.value}:-</p>
						</ProductCartWrapper>
					))}
				</ProductsWrapper>

				{cartCount > 0 && (
					<OrderSummary>
						<OrderSumHeading>Order Summary</OrderSumHeading>
						<p>Total Cost {totalPrice}:-</p>
						<button onClick={handleCheckout}>Checkout</button>
						<p>To complete purchase in this test version, use card number 4242 4242 4242 4242.</p>
						<p>Sign in to save your order history.</p>
						{cartCount > 0 && <button onClick={clearCart}>Clear Cart</button>}
					</OrderSummary>
				)}
			</Orka>
		</DefaultLayout>
	);
}
