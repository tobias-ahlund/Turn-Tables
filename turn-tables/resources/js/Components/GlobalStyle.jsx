import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        line-height: 125%;
    }

    h1 {
        padding: 2rem 0 1rem 0;
        font-size: 3rem;
        line-height: 100%;
        border-bottom: 1px solid black;
        margin-bottom: 2rem;
    }

    h2 {
        font-size: 1.5rem;
        line-height: 100%;
    }

    main {
        width: calc(100% - 4rem);
        margin: 0 auto;
        max-width: 1600px;
        min-height: 100vh;
    }
`