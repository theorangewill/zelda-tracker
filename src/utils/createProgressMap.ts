import GameDataSchema from "../schemas/gameData";


export default function createProgressMap(gameData: GameDataSchema): Record<string, boolean> {
  const tasks: Record<string, boolean> = {};

  function walk(obj: any) {
    if (!obj || typeof obj !== 'object') return;
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (v && typeof v === 'object') {
        if ('completed' in v) tasks[k] = Boolean(v.completed);
        walk(v);
      }
    }
  }
  walk(gameData);
  return tasks;
}