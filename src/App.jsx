import { StarIcon } from "@heroicons/react/24/solid";

import { ALL_MOVIES } from "./data/movies";

export default function App() {
  const movies = ALL_MOVIES.items;

  return (
    <div className="app">
      <div className="movie-list">
        {movies.map((movie) => {
          return (
            <div className="movie-item group" key={movie.id}>
              <div className="movie-item-image-wrapper">
                <img
                  src={movie.image}
                  className="movie-item-image"
                  alt={movie.name}
                />
              </div>
              <div className="movie-item-content-wrapper">
                <div className="movie-item-title-wrapper">
                  <h3 className="movie-item-title">{movie.name}</h3>
                  <div className="movie-item-genres-wrapper">
                    {movie.genres?.map((genre) => (
                      <span
                        key={`${movie.id}-${genre}`}
                        className="movie-item-genre-tag"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="movie-item-description-wrapper">
                  <p className="movie-item-description">{movie.description}</p>
                </div>
                <div className="movie-item-rating-wrapper">
                  <span className="movie-item-rating-text">
                    Rating: {movie.rating || 0}/5
                  </span>
                  <div className="movie-item-star-icon-wrapper">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        aria-label={`Rate ${movie.name} with ${star} star${
                          star > 1 ? "s" : ""
                        }`}
                        key={star}
                        className={`movie-item-star-icon-button ${
                          star <= (movie.rating || 0)
                            ? "text-yellow-500"
                            : "text-gray-400 hover:text-yellow-300"
                        }`}
                      >
                        <StarIcon className="movie-item-star-icon" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
