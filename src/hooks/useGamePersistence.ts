import { useEffect } from 'react';
import GameDataSchema from '../schemas/gameData';
import createProgressMap from '../utils/createProgressMap';
import applyProgressMap from '../utils/applyProgressMap';
import { STORAGE_PREFIX } from '../constants/persistance';


type UseGamePersistenceParams = {
  gameId?: string;
  gameData: GameDataSchema | null;
  baseGame: GameDataSchema | null;
  setGameData: (data: GameDataSchema) => void;
  closeModal: () => void;
};

export function useGamePersistence({
  gameId,
  gameData,
  baseGame,
  setGameData,
  closeModal,
}: UseGamePersistenceParams) {


  useEffect(() => {
    if (!gameData) return;

    const timeout = setTimeout(() => {
      try {
        const progressMap = createProgressMap(gameData);
        localStorage.setItem(
          `${STORAGE_PREFIX}${gameId}`,
          JSON.stringify(progressMap)
        );
      } catch (e) {
        console.error('Failed to save progress', e);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [gameData, gameId]);

  const handleExport = () => {
    if (!gameData) return;

    try {
      const safeTitle = (gameData.title || 'save').replace(/\s+/g, '_');

      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, '-')
        .slice(0, 19);

      const progressMap = createProgressMap(gameData);
      const json = JSON.stringify(progressMap, null, 2);

      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${safeTitle}_progress_${timestamp}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Export failed', e);
    } finally {
      closeModal();
    }
  };

  const handleImport = () => {
    if (!baseGame) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';

    input.onchange = async (ev: Event) => {
      const target = ev.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const parsedProgress = JSON.parse(text);
        setGameData(applyProgressMap(baseGame, parsedProgress));
      } catch (e) {
        console.error('Import failed', e);
      } finally {
        closeModal();
      }
    };

    input.click();
  };

  const handleReset = () => {
    if (!baseGame) return;

    localStorage.removeItem(`${STORAGE_PREFIX}${gameId}`);
    setGameData(baseGame);
    closeModal();
  };

  return {
    handleExport,
    handleImport,
    handleReset,
  };
}
