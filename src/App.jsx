import { useState } from "react";

import { ALL_MOVIES } from "./data/movies";
import MovieItem from "./components/MovieItem";
import Modal from "./components/ui/Modal";
import MovieForm from "./components/MovieForm";

export default function App() {
  const [movies, setMovies] = useState(ALL_MOVIES.items);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [showMovieForm, setShowMovieForm] = useState(false);

  const updateRating = (id, rating) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, rating } : movie,
      ),
    );
  };

  const removeMovie = (id) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  const editMovie = (id) => {
    const movie = movies.find((movie) => movie.id === id);
    setCurrentMovie(movie);
    showForm();
  };

  const saveMovie = (data) => {
    const isExisting = movies.find((movie) => movie.id === data.id);

    if (isExisting) {
      updateMovie(data);
    } else {
      addMovie(data);
    }
  };

  const updateMovie = (data) => {
    setMovies((prevMovies) =>
      prevMovies.map((m) => {
        if (m.id === data.id) {
          return { ...data, rating: m.rating };
        }
        return m;
      }),
    );
    hideForm();
  };

  const addMovie = (data) => {
    setMovies((prevMovies) => [...prevMovies, data]);
    hideForm();
  };

  const hideForm = () => {
    setShowMovieForm(false);
    setCurrentMovie(null);
  };

  const showForm = () => {
    setShowMovieForm(true);
  };

  const removeRatings = () => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) => ({ ...movie, rating: null })),
    );
  };

  return (
    <div className="app">
      <Modal
        isOpen={showMovieForm}
        title={currentMovie?.id ? "Edit Movie" : "Add Movie"}
        onClose={hideForm}
      >
        <MovieForm
          movie={currentMovie}
          onSave={(data) => {
            saveMovie(data);
          }}
          onCancel={() => {
            hideForm();
          }}
        />
      </Modal>
      <div className="movie-actions-list-wrapper">
        <div className="movie-actions-list-actions">
          <button className="btn btn-secondary" onClick={removeRatings}>
            Remove Ratings
          </button>
          <button className="btn btn-primary" onClick={showForm}>
            Add Movie
          </button>
        </div>
      </div>
      <div className="movie-list">
        {movies.map((movie) => {
          return (
            <MovieItem
              key={movie.id}
              movie={movie}
              onEdit={editMovie}
              onRemove={removeMovie}
              onUpdateRating={updateRating}
            />
          );
        })}
      </div>
    </div>
  );
}
