import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const MoviesView = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const safeCategory = category ?? "popular";

  const categoryLabelMap: Record<string, string> = {
    popular: "Popular",
    top_rated: "Top Rated",
    now_playing: "Now Playing",
    upcoming: "Upcoming",
  };

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${safeCategory}?api_key=${apiKey}`
        );

        setMovies(res.data.results);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [safeCategory]);

  const changeCategory = (newCategory: string) => {
    navigate(`/movies/category/${newCategory}`);
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-400">
        Loading movies...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 text-white bg-gray-900 min-h-screen">

      {/* 🎬 CATEGORY BUTTONS */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => changeCategory("popular")}
          className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
        >
          Popular
        </button>

        <button
          onClick={() => changeCategory("top_rated")}
          className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
        >
          Top Rated
        </button>

        <button
          onClick={() => changeCategory("now_playing")}
          className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
        >
          Now Playing
        </button>

        <button
          onClick={() => changeCategory("upcoming")}
          className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
        >
          Upcoming
        </button>
      </div>

      <h1 className="text-2xl font-bold tracking-tight">
        Movies ·{" "}
        <span className="text-gray-400">
          {categoryLabelMap[safeCategory] ?? safeCategory}
        </span>
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="cursor-pointer group"
          >
            <div className="bg-gray-800 rounded-xl overflow-hidden hover:scale-[1.03] transition">

              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                className="w-full h-[340px] object-cover"
                alt={movie.title}
              />

              <div className="p-3">
                <p className="text-sm font-medium group-hover:text-white">
                  {movie.title}
                </p>

                <p className="text-xs text-gray-400">
                  ⭐ {movie.vote_average}
                </p>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};