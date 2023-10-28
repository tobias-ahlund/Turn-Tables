import styled from 'styled-components'

export const ProductsWrapper = styled.section`
    margin: 0 auto 2rem;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
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
        cursor: pointer;
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

    #imagesWrapper a > img {
        transition: transform .5s ease-in-out;
    }

    a {
        overflow: hidden;
        display: block;
    }

    a > img:hover {
        transform: scale(1.1);
    }
`