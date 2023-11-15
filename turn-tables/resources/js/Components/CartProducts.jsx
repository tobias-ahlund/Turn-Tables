import styled from "styled-components"
import CartQuantities from "./CartQuantities";

const ProductCartWrapper = styled.div`
	display: flex;
	gap: .5rem;
	text-align: left;

	& > div:last-child {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

    & > div:last-child div:last-child {
        margin-top: auto;
    }
`

const ProductImage = styled.img`
	max-width: 150px; 
`;

const ProductName = styled.span`
	font-weight: bold;
	font-size: 1.2rem;
    margin-bottom: .5rem;
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

export default function CartProducts({ item }) {
    return (
        <ProductCartWrapper key={item.id}>
            <ProductImage src={item.image} alt="Image of the product." />
            <div>
                <ProductName>{item.name}</ProductName>
                    <ProductInfo>
                        <span>Price:</span>
                        <span>{item.price} kr</span>
                    </ProductInfo>
                    <ProductInfo>
                        <span>Total Price:</span> 
                        <span>{item.value} kr</span>
                    </ProductInfo>
                    <ProductInfo>
                        <CartQuantities item={item} />
                    </ProductInfo>
            </div>
        </ProductCartWrapper>
	)
}