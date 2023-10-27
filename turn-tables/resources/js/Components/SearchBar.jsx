import { useState } from 'react';
import MagnifyingGlass from "@/public/images/MagnifyingGlass.svg";
import styled from 'styled-components';

const SearchBarWrapper = styled.div`
    display: flex;
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