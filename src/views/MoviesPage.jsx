import { useEffect, useState } from "react";
import { findFilms } from "../services/api";
import { Link, useRouteMatch, useHistory, useLocation } from "react-router-dom";

export default function MoviesPage() {
  const [name, setName] = useState("");
  const [films, setFilms] = useState([]);

  const location = useLocation();
  const history = useHistory();
  console.log("useLocatoin222", location);
  console.log("useHistory2222", history);

  const { url } = useRouteMatch();
  console.log("url", url);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    async function findFilm() {
      try {
        const res = await findFilms(name);
        setFilms(res.data.results);
      } catch (e) {}
    }
    findFilm();
  };
  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search films"
          value={name}
          onChange={handleChange}
        />
        <button type="submit">Поиск</button>
      </form>

      <ul>
        {films.map((film) => (
          <li key={film.id}>
            /{" "}
            <Link
              to={{
                pathname: `${url}/${film.id}`,
                state: {
                  from: {
                    location,
                    label: "назад",
                  },
                },
              }}
            >
              {film.original_title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
