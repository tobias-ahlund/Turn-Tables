import { useShoppingCart } from "use-shopping-cart";
import styled from "styled-components";

const AddToCartWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

export const AddToCart = ({ product, cartAddedConfirmed, quantity, children }) => {
    const { addItem } = useShoppingCart();

    const handleAddToCart = () => {
        if (product) {
            addItem({
                id: product._id,
                name: product.title,
                price: product.price,
                currency: product.currency,
                image: product.image,
            },
            {
                count: quantity ? quantity : 1
            });
            cartAddedConfirmed();
        }
    };

    return (
        <AddToCartWrapper onClick={handleAddToCart}>
            {children}
        </AddToCartWrapper>
    );
};

