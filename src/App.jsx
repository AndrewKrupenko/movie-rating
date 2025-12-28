import { ALL_MOVIES } from "./data/movies";
import MovieItem from "./components/MovieItem";

export default function App() {
  const movies = ALL_MOVIES.items;

  return (
    <div className="app">
      <div className="movie-list">
        {movies.map((movie) => {
          return <MovieItem key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
}
