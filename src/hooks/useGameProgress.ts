import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { produce } from 'immer';
import GameDataSchema, { DungeonKeys } from '../schemas/gameData';
import createProgressMap from '../utils/createProgressMap';
import calculateProgress from '../utils/calculateProgress';
import createHookedItems from '../utils/createHookedItems';
import calculateHeartContainers from '../utils/calculateHeartContainers';
import calculateMagicPower from '../utils/calculateMagicPower';
import findObjectWithKey from '../utils/findObjectWithKey';

export function useGameProgress(
  gameData: GameDataSchema | null,
  setGameData: Dispatch<SetStateAction<GameDataSchema | null>>
) {
  const progressMap = useMemo(
    () => gameData ? createProgressMap(gameData) : {},
    [gameData]
  );

  const progress = useMemo(
    () => calculateProgress(progressMap),
    [progressMap]
  );

  const hookedItems = useMemo(
    () => gameData ? createHookedItems(gameData) : new Set<string>(),
    [gameData]
  );

  const amtHeartContainers = useMemo(
    () => gameData ? calculateHeartContainers(gameData.health) : 0,
    [gameData?.health]
  );
  const amtMagicPower = useMemo(
    () => gameData ? calculateMagicPower(gameData.magic_power) : 0,
    [gameData?.magic_power]
  );

  const toggleSelected = useCallback((key: string) => {
    setGameData(prev => {
      if (!prev) return prev;

      return produce(prev, draft => {
        const parent = findObjectWithKey(draft, key);
        const target = parent[key];
        target.completed = !target.completed;

        for (const hook of target.hooks ?? []) {
          const hookParent = findObjectWithKey(draft, hook);
          hookParent[hook].completed = target.completed;
        }
      });
    });
  }, [setGameData]);

  const toggleSelectedDungeon = useCallback((dungeonKey: string, element: DungeonKeys) => {
    setGameData(prev => {
      if (!prev) return prev;

      return produce(prev, draft => {
        const dungeon = draft.dungeons[dungeonKey];

        if (element === 'item') {
          dungeon.item.completed = !dungeon.item.completed;
          for (const hook of dungeon.item.hooks) {
            const hookParent = findObjectWithKey(draft, hook);
            hookParent[hook].completed = dungeon.item.completed;
          }
        } else if (element === 'boss') {
          dungeon.boss.completed = !dungeon.boss.completed;
          for (const hook of dungeon.boss.hooks) {
            const hookParent = findObjectWithKey(draft, hook);
            hookParent[hook].completed = dungeon.boss.completed;
          }
        } else {
          dungeon[element] = !dungeon[element];
        }

        dungeon.completed =
          dungeon.compass &&
          dungeon.map &&
          dungeon.item.completed &&
          dungeon.boss_key &&
          dungeon.boss.completed;
      });
    });
  }, [setGameData]);

  return {
    progress,
    hookedItems,
    amtHeartContainers,
    amtMagicPower,
    toggleSelected,
    toggleSelectedDungeon
  };
}
