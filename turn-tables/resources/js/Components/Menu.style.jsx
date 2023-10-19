import Hamburger from "@/public/images/Hamburger.svg";
import styled, { useTheme } from "styled-components";
import { useState } from "react";
import { Link } from '@inertiajs/react';

const MenuWrapper = styled.div`
    display: flex;
    & button {
        z-index: 100;
    }
`

const MenuWindow = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.9);
    & ul {
        display: flex;
        flex-direction: column;
        font-size: 2rem;
        align-items: center;
        margin-top: 4rem;
    }
    & ul li {
        padding: 0.5rem;
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

    function handleToggleMenu() {
        setShowMenu(!showMenu);
    }

    return (
        <MenuWrapper>
            <button onClick={() => handleToggleMenu()}>
                <img src={Hamburger} alt="Hamburger menu icon" />
            </button>
            {showMenu && <MenuWindow>
                <ul>
                    {categories.map((category, index) =>
                        <li key={index}>
                            <Link
                                href={route("products")}
                            >
                                {category}
                            </Link>
                            <br />
                        </li>
                    )}
                </ul>
            </MenuWindow>}
        </MenuWrapper>
    );
}

export default Menu