const genres = [
  "Drama",
  "Crime",
  "Action",
  "Comedy",
  "Thriller",
  "Horror",
  "Sci-Fi",
  "Fantasy",
  "Romance",
];

export default function MovieForm({ movie, onSave, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      ...Object.fromEntries(formData),
      genres: formData.getAll("genres"),
      id: movie?.id || formData.get("id"),
    };
    onSave(data);
  };

  return (
    <div className="movie-form-container">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={movie?.id || ""} />
        <div className="movie-form-input-wrapper">
          <label htmlFor="name" className="movie-form-label">
            Name
          </label>
          <input
            type="text"
            required
            name="name"
            className="movie-form-input"
            defaultValue={movie?.name || ""}
          />
        </div>
        <div className="movie-form-input-wrapper">
          <label htmlFor="description" className="movie-form-label">
            Description
          </label>
          <textarea
            name="description"
            className="movie-form-textarea"
            defaultValue={movie?.description || ""}
          />
        </div>
        <div className="movie-form-input-wrapper">
          <label htmlFor="image" className="movie-form-label">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            className="movie-form-input"
            placeholder="https://example.com/image.jpg"
            defaultValue={movie?.image || ""}
          />
        </div>
        <div className="movie-form-input-wrapper">
          <label htmlFor="genres" className="movie-form-label">
            Genres
          </label>
          <select
            name="genres"
            className="movie-form-select"
            multiple
            required
            defaultValue={movie?.genres || []}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="movie-form-input-wrapper">
          <label className="movie-form-checkbox-label">
            <input
              type="checkbox"
              name="inTheaters"
              className="movie-form-checkbox"
              defaultChecked={movie?.inTheaters || false}
            />
            <span>In Theaters</span>
          </label>
        </div>
        <div className="movie-form-actions-wrapper">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {movie?.id ? "Save" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
