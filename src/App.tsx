import { MainLayout } from '@/layouts/MainLayout';
import { CreditsView, ErrorView, HomeView, MovieView, MoviesView, NowPlayingView, ReviewsView, SearchView, TrendingView, GenreView, TelevisionView, SeasonsView, PersonView, CareerView, ImagesView } from '@/views'; import { TrailersView } from '@/views/movies/TrailersView';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomeView />} />
        <Route path="now-playing" element={<NowPlayingView />} />
        <Route path="trending" element={<TrendingView />} />
        <Route path="search" element={<SearchView />} />
        <Route path="movies/category/:category" element={<MoviesView />} />
        <Route path="tv/category/:category" element={<div>TV</div>} />
        <Route path="genre/:mediaType/:genre" element={<div>Genre</div>} />
        <Route path="movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="trailers" element={<div>Trailers</div>} />
        </Route>
        <Route path="tv/:id" element={<div>TV Details</div>}>
          <Route path="seasons/:seasonNumber" element={<div>Seasons</div>} />
          <Route path="episode/:episodeId" element={<div>Episode</div>} />
        </Route>
        <Route path="person/:id" element={<div>Person</div>}>
          <Route path="career" element={<div>Career</div>} />
          <Route path="images" element={<div>Images</div>} />
        </Route>
      </Route>

      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};