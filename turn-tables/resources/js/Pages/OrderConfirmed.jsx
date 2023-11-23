import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link } from '@inertiajs/react';
import { useShoppingCart } from 'use-shopping-cart';
import { useState, useEffect } from "react";
import styled from "styled-components";

const OrderConfirmedWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 400px;

    & > h2, & > span {
        text-align: center;
    }
`

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
    const [orderDetails, setOrderDetails] = useState("");
    const [totalOrderPrice, setTotalOrderPrice] = useState("");
    const [order, setOrder] = useState([]);
    const [priceOrder, setPriceOrder] = useState(0);

    function storeOrder() { axios.post(route('store.order'), { cart_details: cartDetails, total_price: totalPrice }, 
        {
            headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
            }
        });
    }

    useEffect(() => {
        setOrder(cartDetails);
        setPriceOrder(totalPrice);
        storeOrder();

        clearCart();
    }, []);

    const { totalPrice, clearCart, cartDetails } = useShoppingCart();

    useEffect(() => {
        const storedOrderDetails = JSON.parse(sessionStorage.getItem("orderDetailsStorage"));
        const storedTotalPrice = JSON.parse(sessionStorage.getItem("totalPriceStorage")); 

        if (Object.keys(cartDetails).length > 0) {
            sessionStorage.setItem("orderDetailsStorage", JSON.stringify(cartDetails));
        }

        if (totalPrice) {
            sessionStorage.setItem("totalPriceStorage", JSON.stringify(totalPrice));
        }

        setOrderDetails(storedOrderDetails);
        setTotalOrderPrice(storedTotalPrice);

        clearCart();
        
    }, [totalOrderPrice]);

    return (
        <DefaultLayout>
            <h1>Order confirmed</h1>
            <OrderConfirmedWrapper>
                {orderDetails ? 
                    <><h2>Order no. 1234567</h2>
                    <span>01/01/2034</span>

                    {Object.values(orderDetails).map((item) => (
                        <ProductSummaryWrapper key={item.id}>
                            <ProductImage src={item.image} alt="Image of the product." />
                            <div>
                                <p>{item.name}</p>
                                <p>Price: {item.price} kr</p>
                                <p>Total price: {item.value} kr</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        </ProductSummaryWrapper>
                    ))}

                    <p>Subtotal: {totalOrderPrice} kr</p>
                    <p>Delivery: 0 kr</p>
                    <p>Total: {totalOrderPrice} kr</p>

                    <p>Payment Method: Card</p></>
                :
                    <p>It appears that the details for your order have disappeared from this page.
                    <br /><br />
                    If you made the order while logged in, you will find the details stored in your profile page. Simply log in and navigate to your profile to access your order history.
                    <br /><br />
                    Additionally, all orders come with a confirmation email containing all the important details.
                    <br /><br /></p>
                }

                <Link
                    href={route('home')}
                >
                    <button>Go to the home page</button>
                </Link>
            </OrderConfirmedWrapper>
        </DefaultLayout>
    );
}