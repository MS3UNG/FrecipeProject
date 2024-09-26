import React, { useState } from 'react';
import '../css/UniqueSearchBar.css';

export default function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="unique-search-bar">
            <input
                type="search"
                className="unique-search-input"
                placeholder="keywords"
                value={searchTerm}
                onChange={handleInputChange}
                aria-describedby="unique-search-icon-1"
            />
            <div id="unique-search-icon-1" className="unique-search-icon p-3" onClick={handleSearch}>
                <i className="fa fa-search"></i>
            </div>
        </div>
    );
}
