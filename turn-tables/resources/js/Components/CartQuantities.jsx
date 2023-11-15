import styled from "styled-components";
import { useShoppingCart } from "use-shopping-cart";
import Increment from '@/public/images/Increment.svg';
import Decrement from '@/public/images/Decrement.svg';

const ProductQuantity = styled.span`
    width: 2ch;
    text-align: center;
`;

const QuantityButtonWrapper = styled.div`
    background-color: #EEE;
    border-radius: 50px;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    max-height: 32px;
    line-height: 100%;

    & > button, & > span {
        font-size: 0.75rem;
        font-weight: bold;
    }

    & img {
        width: 1rem;
        height: 1rem;
    }
`

export default function CartQuantities({ item }) {
    const { incrementItem, decrementItem, cartDetails } = useShoppingCart()

    return (
        <QuantityButtonWrapper>
            <button onClick={() => {decrementItem(item.id)}}>
                <img src={Decrement} alt="Decrement icon" />
            </button>
            <ProductQuantity>{item.quantity}</ProductQuantity>
            <button onClick={() => {incrementItem(item.id)}}>
                <img src={Increment} alt="Increment icon" />
            </button>
        </QuantityButtonWrapper>
    );
}