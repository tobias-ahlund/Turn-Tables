import { useState } from "react";
import styled from "styled-components";
import ArrowDown from '@/public/images/ArrowDown.svg';

const PreviousOrderCardWrapper = styled.div`
    background-color: #EEE;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: ${({ open }) => (open ? '20px' : `50px`)};
    cursor: pointer;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    gap: .2rem;
    height: auto;
`

const ArrowDownIcon = styled.img`
    width: 1rem;
    height: 1rem;
    transform: rotate(${props => props.open ? "180deg" : "0"});
`

const PreviousOrderCardDropdown = styled.div`
    padding: 1.5rem;
    z-index: 10;
    cursor: default;
    width: 100%;
    height: 100%;
`

const ViewMoreContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;

    div {
        display: flex;
        align-items: center;
        gap: 0.3rem;
    }
`

const ProductImage = styled.img`
	max-height: 250px;
	margin-right: 1rem;
`;

const ProductCard = styled.div`
    display: flex;
	margin-bottom: 1rem;
	border-bottom: 1px solid #ccc;
	padding: 1rem;

    @media (max-width: 650px) {
        flex-direction: column;
        gap: 0.3rem;
    }
`

const ProductDescription = styled.div`
    display: flex;
    flex-direction: column;
`

export default function PreviousOrderCard({ previousOrders, products }) {
    const [open, setOpen] = useState(false);

    function handleClick() {
        setOpen(!open);
    }

    const getProductTitle = (productId) => {
        const product = products.find(product => product._id === productId);
        return product ? product.title : 'Product Title Not Found';
    };

    const getProductImage = (productId) => {
        const product = products.find(product => product._id === productId);
        return product ? product.image : 'Product Image Not Found';
    }

    const formattedDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <PreviousOrderCardWrapper open={open} onClick={handleClick}>
            <ViewMoreContainer>
                <p>Order id: {previousOrders[0].order_id}</p>
                <div>
                    <p>View more</p>
                    <ArrowDownIcon src={ArrowDown} alt="Arrow down icon."></ArrowDownIcon>
                </div>
            </ViewMoreContainer>
            {open && (
                <PreviousOrderCardDropdown>
                    {previousOrders.map(individualOrder => (
                        <ProductCard key={individualOrder.id}>
                            <ProductImage
                                src={getProductImage(individualOrder.product_id)} 
                                alt="Image of the product.">
                            </ProductImage>
                            <ProductDescription>
                            <p>Title: {getProductTitle(individualOrder.product_id)}</p>
                            <p>Quantity: {individualOrder.quantity}</p>
                            <p>Total Price: {individualOrder.price}</p>
                            </ProductDescription>
                        </ProductCard>
                    ))}
                    <p>Subtotal: {previousOrders[0].price} kr</p>
                    <p>Delivery: 0 kr</p>
                    <p>Total: {previousOrders[0].price} kr</p>
                    <p>Order Placed At: {formattedDate(previousOrders[0].created_at)}</p>
                    <p>Payment Method: Card</p>
                </PreviousOrderCardDropdown>
            )}
        </PreviousOrderCardWrapper>
    );
}