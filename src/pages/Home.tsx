import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import GameDataSchema from '../schemas/gameData';

export default function Home() {
  const [gamesData, setGamesData] = useState<Record<string, GameDataSchema>>({});

  useEffect(() => {
    const loadGames = () => {
  // Use import eager to avoid issues with dynamic glob imports
      const gameModules = import.meta.glob<{ default: GameDataSchema }>('../data/*.json', { eager: true });
      const loadedGames: Record<string, GameDataSchema> = {};

      for (const path in gameModules) {
        const filename = path.split('/').pop()?.replace('.json', '') || path;
        loadedGames[filename] = gameModules[path].default;
      }

      setGamesData(loadedGames);
    };

    loadGames();
  }, []);


  return (
    <div className="min-h-screen bg-gray-900 animate-fadeIn flex flex-col">
      {/* Grid */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Object.entries(gamesData).map(([filename, game]) => (
              <Link
                key={filename}
                to={`/${encodeURIComponent(filename)}`}
                className="group relative h-32 rounded-lg overflow-hidden transition-all duration-300 hover:ring-4 hover:ring-primary hover:shadow-lg hover:shadow-primary/50 hover:bg-gray-700 bg-gray-800 flex items-center justify-center p-2"
              >



              {/* Image */}
              <div className="
                w-full h-full
                bg-gray-700
                rounded-md
                overflow-hidden
                flex items-center justify-center
              ">
                <img
                  src={game.images.poster}
                  alt={game.title}
                  className="h-full max-w-none object-contain"
                />
              </div>

              {/* Title */}
              <div
                className="absolute bottom-0 left-0 w-full z-10
                          bg-gray-200/90 text-gray-900
                          text-xs font-semibold px-2 py-1
                          truncate
                          opacity-0 group-hover:opacity-100
                          transition-opacity duration-200"
              >
                {game.title}
              </div>
              
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
