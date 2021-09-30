import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_KEY = "aeea02db324303291298da0524ee2653";

const fetchImages = async (url) => {
  const results = await axios.get(url);
  console.log("response", results);
  return results;
};

export function fetchTrendingMovies() {
  return fetchImages(`/trending/movie/day?api_key=${API_KEY}`);
}

export function findFilms(name) {
  return fetchImages(
    `/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${name}`
  );
}

export function findFilmById(movieId) {
  return fetchImages(`/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
}

export function findActors(movieId) {
  return fetchImages(
    `/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );
}

export function findReview(movieId) {
  return fetchImages(
    `/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
}
