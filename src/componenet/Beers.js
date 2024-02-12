import React from 'react';
import SearchBar from './SearchBar';
import RenderBeerList from './RenderBeerList';
import '../css/Beers.css';

const Beers = ({ beers, toggleFavourite, searchBar, lastBeerRef }) => {
  const beerList = beers.length ? (
    <>
      <SearchBar onSearch={searchBar} />
      <div className="container">
        <RenderBeerList beers={beers} toggleFavourite={toggleFavourite} />
        <div ref={lastBeerRef} />
      </div>
    </>
  ) : (
    <p className="info">Wait until your Beers are Loading...</p>
  );

  return (
    <main className="App__main">
      {beerList}
    </main>
  );
}

export default Beers;
