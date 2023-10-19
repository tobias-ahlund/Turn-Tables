import styled from "styled-components";
import Wishlist from "@/public/images/Wishlist.svg";
import Menu from "@/Components/Menu.style";
import ShoppingCart from "@/public/images/ShoppingCart.svg";
import Logo from "./Logo";

const HeaderWrapper = styled.header`
    background-color: lightgray;
    padding: 2rem;
    & #headerListItems {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
`

const headerItems = [
    <Logo />,
    "Search bar",
    ShoppingCart,
    Wishlist,
    <Menu />,
];

const Header = () => {
    return (
        <HeaderWrapper>
            <ul id="headerListItems">
                {headerItems.map((item, index) => (
                    <li key={index}>
                        {typeof item === "string" && item.includes("svg") ? (
                            <img src={item} alt={item} />
                        ) : (
                            item
                        )}
                    </li>
                ))}
            </ul>
        </HeaderWrapper>
    );
}

export default Header;