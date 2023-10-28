import styled from "styled-components"

export const CategoriesWrapper = styled.div`
    display: flex;
    padding: 1rem 0 2rem 0;
    align-items: center;
    overflow: scroll;

    button {
        border-right: 1px solid black;
        padding: 0 1rem;
    }

    & div:last-child button {
        border-right: none;
    }
`;