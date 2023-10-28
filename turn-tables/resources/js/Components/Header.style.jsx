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
        align-items: center;
        justify-content: center;
        max-width: 1600px;
        margin: 0 auto;
    }

    & #headerListItems li {
        flex-shrink: 0;
    }

    & #headerListItems li:nth-of-type(2) {
        flex: 1 1 auto;
    }

    @media (max-width: 800px) {
        & #headerListItems {
            flex-wrap: wrap;
            justify-content: flex-end;
            gap: 1rem;
        }

        & #headerListItems li:nth-of-type(2) {
            order: 6;
            min-width: 100%;
        }

        & #headerListItems li:nth-of-type(1) {
            flex-grow: 1;
        }
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