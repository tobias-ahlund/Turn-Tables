import styled from "styled-components"

export const BreadcrumbsWrapper = styled.div`
    font-size: 0.8rem;
    margin: .5rem auto;
    margin-top: ${props => props.$singleProduct ? "2rem" : "0"};
    margin-bottom: ${props => !props.$singleProduct && "2rem"};

    @media (min-width: 500px) {
        ${props => props.$singleProduct && "max-width: 800px"};
    }
`