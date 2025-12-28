import { useState, useRef, useEffect } from "react";

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

const validateField = (name, value) => {
  if (name === "name" && (!value || value.trim() === "")) {
    return "Movie name is required";
  }
  if (name === "genres" && (!value || value.length === 0)) {
    return "At least one genre is required";
  }
  return "";
};

export default function MovieForm({ movie, onSave, onCancel }) {
  const nameInputRef = useRef(null);

  const [formData, setFormData] = useState({
    id: movie?.id || null,
    name: movie?.name || "",
    description: movie?.description || "",
    image: movie?.image || "",
    inTheaters: movie?.inTheaters || false,
    genres: movie?.genres || [],
    rating: movie?.rating || null,
  });
  const [errors, setErrors] = useState({ name: "", genres: "" });

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameError = validateField("name", formData.name);
    const genresError = validateField("genres", formData.genres);

    if (nameError || genresError) {
      setErrors({ name: nameError, genres: genresError });
      return;
    }

    const data = {
      ...formData,
      id: formData.id || Number(Date.now()),
    };

    onSave(data);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleGenresChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setFormData((prev) => ({
      ...prev,
      genres: selectedOptions,
    }));

    if (errors.genres) {
      setErrors((prev) => ({ ...prev, genres: "" }));
    }
  };

  return (
    <div className="movie-form-container">
      <form onSubmit={handleSubmit}>
        <div className="movie-form-input-wrapper">
          <label htmlFor="name" className="movie-form-label">
            Name
          </label>
          <input
            ref={nameInputRef}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="movie-form-input"
          />
          <span className="movie-form-error">{errors.name}</span>
        </div>
        <div className="movie-form-input-wrapper">
          <label htmlFor="description" className="movie-form-label">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="movie-form-textarea"
          />
        </div>
        <div className="movie-form-input-wrapper">
          <label htmlFor="image" className="movie-form-label">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="movie-form-input"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="movie-form-input-wrapper">
          <label htmlFor="genres" className="movie-form-label">
            Genres
          </label>
          <select
            name="genres"
            value={formData.genres}
            onChange={handleGenresChange}
            className="movie-form-select"
            multiple
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <span className="movie-form-error">{errors.genres}</span>
        </div>
        <div className="movie-form-input-wrapper">
          <label className="movie-form-checkbox-label">
            <input
              type="checkbox"
              name="inTheaters"
              checked={formData.inTheaters}
              onChange={handleInputChange}
              className="movie-form-checkbox"
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
            {formData.id ? "Save" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
