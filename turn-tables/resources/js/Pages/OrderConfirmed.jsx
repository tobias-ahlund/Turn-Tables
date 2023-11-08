import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link } from '@inertiajs/react';
import { useShoppingCart } from 'use-shopping-cart';
import { useState, useEffect } from "react";
import styled from "styled-components";

const ProductSummaryWrapper = styled.div`
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

export default function OrderConfirmed() {
    const [order, setOrder] = useState("");
    const [priceOrder, setPriceOrder] = useState("");

    useEffect(() => {
        setOrder(cartDetails);
        setPriceOrder(totalPrice);

        clearCart();
    }, []);

    const { totalPrice, clearCart, cartDetails } = useShoppingCart();

    return (
        <DefaultLayout>
            <h1>Order summary</h1>
            {priceOrder > 0 && <p>Total price: {priceOrder} SEK</p>}

			{Object.values(order).map((item) => (
				<ProductSummaryWrapper key={item.id}>
					<ProductImage src={item.image} alt="Image of the product." />
					<div>
                        <p>{item.name}</p>
                        <p>Price: {item.price} SEK</p>
                        <p>Total price: {item.value} SEK</p>
                        <p>Quantity: {item.quantity}</p>
					</div>
				</ProductSummaryWrapper>
			))}

            <Link
                href={route('home')}
            >
                <button>Got it!</button>
            </Link>
        </DefaultLayout>
    );
}