type MovieImageProps = {
  image: string;
  name: string;
  variant?: "item" | "detail";
};

export default function MovieImage({
  image,
  name,
  variant = "item",
}: MovieImageProps) {
  const variantClasses = {
    item: "movie-item-image",
    detail: "movie-detail-image",
  };

  const noImageClasses = {
    item: "movie-item-no-image",
    detail: "movie-item-no-image movie-detail-image",
  };

  if (image) {
    return <img src={image} className={variantClasses[variant]} alt={name} />;
  }

  return (
    <div className={noImageClasses[variant]}>
      <span className="movie-item-no-image-text">No image</span>
    </div>
  );
}
