import { Link } from "react-router";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";

import MovieRatingDisplay from "./MovieRatingDisplay";
import MovieImage from "./MovieImage";
import Tag from "./ui/Tag";
import Skeleton from "./ui/Skeleton";
import { Movie } from "../data/movies";

type MovieItemProps = {
  movie: Movie;
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
  onUpdateRating: (id: number, rating: number | null) => void;
};

export default function MovieItem({
  movie,
  onEdit,
  onRemove,
  onUpdateRating,
}: MovieItemProps) {
  const handleUpdateRating = (rating: number) => {
    onUpdateRating(movie.id, rating);
  };

  const handleRemoveMovie = () => {
    onRemove(movie.id);
  };

  const editMovie = () => {
    onEdit(movie.id);
  };

  return (
    <div className="movie-item group">
      <div className="movie-item-image-wrapper">
        <MovieRatingDisplay rating={movie.rating} />
        {movie?.inTheaters && <NowPlayingBanner />}
        <MovieImage image={movie.image} name={movie.name} />
      </div>
      <div className="movie-item-content-wrapper">
        <div className="movie-item-title-wrapper">
          <h3 className="movie-item-title">
            <Link to={`/movie/${movie.id}`} className="movie-item-title-link">
              {movie.name}
            </Link>
          </h3>
          <div className="movie-item-genres-wrapper">
            {movie.genres?.map((genre) => (
              <Tag key={genre} text={genre} />
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
          <StarRating
            rating={movie.rating}
            movieName={movie.name}
            onUpdateRating={handleUpdateRating}
          />
          <MovieActions
            movieName={movie.name}
            onEdit={editMovie}
            onRemove={handleRemoveMovie}
          />
        </div>
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

type StarRatingProps = {
  rating: number | null;
  movieName: string;
  onUpdateRating: (rating: number) => void;
};

function StarRating({ rating, movieName, onUpdateRating }: StarRatingProps) {
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
          onClick={() => onUpdateRating(star)}
        >
          <StarIcon className="movie-item-star-icon" />
        </button>
      ))}
    </div>
  );
}

type MovieActionsProps = {
  movieName: string;
  onEdit: () => void;
  onRemove: () => void;
};

function MovieActions({ movieName, onEdit, onRemove }: MovieActionsProps) {
  return (
    <div className="movie-item-actions-list-wrapper">
      <button
        aria-label={`Edit ${movieName}`}
        className="movie-item-action-edit-button"
        onClick={onEdit}
      >
        <PencilIcon className="movie-item-action-icon" />
      </button>
      <button
        aria-label={`Remove ${movieName}`}
        className="movie-item-action-remove-button"
        onClick={onRemove}
      >
        <TrashIcon className="movie-item-action-icon" />
      </button>
    </div>
  );
}

export function MovieItemSkeleton() {
  return (
    <div className="movie-item">
      <div className="movie-item-image-wrapper">
        <Skeleton variant="image" />
      </div>
      <div className="movie-item-content-wrapper">
        <div className="movie-item-title-wrapper">
          <Skeleton variant="title" className="w-3/4" />
          <div className="movie-item-genres-wrapper">
            <Skeleton className="w-16 h-6 rounded-full" />
            <Skeleton className="w-20 h-6 rounded-full" />
          </div>
        </div>
        <div className="movie-item-description-wrapper">
          <Skeleton variant="line" className="w-full" />
          <Skeleton variant="line" className="w-2/3" />
        </div>
        <div className="movie-item-rating-wrapper">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-16 h-8" />
        </div>
      </div>
    </div>
  );
}
