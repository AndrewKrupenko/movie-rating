import { useParams, Link } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { getMovie } from "../services/movies-service";
import { useFetch } from "../hooks/useFetch";
import MovieRatingDisplay from "../components/MovieRatingDisplay";
import MovieImage from "../components/MovieImage";
import Tag from "../components/ui/Tag";
import Skeleton from "../components/ui/Skeleton";

export default function MovieDetailPage() {
  const { id } = useParams();
  const { data: movie, isLoading } = useFetch(() => getMovie(id), null);

  return (
    <>
      <div className="movie-detail-header">
        <Link to="/" className="movie-detail-back-button">
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Movies
        </Link>
      </div>
      {isLoading ? (
        <MovieDetailSkeleton />
      ) : (
        <div className="movie-detail-container">
          <div className="movie-detail-figure">
            <>
              <MovieRatingDisplay rating={movie.rating} />
              <MovieImage
                image={movie.image}
                name={movie.name}
                variant="detail"
              />
            </>
          </div>
          <div className="movie-detail-content">
            <h1 className="movie-detail-title">{movie.name}</h1>
            <div className="movie-detail-genres">
              {movie.genres?.map((genre) => (
                <Tag key={genre} text={genre} size="large" />
              ))}
            </div>
            <p className="movie-detail-description">{movie.description}</p>
          </div>
        </div>
      )}
    </>
  );
}

function MovieDetailSkeleton() {
  return (
    <div className="movie-detail-container">
      <div className="movie-detail-figure">
        <Skeleton variant="image" className="aspect-[96/125] rounded-xl" />
      </div>
      <div className="movie-detail-content">
        <Skeleton variant="title" className="w-3/4 h-10" />
        <div className="movie-detail-genres">
          <Skeleton className="w-20 h-8 rounded-full inline-block mr-2" />
          <Skeleton className="w-24 h-8 rounded-full inline-block" />
        </div>
        <div className="space-y-2">
          <Skeleton variant="line" className="w-full" />
          <Skeleton variant="line" className="w-2/3" />
        </div>
      </div>
    </div>
  );
}
