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

    & > div:nth-of-type(1) {
        position: relative;
    }

    & div:first-child > div:last-of-type {
        position: absolute;
        right: 0;
        bottom: 0;
        background-color: white;
        border-radius: 100%;
        height: 2.5rem;
        width: 2.5rem;
        display: flex;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        margin: 0.75rem;
    }

    & div:nth-of-type(1) > div:last-of-type > img {
        margin: auto;
        width: 1.5rem;
        height: 1.5rem;
    }

    & > div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-start;
    }

    & > div > div:last-of-type {
        display: flex;
        justify-content: flex-end;
        flex-grow: 1;
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
    }

    & > div > div:last-of-type button, & > div > div:last-of-type span {
        font-size: 0.75rem;
        font-weight: bold;
    }

    & > div > div:last-of-type img {
        width: 0.75rem;
        height: 0.75rem;
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