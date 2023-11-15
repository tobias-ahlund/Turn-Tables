import styled from "styled-components";
import Arrow from '@/public/images/ArrowDown.svg';
import { Link } from '@inertiajs/react';

const OrderSummaryWrapper = styled.div`
	display: flex;
	flex-direction: column;
	font-weight: bold;
	justify-content: flex-start;
	gap: 1rem;
    flex-grow: 1;
    max-width: 800px;

	@media (max-width: 1089px) {
		margin-top: 4rem;
        max-width: none;
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

const ContinueShopping = styled.div`
	& > a {
        display: flex;
        align-items: center;
        background-color: #EEE;
        border-radius: 50px;
        padding: 0.5rem 1rem;
        max-height: 32px;
        line-height: 100%;
        justify-content: space-between;
        cursor: pointer;
        width: fit-content;
        gap: 0.2rem;
    }

	& > a > img {
		transform: rotate(-90deg);
		width: 1.2rem;
	}
`

const PurchaseInfo = styled.span`
	border-bottom: 1px solid lightgray;
	padding-bottom: 1rem;
	font-weight: normal;
    padding-top: 1rem;
    border-top: 1px solid lightgray;
`

const OrderPrice = styled.div`
	display: flex;
	justify-content: space-between;
	border-top: 1px solid lightgray;
	padding-top: 1rem;
`

export default function OrderSummary({ handleCheckout, cartCount, totalPrice }) {
    return (
        <OrderSummaryWrapper>
            <OrderSumHeading>Cart Totals</OrderSumHeading>
            <ContinueShopping>
                <Link
                    href={route('home')}
                >
                    <span>Continue Shopping</span>
                    <img src={Arrow} alt="Arrow" />
                </Link>
			</ContinueShopping>
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
		</OrderSummaryWrapper>
    )
}