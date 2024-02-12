import React, { useState } from 'react';
import '../css/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input className="search-form__input" type="search" placeholder="Type to search..." onChange={handleChange} value={query} />
      <button className="search-form__button" type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
