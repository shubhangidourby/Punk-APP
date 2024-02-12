import React, { useState } from 'react';
import '../css/SearchBar.css';

const SearchBar = ({ searchBar }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById('searchInput').focus();
    if (!content) return;
    searchBar(content);
    setContent('');
  }

  const handleChange = (e) => {
    setContent(e.target.value);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input className="search-form__input" id="searchInput" type="search" placeholder="Type to search..." onChange={handleChange} value={content} />
      <button className="search-form__button" type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
