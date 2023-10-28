import { useState } from 'react';
import MagnifyingGlass from "@/public/images/MagnifyingGlass.svg";
import styled from 'styled-components';

const SearchBarWrapper = styled.div`
    padding: 0 1rem;
    position: relative;

    input {
        width: 100%;
        border: none;
        border-radius: 2rem;
        text-indent: 2rem;
    }

    button {
        position: absolute;
        left: 1.5rem;
        top: 0;
        bottom: 0;
    }

    img {
        height: 1.5rem;
        width: 1.5rem;
    }

    @media (max-width: 800px) {
        padding: 0;

        button {
            left: .5rem;
        }
    }
`

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");

    function handleClick() {
        window.location.href = `/search/${searchQuery}`;
    };

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            window.location.href = `/search/${searchQuery}`;
        }
    };

    return (
        <SearchBarWrapper>
            <input 
                type="text"
                placeholder="Search for products"
                value={searchQuery}
                onChange={(e) => 
                    setSearchQuery(e.target.value)
                }
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleClick}>
                <img src={MagnifyingGlass} alt="Search icon" />
            </button>
        </SearchBarWrapper>
    );
}