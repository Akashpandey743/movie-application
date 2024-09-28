import React, {useState, useEffect} from "react";
 import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./SearchBox";

function App() {
  const [movies, setMovies] = useState( []);
  const [searchValue, setSearchValue] = useState("star");
  const [favourites, setFavourites] = useState([]);
  const getMoviesRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=e5d7b9b6`;
    // making an api call
    const response = await fetch(url);
    // parse the json value
    const responseJson = await response.json();
    if(responseJson.Search) {
      setMovies(responseJson.Search);
    }
    console.log(responseJson.Search);
  }
  //  function for saving movie to local storage
  const saveToLocalStorage = (items) => {
    localStorage.setItem("movie-app-favourites", JSON.stringify(items))
  }

  // adding favourites movie
  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    // saving movie to local storage
    saveToLocalStorage(newFavouriteList);
  }

  const removeFavouriteMovie = (movie) => {
    const removedFavouritesList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    setFavourites(removedFavouritesList);
    // saving movie to local storage
    saveToLocalStorage(removedFavouritesList);
  }

  

  // api call only happens when the app loads
  useEffect(() => {
    getMoviesRequest(searchValue);
  }, [searchValue]);

  // We're using the useEffect hook to retrieve 
  //favourites from local storage when the app loads,
  // and we're setting this to state
   useEffect(() => {
    const favouritesMovie = JSON.parse(localStorage.getItem("movie-app-favourites"));
    if (favouritesMovie && Array.isArray(favouritesMovie)) {
      setFavourites(favouritesMovie);
  }
    
  }, []);
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}  />

      </div>
       <div className="row">
        <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} />
       </div>
       <div className="row d-flex align-items-center mt-4 mb-r">
        <MovieListHeading heading="Favourite" />
       </div>
       <div className='row'>
         <MovieList movies={favourites} handleRemoveFavouritesClick={removeFavouriteMovie} />
       </div>
    </div>
  );
}

export default App;
