import { lazy, Suspense } from "react";
import { findFilmById } from "../services/api";
import { useState, useEffect } from "react";
import {
  Link,
  useRouteMatch,
  useParams,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";

const Cast = lazy(() => import("./Cast"));
const Review = lazy(() => import("./Review"));

export default function MovieDetailsPage() {
  const { url } = useRouteMatch();
  let { movieId } = useParams();
  const [movie, setMovie] = useState("");
  const [genres, setGenres] = useState("");

  const location = useLocation();
  const history = useHistory();
  console.log("location film", location);

  useEffect(() => {
    async function fetchFilms() {
      try {
        const res = await findFilmById(movieId);
        setMovie(res.data);
        setGenres(res.data.genres);
      } catch (e) {}
    }
    fetchFilms();
  }, [movieId]);

  const genresList = (genres) => {
    return genres
      .map((genre) => {
        return genre.name;
      })
      .join(", ");
  };

  const handleGoBack = () => {
    history.push(location.state?.from?.location ?? "/");
  };

  return (
    <>
      <Suspense fallback={<div>ЗАГРУЖАЕМ</div>}></Suspense>
      <button onClick={handleGoBack}>GO BACK</button>
      <div>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        <div>
          <h1>{movie.title}</h1>
          <p>User popularity: {Math.round(movie.popularity)}</p>
          <h2> Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          {genres && <p>{genresList(genres)}</p>}
        </div>
        <div>
          <h4>Additional information</h4>
          <ul>
            <li>
              <Link to={{ pathname: `${url}/cast`, state: { from: "/" } }}>
                Cast
              </Link>
            </li>
            <li>
              <Link to={{ pathname: `${url}/review`, state: { from: "/" } }}>
                Review
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Switch>
        <Route path={`${url}/cast`}>
          <Cast movieId={movieId} />
        </Route>
        <Route path={`${url}/review`}>
          <Review movieId={movieId} />
        </Route>
      </Switch>
      <Suspense />
    </>
  );
}
