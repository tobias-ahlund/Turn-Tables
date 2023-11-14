import React from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import DefaultLayout from '@/Layouts/DefaultLayout';
import styled from 'styled-components';
import axios from 'axios';
import getStripe from "@/lib/getStripe";

const PageContentWrapper = styled.div`
	margin-bottom: 4rem;
	display: flex;
	flex-direction: column;

	@media (min-width: 1050px) {
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

const ProductCartWrapper = styled.div`
	display: flex;
	gap: .5rem;
	text-align: left;

	& > div:last-child {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		align-items: flex-start;
		padding: .2rem 0;
	}
`

const ProductName = styled.span`
	font-weight: bold;
	font-size: 1.2rem;
`

const ProductInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	@media (max-width: 450px) {
		gap: 0;
	}
`

const ProductInfo = styled.div`
	display: flex;
	width: 100%;
	gap: 1rem;

	& > span:first-child {
		width: 6rem;
		text-align: left;
	}

	& > button {
		color: gray;
		font-size: .9rem;
	}

	@media (max-width: 450px) {
		& > span, & > button {
			font-size: 80%;
		}

		& > span:first-child {
			width: 4rem;
		}
	}
`

const OrderSummary = styled.div`
	display: flex;
	flex-direction: column;
	font-weight: bold;
	justify-content: flex-start;
	gap: 1rem;

	@media (max-width: 1050px) {
		margin: 4rem auto 0 auto;
	}
	
	& button {
		background-color: #2d6fa5;
		border-radius: 50px;
		padding: 1rem 1rem;
		line-height: 100%;
		color: white;
	}

	& > span:nth-of-type(2) {
		font-weight: normal;
	}
`

const OrderSumHeading = styled.div`
	padding-bottom: 1rem;
    font-size: 2rem;
    line-height: 100%;
    border-bottom: 1px solid black;
`

const PurchaseInfo = styled.span`
	border-bottom: 1px solid lightgray;
	padding-bottom: 1rem;
	font-weight: normal;
`

const OrderPrice = styled.div`
	display: flex;
	justify-content: space-between;
	border-top: 1px solid lightgray;
	padding-top: 1rem;
`

const ProductImage = styled.img`
	max-width: 150px; 
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
					<h1>Shopping Cart</h1>
			<PageContentWrapper>
				<ProductsWrapper>
					{Object.values(cartDetails).map((item) => (
						<ProductCartWrapper key={item.id}>
								<ProductImage src={item.image} alt="Image of the product." />
								<div>
									<ProductName>{item.name}</ProductName>
									<ProductInfoWrapper>
										<ProductInfo>
											<span>Price:</span>
											<span>{item.price} kr</span>
										</ProductInfo>
										<ProductInfo>
											<span>Total Price:</span> 
											<span>{item.value} kr</span>
										</ProductInfo>
										<ProductInfo>
											<span>Quantity:</span>
											<span>{item.quantity}</span>
										</ProductInfo>
										<ProductInfo>
											<button onClick={() => handleRemoveItem(item)}>Remove</button>
										</ProductInfo>
									</ProductInfoWrapper>
								</div>
						</ProductCartWrapper>
					))}
				</ProductsWrapper>

				{cartCount > 0 && (
					<div>
					<OrderSummary>
						<OrderSumHeading>Order Summary</OrderSumHeading>
						<PurchaseInfo>To complete purchase in this test version, use card number 4242 4242 4242 4242.</PurchaseInfo>
						<span>Sign in to save your order history.</span>
						<OrderPrice>
							<p>Item{cartCount > 1 && "s"}</p>
							<p>{cartCount}</p>
						</OrderPrice>
						<OrderPrice>
							<p>Total Cost</p> 
							<p>{totalPrice} kr</p>
						</OrderPrice>
						<button onClick={handleCheckout}>Checkout</button>
					</OrderSummary>
					</div>
				)}
			</PageContentWrapper>
		</DefaultLayout>
	);
}