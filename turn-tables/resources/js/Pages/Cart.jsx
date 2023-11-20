import React, { useState, useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import DefaultLayout from '@/Layouts/DefaultLayout';
import styled from 'styled-components';
import axios from 'axios';
import getStripe from "@/lib/getStripe";
import CartProducts from '@/Components/CartProducts';
import OrderSummary from '@/Components/OrderSummary';
import { fetchAllProducts } from "@/turn-table-studio/utils/sanity.queries";

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
	const [products, setProducts] = useState("");

	useEffect(() => {
        fetchAllProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);
	
	const { redirectToCheckout, cartDetails, cartCount, totalPrice, removeItem, clearCart } = useShoppingCart();

	const filteredProducts = Object.values(products).filter((product) => {
  		return Object.values(cartDetails).some((cartProduct) => {
    		return product._id === cartProduct.id;
  		});
	});

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
					<h1>Your Cart</h1>
					{cartCount <= 0 && <h2>Your shopping cart appears to be empty.</h2>}
			<PageContentWrapper>
				<ProductsWrapper>
  					{Object.values(cartDetails).map((item) => {
    					const product = filteredProducts.find((p) => p._id === item.id);

    					return product ? (
      						<CartProducts key={item.id} item={item} product={product} />
    					) : null;
  					})}
				</ProductsWrapper>

				{cartCount > 0 && (
					<OrderSummary totalPrice={totalPrice} cartCount={cartCount} handleCheckout={handleCheckout}/>
				)}
			</PageContentWrapper>
		</DefaultLayout>
	);
}