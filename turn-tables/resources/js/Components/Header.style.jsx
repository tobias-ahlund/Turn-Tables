import styled from "styled-components";
import Menu from "@/Components/Menu.style";
import ShoppingCartLink from "@/Components/ShoppingCartLink.style";
import Logo from "./Logo";
import SearchBar from "@/Components/SearchBar";
import User from "@/public/images/User.svg";
import WishlistLink from "@/Components/WishlistLink.style";

const HeaderWrapper = styled.header`
    background-color: lightgray;
    padding: 2rem;
    & #headerListItems {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
`

const Header = () => {
    const headerItems = [
        <Logo />,
        <SearchBar />,
        User,
        <ShoppingCartLink />,
        <WishlistLink />,
        <Menu />,
    ];

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