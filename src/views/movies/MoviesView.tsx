import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const MoviesView = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const safeCategory = category ?? "popular";
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${safeCategory}?api_key=${apiKey}&page=${page}`
        );

        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, safeCategory]);

  useEffect(() => {
    setPage(1);
  }, [safeCategory]);

  const changeCategory = (newCategory: string) => {
    navigate(`/movies/category/${newCategory}`);
  };

  const btnBase =
    "px-3 py-1 rounded transition font-medium";

  const blueBtn =
    "bg-blue-600 hover:bg-blue-500 text-white";

  const greyBtn =
    "bg-gray-700 hover:bg-gray-600 text-white";

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-6 text-white bg-gray-900 min-h-screen">

      <h1 className="text-3xl font-bold tracking-tight">
        Movies · <span className="text-gray-400">{safeCategory}</span>
      </h1>

      {/* CATEGORY BUTTONS */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => changeCategory("popular")} className={`${btnBase} ${blueBtn}`}>
          Popular
        </button>

        <button onClick={() => changeCategory("top_rated")} className={`${btnBase} ${greyBtn}`}>
          Top Rated
        </button>

        <button onClick={() => changeCategory("now_playing")} className={`${btnBase} ${greyBtn}`}>
          Now Playing
        </button>

        <button onClick={() => changeCategory("upcoming")} className={`${btnBase} ${greyBtn}`}>
          Upcoming
        </button>
      </div>

      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

            {movies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="cursor-pointer"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  className="w-full h-[340px] object-cover rounded"
                />
                <p>{movie.title}</p>
                <p className="text-gray-400">⭐ {movie.vote_average}</p>
              </div>
            ))}

          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-center gap-4 pt-6">

            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className={`${btnBase} ${greyBtn}`}
            >
              ←
            </button>

            <span className="text-gray-300">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className={`${btnBase} ${blueBtn}`}
            >
              →
            </button>

          </div>
        </>
      )}
    </section>
  );
};