import { useState } from 'react';
import MagnifyingGlass from "@/public/images/MagnifyingGlass.svg";
import styled from 'styled-components';

const SearchBarWrapper = styled.div`
    position: relative;

    input {
        width: 100%;
        border: none;
        border-radius: 2rem;
        text-indent: 2rem;
    }

    button {
        position: absolute;
        left: .5rem;
        top: 0;
        bottom: 0;
    }
`

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");

    function handleClick() {
        if (!searchQuery) {
            return;
        }
        window.location.href = `/search/${searchQuery}`;
    };

    function handleKeyDown(event) {
        if (!searchQuery) {
            return;
        }

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