import styled from "styled-components";
import Menu from "@/Components/Menu.style";
import ShoppingCartLink from "@/Components/ShoppingCartLink.style";
import Logo from "./Logo";
import SearchBar from "@/Components/SearchBar";
import ProfileLink from "@/Components/ProfileLink";
import WishlistLink from "@/Components/WishlistLink.style";

const HeaderWrapper = styled.header`
    background-color: #f0f0f0;
    padding: 2rem;
    border-bottom: 1px solid lightgray;

    & #headerListItems {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 1600px;
        margin: 0 auto;
        gap: 1rem;
    }

    & #headerListItems li {
        flex-shrink: 0;
    }

    & #headerListItems li img {
        width: 1.5rem;
        height: 1.5rem;
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

        & #headerListItems > li:nth-of-type(2) {
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
        <ProfileLink />,
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