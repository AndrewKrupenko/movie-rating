import { StarIcon } from "@heroicons/react/24/solid";

export default function MovieItem({ movie }) {
  return (
    <div className="movie-item group">
      <div className="movie-item-image-wrapper">
        <MovieRatingDisplay rating={movie.rating} />
        {movie?.inTheaters && <NowPlayingBanner />}
        <MovieImage image={movie.image} name={movie.name} />
      </div>
      <div className="movie-item-content-wrapper">
        <div className="movie-item-title-wrapper">
          <h3 className="movie-item-title">{movie.name}</h3>
          <div className="movie-item-genres-wrapper">
            {movie.genres?.map((genre) => (
              <GenreTag key={genre} genre={genre} />
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
          <StarRating rating={movie.rating} movieName={movie.name} />
        </div>
      </div>
    </div>
  );
}

function MovieRatingDisplay({ rating }) {
  return (
    <div className="movie-item-star-wrapper">
      <StarIcon
        className={`movie-item-star-rating-icon ${
          rating ? "text-yellow-500" : "text-gray-500"
        }`}
      />
      <div className="movie-item-star-content-wrapper">
        {rating ? (
          <span className="movie-item-star-content-rating-rated">{rating}</span>
        ) : (
          <span className="movie-item-star-content-rating-not-rated">-</span>
        )}
      </div>
    </div>
  );
}

function NowPlayingBanner() {
  return (
    <div className="movie-item-theaters-banner">
      <span className="movie-item-theaters-banner-text">Now Playing</span>
    </div>
  );
}

function MovieImage({ image, name }) {
  if (image) {
    return <img src={image} className="movie-item-image" alt={name} />;
  }

  return (
    <div className="movie-item-no-image">
      <span className="movie-item-no-image-text">No image</span>
    </div>
  );
}

function GenreTag({ genre }) {
  return <span className="movie-item-genre-tag">{genre}</span>;
}

function StarRating({ rating, movieName }) {
  return (
    <div className="movie-item-star-icon-wrapper">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          aria-label={`Rate ${movieName} with ${star} star${
            star > 1 ? "s" : ""
          }`}
          key={star}
          className={`movie-item-star-icon-button ${
            star <= (rating || 0)
              ? "text-yellow-500"
              : "text-gray-400 hover:text-yellow-300"
          }`}
        >
          <StarIcon className="movie-item-star-icon" />
        </button>
      ))}
    </div>
  );
}
