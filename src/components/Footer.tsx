import { FaGithub, FaLinkedin } from 'react-icons/fa';
 
export const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-800 bg-gray-900 text-gray-500">
      <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <p>Stephen's Playground — Powered by TMDB</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/your-username" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition">
            <FaGithub />
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition">
            <FaLinkedin />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
 