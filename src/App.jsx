import { useState } from "react";

import MovieItem, { MovieItemSkeleton } from "./components/MovieItem";
import Modal from "./components/ui/Modal";
import MovieForm from "./components/MovieForm";
import { useFetch } from "./hooks/useFetch";
import { getMovies } from "./services/movies-service";

export default function App() {
  const [currentMovie, setCurrentMovie] = useState(null);
  const [showMovieForm, setShowMovieForm] = useState(false);
  const {
    data: movies,
    setData: setMovies,
    isLoading,
  } = useFetch(getMovies, []);

  const validRatings = movies
    .filter((movie) => Number.isFinite(movie.rating))
    .map((movie) => movie.rating);
  const averageRating = validRatings.length
    ? (
        validRatings.reduce((acc, rating) => acc + rating, 0) /
        validRatings.length
      ).toFixed(1)
    : "N/A";
  const totalMovies = movies.length;

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
        <div className="movie-actions-list-info">
          <span>
            <strong>Total Movies:</strong> {totalMovies}
          </span>
          <span>|</span>
          <span>
            <strong>Average Rating:</strong> {averageRating}
          </span>
        </div>
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
        {isLoading ? (
          <>
            <MovieItemSkeleton />
            <MovieItemSkeleton />
          </>
        ) : (
          movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onEdit={editMovie}
              onRemove={removeMovie}
              onUpdateRating={updateRating}
            />
          ))
        )}
      </div>
    </div>
  );
}
