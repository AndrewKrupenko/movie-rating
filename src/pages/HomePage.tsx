import { useState } from "react";

import MovieItem, { MovieItemSkeleton } from "../components/MovieItem";
import Modal from "../components/ui/Modal";
import MovieForm from "../components/MovieForm";
import { getMovies } from "../services/movies-service";
import { Movie } from "../data/movies";
import { useFetch } from "../hooks/useFetch";

export default function HomePage() {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [showMovieForm, setShowMovieForm] = useState(false);

  const {
    data: movies,
    setData: setMovies,
    isLoading,
  } = useFetch<Movie[]>(getMovies, []);

  const validRatings = movies
    .filter((movie) => movie.rating !== null && Number.isFinite(movie.rating))
    .map((movie) => movie.rating as number);

  const averageRating = validRatings.length
    ? (
        validRatings.reduce((acc, rating) => acc + rating, 0) /
        validRatings.length
      ).toFixed(1)
    : "N/A";

  const totalMovies = movies.length;

  const hideForm = () => {
    setShowMovieForm(false);
    setCurrentMovie(null);
  };

  const showForm = () => {
    setShowMovieForm(true);
  };

  const updateRating = (id: number, rating: number | null) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, rating } : movie,
      ),
    );
  };

  const removeMovie = (id: number) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  const editMovie = (id: number) => {
    const movie = movies.find((movie) => movie.id === id);

    if (movie) {
      setCurrentMovie(movie);
      showForm();
    }
  };

  const updateMovie = (data: Movie) => {
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

  const addMovie = (data: Movie) => {
    setMovies((prevMovies) => [...prevMovies, data]);
    hideForm();
  };

  const saveMovie = (data: Movie) => {
    const isExisting = movies.find((movie) => movie.id === data.id);

    if (isExisting) {
      updateMovie(data);
    } else {
      addMovie(data);
    }
  };

  const removeRatings = () => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) => ({ ...movie, rating: null })),
    );
  };

  return (
    <>
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
    </>
  );
}
