import styled from "styled-components";

const HeaderWrapper = styled.header`
    background-color: lightgray;
    padding: 2rem;
    & ul {
        display: flex;
        justify-content: space-around;
    }
`

const headerItems = [
    "Turn Tables",
    "Saved items",
    "Shopping cart",
    "Hamburger menu",
    "Search bar",
];

const Header = () => {
    return (
        <HeaderWrapper>
            <ul>
                {headerItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </HeaderWrapper>
    );
}

export default Header;