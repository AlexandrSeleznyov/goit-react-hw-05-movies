import { useState, useEffect } from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import { fetchTrendingMovies } from "../services/api";

export default function HomePage() {
  const { url } = useRouteMatch;

  const location = useLocation();
  console.log("Location", location);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then((res) => {
      setMovies(res.data.results);
    });
  }, []);

  return (
    <>
      <h1>Trends of the week</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: {
                  from: {
                    location,
                    label: "назад",
                  },
                },
              }}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
