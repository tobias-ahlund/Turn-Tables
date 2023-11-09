import Hamburger from "@/public/images/Hamburger.svg";
import styled from "styled-components";
import { useState } from "react";
import { Link } from '@inertiajs/react';
import Close from '@/public/images/Close.svg';
import Logo from "@/components/Logo";
import { usePage } from '@inertiajs/react'

const MenuWrapper = styled.div`
    display: flex;

    & button {
        z-index: ${props => props.open ? "0" : "101"};
    }
`

const CloseButtonWrapper = styled.div`
    cursor: pointer;

    img {
        margin: auto;
        transform: rotate(45deg);
    }
`;

const LogoCloseButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 0 1rem 0;
    border-bottom: 1px solid black;
    margin: 0 2rem;

    & div {
        display: flex;
        align-items: center;
    }
`;

const MenuWindow = styled.div`
    & > div > div:nth-of-type(2) {
        color: red;
        display: inline-block;
        margin: 2rem 0 0 2rem;
        display: flex;
    }

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

    @media (max-width: 400px) {
        & > div:first-of-type {
            width: 100%;
            border: none;
        }

        & > div:last-of-type, & button {
            display: none;
        }
    }

    & ul {
        display: flex;
        flex-direction: column;
        font-size: 1.5rem;
        align-items: flex-start;
        margin-top: 1rem;
        line-height: 125%;
        gap: 1rem;
        padding: 0 2rem;
    }

    & ul li {
        position: relative;
        color: #000;
        text-decoration: none;
    }

    & ul li:hover {
        color: #000;
    }

    & ul li::before {
        content: "";
        position: absolute;
        display: block;
        width: 100%;
        height: 1.5px;
        bottom: 0;
        left: 0;
        background-color: #000;
        transform: scaleX(0);
        transition: transform .2s ease-out;
        transform-origin: bottom left;
    }

    & ul li:hover::before {
        transform: scaleX(1);
    }

    & ul li:not(:hover)::before {
        transition: none;
    }

    & ul li:first-child {
        font-weight: bold;
    }
`

const Menu = () => {
    const [showMenu, setShowMenu] = useState(false)

    const { user } = usePage().props;

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
        <MenuWrapper open={showMenu}>
            <button onClick={() => handleToggleMenu()}>
                <img src={Hamburger} alt="Hamburger menu icon" />
            </button>
            <MenuWindow open={showMenu}>
                <div>
                    <LogoCloseButtonWrapper>
                        <Logo />
                        <CloseButtonWrapper onClick={() => handleToggleMenu()}>
                            <img src={Close} alt="close button" />
                        </CloseButtonWrapper>
                    </LogoCloseButtonWrapper>
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
                    {user ? <div>Signed in as {user.name}</div> : <div>Sign in/register</div>}
                </div>
                <div onClick={() => handleToggleMenu()}></div>
            </MenuWindow>
        </MenuWrapper>
    );
}

export default Menu