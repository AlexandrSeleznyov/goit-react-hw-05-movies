import { findActors } from "../services/api";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";

export default function Cast({ movieId }) {
  const [actors, setActors] = useState("");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    findActors(movieId).then((res) => setActors(res.data.cast));
  }, [movieId]);

  const actorsPhoto = (actor) => {
    return actor.profile_path
      ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
      : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
  };
  console.log("a", history, "b", location);
  return (
    <>
      {actors && (
        <ul>
          {actors.map((actor) => (
            <li key={actor.id}>
              <img src={actorsPhoto(actor)} alt={actor.name} width="150" />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
