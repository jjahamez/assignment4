import { LinkGroup, Modal } from '@/components';
import { IMAGE_BASE_URL, MOVIE_ENDPOINT, ORIGINAL_IMAGE_BASE_URL, TV_ENDPOINT } from '@/core/constants';
import type { MovieRepsonse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { FaCalendarAlt } from 'react-icons/fa';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
 
export const MovieView = () => {
  const navigate = useNavigate();
  const { category, id } = useParams();
  const endpoint = category === 'movies' ? `${MOVIE_ENDPOINT}/${id}` : `${TV_ENDPOINT}/${id}`;
  const { data } = useTmdb<MovieRepsonse>(endpoint, { append_to_response: 'videos' }, [id]);
 
  const trailerVideo =
    data?.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.name?.toLowerCase().includes('official')) ||
    data?.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer');
 
  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }
 
  return (
    <Modal onClose={() => navigate(-1)}>
      <div className="p-6 space-y-6">
        <div
          className="h-[420px] bg-cover bg-center rounded-2xl"
          style={{ backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path})` }}
        />
        <div className="flex gap-8">
          <img className="w-[220px] h-[330px] object-cover rounded-xl" src={`${IMAGE_BASE_URL}${data.poster_path}`} alt={data.title ?? data.name} />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{data.title ?? data.name}</h1>
            <p className="text-gray-400 flex items-center gap-2">
              <FaCalendarAlt />
              {data.release_date ?? data.first_air_date}
            </p>
            <p className="text-gray-300">{data.overview}</p>
            {trailerVideo && (
              <div className="aspect-video">
                <iframe
                  className="w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${trailerVideo.key}`}
                  title="Trailer"
                  allowFullScreen
                />
              </div>
            )}
            <LinkGroup
              options={
                category === 'movies'
                  ? [
                      { label: 'Credits', to: 'credits' },
                      { label: 'Trailers', to: 'trailers' },
                      { label: 'Reviews', to: 'reviews' },
                    ]
                  : [
                      { label: 'Seasons', to: 'seasons', match: ['/:category/:id/season/:season'] },
                      { label: 'Credits', to: 'credits' },
                      { label: 'Trailers', to: 'trailers' },
                      { label: 'Reviews', to: 'reviews' },
                    ]
              }
            />
          </div>
        </div>
        <Outlet />
      </div>
    </Modal>
  );
};