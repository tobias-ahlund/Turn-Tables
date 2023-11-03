import styled from 'styled-components'

export const ProductWrapper = styled.section`
    margin: 0 auto;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    gap: 2rem;

    @media (min-width: 650px) {
        grid-template-columns: repeat(2, 1fr);
        max-width: 800px;

        & > div > div:last-of-type {
            flex-grow: 1;
        }
    }

    & > div:nth-of-type(1) {
        position: relative;
        aspect-ratio: 1/1;
    }

    & div:nth-of-type(1) > div:last-of-type > img {
        margin: auto;
        width: 1.5rem;
        height: 1.5rem;
    }

    & > div > div:last-of-type {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        align-items: flex-end;
    }

    & > div > div:last-of-type div {
        background-color: #EEE;
        border-radius: 50px;
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-height: 32px;
        line-height: 100%;
    }

    & > div > div:last-of-type button, & > div > div:last-of-type span {
        font-size: 0.75rem;
        font-weight: bold;
    }

    & > div > div:last-of-type img {
        width: 1rem;
        height: 1rem;
    }

    & > div:last-of-type > p:nth-of-type(1) {
        font-size: 1.5rem;
    }

    & > div:last-of-type > p:nth-of-type(2) {
        font-size: 1rem;
    }

    & > div:last-of-type > p:nth-of-type(3) {
        font-weight: bold;
    }

    & > div > div > p {
        font-size: 0.75rem;
        color: #808080;
    }
`