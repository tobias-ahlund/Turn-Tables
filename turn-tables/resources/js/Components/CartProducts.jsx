import styled from "styled-components"

const ProductCartWrapper = styled.div`
	display: flex;
	gap: .5rem;
	text-align: left;

	& > div:last-child {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		align-items: flex-start;
		padding: .2rem 0;
	}
`

const ProductImage = styled.img`
	max-width: 150px; 
`;

const ProductName = styled.span`
	font-weight: bold;
	font-size: 1.2rem;
`

const ProductInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	@media (max-width: 450px) {
		gap: 0;
	}
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

export default function CartProducts({ item, handleRemoveItem }) {
    return (
        <ProductCartWrapper key={item.id}>
            <ProductImage src={item.image} alt="Image of the product." />
            <div>
                <ProductName>{item.name}</ProductName>
                <ProductInfoWrapper>
                    <ProductInfo>
                        <span>Price:</span>
                        <span>{item.price} kr</span>
                    </ProductInfo>
                    <ProductInfo>
                        <span>Total Price:</span> 
                        <span>{item.value} kr</span>
                    </ProductInfo>
                    <ProductInfo>
                        <span>Quantity:</span>
                        <span>{item.quantity}</span>
                    </ProductInfo>
                    <ProductInfo>
                        <button onClick={() => handleRemoveItem(item)}>Remove</button>
                    </ProductInfo>
                </ProductInfoWrapper>
            </div>
        </ProductCartWrapper>
	)
}