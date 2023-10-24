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

    #prodInfoWrapper {
        display: flex;
        flex-direction: column;
        padding: 0.5rem 0.5rem 0 0.5rem;
        align-items: center;
    }
    #prodInfoWrapper p:first-of-type {
        font-size: 1.25rem;
        padding-bottom: 0.5rem;
    }

    #prodInfoWrapper p:last-of-type {
        font-size: 1rem;
        font-weight: bold;
    }

    #imagesWrapper {
        position: relative;
    }

    #imagesWrapper > div:first-of-type {
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 0.5rem;
        display: flex;
    }

    #imagesWrapper > div > div {
        background-color: white;
        border-radius: 100%;
        height: 2.5rem;
        width: 2.5rem;
        display: flex;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }

    #imagesWrapper > div > div:first-child {
        margin-right: 1rem;
    }

    #imagesWrapper > div > div > img {
        width: 1.5rem;
        height: 1.5rem;
        margin: auto;
    }
`