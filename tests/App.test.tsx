import { expect, describe, it, vi } from "vitest";

import { render, screen, waitFor } from "../test-utils/custom-render.jsx";
import App from "../src/App.jsx";
import { ALL_MOVIES } from "../src/data/movies";

vi.mock("../src/services/movies-service.js", () => ({
  getMovies: vi.fn(() => ALL_MOVIES.items),
  getMovie: vi.fn((movieId) => {
    const movie = ALL_MOVIES.items.find(
      (movie) => movie.id === parseInt(movieId, 10),
    );
    if (!movie) throw new Error("Movie not found");
    return movie;
  }),
}));

describe("Movie App", () => {
  it("should render the main app component", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("The Godfather")).toBeInTheDocument();
    });
  });
});
