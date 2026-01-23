import GameDataSchema from "../schemas/gameData";

export default function applyProgressMap(base: GameDataSchema, progressMap: Record<string, boolean>): GameDataSchema {
  const copy: any = JSON.parse(JSON.stringify(base));

  function walk(obj: any) {
    if (!obj || typeof obj !== 'object') return;

    for (const k of Object.keys(obj)) {
      const v = obj[k];

      if (v && typeof v === 'object') {
        if (k in progressMap) {
          v.completed = Boolean(progressMap[k]);
          if ('compass' in v && `${k}_compass` in progressMap) {
            v.compass = Boolean(progressMap[`${k}_compass`]);
          }
          if ('map' in v && `${k}_map` in progressMap) {
            v.map = Boolean(progressMap[`${k}_map`]);
          }
          if ('boss_key' in v && `${k}_boss_key` in progressMap) {
            v.boss_key = Boolean(progressMap[`${k}_boss_key`]);
          }
          if ('item' in v && `${k}_item` in progressMap) {
            v.item.completed = Boolean(progressMap[`${k}_item`]);
          }
          if ('boss' in v && `${k}_boss` in progressMap) {
            v.boss.completed = Boolean(progressMap[`${k}_boss`]);
            continue;
          }
        }
        walk(v);
      }
    }
  }

  walk(copy);
  return copy;
}