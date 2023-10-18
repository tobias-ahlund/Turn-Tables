import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div>
            <input 
                type="text"
                placeholder="Search for products"
                value={searchQuery}
                onChange={(e) => 
                    setSearchQuery(e.target.value)
                }
            />
            <button onClick={() => onSearch(searchQuery)}>Search</button>
        </div>
    );
}