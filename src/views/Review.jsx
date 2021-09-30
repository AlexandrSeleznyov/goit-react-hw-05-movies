import { findReview } from "../services/api";
import { useState, useEffect } from "react";

export default function Review({ movieId }) {
  const [review, setReview] = useState([]);

  useEffect(() => {
    findReview(movieId).then((res) => setReview(res.data.results));
  }, [movieId]);

  return (
    <>
      {review.length === 0 ? (
        <p>We dont find any review</p>
      ) : (
        <ul>
          {review.map((rev) => (
            <li key={rev.id}>
              <h4>Author:{rev.author}</h4>
              <p>{rev.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
