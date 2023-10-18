import styled from 'styled-components'

export const ProductsWrapper = styled.section`
    width: calc(100% - 4rem);
    margin: 2rem auto;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
    @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 800px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1600px) {
        grid-template-columns: repeat(4, 1fr);
        max-width: 1600px;
    }
`