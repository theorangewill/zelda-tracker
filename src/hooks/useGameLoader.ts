import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameDataSchema from '../schemas/gameData';
import applyProgressMap from '../utils/applyProgressMap';
import { STORAGE_PREFIX } from '../constants/persistance';
import applyCountableCollectibles from '../utils/applyCountableCollectibles';


export function useGameLoader(gameId?: string) {
  const navigate = useNavigate();
  const [baseGame, setBaseGame] = useState<GameDataSchema | null>(null);
  const [gameData, setGameData] = useState<GameDataSchema | null>(null);

  useEffect(() => {
    if (!gameId) return;

    try {
      const modules = import.meta.glob<{ default: GameDataSchema }>(
        '../data/*.json',
        { eager: true }
      );

      let base = modules[`../data/${gameId}.json`]?.default;
      if (!base) {
        navigate('/');
        return;
      }
      
      base = applyCountableCollectibles(base);


      const saved = localStorage.getItem(`${STORAGE_PREFIX}${gameId}`);

      const data = saved
        ? applyProgressMap(base, JSON.parse(saved))
        : base;

        
      setBaseGame(base);
      setGameData(data);
    } catch (e) {
      console.error(e);
      navigate('/');
    }
  }, [gameId, navigate]);

  return { baseGame, gameData, setGameData };
}
