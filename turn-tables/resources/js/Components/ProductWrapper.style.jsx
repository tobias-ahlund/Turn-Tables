import styled from 'styled-components'

export const ProductWrapper = styled.section`
    width: calc(100% - 4rem);
    margin: 2rem auto;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    gap: 2rem;
    @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
        max-width: 800px;
    }
`