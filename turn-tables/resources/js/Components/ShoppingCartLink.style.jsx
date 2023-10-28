import { Link } from '@inertiajs/react';
import ShoppingCart from "@/public/images/ShoppingCart.svg";
import styled from 'styled-components';
import { useShoppingCart } from 'use-shopping-cart';

const CartWrapper = styled.div`
    position: relative;
`

const CartQuant = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    background-color: #2d6fa5;
    padding: 0.55rem;
    height: 1rem;
    width: 1rem;
    display: flex;
    border-radius: 100%;
    justify-content: center;
    transform: translate(35%, -35%);

    & > p {
        color: white;
        margin: auto;
        line-height: 0;
        font-size: 0.75rem;
    }
`

export default function ShoppingCartLink() {
    
    const { cartCount } = useShoppingCart();
    
    return (
        <Link
            href={route('cart')}
        >
            <CartWrapper>
                <img src={ShoppingCart} alt="Shopping cart icon" />
                {cartCount > 0 && <CartQuant>
                    <p>{cartCount}</p>
                </CartQuant>}
            </CartWrapper>
        </Link>
    );
}