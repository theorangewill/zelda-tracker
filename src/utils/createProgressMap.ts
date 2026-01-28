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
          if ('compass' in v && v.compass != null && typeof v.compass === 'boolean') {
            tasks[`${k}_compass`] = Boolean(v.compass);
          }
          if ('map' in v && v.map != null && typeof v.map === 'boolean') {
            tasks[`${k}_map`] = Boolean(v.map);
          }
          if ('boss_key' in v && v.boss_key != null && typeof v.boss_key === 'boolean') {
            tasks[`${k}_boss_key`] = Boolean(v.boss_key);
          }
          if ('item' in v && v.item != null && typeof v.item === 'object' && 'completed' in v.item) {
            tasks[`${k}_item`] = Boolean(v.item.completed);
          }
          if ('item2' in v && v.item2 != null && typeof v.item2 === 'object' && 'completed' in v.item2) {
            tasks[`${k}_item2`] = Boolean(v.item.completed);
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