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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Object.entries(gamesData).map(([filename, game]) => (
              <Link
                key={filename}
                to={`/${encodeURIComponent(filename)}`}
                className="group relative h-32 rounded-lg overflow-hidden transition-all duration-300 hover:ring-4 hover:ring-primary hover:shadow-lg hover:shadow-primary/50 bg-gray-800 flex items-center justify-center p-2"
              >
                <img 
                  src={game.images.logo}
                  alt={game.title}
                  className="w-full h-full object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
