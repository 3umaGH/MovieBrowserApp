import {
  fetchMoviesSortBy,
  fetchUpcomingMovies,
} from "../modules/common/api/api";
import { MovieBrowser } from "../modules/MovieBrowser/components/MovieBrowser";

export const MainPage = () => {
  return (
    <div className=" bg-zinc-900">
      <div className="relative flex flex-auto">
        <MovieBrowser
          defaultRows={[
            {
              title: "Popular Movies",
              fetchFn: fetchMoviesSortBy,
              fetchQuery: { sort_by: "popularity.desc", page: 1 },
            },
            {
              title: "Upcoming Movies",
              fetchFn: fetchUpcomingMovies,
              fetchQuery: { page: 1 },
            },
            {
              title: "Top Rated",
              fetchFn: fetchMoviesSortBy,
              fetchQuery: { sort_by: "vote_average.desc", page: 1 },
            },
          ]}
        />
      </div>
    </div>
  );
};
