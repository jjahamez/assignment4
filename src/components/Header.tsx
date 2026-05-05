import { ButtonGroup, Link, SearchBar } from '@/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
export const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [type, setType] = useState<string>('movie');
 
  return (
    <header>
      <nav className="flex items-center gap-4 p-4 bg-gray-800 flex-wrap">
        <h1 className="text-2xl font-bold text-white shrink-0">Stephen's Playground</h1>
        <div className="flex gap-2 flex-wrap">
          <Link to="/movies/category/popular" match={['/movies/category/:category']}>Movies</Link>
          <Link to="/tv/category/airing_today" match={['/tv/category/:category']}>TV</Link>
          <Link to="/trending/movies" match={['/trending/:category']}>Trending</Link>
          <Link to="/genre/movie/action" match={['/genre/:mediaType/:genre']}>Genre</Link>
        </div>
        <div className="flex items-center gap-3 ml-auto flex-wrap">
          <SearchBar
            value={query}
            onChange={(input) => {
              setQuery(input);
              navigate(`/search?q=${input}&type=${type}`);
            }}
          />
          <ButtonGroup
            value={type}
            options={[
              { label: 'Movies', value: 'movie' },
              { label: 'TV', value: 'tv' },
              { label: 'Person', value: 'person' },
            ]}
            onClick={(newType) => {
              setType(newType);
              navigate(`/search?q=${query}&type=${newType}`);
            }}
          />
        </div>
      </nav>
    </header>
  );
};
 