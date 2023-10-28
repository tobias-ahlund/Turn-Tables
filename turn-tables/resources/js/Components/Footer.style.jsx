import styled from "styled-components";

const FooterWrapper = styled.footer`
    padding: 4rem 2rem;
    background-color: #f0f0f0;
    border-top: 1px solid lightgray;

    & ul {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        justify-content: flex-start;
        gap: 1rem;
        max-width: 1600px;
        margin: 0 auto;

        @media (min-width: 450px) {
            grid-template-columns: repeat(2, auto);
            column-gap: 5rem;
        }

        @media (min-width: 800px) {
            grid-template-columns: repeat(3, auto);
        }
    }
`

const footerItems = [
    "Create a user",
    "Customer service",
    "About us",
    "Social media links",
    "Shipping and returns",
    "Privacy policy",
    "Terms and conditions",
    "Sign up for newsletter"
];

const Footer = () => {
    return (
        <FooterWrapper>
            <ul>
                {footerItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </FooterWrapper>
    );
}

export default Footer;