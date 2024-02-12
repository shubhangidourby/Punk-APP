import React from 'react';
import RenderBeerList from './RenderBeerList';
import '../css/Beers.css';

const Favourites = ({ beers, toggleFavourite }) => {
  const beerList = beers.length ? (
    <RenderBeerList beers={beers} toggleFavourite={toggleFavourite} />
  ) : (
      <p className="info">Add your Favourites Beers...!</p>
    );

  return (
    <div className="container">
      {beerList}
    </div>
  );
}

export default Favourites;