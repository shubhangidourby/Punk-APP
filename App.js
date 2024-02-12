import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Beers from './components/Beers';
import Favourites from './components/Favourites';

const App = () => {
  const [items, setItems] = useState([]);
  const [favourites, setFavourites] = useState(
    localStorage.getItem('Favourites')
      ? JSON.parse(localStorage.getItem('Favourites'))
      : []
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastBeerRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const toggleFavourite = async (e, id) => {
    const beer = items.find(item => item.id === id);
    let updatedFavourites;
    if (!beer.isFavourite) {
      e.target.className = 'fas fa-star';
      e.target.setAttribute('title', 'Remove from Favourites');
      updatedFavourites = [...favourites, beer];
    } else {
      e.target.className = 'far fa-star';
      e.target.setAttribute('title', 'Add to Favourites');
      updatedFavourites = favourites.filter(
        favourite => favourite.id !== id
      );
    }
    beer.isFavourite = !beer.isFavourite;
    await setFavourites(updatedFavourites);
    localStorage.setItem('Favourites', JSON.stringify(updatedFavourites));
  };

  const checkIfFavourite = id => {
    const isFavourite = favourites.find(favourite => favourite.id === id);
    return !!isFavourite;
  };

  const searchBar = beer => {
    const fetchedItems = [];
    fetch(`https://api.punkapi.com/v2/beers?beer_name=${beer}&page=1&per_page=80`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
            `The connection ended with status ${res.status}${
              res.statusText ? ': ' + res.statusText : ''
            }`
          );
        }
      })
      .then(json => {
        if (!json.length)
          return alert("We're sorry, we could not find such a beer :(");
        json.forEach(item => {
          const beer = {
            id: item.id,
            name: item.name,
            tagline: item.tagline,
            firstBrewed: item.first_brewed,
            desc: item.description,
            imageURL: item.image_url,
            isFavourite: checkIfFavourite(item.id),
          };
          fetchedItems.push(beer);
        });
        setItems(fetchedItems);
      })
      .catch(error => {
        alert(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=20`);
        const data = await response.json();
        if (data.length === 0) {
          setHasMore(false);
        } else {
          data.forEach(item => {
            const beer = {
              id: item.id,
              name: item.name,
              tagline: item.tagline,
              firstBrewed: item.first_brewed,
              desc: item.description,
              imageURL: item.image_url,
              isFavourite: checkIfFavourite(item.id),
            };
            setItems(prevItems => [...prevItems, beer]);
          });
        }
      } catch (error) {
        console.error('Error fetching beers:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, [page]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Beers
                beers={items}
                toggleFavourite={toggleFavourite}
                searchBar={searchBar}
                lastBeerRef={lastBeerRef}
              />
            )}
          />
          <Route
            path="/favourites"
            render={() => (
              <Favourites beers={favourites} toggleFavourite={toggleFavourite} />
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
