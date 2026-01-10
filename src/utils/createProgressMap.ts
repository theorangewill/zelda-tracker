import GameDataSchema from "../schemas/gameData";


export default function createProgressMap(gameData: GameDataSchema): Record<string, boolean> {
  const tasks: Record<string, boolean> = {};

  function walk(obj: any) {
    if (!obj || typeof obj !== 'object') return;
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (v && typeof v === 'object') {
        if ('completed' in v) {
          tasks[k] = Boolean(v.completed);
          if ('compass' in v && typeof v.compass === 'boolean') {
            tasks[`${k}_compass`] = Boolean(v.compass);
          }
          if ('map' in v && typeof v.map === 'boolean') {
            tasks[`${k}_map`] = Boolean(v.map);
          }
          if ('boss_key' in v && typeof v.boss_key === 'boolean') {
            tasks[`${k}_boss_key`] = Boolean(v.boss_key);
          }
          if ('item' in v && v.item && typeof v.item === 'object' && 'completed' in v.item) {
            tasks[`${k}_item`] = Boolean(v.item.completed);
          }
          if ('boss' in v && v.boss && typeof v.boss === 'object' && 'completed' in v.boss) {
            tasks[`${k}_boss`] = Boolean(v.boss.completed);
            continue;
          }
        }
        walk(v);
      }
    }
  }
  walk(gameData);
  return tasks;
}