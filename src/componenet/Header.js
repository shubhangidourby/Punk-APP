import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
  return (
    <header className="App__header">
      <h1 className="App__title">PUNK BEER</h1>
      <nav className="App__nav">
        <ul className="menu-list">
          <li className="menu-list__item">
            <NavLink className="menu-list__link" exact to="/">Home</NavLink>
          </li>
          <li className="menu-list__item">
            <NavLink className="menu-list__link" to="/favourites">Favourites</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
