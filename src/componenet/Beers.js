import React from 'react';
import SearchBar from './SearchBar';
import RenderBeerList from './RenderBeerList';
import '../css/Beers.css';

const Beers = ({ beers, toggleFavourite, searchBar }) => {
  const beerList = beers.length ? (
    <RenderBeerList beers={beers} toggleFavourite={toggleFavourite} />
  ) : (
      <p className="info">...Loading Beer!</p>
    );

  return (
    <main className="App__main">
      <SearchBar searchBar={searchBar} />
      <div className="container">
        {beerList}
      </div>
    </main>
  );
}

export default Beers;