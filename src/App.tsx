import { MainLayout } from '@/layouts/MainLayout';
import { ErrorView, GenreView, HomeView, NowPlayingView, SearchView, TrendingView, MoviesView, MovieView, CreditsView, ReviewsView, TrailersView, TelevisionView, SeasonsView, PersonView, CareerView, ImagesView } from '@/views';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      {/* Home (outside layout if you want full screen landing) */}
      <Route path="/" element={<HomeView />} />

      {/* Main app layout */}
      <Route element={<MainLayout />}>
        <Route path="movies" element={<Navigate to="/movies/category/popular" />} />
        <Route path="tv" element={<Navigate to="/tv/category/popular" />} />
        <Route path="now-playing" element={<NowPlayingView />} />
        <Route path="trending" element={<TrendingView />} />
        <Route path="search" element={<SearchView />} />
        <Route path="movies/category/:category" element={<MoviesView />} />
        <Route path="tv/category/:category" element={<TelevisionView />} />
        <Route path="genre/:mediaType/:genre" element={<GenreView />} />
        <Route path="movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="trailers" element={<TrailersView />} />
        </Route>
        <Route path="tv/:id" element={<TelevisionView />}>
          <Route path="seasons/:seasonNumber" element={<SeasonsView />} />
        </Route>
        <Route path="person/:id" element={<PersonView />}>
          <Route path="career" element={<CareerView />} />
          <Route path="images" element={<ImagesView />} />
        </Route>

      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};