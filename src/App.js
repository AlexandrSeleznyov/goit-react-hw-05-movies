import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
const HomePage = lazy(() => import("./views/HomePage"));
const Navigation = lazy(() => import("./components/Navigation"));
const MoviesPage = lazy(() => import("./views/MoviesPage"));
const NotFoundPage = lazy(() => import("./views/NotFoundPage"));
const MovieDetailsPage = lazy(() => import("./views/MovieDetailsPage"));

function App() {
  return (
    <>
      <Suspense fallback={<div>ЗАГРУЖАЕМ</div>}>
        <Navigation />

        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
