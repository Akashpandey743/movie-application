import React from "react";
import AddFavourite from "../AddFavourite";

const MovieList = (props) => {
    return (
        <>
         {
            props.movies.map((movie, index) => (
                <div className="image-container d-flex justify-content-start m-3" key={index}>
                 <img src={movie.Poster} alt="movie"></img>
                 {props.handleFavouritesClick && 
                 <div
                  onClick={() => props.handleFavouritesClick(movie)}
                  className="overlay d-flex align-items-center justify-content-center">
                    <AddFavourite heading="Add to favourite" />
                 </div>
                }
                 {props.handleRemoveFavouritesClick && 
                 <div
                  onClick={() => props.handleRemoveFavouritesClick(movie)}
                  className="overlay d-flex align-items-center justify-content-center">
                    <AddFavourite heading="Remove from favourites" />
                 </div>
                }
                </div>
            ))
         }
        </>
    )
}

export default MovieList;