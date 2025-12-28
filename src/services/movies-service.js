import { ALL_MOVIES } from "../data/movies";

export async function getMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ALL_MOVIES.items);
    }, 1000);
  });
}

export async function getMovie(movieId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const movieDetails = ALL_MOVIES.items.find(movie => movie.id === parseInt(movieId, 10));
      if (movieDetails) {
        resolve(movieDetails);
      } else {
        reject(new Error("Movie not found"));
      }
    }, 1000);
  });
}
