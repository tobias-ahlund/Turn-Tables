import { useState } from 'react';
import MagnifyingGlass from "@/public/images/MagnifyingGlass.svg";
import styled from 'styled-components';

const SearchBarWrapper = styled.div`
    display: flex;
`

export default function SearchBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SearchBarWrapper>
            <input 
                type="text"
                placeholder="Search for products"
                value={searchQuery}
                onChange={(e) => 
                    setSearchQuery(e.target.value)
                }
            />
            <button onClick={() => onSearch(searchQuery)}>
                <img src={MagnifyingGlass} alt="Search icon" />
            </button>
        </SearchBarWrapper>
    );
}