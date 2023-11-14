import styled from "styled-components";

const OrderSummaryWrapper = styled.div`
	display: flex;
	flex-direction: column;
	font-weight: bold;
	justify-content: flex-start;
	gap: 1rem;

	@media (max-width: 1089px) {
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

export default function OrderSummary({ handleCheckout, cartCount, totalPrice }) {
    return (
        <OrderSummaryWrapper>
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
		</OrderSummaryWrapper>
    )
}