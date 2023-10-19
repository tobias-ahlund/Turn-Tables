import styled from "styled-components";
import Wishlist from "@/public/images/Wishlist.svg";
import Menu from "@/Components/Menu.style";
import ShoppingCart from "@/public/images/ShoppingCart.svg";
import Logo from "./Logo";
import SearchBar from "@/Components/SearchBar";

const HeaderWrapper = styled.header`
    background-color: lightgray;
    padding: 2rem;
    & #headerListItems {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
`

const Header = ({ onSearch }) => {
    const headerItems = [
        <Logo />,
        <SearchBar onSearch={onSearch}/>,
        ShoppingCart,
        Wishlist,
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