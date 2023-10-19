import styled from "styled-components";

const FooterWrapper = styled.footer`
    background-color: lightgray;
    padding: 2rem;
    & ul {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        justify-content: center;
        @media (min-width: 450px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 800px) {
            grid-template-columns: repeat(3, 1fr);
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