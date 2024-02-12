import React from 'react';
import SearchBar from './SearchBar';
import RenderBeerList from './RenderBeerList';
import '../css/Beers.css';

const Beers = ({ beers, toggleFavourite, lastBeerRef }) => {
  const beerList = beers.length ? (
    beers.map((beer, index) => {
      if (beers.length === index + 1) {
        return <div ref={lastBeerRef} key={beer.id} />;
      } else {
        return (
          <RenderBeerList
            beer={beer}
            toggleFavourite={toggleFavourite}
            key={beer.id}
          />
        );
      }
    })
  ) : (
    <p className="info">Wait until your Beer are Loading......!</p>
  );

  return (
    <main className="App__main">
      <SearchBar />
      <div className="container">{beerList}</div>
    </main>
  );
};

export default Beers;
