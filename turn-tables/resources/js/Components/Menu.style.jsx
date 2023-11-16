import Hamburger from "@/public/images/Hamburger.svg";
import styled from "styled-components";
import { useState } from "react";
import { Link } from '@inertiajs/react';
import Close from '@/public/images/Close.svg';
import Logo from "@/components/Logo";
import { usePage } from '@inertiajs/react'
import Profile from '@/public/images/Profile.svg';

const MenuWrapper = styled.div`
    display: flex;
`

const MenuWindowWrapper = styled.div`
`

const MenuWindow = styled.div`
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

    @media (max-width: 400px) {
        width: 100%;
        border: none;
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
    align-items: flex-start;
    justify-content: space-between;
    padding: 2rem 0 1rem 0;
    border-bottom: 1px solid black;
    margin: 0 2rem;

    & div {
        display: flex;
        align-items: center;
    }
`;

const UserLink = styled.div`
    padding: 2rem 0 2rem 0;
    border-bottom: 1px solid black;
    margin: 0 2rem;

    & a {
        display: flex;
        align-items: center;
        gap: .5rem;
    }
`

const MenuList = styled.ul`
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    align-items: flex-start;
    margin-top: 1rem;
    line-height: 125%;
    gap: 1rem;
    padding: 0 2rem;

    & li {
        position: relative;
        color: #000;
        text-decoration: none;
    }

    & li:hover {
        color: #000;
    }

    & li::before {
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

    & li:hover::before {
        transform: scaleX(1);
    }

    & li:not(:hover)::before {
        transition: none;
    }

    & li:first-child {
        font-weight: bold;
    }
`

const MenuBackground = styled.div`
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

    @media (max-width: 400px) {
        display: none;
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
            <MenuWindowWrapper>
                <MenuWindow open={showMenu}>
                    <LogoCloseButtonWrapper>
                        <Logo />
                        <CloseButtonWrapper onClick={() => handleToggleMenu()}>
                            <img src={Close} alt="close button" />
                        </CloseButtonWrapper>
                    </LogoCloseButtonWrapper>
                    <UserLink>
                        <Link
                            href={route(user ? "dashboard" : "login")}    
                        >
                            <img src={Profile} alt="Profile page link icon" />
                            {user ? `Signed in as ${user.name}` : "Sign in/register"}
                        </Link>
                    </UserLink>
                    <MenuList>
                        {categoriesLowerCase.map((category, index) =>
                            <li key={index}>
                                <Link
                                    href={category !== "all products" ? route('products.category', { categorySlug: category }) : route('products')}
                                >
                                    {categories[index]}
                                </Link>
                            </li>
                        )}
                    </MenuList>
                </MenuWindow>
                <MenuBackground open={showMenu} onClick={() => handleToggleMenu()}></MenuBackground>
            </MenuWindowWrapper>
        </MenuWrapper>
    );
}

export default Menu