import { StarIcon } from "@heroicons/react/24/solid";

type MovieRatingDisplayProps = {
  rating: number | null;
};

export default function MovieRatingDisplay({
  rating,
}: MovieRatingDisplayProps) {
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
