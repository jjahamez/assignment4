import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';

export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <section className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">TMDB Browser</h1>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <img
            src="https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png" alt="LeBron James"
            className="w-64 h-64 object-cover rounded-2xl shadow-lg"/>
          <img
            src="https://pbs.twimg.com/media/FYyBeNkVQAAhvuw.jpg" alt="Transformers"
            className="w-64 h-64 object-cover rounded-2xl shadow-lg"/>
        </div>
        <p className="text-gray-400 text-lg"> Explore movies and discover people using a fast, modern interface.
</p>
        <Button onClick={() => navigate('/movies/category/popular')}>Enter </Button> 
        <footer className="pt-10 text-sm text-gray-500">Built with React, Vite, Tailwind, React Router, and the TMDB API</footer>
      </section>
    </main>
  );
};
