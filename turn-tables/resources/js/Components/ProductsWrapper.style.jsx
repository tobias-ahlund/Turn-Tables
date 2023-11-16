import styled from 'styled-components'

export const ProductsWrapper = styled.section`
    margin: 0 auto 2rem;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 3rem;
    max-width: 1600px;

    @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 800px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1600px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;