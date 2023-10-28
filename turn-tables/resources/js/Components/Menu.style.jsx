import Hamburger from "@/public/images/Hamburger.svg";
import styled, { useTheme } from "styled-components";
import { useState } from "react";
import { Link } from '@inertiajs/react';
import Close from '@/public/images/Close.svg';

const MenuWrapper = styled.div`
    display: flex;
    position: relative;

    & button {
        z-index: 101;
    }
`

const CloseButtonWrapper = styled.div`
    display: flex;
    cursor: pointer;
    position: absolute;
    margin: 2rem;
    top: 0;
    right: 0;

    img {
        margin: auto;
        transform: rotate(45deg);
    }
`;

const MenuWindow = styled.div`
    & > div:last-of-type {
        position: fixed;
        z-index: 99;
        right: 0;
        top: 0;
        left: 0;
        bottom: 0;
        background-color: black;
        transition: all .3s ease-in-out;
        opacity: ${props => props.open ? ".6" : "0"};
        pointer-events: ${props => props.open ? "all" : "none"};
    }

    & > div:first-of-type {
        z-index: 100;
        background-color: #f0f0f0;
        border-right: 1px solid lightgray;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 400px;
        transform: translateX(${props => (props.open ? "0" : "-100%")});
        transition: transform .3s ease-in-out;
    }

    & ul {
        display: flex;
        flex-direction: column;
        font-size: 1.5rem;
        align-items: flex-start;
        margin-top: 4rem;
        line-height: 125%;
        gap: 1rem;
        padding: 0 2rem;
    }

    & ul li:hover {
        text-decoration: underline;
    }

    & ul li:first-child {
        font-weight: bold;
    }

    & ul li:hover {

    }
`

const Menu = () => {
    const [showMenu, setShowMenu] = useState(false)

    const categories = [
        "All products",
        "Furniture",
        "Lighting",
        "Decoration"
    ]

    const categoriesLowerCase = categories.map(category => category.toLowerCase());

    function handleToggleMenu() {
        setShowMenu(!showMenu);
    }

    return (
        <MenuWrapper>
            <button onClick={() => handleToggleMenu()}>
                <img src={Hamburger} alt="Hamburger menu icon" />
            </button>
            <MenuWindow open={showMenu}>
                <div>
                    <CloseButtonWrapper onClick={() => handleToggleMenu()}>
                        <img src={Close} alt="close button" />
                    </CloseButtonWrapper>
                    <ul>
                        {categoriesLowerCase.map((category, index) =>
                            <li key={index}>
                                <Link
                                    href={category !== "all products" ? route('products.category', { categorySlug: category }) : route('products')}
                                >
                                    {categories[index]}
                                </Link>
                                <br />
                            </li>
                        )}
                    </ul>
                </div>
                <div></div>
            </MenuWindow>
        </MenuWrapper>
    );
}

export default Menu